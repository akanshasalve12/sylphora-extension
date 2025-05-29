import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AtsChecker from './pages/AtsChecker';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import { supabase } from '@/supabaseClient';
import { useAuthStore } from '@/stores/authStore';
import JobDescription from './pages/JobDescription';

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
              <Route path="/" element={<LandingPage />} />
              <Route path="/ats-checker" element={<AtsChecker />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/resume-builder" element={user ? <Index /> : <Navigate to="/auth" />} />
              <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/auth" />} />
              <Route path="*" element={<NotFound />} />
              <Route path='/job-description' element={<JobDescription />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
