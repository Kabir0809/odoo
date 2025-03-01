// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const { spawn } = require("child_process");
// const path = require("path");
// const fs = require("fs");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// // mongoose.connect(process.env.MONGO_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// // }).then(() => console.log("✅ MongoDB Connected"))
// //   .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // Multer Setup for File Uploads
// const upload = multer({ dest: "uploads/" });

// // API Route: Summarize PDF using Python Script
// app.post("/summarize", upload.single("file"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//     }

//     const pdfPath = path.join(__dirname, req.file.path);

//     // Run Python script to summarize PDF
//     const pythonProcess = spawn("python", ["python_scripts/summarize.py", pdfPath]);

//     let summary = "";

//     pythonProcess.stdout.on("data", (data) => {
//         summary += data.toString();
//     });

//     pythonProcess.stderr.on("data", (data) => {
//         console.error(`❌ Python Error: ${data}`);
//     });

//     pythonProcess.on("close", (code) => {
//         console.log(`📄 Python script exited with code ${code}`);
//         fs.unlinkSync(pdfPath); // Delete file after processing
//         res.json({ summary: summary.trim() });
//     });
// });

// // Root Route
// app.get("/", (req, res) => {
//     res.send("✅ API is running...");
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Multer Setup for File Uploads
const upload = multer({ dest: "uploads/" });

/* ==========================
   🔹 USER AUTHENTICATION ROUTES
========================== */

// Signup Route
app.post(
  "/api/auth/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("role", "Role must be either 'user' or 'government'").isIn(["user", "government"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name, email, password: hashedPassword, role });
      await user.save();

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Login Route
app.post(
  "/api/auth/login",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

/* ==========================
   🔹 PDF SUMMARIZATION ROUTE
========================== */
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

/* ==========================
   🔹 PROTECTED ROUTES (User & Government Dashboards)
========================== */

// Middleware for Auth Verification
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

// User Dashboard Route
app.get("/api/user-dashboard", verifyToken, (req, res) => {
    if (req.user.role !== "user") return res.status(403).json({ msg: "Access denied" });
    res.json({ msg: "Welcome to User Dashboard", user: req.user });
});

// Government Dashboard Route
app.get("/api/government-dashboard", verifyToken, (req, res) => {
    if (req.user.role !== "government") return res.status(403).json({ msg: "Access denied" });
    res.json({ msg: "Welcome to Government Dashboard", user: req.user });
});

/* ==========================
   🔹 ROOT ROUTE
========================== */
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});

/* ==========================
   🔹 START SERVER
========================== */
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
