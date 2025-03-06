import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Search, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  onSearchClick?: () => void;
  isAuthenticated?: boolean;
  username?: string;
}

const Navbar = ({ onSearchClick, isAuthenticated = false, username }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const schools = [
    { title: "Artificial Intelligence", path: "/learn/ai" },
    { title: "Autonomous Systems", path: "/learn/autonomous-systems" },
    { title: "Business", path: "/learn/business" },
    { title: "Career Resources", path: "/learn/career-resources" },
    { title: "Cloud Computing", path: "/learn/cloud-computing" },
    { title: "Cybersecurity", path: "/learn/cybersecurity" },
    { title: "Data Science", path: "/learn/data-science" },
    { title: "Executive Leadership", path: "/learn/executive-leadership" },
    { title: "Product Management", path: "/learn/product-management" },
    { title: "Programming", path: "/learn/programming" },
  ];

  const popularCourses = [
    "Generative AI",
    "Data Scientist",
    "Data Analyst",
    "Data Engineering with AWS",
    "AI Programming with Python",
  ];

  const introCourses = [
    "Introduction to Python",
    "Introduction to Programming",
    "Introduction to SQL",
    "Programming for Data Science with Python",
    "Business Analytics",
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirects to index page
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-dark">LearnX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  Learn <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[800px] grid grid-cols-3 gap-4 p-4">
                <div>
                  <h3 className="font-semibold mb-2">Schools</h3>
                  <div className="space-y-2">
                    {schools.map((school) => (
                      <DropdownMenuItem key={school.path}>
                        <Link 
                          to={school.path}
                          className="w-full hover:text-primary transition-colors"
                        >
                          {school.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Popular</h3>
                  <div className="space-y-2">
                    {popularCourses.map((course) => (
                      <DropdownMenuItem key={course}>
                        <span className="hover:text-primary transition-colors">
                          {course}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Intro Courses</h3>
                  <div className="space-y-2">
                    {introCourses.map((course) => (
                      <DropdownMenuItem key={course}>
                        <span className="hover:text-primary transition-colors">
                          {course}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div 
              className="relative cursor-pointer"
              onClick={onSearchClick}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
              />
            </div>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{username || 'User'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/performance')}>
                    Performance
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/signin')} className="mr-2">
                  Log In
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Join for Free
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="space-y-2">
                    <h3 className="font-semibold px-2">Schools</h3>
                    {schools.map((school) => (
                      <Link
                        key={school.path}
                        to={school.path}
                        className="block px-2 py-2 text-gray-600 hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {school.title}
                      </Link>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="What do you want to learn?"
                      className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200"
                    />
                  </div>
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <Button variant="outline" onClick={() => { navigate('/profile'); setIsOpen(false); }} className="w-full">
                        Profile
                      </Button>
                      <Button variant="outline" onClick={() => { navigate('/performance'); setIsOpen(false); }} className="w-full">
                        Performance
                      </Button>
                      <Button variant="outline" onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full">
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => { navigate('/signin'); setIsOpen(false); }} className="w-full">
                        Log In
                      </Button>
                      <Button onClick={() => { navigate('/signup'); setIsOpen(false); }} className="w-full">
                        Join for Free
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;