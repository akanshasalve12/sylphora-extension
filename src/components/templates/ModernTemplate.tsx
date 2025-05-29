import React from "react";
import { ResumeData } from "@/utils/resumeSchema";

interface ModernTemplateProps {
  resumeData: ResumeData;
  fontFamily?: string;
  fontSize?: number | string;
  pageSize?: string;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({
  resumeData,
  fontFamily = "Arial, sans-serif",
  fontSize = 14,
  pageSize = "A4", // default fallback
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
        backgroundColor: "#fff",
        padding: "32px",
        color: "#333",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px" }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div style={{ fontSize: "0.9rem", color: "#666" }}>
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
          <br />
          {personalInfo.website && `${personalInfo.website} | `}
          {personalInfo.linkedin}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2c3e50" }}>
            Professional Summary
          </h2>
          <hr style={{ width: "60px", borderTop: "2px solid #2c3e50", margin: "8px 0" }} />
          <p style={{ whiteSpace: "pre-line" }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2c3e50" }}>
            Experience
          </h2>
          <hr style={{ width: "60px", borderTop: "2px solid #2c3e50", margin: "8px 0" }} />
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "16px" }}>
              <div style={{ fontWeight: "bold" }}>{exp.position}</div>
              <div style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
                {exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </div>
              <p style={{ whiteSpace: "pre-line", marginTop: "4px" }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2c3e50" }}>
            Education
          </h2>
          <hr style={{ width: "60px", borderTop: "2px solid #2c3e50", margin: "8px 0" }} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "16px" }}>
              <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
              <div style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
                {edu.institution}
                {edu.field ? `, ${edu.field}` : ""} | {edu.startDate} -{" "}
                {edu.current ? "Present" : edu.endDate}
              </div>
              <p style={{ whiteSpace: "pre-line", marginTop: "4px" }}>{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2c3e50" }}>
            Skills
          </h2>
          <hr style={{ width: "60px", borderTop: "2px solid #2c3e50", margin: "8px 0" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {skills.map((skill) => (
              <span
                key={skill.id}
                style={{
                  backgroundColor: "#ecf0f1",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
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

export default ModernTemplate;
