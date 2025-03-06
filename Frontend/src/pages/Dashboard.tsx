import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import SearchOverlay from "@/components/SearchOverlay";
import { ChevronRight, Star, Users, Trophy, Database, Code, Brain, Building2, Car, Package, Cloud } from "lucide-react";

const FloatingShape = ({ className }: { className: string }) => (
  <div 
    className={`absolute rounded-lg bg-opacity-20 animate-float ${className}`}
    style={{
      width: `${Math.random() * 100 + 50}px`,
      height: `${Math.random() * 100 + 50}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 4 + 6}s`,
    }}
  />
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    fetch('http://localhost:5000/api/user/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUsername(data.username);
        } else {
          localStorage.removeItem('token');
          navigate('/signin');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/signin');
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Navbar onSearchClick={() => setIsSearchOpen(true)} isAuthenticated={true} username={username} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-[#141850] text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-fade-down">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome back, <span className="text-[#c3f53b]">{username || 'User'}</span>!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Continue your tech journey with hands-on learning and personal mentorship.
            </p>
            <Button size="lg" className="text-lg px-8 bg-[#c3f53b] text-[#141850] hover:bg-[#d4ff4d]">
              Explore Courses <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Explore courses by job function</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { icon: <Database className="h-8 w-8 text-purple-500" />, title: "Data Science" },
              { icon: <Code className="h-8 w-8 text-green-500" />, title: "Programming & Development" },
              { icon: <Brain className="h-8 w-8 text-blue-500" />, title: "Artificial Intelligence" },
              { icon: <Building2 className="h-8 w-8 text-yellow-500" />, title: "Business" },
              { icon: <Car className="h-8 w-8 text-red-500" />, title: "Autonomous Systems" },
              { icon: <Package className="h-8 w-8 text-indigo-500" />, title: "Product Management" },
              { icon: <Cloud className="h-8 w-8 text-cyan-500" />, title: "Cloud Computing" },
            ].map((category, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col items-center text-center h-full"
              >
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  {category.icon}
                </div>
                <h3 className="text-sm font-medium">{category.title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8 text-primary" />,
                title: "Expert Instructors",
                description: "Learn from industry experts who have hands-on experience in the field."
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Personal Mentorship",
                description: "Get personalized feedback and guidance from experienced mentors."
              },
              {
                icon: <Trophy className="h-8 w-8 text-primary" />,
                title: "Real Projects",
                description: "Build portfolio-ready projects that showcase your skills to employers."
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow animate-fade-up">
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Data Science",
                description: "Learn to analyze data and build models with Python, SQL, and more.",
                duration: "4 months",
                level: "Intermediate"
              },
              {
                title: "Web Development",
                description: "Master full-stack development with modern frameworks and tools.",
                duration: "4 months",
                level: "Beginner"
              },
              {
                title: "AI Programming",
                description: "Build and deploy AI models with Python and TensorFlow.",
                duration: "3 months",
                level: "Advanced"
              }
            ].map((program, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-up">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{program.duration}</span>
                    <span>{program.level}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-[#1b1f45] text-white overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <FloatingShape 
              key={i} 
              className={`bg-blue-${Math.floor(Math.random() * 3 + 4)}00`}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[#00b0ff] text-sm font-semibold tracking-wider uppercase mb-4 block">
              Keep Learning
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Unlock Your Potential.
            </h2>
            <Button 
              size="lg"
              className="bg-[#00b0ff] hover:bg-[#33bfff] text-white px-8 py-6 text-lg rounded-lg"
            >
              Resume Courses <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Featured Programs</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Data Science</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Web Development</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">AI Programming</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Cloud Computing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Career Resources</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Student Hub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">LinkedIn</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Facebook</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">© 2025 LearnX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;