import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PolicyDetails = () => {
  const { id } = useParams(); // Get policy ID from URL
  const navigate = useNavigate();

  const policyDetails = {
    1: {
      title: "Municipal Waste Management Update",
      date: "February 25, 2025",
      category: "Environment",
      summary: "Updates to the municipal waste collection schedule and recycling program requirements.",
      details: "This policy introduces bi-weekly collection of recyclable materials, establishes new guidelines for separating waste types, and introduces penalties for non-compliance with recycling regulations.",
      stakeholders: ["Residents", "Waste Management Department", "Environmental Committee"],
      timeline: "Implementation begins April 1, 2025",
    },
    2: {
      title: "Local Business Tax Incentive Program",
      date: "February 20, 2025",
      category: "Economy",
      summary: "New tax benefits for businesses hiring local residents and investing in underserved areas.",
      details: "Qualifying businesses can receive up to 25% reduction in local taxes when hiring at least 50% of employees from within city limits.",
      stakeholders: ["Local Business Owners", "Chamber of Commerce", "Economic Development Office"],
      timeline: "Applications open March 15, 2025",
    },
    3: {
      title: "Public Park Renovation Guidelines",
      date: "February 15, 2025",
      category: "Urban Development",
      summary: "Standards for upcoming renovations to public parks and recreational spaces.",
      details: "All renovations must include accessible pathways, sustainable landscaping, and modernized play equipment.",
      stakeholders: ["Parks Department", "Accessibility Advocates", "Neighborhood Associations"],
      timeline: "Effective immediately for all new renovation projects",
    },
  };

  const policy = policyDetails[id]; // Get the selected policy

  if (!policy) return <p className="text-center p-6">Policy not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        {/* Back Button */}
        <button onClick={() => navigate("/")} className="text-blue-600 flex items-center mb-4 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>

        {/* Policy Header */}
        <div className="mb-6">
          <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-md">{policy.category}</span>
          <h1 className="text-3xl font-bold mt-2">{policy.title}</h1>
          <p className="text-gray-600 text-sm mt-1">Published on {policy.date}</p>
        </div>

        {/* Summary Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{policy.summary}</p>
        </div>

        {/* Details Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Details</h2>
          <p className="text-gray-700 leading-relaxed">{policy.details}</p>
        </div>

        {/* Stakeholders Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Stakeholders</h2>
          <ul className="list-disc list-inside text-gray-700">
            {policy.stakeholders.map((stakeholder, index) => (
              <li key={index}>{stakeholder}</li>
            ))}
          </ul>
        </div>

        {/* Timeline Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Timeline</h2>
          <p className="text-gray-700">{policy.timeline}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200">
            Download PDF
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-100 transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
