import { Link } from "wouter";
import { personalInfo } from "@/data";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card dark:bg-card mt-auto pt-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">{personalInfo.name}</h3>
            <p className="text-foreground/70 dark:text-foreground/70 mb-4">
              Expert AI/ML leader helping organizations leverage artificial intelligence for growth and innovation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-lg"></i>
              </a>
              <a
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors duration-200"
                aria-label="Medium"
              >
                <i className="fab fa-medium text-lg"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link 
                  href="/services"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/experience"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link 
                  href="/jobs"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  Job Board
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-foreground/70 hover:text-primary transition-colors duration-200">
                <a href="/services">AI Strategy Consulting</a>
              </li>
              <li className="text-foreground/70 hover:text-primary transition-colors duration-200">
                <a href="/services">ML Solution Development</a>
              </li>
              <li className="text-foreground/70 hover:text-primary transition-colors duration-200">
                <a href="/services">GenAI Implementation</a>
              </li>
              <li className="text-foreground/70 hover:text-primary transition-colors duration-200">
                <a href="/services">Data Science Workshops</a>
              </li>
              <li className="text-foreground/70 hover:text-primary transition-colors duration-200">
                <a href="/services">AI Ethics & Governance</a>
              </li>
              <li className="text-foreground/70 hover:text-primary transition-colors duration-200">
                <a href="/services">Technical Due Diligence</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <span className="text-foreground/70">Bangalore, Karnataka, India</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <a 
                  href="mailto:puneet.sinha@example.com"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  puneet.sinha@example.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <a 
                  href="tel:+919876543210"
                  className="text-foreground/70 hover:text-primary transition-colors duration-200"
                >
                  +91 9876 543 210
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors duration-200 text-sm font-medium"
              >
                Schedule a Meeting
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border py-6 text-center text-foreground/60">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-primary transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-primary transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-sm hover:text-primary transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;