import os
import faiss
import cohere
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
from sentence_transformers import SentenceTransformer

# Initialize Flask
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "uploads"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# Cohere API Key (Replace with your key)
cohere_api_key = "PadRrQMq30sKnfvrD89I0IVAtgYAdH6Xbegyg7C1"
co = cohere.Client(cohere_api_key)

# Use a sentence transformer for embedding
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Store document embeddings in memory
documents = []
embeddings = None
index = None

# Function to extract text from uploaded files
def extract_text(file_path):
    ext = file_path.split(".")[-1]
    if ext == "pdf":
        loader = PyPDFLoader(file_path)
    elif ext in ["docx", "doc"]:
        loader = Docx2txtLoader(file_path)
    elif ext == "txt":
        loader = TextLoader(file_path)
    else:
        return None
    return loader.load()

# Function to create FAISS index
def create_faiss_index(text_chunks):
    global embeddings, index, documents
    documents = text_chunks
    embedding_vectors = embedding_model.encode(text_chunks)
    embedding_vectors = np.array(embedding_vectors, dtype="float32")
    
    # Create FAISS index
    index = faiss.IndexFlatL2(embedding_vectors.shape[1])
    index.add(embedding_vectors)
    return index

# API to upload documents
@app.route("/upload", methods=["POST"])
def upload_document():
    global index
    if "file" not in request.files:
        return jsonify({"error": "No file part"})
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"})

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    # Extract text
    extracted_data = extract_text(file_path)
    if not extracted_data:
        return jsonify({"error": "Unsupported file format"})
    
    # Split text into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    text_chunks = text_splitter.split_documents(extracted_data)
    text_chunks = [chunk.page_content for chunk in text_chunks]

    # Create FAISS index
    create_faiss_index(text_chunks)

    return jsonify({"message": "File uploaded and processed successfully", "chunks": len(text_chunks)})

# API to handle user questions
@app.route("/ask", methods=["POST"])
def ask_question():
    global index
    if index is None:
        return jsonify({"error": "No documents uploaded yet"})

    data = request.json
    question = data.get("question", "")

    if not question:
        return jsonify({"error": "No question provided"})

    # Convert question into vector embedding
    question_embedding = embedding_model.encode([question])
    question_embedding = np.array(question_embedding, dtype="float32")

    # Retrieve the most relevant chunk
    _, idx = index.search(question_embedding, 1)

    if idx[0][0] == -1:
        return jsonify({"error": "No relevant context found"})

    best_match = documents[idx[0][0]]

    # Generate response using Cohere
    response = co.generate(
        model="command-r-plus-08-2024",
        prompt=f"Context: {best_match}\n\nQuestion: {question}\nAnswer:",
        max_tokens=200,
        temperature=0.7
    )

    answer = response.generations[0].text.strip()

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
