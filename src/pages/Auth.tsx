import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, UserCheck } from "lucide-react";
import AuthModal from "@/components/AuthModal";

const Auth = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  const handleAuthSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#fefaf6] text-[#1e1e1e] p-4 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2 border-[#1e1e1e] text-[#1e1e1e] hover:bg-[#1e1e1e] hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to Resume Builder
            </Button>
          </Link>
          <ThemeToggle />
        </header>

        <Card className="bg-white text-[#1e1e1e] border-[#e0e0e0]">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Authentication</CardTitle>
            <CardDescription>
              Sign in to save your resumes and access them from anywhere
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="h-20 w-20 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <UserCheck className="h-10 w-10 text-pink-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h2>
                <p className="text-muted-foreground mb-6">{user.email}</p>
                <div className="flex gap-4">
                  <Link to="/">
                    <Button className="bg-white text-[#1e1e1e] hover:bg-[#f1f1f1]">
                      Go to Resume Builder
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-[#1e1e1e] text-[#1e1e1e] hover:bg-[#1e1e1e] hover:text-white" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-6">Please sign in to continue</p>
                <Button className="bg-white text-[#1e1e1e] hover:bg-[#f1f1f1]" onClick={() => setIsAuthModalOpen(true)}>
                  Sign In / Sign Up
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Auth;
