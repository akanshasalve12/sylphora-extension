import React from "react";
import { ResumeData } from "@/utils/resumeSchema";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

export interface CreativeTemplateProps {
  resumeData: ResumeData;
  fontFamily?: string;
  fontSize?: number | string;
  pageSize?: string;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
  resumeData,
  fontFamily = "sans-serif",
  fontSize = "1rem",
  pageSize = "A4",
}) => {
  const { personalInfo, experiences, education, skills } = resumeData;

  return (
    <div
      className={cn(
        "min-h-full w-full bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900 px-4 py-8",
        pageSize === "A4" && "max-w-[210mm] mx-auto"
      )}
      style={{ fontFamily, fontSize }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-10 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap justify-center text-sm gap-4 mt-4">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail size={14} /> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone size={14} /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe size={14} /> {personalInfo.website}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin size={14} /> {personalInfo.linkedin}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-10 text-gray-800 dark:text-gray-200">

        {/* Summary Section */}
        {personalInfo.summary && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Professional Summary</h2>
            <p className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-sm whitespace-pre-line">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Column */}
          <div className="w-full md:w-2/3 space-y-10">
            {/* Experience Section */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Experience</h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-sm">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-base">{exp.position}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium">{exp.company}</div>
                      <p className="text-gray-700 dark:text-gray-400 mt-1 whitespace-pre-line">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Education</h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-sm">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-base">{edu.degree}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium">
                        {edu.institution}
                        {edu.field ? `, ${edu.field}` : ""}
                      </div>
                      <p className="text-gray-700 dark:text-gray-400 mt-1 whitespace-pre-line">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/3 space-y-8">
            {/* Skills Section */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Skills</h2>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreativeTemplate;
