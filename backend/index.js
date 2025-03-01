require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Multer Setup for File Uploads
const upload = multer({ dest: "uploads/" });

// API Route: Summarize PDF using Python Script
app.post("/summarize", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfPath = path.join(__dirname, req.file.path);

    // Run Python script to summarize PDF
    const pythonProcess = spawn("python", ["python_scripts/summarize.py", pdfPath]);

    let summary = "";

    pythonProcess.stdout.on("data", (data) => {
        summary += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`❌ Python Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
        console.log(`📄 Python script exited with code ${code}`);
        fs.unlinkSync(pdfPath); // Delete file after processing
        res.json({ summary: summary.trim() });
    });
});

// Root Route
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
