from flask import Flask, request, jsonify
from flask_cors import CORS  # Allow frontend requests
import fitz  # PyMuPDF for PDF text extraction
import docx  # python-docx for DOCX files
import os
import time
import requests  # Fetch PDFs from URLs
from transformers import pipeline
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Load summarization model once at startup
try:
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
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
        print(f"❌ ERROR: {str(e)}")  # Debugging
        return jsonify({"error": f"Unexpected server error: {str(e)}"}), 500


def download_pdf_from_url(pdf_url):
    """Fetch a PDF from a URL and save it locally."""
    try:
        response = requests.get(pdf_url)
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
    """Extracts text from PDF, DOCX, or TXT files."""
    if file_path.endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        return extract_text_from_docx(file_path)
    elif file_path.endswith(".txt"):
        return extract_text_from_txt(file_path)
    return "Unsupported file format."

def extract_text_from_pdf(file_path):
    """Extract text from a PDF file."""
    text = ""
    doc = fitz.open(file_path)
    for page in doc:
        text += page.get_text("text") + "\n"
    return text.strip()

def extract_text_from_docx(file_path):
    """Extract text from a DOCX file."""
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs]).strip()

def extract_text_from_txt(file_path):
    """Extract text from a TXT file."""
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read().strip()

def chunk_text(extracted_text, max_tokens=500):
    """Splits text into smaller chunks for model processing."""
    tokens = extracted_text.split()
    return [" ".join(tokens[i : i + max_tokens]) for i in range(0, len(tokens), max_tokens)]

def summarize_text(chunks, summarizer, length):
    """Summarizes text chunks."""
    if not summarizer:
        return "Summarization model not available."

    length_mapping = {"short": (50, 10), "medium": (100, 50), "long": (200, 100)}
    max_length, min_length = length_mapping[length]

    with ThreadPoolExecutor() as executor:
        summaries = list(executor.map(lambda chunk: summarizer(chunk, max_length=max_length, min_length=min_length, do_sample=False)[0]["summary_text"], chunks))

    return " ".join(summaries).strip()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
