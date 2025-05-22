import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation } from "wouter";
import { Moon, Sun, Menu, X, UserCircle } from "lucide-react";
import { personalInfo } from "@/data";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Update navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Check if link is active
  const isActive = (path: string) => {
    return location === path ? "text-primary font-medium" : "text-foreground hover:text-primary";
  };

  return (
    <header 
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              <span className="text-foreground">{personalInfo.name}</span>
              <span className="hidden sm:inline-block text-sm ml-2 font-normal text-muted-foreground">
                {personalInfo.title}
              </span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`${isActive("/")} transition-colors duration-200`}
              onClick={handleNavLinkClick}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`${isActive("/about")} transition-colors duration-200`}
              onClick={handleNavLinkClick}
            >
              About
            </Link>
            <Link 
              href="/experience" 
              className={`${isActive("/experience")} transition-colors duration-200`}
              onClick={handleNavLinkClick}
            >
              Experience
            </Link>
            <Link 
              href="/skills" 
              className={`${isActive("/skills")} transition-colors duration-200`}
              onClick={handleNavLinkClick}
            >
              Skills
            </Link>
            <Link 
              href="/jobs" 
              className={`${isActive("/jobs")} transition-colors duration-200`}
              onClick={handleNavLinkClick}
            >
              Jobs
            </Link>
            <Link 
              href="/services" 
              className={`${isActive("/services")} transition-colors duration-200`}
              onClick={handleNavLinkClick}
            >
              Services
            </Link>
            <Link 
              href="/blog" 
              className={`${isActive("/blog")} transition-colors duration-200`}
              onClick={handleNavLinkClick}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={`${isActive("/contact")} transition-colors duration-200`}
              onClick={handleNavLinkClick}
            >
              Contact
            </Link>
            <Link 
              href="/courses" 
              className={`${isActive("/courses")} transition-colors duration-200`}
              onClick={handleNavLinkClick}
            >
              Courses
            </Link>
          </nav>

          {/* Theme Toggle, Auth and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Link href="/login">
                <Button variant="outline" size="sm" className="mr-2 px-4">
                  <UserCircle className="mr-1 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="px-4">Sign Up</Button>
              </Link>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-2 bg-background border-t border-border">
          <nav className="flex flex-col space-y-3 py-2">
            <Link 
              href="/" 
              className={`${isActive("/")} transition-colors duration-200 py-2`}
              onClick={handleNavLinkClick}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`${isActive("/about")} transition-colors duration-200 py-2`}
              onClick={handleNavLinkClick}
            >
              About
            </Link>
            <Link 
              href="/experience" 
              className={`${isActive("/experience")} transition-colors duration-200 py-2`}
              onClick={handleNavLinkClick}
            >
              Experience
            </Link>
            <Link 
              href="/skills" 
              className={`${isActive("/skills")} transition-colors duration-200 py-2`}
              onClick={handleNavLinkClick}
            >
              Skills
            </Link>
            <Link 
              href="/jobs" 
              className={`${isActive("/jobs")} transition-colors duration-200 py-2`}
              onClick={handleNavLinkClick}
            >
              Jobs
            </Link>
            <Link 
              href="/services" 
              className={`${isActive("/services")} transition-colors duration-200 py-2`}
              onClick={handleNavLinkClick}
            >
              Services
            </Link>
            <Link 
              href="/blog" 
              className={`${isActive("/blog")} transition-colors duration-200 py-2`}
              onClick={handleNavLinkClick}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={`${isActive("/contact")} transition-colors duration-200 py-2`}
              onClick={handleNavLinkClick}
            >
              Contact
            </Link>
            <Link 
              href="/courses" 
              className={`${isActive("/courses")} transition-colors duration-200 py-2`}
              onClick={handleNavLinkClick}
            >
              Courses
            </Link>
            
            <div className="flex space-x-2 pt-2 border-t border-border mt-2">
              <Link href="/login" className="w-1/2">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link href="/signup" className="w-1/2">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
