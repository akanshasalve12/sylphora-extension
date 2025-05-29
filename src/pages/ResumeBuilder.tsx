import React from "react";
import { useNavigate } from "react-router-dom";

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

const ResumeBuilder: React.FC = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    localStorage.setItem("selectedTemplate", templateId);
    navigate("/resume-preview");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Choose a Template</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{template.name}</h2>
            <p className="text-gray-600 mb-4">{template.description}</p>
            <button
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
              onClick={() => handleTemplateSelect(template.id)}
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeBuilder;
