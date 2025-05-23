import { personalInfo } from "@/data";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen relative flex items-center bg-gradient-to-br from-background to-secondary dark:from-background dark:to-secondary/20 pt-16 lg:pt-0">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-primary opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-400 dark:bg-blue-600 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 animate-[fadeIn_1s_ease-in-out]">
            <div className="space-y-2">
              <p className="text-primary dark:text-primary font-medium">AI/ML Leader & Innovator</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{personalInfo.name}</h1>
              <p className="text-xl md:text-2xl text-foreground/80 dark:text-foreground/80">
                AI Innovation & Leadership Expert
              </p>
            </div>
            
            <p className="text-lg text-foreground/70 dark:text-foreground/70 max-w-2xl">
              {personalInfo.about}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="contact" 
                className="btn-primary"
              >
                Book Consultation
              </a>
              <a 
                href="services" 
                className="btn-secondary"
              >
                Explore Services
              </a>
              <a 
                href="about" 
                className="btn-tertiary"
              >
                Learn More
              </a>
            </div>
            
            <div className="flex gap-6 pt-6">
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 dark:text-foreground/60 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 dark:text-foreground/60 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a 
                href={personalInfo.kaggle} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 dark:text-foreground/60 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Kaggle"
              >
                <i className="fab fa-kaggle text-2xl"></i>
              </a>
              <a 
                href={personalInfo.stackoverflow} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 dark:text-foreground/60 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Stack Overflow"
              >
                <i className="fab fa-stack-overflow text-2xl"></i>
              </a>
              <a 
                href={personalInfo.huggingface} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 dark:text-foreground/60 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="HuggingFace"
              >
                <i className="fas fa-cube text-2xl"></i>
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            {/* Professional headshot */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background dark:border-background shadow-xl">
              <img 
                src="https://media.licdn.com/dms/image/v2/D4D03AQHqSwYXJbvpkw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1694860038854?e=1753315200&v=beta&t=h9jvdCxcVKOPsjh5JyocoN39678xJ8rIxJRNdD_XkuI" 
                alt={`${personalInfo.name} - AI/ML Leader`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
