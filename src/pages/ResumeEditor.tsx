import React from "react";
import { useNavigate } from "react-router-dom";

// Define available resume templates
const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and structured layout for job seekers.",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold typography and fresh design.",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple, elegant layout with minimal styling.",
  },
];

const ResumeEditor: React.FC = () => {
  const navigate = useNavigate();

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    localStorage.setItem("selectedTemplate", templateId);
    navigate("/resume-preview");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Edit Resume
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {template.name}
            </h2>
            <p className="text-gray-600 mb-4">{template.description}</p>
            <button
              onClick={() => handleTemplateSelect(template.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeEditor;
