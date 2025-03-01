import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const pdfUrl = location.state?.pdfUrl || "";
  const policyName = location.state?.policyName || "Policy Document";

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [length, setLength] = useState("medium");
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [keyPoints, setKeyPoints] = useState([]);
  const [copied, setCopied] = useState(false);
  const handleComplaintClick = () => {
    navigate(`/complaints`);
  };
  // Simulate progress during loading
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + (5 * Math.random());
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 300);
    } else {
      setLoadingProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSummarize = async () => {
    if (!pdfUrl) {
      setError("No policy document available.");
      return;
    }

    setLoading(true);
    setError(null);
    setSummary("");
    setKeyPoints([]);

    try {
      const BASE_URL = "http://localhost:5173";  
      const fullPdfUrl = pdfUrl.startsWith("http") ? pdfUrl : `${BASE_URL}${pdfUrl}`;

      console.log("📤 Sending request with PDF URL:", fullPdfUrl);

      const formData = new FormData();
      formData.append("pdf_url", fullPdfUrl);
      formData.append("length", length);

      const response = await axios.post("http://127.0.0.1:5000/summarize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Server Response:", response.data);
      setSummary(response.data.summary);
      
      // Generate some mock key points based on the summary
      const mockKeyPoints = response.data.summary
        .split(". ")
        .filter(sentence => sentence.length > 30)
        .slice(0, 5)
        .map(point => point.trim() + (point.endsWith(".") ? "" : "."));
      
      setKeyPoints(mockKeyPoints);
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.response?.data?.error || "Failed to fetch summary. Check server logs.");
    } finally {
      setLoading(false);
      setLoadingProgress(100);
      setTimeout(() => setLoadingProgress(0), 600);
    }
  }; 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 001 1h5v-2H5V8.35l5-2.857 5 2.857v5.65h-2v2h5a1 1 0 001-1V8a1 1 0 00-.504-.868l-7-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-xl">CivicBridge</span>
              </div>
              <div className="ml-10 flex items-center space-x-2">
                <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900">Dashboard</button>
              </div>
              <div className="ml-10 flex items-center space-x-2">
                <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900" onClick={() => handleComplaintClick()}>Complaints</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 p-6" >
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate("/")}
                className="text-white flex items-center font-medium hover:text-blue-100 transition bg-white bg-opacity-20 px-3 py-1 rounded-full"
              >
                ← Back
              </button>
              <h1 className="text-3xl font-bold">{policyName}</h1>
              <div className="w-24"></div> {/* Spacer for alignment */}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Controls Section */}
            <div className="flex flex-col md:flex-row gap-5 mb-8 items-start md:items-center">
              {/* PDF Preview Toggle */}
              {pdfUrl && (
                <button
                  onClick={() => setShowPdfPreview(!showPdfPreview)}
                  className="flex items-center gap-2 text-blue-600 font-medium px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition"
                >
                  <span className="text-lg">📄</span>
                  {showPdfPreview ? "Hide Document" : "Preview Document"}
                </button>
              )}

              {/* Length Selector */}
              <div className="flex items-center">
                <label className="text-gray-600 font-medium mr-2">Summary Length:</label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  {["short", "medium", "long"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setLength(option)}
                      className={`px-4 py-2 capitalize ${
                        length === option
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      } transition-colors`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summarize Button */}
              <button
                onClick={handleSummarize}
                className="ml-auto bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>✨</span> Summarize
                  </>
                )}
              </button>
            </div>

            {/* PDF Preview Section */}
            {showPdfPreview && pdfUrl && (
              <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium text-gray-700">Document Preview</h3>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:text-blue-800"
                  >
                    Open in new tab
                  </a>
                </div>
                <iframe
                  src={pdfUrl}
                  className="w-full h-96 border-none"
                  title="Policy Document Preview"
                ></iframe>
              </div>
            )}

            {/* Progress Bar */}
            {loading && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-red-500">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Results Section */}
            {(summary || keyPoints.length > 0) && !loading && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab("summary")}
                    className={`flex-1 py-3 font-medium text-center ${
                      activeTab === "summary"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Full Summary
                  </button>
                  <button
                    onClick={() => setActiveTab("key-points")}
                    className={`flex-1 py-3 font-medium text-center ${
                      activeTab === "key-points"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Key Points
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "summary" && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Summary Overview
                        </h3>
                        <button
                          onClick={copyToClipboard}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                        >
                          {copied ? "✓ Copied!" : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {summary}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "key-points" && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Key Takeaways
                      </h3>
                      <ul className="space-y-3">
                        {keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            <p className="text-gray-700">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between">
                  <div className="text-sm text-gray-500">
                    {length === "short" ? "Brief overview" : length === "medium" ? "Standard summary" : "Comprehensive analysis"}
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Save
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!summary && !loading && !error && (
              <div className="text-center py-12 bg-gray-50 border border-gray-200 border-dashed rounded-lg">
                <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No summary yet</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Click the "Summarize" button to generate a summary of your policy document in your preferred length.
                </p>
                <button
                  onClick={handleSummarize}
                  className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate Summary
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PolicyDetails;