from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import docx
import os
import time
import requests
from transformers import pipeline
import re

app = Flask(_name_)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

try:
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=0)
except Exception as e:
    print(f"Error loading model: {str(e)}")
    summarizer = None

@app.route("/summarize", methods=["POST"])
def summarize_document():
    """Handles both file uploads and URL-based PDF summarization."""
    try:
        # Debugging logs
        print("✅ Received summarization request...")

        # ✅ Check if a PDF URL is provided
        pdf_url = request.form.get("pdf_url")
        print(f"📄 Received PDF URL: {pdf_url}")

        if pdf_url:
            file_path = download_pdf_from_url(pdf_url)
            if not file_path or not os.path.exists(file_path):
                return jsonify({"error": "Failed to download PDF"}), 500
        else:
            return jsonify({"error": "No PDF URL received"}), 400

        # ✅ Extract text
        extracted_text = extract_text(file_path)
        print(f"📄 Extracted Text Length: {len(extracted_text.split())} words")

        if not extracted_text.strip():
            return jsonify({"error": "Extracted text is empty. The document may be blank or unsupported."}), 400

        # ✅ Validate summary length
        length = request.form.get("length", "medium").strip().lower()
        print(f"🔢 Requested summary length: {length}")

        valid_lengths = ["short", "medium", "long"]
        if length not in valid_lengths:
            return jsonify({"error": f"Invalid length. Choose from {valid_lengths}"}), 400

        # ✅ Chunk text
        chunks = chunk_text(extracted_text)
        print(f"📦 Number of Chunks: {len(chunks)}")

        if not chunks:
            return jsonify({"error": "Failed to chunk text. Input may be too small."}), 400

        # ✅ Summarize text
        start_time = time.time()

        if summarizer is None:
            return jsonify({"error": "Summarization model failed to load."}), 500

        summary = summarize_text(chunks, summarizer, length)
        summary = refine_summary(summary) #added refine summary to fix colon issue.
        processing_time = round(time.time() - start_time, 2)

        print(f"✅ Summary generated in {processing_time} seconds")

        return jsonify({
            "summary": summary,
            "original_word_count": len(extracted_text.split()),
            "summary_word_count": len(summary.split()),
            "num_chunks_processed": len(chunks),
            "processing_time_sec": processing_time,
        })
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return jsonify({"error": f"Unexpected server error: {str(e)}"}), 500

def download_pdf_from_url(pdf_url):
    try:
        response = requests.get(pdf_url, timeout=10)
        if response.status_code != 200:
            return None
        file_path = "temp_policy.pdf"
        with open(file_path, "wb") as f:
            f.write(response.content)
        return file_path
    except Exception as e:
        print(f"Error downloading PDF: {str(e)}")
        return None

def extract_text(file_path):
    if file_path.endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        return extract_text_from_docx(file_path)
    elif file_path.endswith(".txt"):
        return extract_text_from_txt(file_path)
    return "Unsupported file format."

def extract_text_from_pdf(file_path):
    try:
        with fitz.open(file_path) as doc:
            text = "".join(page.get_text("text") for page in doc)
        return text.strip()
    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return ""

def extract_text_from_docx(file_path):
    try:
        doc = docx.Document(file_path)
        text = "\n".join(paragraph.text for paragraph in doc.paragraphs)
        return text.strip()
    except Exception as e:
        print(f"Error extracting DOCX text: {e}")
        return ""

def extract_text_from_txt(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception as e:
        print(f"Error extracting TXT text: {e}")
        return ""

def chunk_text(extracted_text, max_tokens=700):
    tokens = extracted_text.split()
    return [" ".join(tokens[i : i + max_tokens]) for i in range(0, len(tokens), max_tokens)]

def summarize_text(chunks, summarizer, length):
    if not summarizer:
        return "Summarization model not available."

    length_mapping = {"short": (70, 30), "medium": (150, 75), "long": (300, 150)}
    max_length, min_length = length_mapping[length]

    summaries = summarizer(chunks, max_length=max_length, min_length=min_length, do_sample=False, truncation=True)
    return " ".join([s["summary_text"] for s in summaries]).strip()

def refine_summary(summary):
    summary = re.sub(r'\s+:\s+', ': ', summary)
    summary = re.sub(r'\s+', ' ', summary).strip()
    summary = re.sub(r'([.!?])([A-Z])', r'\1 \2', summary)
    summary = re.sub(r'([.!?])([a-z])', r'\1 \2', summary)
    summary = summary.replace(" .", ".").replace(" ,", ",")
    summary = summary.replace(" :", ":")
    summary = summary.replace(": ", ":")
    summary = summary.replace(":", ": ")
    summary = re.sub(r':\s*([.!?])', r'\1', summary)
    summary = re.sub(r':([^ ])', r'\1', summary)
    if summary:
        summary = summary[0].upper() + summary[1:]
    return summary

if _name_ == "_main_":
    app.run(host="0.0.0.0", port=5000, debug=True)