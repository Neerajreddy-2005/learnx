import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from 'lucide-react';
import toast from 'react-hot-toast';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (value === '') {
      setErrors((prev) => ({ ...prev, [id]: '' }));
      return;
    }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).every((err) => err === '') && Object.values(formData).every((val) => val !== '')) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          toast.success('Signup successful! Redirecting...');
          setTimeout(() => (window.location.href = '/dashboard'), 1000);
        } else {
          const errorMsg = data.message.includes('Username')
            ? 'Username already taken'
            : data.message.includes('Email')
            ? 'Email already in use'
            : 'Signup failed';
          toast.error(errorMsg);
          setErrors((prev) => ({
            ...prev,
            username: data.message.includes('Username') ? data.message : '',
            email: data.message.includes('Email') ? data.message : '',
          }));
        }
      } catch (error) {
        console.error('Signup error:', error);
        toast.error('Something went wrong');
        setErrors((prev) => ({ ...prev, username: 'Something went wrong' }));
      }
    } else {
      toast.error('Please fix the form errors');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-dark">LearnX</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex mb-8 border-b border-gray-200">
            <div className="flex-1 text-center pb-4 border-b-2 border-primary font-semibold">
              SIGN UP
            </div>
            <Link to="/signin" className="flex-1 text-center pb-4 text-gray-500 hover:text-gray-700">
              SIGN IN
            </Link>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-center">Create your account.</h1>
            <p className="text-center text-gray-600">
              Build skills for today, tomorrow, and beyond.<br />
              Education to future-proof your career.
            </p>
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
                <Link to="/terms" className="text-primary hover:underline">Terms of Use</Link>
                {' '}and our{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;