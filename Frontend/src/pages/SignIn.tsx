import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (value === '' || (id === 'username' && formData.password === '') || (id === 'password' && formData.username === '')) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = formData;
    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setError('');
        localStorage.setItem('token', data.token);
        toast.success('Signin successful! Redirecting...');
        setTimeout(() => (window.location.href = '/dashboard'), 1000);
      } else {
        setError(data.message);
        toast.error(data.message || 'Signin failed');
      }
    } catch (error) {
      console.error('Signin error:', error);
      setError('Something went wrong');
      toast.error('Something went wrong');
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
            <Link
              to="/signup"
              className="flex-1 text-center pb-4 text-gray-500 hover:text-gray-700"
            >
              SIGN UP
            </Link>
            <div className="flex-1 text-center pb-4 border-b-2 border-primary font-semibold">
              SIGN IN
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-center">Sign in to your account.</h1>
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
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate+y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button className="w-full" type="submit">
                Sign in
              </Button>
              <div className="text-center">
                <Link to="/forgot-password" className="text-primary hover:underline text-sm">
                  Forgot your password?
                </Link>
              </div>
              <p className="text-xs text-center text-gray-500">
                By clicking "Sign in," you agree to our{' '}
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

export default SignIn;