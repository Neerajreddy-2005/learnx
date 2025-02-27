
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Course {
  title: string;
  image: string;
  rating: number;
  duration: string;
  level: string;
  reviews: number;
}

const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const recommendedCourses: Course[] = [
    {
      title: "Introduction to Programming",
      image: "/lovable-uploads/a54fbb4a-c3fc-40ca-b950-566f06d3e06c.png",
      rating: 4.5,
      duration: "5 Months",
      level: "Beginner",
      reviews: 1339
    },
    {
      title: "Data Analyst",
      image: "/lovable-uploads/a54fbb4a-c3fc-40ca-b950-566f06d3e06c.png",
      rating: 4.5,
      duration: "2 Months",
      level: "Intermediate",
      reviews: 1232
    },
    // ... more courses
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 border-b">
          <div className="relative flex-1 max-w-3xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              autoFocus
              type="text"
              className="w-full pl-12 pr-4 py-3 text-lg border-none focus:outline-none focus:ring-0"
              placeholder="What do you want to learn?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="py-8">
          <h2 className="text-xl font-semibold mb-6">Recommended</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
