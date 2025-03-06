import { Toaster as UiToaster } from "@/components/ui/toaster"; // Renamed to avoid conflict
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useNavigate } from "react-router-dom"; // Added useNavigate import
import { Toaster as HotToaster } from "react-hot-toast"; // For react-hot-toast
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const queryClient = new QueryClient();

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log('AuthCallback - Token:', token); // Debug log
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token stored, redirecting to /dashboard');
      navigate('/dashboard'); // Use navigate instead of window.location.href
    } else {
      console.log('No token found, redirecting to /signin');
      navigate('/signin'); // Redirect if no token
    }
  }, [location, navigate]);

  return <div>Authenticating...</div>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UiToaster />
      <Sonner />
      <HotToaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/google/callback" element={<AuthCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
