import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Menu, X } from "lucide-react";
import { personalInfo } from "@/data";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <a href="#" className="flex items-center space-x-2">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              <span className="text-foreground">{personalInfo.name}</span>
              <span className="hidden sm:inline-block text-sm ml-2 font-normal text-muted-foreground">
                {personalInfo.title}
              </span>
            </h1>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              onClick={handleNavLinkClick}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              onClick={handleNavLinkClick}
            >
              About
            </a>
            <a 
              href="#experience" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              onClick={handleNavLinkClick}
            >
              Experience
            </a>
            <a 
              href="#skills" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              onClick={handleNavLinkClick}
            >
              Skills
            </a>
            <a 
              href="#jobs" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              onClick={handleNavLinkClick}
            >
              Jobs
            </a>
            <a 
              href="#services" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              onClick={handleNavLinkClick}
            >
              Services
            </a>
            <a 
              href="#blog" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              onClick={handleNavLinkClick}
            >
              Blog
            </a>
            <a 
              href="#contact" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              onClick={handleNavLinkClick}
            >
              Contact
            </a>
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
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
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-2 bg-background border-t border-border">
          <nav className="flex flex-col space-y-4 py-2">
            <a 
              href="#home" 
              className="text-foreground hover:text-primary transition-colors duration-200 py-2"
              onClick={handleNavLinkClick}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors duration-200 py-2"
              onClick={handleNavLinkClick}
            >
              About
            </a>
            <a 
              href="#experience" 
              className="text-foreground hover:text-primary transition-colors duration-200 py-2"
              onClick={handleNavLinkClick}
            >
              Experience
            </a>
            <a 
              href="#skills" 
              className="text-foreground hover:text-primary transition-colors duration-200 py-2"
              onClick={handleNavLinkClick}
            >
              Skills
            </a>
            <a 
              href="#jobs" 
              className="text-foreground hover:text-primary transition-colors duration-200 py-2"
              onClick={handleNavLinkClick}
            >
              Jobs
            </a>
            <a 
              href="#services" 
              className="text-foreground hover:text-primary transition-colors duration-200 py-2"
              onClick={handleNavLinkClick}
            >
              Services
            </a>
            <a 
              href="#blog" 
              className="text-foreground hover:text-primary transition-colors duration-200 py-2"
              onClick={handleNavLinkClick}
            >
              Blog
            </a>
            <a 
              href="#contact" 
              className="text-foreground hover:text-primary transition-colors duration-200 py-2"
              onClick={handleNavLinkClick}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
