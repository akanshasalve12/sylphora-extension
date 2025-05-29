import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';

import { supabase } from '@/supabaseClient';
import { useAuthStore } from '@/stores/authStore';

// Pages & Components
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AtsChecker from './pages/AtsChecker';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ResumeUploader from '@/components/ResumeUploader';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumePreview from './pages/ResumePreview';
import TemplateSelector from './components/TemplateSelector';



const queryClient = new QueryClient();

function App() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    checkSession();
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/ats-checker" element={<AtsChecker />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/resume-upload" element={<ResumeUploader />} />
              <Route path="/build-resume" element={<ResumeBuilder />} />

              <Route
                path="/resume-preview"
                element={
                  <ResumePreview
                    resumeData={{
                      personalInfo: {
                        firstName: "Jane",
                        lastName: "Doe",
                        email: "jane@example.com",
                        phone: "1234567890",
                      },
                      experiences: [],
                      education: [],
                      skills: [],
                      certificates: [],
                      hobbies: [],
                    }}
                    selectedTemplate="modern"
                    selectedFont="Arial"
                    fontSize="12pt"
                  />
                }
              />

              <Route
                path="/template-selector"
                element={
                  <TemplateSelector
                    selectedTemplate={{ style: "modern" }}
                    onSelectTemplate={() => console.log("Template selected")}
                  />
                }
              />

              {/* Protected Routes */}
              <Route
                path="/resume-builder"
                element={user ? <Index /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/profile"
                element={user ? <ProfilePage /> : <Navigate to="/auth" replace />}
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
