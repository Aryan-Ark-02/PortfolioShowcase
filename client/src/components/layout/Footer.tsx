import { personalInfo } from "@/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white dark:text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">{personalInfo.name}</h3>
            <p className="text-gray-300 mb-4">
              AI/ML Leader specializing in GenAI, Deep Learning, and ML technologies with 15+ years of experience.
            </p>
            <div className="flex space-x-4">
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a 
                href={personalInfo.kaggle} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Kaggle"
              >
                <i className="fab fa-kaggle text-xl"></i>
              </a>
              <a 
                href={personalInfo.stackoverflow} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Stack Overflow"
              >
                <i className="fab fa-stack-overflow text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
              </li>
              <li>
                <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#blog" className="text-gray-300 hover:text-white transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">AI Strategy Consulting</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">GenAI Implementation</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">LLM Fine-tuning</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">Trust & Safety AI</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">AI Leadership Workshops</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-envelope text-primary-foreground mr-3 mt-1"></i>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-primary-foreground mr-3 mt-1"></i>
                <a 
                  href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary-foreground mr-3 mt-1"></i>
                <span className="text-gray-300">{personalInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
