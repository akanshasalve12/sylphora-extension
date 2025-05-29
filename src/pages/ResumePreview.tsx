import React from "react";
import { ResumeData } from "@/utils/resumeSchema";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";

interface ResumePreviewProps {
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedFont: string;
  fontSize: number | string;
  pageSize?: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  selectedTemplate,
  selectedFont,
  fontSize,
  pageSize,
}) => {
  // Debug logs to verify props
  console.log({
    selectedTemplate,
    selectedFont,
    fontSize,
    pageSize,
    resumeData,
  });

  // Decide which template to render
  switch (selectedTemplate) {
    case "modern":
      return (
        <ModernTemplate
          resumeData={resumeData}
          fontFamily={selectedFont}
          fontSize={fontSize}
          pageSize={pageSize}
        />
      );

    case "classic":
      return (
        <ClassicTemplate
          resumeData={resumeData}
          fontFamily={selectedFont}
          fontSize={fontSize}
          pageSize={pageSize}
        />
      );

    case "creative":
      return (
        <CreativeTemplate
          resumeData={resumeData}
          fontFamily={selectedFont}
          fontSize={fontSize}
          pageSize={pageSize}
        />
      );

    default:
      // Fallback to modern template
      return (
        <ModernTemplate
          resumeData={resumeData}
          fontFamily={selectedFont}
          fontSize={fontSize}
          pageSize={pageSize}
        />
      );
  }
};

export default ResumePreview;
