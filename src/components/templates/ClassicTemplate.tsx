import React from "react";
import { ResumeData } from "@/utils/resumeSchema";

interface ClassicTemplateProps {
  resumeData: ResumeData;
  fontFamily?: string;
  fontSize?: number | string;
  pageSize?: string;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({
  resumeData,
  fontFamily = "Times New Roman, serif",
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
        backgroundColor: "#f9f9f9",
        padding: "40px",
        color: "#222",
        boxSizing: "border-box",
        border: "1px solid #ccc",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "bold",
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div style={{ fontSize: "1rem", color: "#555" }}>
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
          <br />
          {personalInfo.website && `${personalInfo.website} | `}
          {personalInfo.linkedin}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              borderBottom: "2px solid #222",
              paddingBottom: "6px",
              marginBottom: "12px",
            }}
          >
            Summary
          </h2>
          <p style={{ whiteSpace: "pre-line" }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              borderBottom: "2px solid #222",
              paddingBottom: "6px",
              marginBottom: "12px",
            }}
          >
            Experience
          </h2>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  marginBottom: "4px",
                }}
              >
                {exp.position}
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                {exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </div>
              <p style={{ whiteSpace: "pre-line", marginTop: "2px" }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              borderBottom: "2px solid #222",
              paddingBottom: "6px",
              marginBottom: "12px",
            }}
          >
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  marginBottom: "4px",
                }}
              >
                {edu.degree}
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "#444",
                  marginBottom: "6px",
                }}
              >
                {edu.institution}
                {edu.field ? `, ${edu.field}` : ""} | {edu.startDate} -{" "}
                {edu.current ? "Present" : edu.endDate}
              </div>
              <p style={{ whiteSpace: "pre-line", marginTop: "2px" }}>{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              borderBottom: "2px solid #222",
              paddingBottom: "6px",
              marginBottom: "12px",
            }}
          >
            Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.map((skill) => (
              <span
                key={skill.id}
                style={{
                  backgroundColor: "#ddd",
                  padding: "6px 12px",
                  borderRadius: "3px",
                  fontSize: "1rem",
                  color: "#333",
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

export default ClassicTemplate;
