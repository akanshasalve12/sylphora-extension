import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { CheckCircle, FileText, User } from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fefaf6] p-4 text-[#1e1e1e]">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Power Resume Builder</h1>
        <p className="text-lg mb-4">Create a professional resume in minutes with our intuitive builder and AI assistance.</p>
        <div className="flex justify-center space-x-4">
          {user ? (
            <>
              <Link to="/resume-builder">
                <Button variant="default" className="bg-white text-[#1e1e1e] hover:bg-[#f1f1f1]">
                  <FileText className="mr-2 h-4 w-4" /> Go to Resume Builder
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="border-[#1e1e1e] text-[#1e1e1e] hover:bg-[#1e1e1e] hover:text-white">
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="default" className="bg-white text-[#1e1e1e] hover:bg-[#f1f1f1]">
                  <User className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
              <Link to="/auth">
              <Button variant="default" className="bg-white text-[#1e1e1e] hover:bg-[#f1f1f1]">
                  <User className="mr-2 h-4 w-4" /> Sign Up
                </Button>
                {/* <Button variant="default" className="border-[#1e1e1e] text-[#1e1e1e] hover:bg-[#1e1e1e] hover:text-white">
                  <User className="mr-2 h-4 w-4" /> Sign Up
                </Button> */}
              </Link>
            </>
          )}
        </div>
      </header>
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
        <p className="text-lg mb-4">We provide the following services:</p>
        <ul className="list-disc list-inside text-left max-w-md mx-auto">
          <li className="mb-2"><CheckCircle className="inline-block mr-2 h-5 w-5 text-pink-500" /> AI-Powered Resume Builder</li>
          <li className="mb-2"><CheckCircle className="inline-block mr-2 h-5 w-5 text-pink-500" /> ATS Checker</li>
          <li className="mb-2"><CheckCircle className="inline-block mr-2 h-5 w-5 text-pink-500" /> Professional Templates</li>
          <li className="mb-2"><CheckCircle className="inline-block mr-2 h-5 w-5 text-pink-500" /> Live Preview</li>
          <li className="mb-2"><CheckCircle className="inline-block mr-2 h-5 w-5 text-pink-500" /> PDF Export</li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
