import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/pages/ResumePreview";
import { ResumeData, resumeSchema } from "@/utils/resumeSchema";
import { exportToPdf } from "@/utils/pdfUtils";
import { exportToDocx } from "@/utils/docxUtils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Download, 
  Save, 
  FileText, 
  User, 
  Moon, 
  Sun, 
  CheckCircle, 
  Upload,
  Github,
  LogOut
} from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import ResumeUploader from "@/components/ResumeUploader";
import AuthModal from "@/components/AuthModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import HobbiesSection from "@/components/HobbiesSection";
import AchievementsSection from "@/components/AchievementsSection";
import CertificatesSection from "@/components/CertificatesSection";
import { FormProvider } from '@/components/FormProvider';
import { useAuthStore } from '@/stores/authStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const templates = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "creative", label: "Creative" },
];

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState("edit");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("12");
  const [pageSize, setPageSize] = useState("A4");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  
  // On initial load, get saved resume data from localStorage if it exists
  useEffect(() => {
    try {
      const savedResume = localStorage.getItem("savedResume");
      if (savedResume) {
        const parsedData = JSON.parse(savedResume);
        // Validate the data against our schema
        const result = resumeSchema.safeParse(parsedData);
        if (result.success) {
          setResumeData(result.data);
        } else {
          // If invalid, just start with a fresh form
          console.error("Invalid saved resume data:", result.error);
          localStorage.removeItem("savedResume");
        }
      }
    } catch (error) {
      console.error("Error loading saved resume:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleSaveResume = (data: ResumeData) => {
    setResumeData(data);
    try {
      localStorage.setItem("savedResume", JSON.stringify(data));
      toast.success("Your resume has been saved!");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast.error("Failed to save resume. Please try again.");
    }
  };
  
  const handleFormChange = (partialData: Partial<ResumeData>) => {
    if (resumeData) {
      const updatedData = { ...resumeData, ...partialData };
      setResumeData(updatedData);
    } else {
      setResumeData(partialData as ResumeData);
    }
  };
  
  const handleExportPDF = async () => {
    await exportToPdf("resume-preview-container", "resume.pdf", pageSize, selectedFont, fontSize);
  };

  

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    toast.success(`Welcome, ${userData.name}!`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
    toast.success("Signed out successfully");
  };

  const form = useForm({
    defaultValues: {
      hobbies: [],
      achievements: [],
      certificates: [],
      // ...other form defaults
    }
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <FileText className="h-12 w-12 text-primary mb-4" />
          <span className="text-muted-foreground">Loading resume builder...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-fade-in">
      <FormProvider defaultValues={resumeData} onSubmit={handleSaveResume}>
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                AI-Powered
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Resume Builder</h1>
              <p className="text-muted-foreground max-w-2xl">
                Create a professional resume in minutes with our intuitive builder and AI assistance.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Link to="/ats-checker">
                <Button variant="outline" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  ATS Checker
                </Button>
              </Link>
              
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium hidden md:inline-block">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <Link to="/profile">
                    <Button variant="outline" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline-block">Sign In</span>
                </Button>
              )}
              
              <ThemeToggle />
            </div>
          </header>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="edit" className="transition-all duration-300 ease-apple">Edit</TabsTrigger>
                <TabsTrigger value="preview" className="transition-all duration-300 ease-apple">Preview</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="edit" className="space-y-6 mt-0">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/5">
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Resume Builder</h2>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setActiveTab("preview")}>
                            Preview
                          </Button>
                          <Button onClick={handleExportPDF}>
                            <Download className="h-4 w-4 mr-2" /> Export PDF
                          </Button>
                          
                        </div>
                      </div>
                      
                      <Tabs defaultValue="form">
                        <TabsList className="w-full mb-4">
                          <TabsTrigger value="form" className="flex-1">Build Resume</TabsTrigger>
                          <TabsTrigger value="upload" className="flex-1">Upload Resume</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="form">
                          <ResumeForm
                            initialData={resumeData || undefined}
                            onSubmit={handleSaveResume}
                            onChange={handleFormChange}
                          />
                        </TabsContent>
                        
                        <TabsContent value="upload">
                          <ResumeUploader
                            onUpload={(data) => setResumeData(data)}
                          />
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-full lg:w-2/5 flex flex-col gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Customize</h2>
                      
                      <div className="space-y-4">
                        {/* Font Select */}
                        <div>
                          <label htmlFor="font-select" className="block mb-1 font-medium">Font</label>
                          <Select
                            value={selectedFont}
                            onValueChange={setSelectedFont}
                          >
                            <SelectTrigger id="font-select">
                              <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Arial">Arial</SelectItem>
                              <SelectItem value="Georgia">Georgia</SelectItem>
                              <SelectItem value="Tahoma">Tahoma</SelectItem>
                              <SelectItem value="Verdana">Verdana</SelectItem>
                              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Font Size Select */}
                        <div>
                          <label htmlFor="font-size-select" className="block mb-1 font-medium">Font Size (px)</label>
                          <Select
                            value={fontSize}
                            onValueChange={setFontSize}
                          >
                            <SelectTrigger id="font-size-select">
                              <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                              {[10, 11, 12, 13, 14, 15, 16].map(size => (
                                <SelectItem key={size} value={size.toString()}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Page Size Select */}
                        <div>
                          <label htmlFor="page-size-select" className="block mb-1 font-medium">Page Size</label>
                          <Select
                            value={pageSize}
                            onValueChange={setPageSize}
                          >
                            <SelectTrigger id="page-size-select">
                              <SelectValue placeholder="Select page size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A4">A4</SelectItem>
                              <SelectItem value="Letter">Letter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Template Select */}
                        <div>
                        <label htmlFor="template-select" className="block mb-1 font-medium">Template</label>
                        <Select
                        value={selectedTemplate}
                        onValueChange={setSelectedTemplate}
                        >
                        <SelectTrigger id="template-select">
                        <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                         {templates.map((template) => (
                         <SelectItem key={template.id} value={template.id}>
                        {template.label}
                       </SelectItem>
                         ))}
                         </SelectContent>
                           </Select>
                          </div>

                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                      <CardContent>
                      <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
                      {resumeData ? (
                      <div
                      id="resume-preview-container"
                      className="border border-gray-300 rounded-md p-4 overflow-auto"
                      style={{
                      maxHeight: "600px",
                      fontFamily: selectedFont,
                      fontSize: `${fontSize}px`, // make sure fontSize is a number or string of number
                       }}
                          >
                       <ResumePreview
                        resumeData={resumeData}
                       selectedFont={selectedFont}
                        fontSize={fontSize}
                       selectedTemplate={selectedTemplate} // <-- add this if ResumePreview requires it
                        />
                        </div>
                        ) : (
                        <p className="text-muted-foreground">
                        No resume data to preview. Please build or upload your resume.
                        </p>
                        )}
                         </CardContent>
                      </Card>

                </div>
              </div>
              
              <HobbiesSection />
              <AchievementsSection />
              <CertificatesSection />
            </TabsContent>
            
            <TabsContent value="preview">
              {/* Optionally a full-page preview here */}
              {resumeData ? (
                <ResumePreview
                  resumeData={resumeData}
                  selectedFont={selectedFont}
                  fontSize={fontSize}
                  selectedTemplate={selectedTemplate}
                />
              ) : (
                <p className="text-muted-foreground text-center mt-10">
                  No resume data to preview.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </FormProvider>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
