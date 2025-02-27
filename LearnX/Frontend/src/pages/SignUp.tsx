import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input changes and validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Reset error when field is emptied
    if (value === '') {
      setErrors((prev) => ({ ...prev, [id]: '' }));
      return;
    }

    // Validation logic
    switch (id) {
      case 'username':
        const usernameRegex = /^[a-zA-Z0-9_-]*$/;
        setErrors((prev) => ({
          ...prev,
          username: usernameRegex.test(value)
            ? ''
            : 'Only letters, numbers, underscores (_), and hyphens (-) are allowed.',
        }));
        break;

      case 'email':
        setErrors((prev) => ({
          ...prev,
          email: value.endsWith('@gmail.com')
            ? ''
            : 'Email must end with @gmail.com',
        }));
        break;

      case 'password':
        const passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9!@#$]{8,15}$/;
        setErrors((prev) => ({
          ...prev,
          password:
            value.length < 8 || value.length > 15
              ? 'Password must be 8-15 characters long.'
              : !/(?=.*[A-Z])/.test(value)
              ? 'Password must contain at least one capital letter.'
              : !/^[a-zA-Z0-9!@#$]*$/.test(value)
              ? 'Only !@#$ are allowed as special characters.'
              : '',
        }));
        break;

      case 'confirmPassword':
        setErrors((prev) => ({
          ...prev,
          confirmPassword: value === formData.password ? '' : 'Passwords do not match.',
        }));
        break;

      default:
        break;
    }
  };

  // Handle form submission (stub for now)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).every((err) => err === '') && Object.values(formData).every((val) => val !== '')) {
      console.log('Form submitted:', formData);
    } else {
      console.log('Validation errors:', errors);
    }
  };

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
            <Link to="/signin" className="flex-1 text-center pb-4 text-gray-500 hover:text-gray-700">
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
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Sign up with Google
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1"
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <Button className="w-full" type="submit">
                Sign up
              </Button>

              <p className="text-xs text-center text-gray-500">
                By clicking "Sign up," you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Use
                </Link>{' '}
                and our{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
