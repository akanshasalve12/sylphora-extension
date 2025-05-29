import React from "react";
import { ResumeData } from "@/utils/resumeSchema";

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
  fontFamily?: string;
  fontSize?: number | string;
  pageSize?: string;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({
  resumeData,
  fontFamily = "Georgia, serif",
  fontSize = 14,
  pageSize = "A4",
}) => {
  const { personalInfo, experiences, education, skills } = resumeData;

  const getPageDimensions = (size: string) => {
    switch (size) {
      case "A4":
        return { width: "210mm", minHeight: "297mm" };
      case "Letter":
        return { width: "8.5in", minHeight: "11in" };
      default:
        return { width: "100%", minHeight: "auto" };
    }
  };

  const { width, minHeight } = getPageDimensions(pageSize);

  return (
    <div
      style={{
        fontFamily,
        fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
        width,
        minHeight,
        backgroundColor: "#f9fafb",
        padding: "40px 48px",
        color: "#222",
        boxSizing: "border-box",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "3px solid #0a74da",
          paddingBottom: "12px",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            margin: "0",
            color: "#0a74da",
          }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "500",
              fontStyle: "italic",
              color: "#444",
              marginTop: "4px",
            }}
          >
            {personalInfo.title}
          </h3>
        )}
        <p
          style={{
            marginTop: "8px",
            fontSize: "0.9rem",
            color: "#666",
          }}
        >
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
          <br />
          {personalInfo.website && `${personalInfo.website} | `}
          {personalInfo.linkedin}
        </p>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              borderBottom: "2px solid #0a74da",
              paddingBottom: "4px",
              marginBottom: "12px",
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#0a74da",
            }}
          >
            Professional Summary
          </h2>
          <p style={{ whiteSpace: "pre-line", fontSize: "1rem", color: "#333" }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              borderBottom: "2px solid #0a74da",
              paddingBottom: "4px",
              marginBottom: "16px",
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#0a74da",
            }}
          >
            Experience
          </h2>
          {experiences.map((exp) => (
            <div
              key={exp.id}
              style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "#222",
                }}
              >
                {exp.position}
              </h3>
              <p
                style={{
                  margin: "0 0 6px 0",
                  fontStyle: "italic",
                  color: "#555",
                  fontSize: "0.9rem",
                }}
              >
                {exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </p>
              <p style={{ whiteSpace: "pre-line", margin: 0, fontSize: "1rem", color: "#333" }}>
                {exp.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: "32px" }}>
          <h2
            style={{
              borderBottom: "2px solid #0a74da",
              paddingBottom: "4px",
              marginBottom: "16px",
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#0a74da",
            }}
          >
            Education
          </h2>
          {education.map((edu) => (
            <div
              key={edu.id}
              style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <h3
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "#222",
                }}
              >
                {edu.degree}
              </h3>
              <p
                style={{
                  margin: "0 0 6px 0",
                  fontStyle: "italic",
                  color: "#555",
                  fontSize: "0.9rem",
                }}
              >
                {edu.institution}
                {edu.field ? `, ${edu.field}` : ""} | {edu.startDate} -{" "}
                {edu.current ? "Present" : edu.endDate}
              </p>
              <p style={{ whiteSpace: "pre-line", margin: 0, fontSize: "1rem", color: "#333" }}>
                {edu.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2
            style={{
              borderBottom: "2px solid #0a74da",
              paddingBottom: "4px",
              marginBottom: "16px",
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#0a74da",
            }}
          >
            Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.map((skill) => (
              <span
                key={skill.id}
                style={{
                  backgroundColor: "#0a74da",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
