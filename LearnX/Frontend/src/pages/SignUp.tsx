
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from 'lucide-react';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-dark">Udacity</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Navigation Tabs */}
          <div className="flex mb-8 border-b border-gray-200">
            <div className="flex-1 text-center pb-4 border-b-2 border-primary font-semibold">
              SIGN UP
            </div>
            <Link 
              to="/signin"
              className="flex-1 text-center pb-4 text-gray-500 hover:text-gray-700"
            >
              SIGN IN
            </Link>
          </div>

          {/* Sign Up Form */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-center">Create your account.</h1>
            <p className="text-center text-gray-600">
              Build skills for today, tomorrow, and beyond.<br />
              Education to future-proof your career.
            </p>

            {/* Social Sign Up Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-center">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                     alt="Google" 
                     className="w-5 h-5 mr-2" />
                Sign up with Google
              </Button>
              <Button variant="outline" className="w-full justify-center">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" 
                     alt="Facebook" 
                     className="w-5 h-5 mr-2" />
                Sign up with Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  className="mt-1"
                />
              </div>

              <Button className="w-full" type="submit">
                Sign up
              </Button>

              <p className="text-xs text-center text-gray-500">
                By clicking "Sign up," you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">Terms of Use</Link>
                {' '}and our{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
