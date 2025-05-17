import { useState } from "react";
import { experiences } from "@/data";
import { ArrowRight, CalendarIcon, BuildingIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Experience = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Get all projects from all experiences
  const allProjects = experiences.flatMap(exp => exp.projects || []);
  
  // Get unique categories
  const categories = Array.from(new Set(allProjects.map(project => project.category)));
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);

  return (
    <div className="py-20 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience & Projects</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 dark:text-foreground/70">
            My professional journey and key achievements in AI/ML leadership
          </p>
        </div>
        
        {/* Career Timeline */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">Career Progression</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-primary dark:bg-primary transform md:translate-x-px"></div>
            
            {/* Timeline entries */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:text-left md:pl-12'} bg-card dark:bg-card rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
                    <div className={`hidden md:block absolute ${index % 2 === 0 ? 'right-0 transform translate-x-6' : 'left-0 transform -translate-x-6'} top-6 w-12 h-12 rounded-full bg-primary dark:bg-primary flex items-center justify-center z-10`}>
                      <BuildingIcon className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">{exp.position}</h3>
                    <p className="text-primary dark:text-primary font-medium text-lg">{exp.company}</p>
                    <div className="flex items-center mt-2 mb-4 justify-start">
                      <CalendarIcon className="w-4 h-4 mr-2 text-foreground/60" />
                      <p className="text-foreground/60 dark:text-foreground/60">{exp.period}</p>
                    </div>
                    <p className="text-foreground/80 dark:text-foreground/80">
                      {exp.description}
                    </p>
                    
                    <div className="mt-4">
                      <Button variant="link" className="p-0 h-auto text-primary group">
                        View Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                  <div className={`${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:col-start-1 md:row-start-1'}`}>
                    <div className={`md:hidden absolute left-0 top-0 w-8 h-8 rounded-full bg-primary dark:bg-primary flex items-center justify-center transform -translate-x-4`}>
                      <BuildingIcon className="text-white w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <a href="/Puneet_Sinha_CV.pdf" download className="btn-secondary flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Download Full CV
            </a>
            <Link href="/contact">
              <Button className="ml-4">
                Let's Connect
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Project Filters */}
        <div className="mt-20 mb-12">
          <h2 className="text-2xl font-bold text-center mb-12">Key Projects</h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button 
              className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                activeFilter === "all" 
                  ? "bg-primary dark:bg-primary text-white dark:text-background shadow-md" 
                  : "bg-secondary dark:bg-secondary text-foreground dark:text-foreground hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All Projects
            </button>
            
            {categories.map(category => (
              <button 
                key={category}
                className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                  activeFilter === category 
                    ? "bg-primary dark:bg-primary text-white dark:text-background shadow-md" 
                    : "bg-secondary dark:bg-secondary text-foreground dark:text-foreground hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background"
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-card dark:bg-card rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-48 overflow-hidden">
                {/* Project image based on category */}
                {project.category === "GenAI" && (
                  <img 
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                )}
                {project.category === "LLMs" && (
                  <img 
                    src="https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                )}
                {project.category === "ML" && (
                  <img 
                    src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                )}
                {project.category === "CV" && (
                  <img 
                    src="https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                )}
                {project.category === "NLP" && (
                  <img 
                    src="https://pixabay.com/get/g602a076ea878039eab2a115b0478c4296d06679ac53847dba9ac57653039f06b56bf83eb1bea4702144ffa1150f6262774d5a9ab33d3ddb45f2460b1a9d3f18d_1280.jpg" 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                  <span className="text-foreground/60 dark:text-foreground/60 text-sm">
                    {project.year}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                
                <p className="text-foreground/80 dark:text-foreground/80 mb-4">
                  {project.situation && project.situation.length > 120 
                    ? `${project.situation.substring(0, 120)}...` 
                    : project.situation}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-secondary-foreground/5 dark:bg-secondary-foreground/5 text-foreground/80 dark:text-foreground/80 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 group">
                  View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-secondary/30 dark:bg-secondary/20 rounded-xl p-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Have a Project in Mind?</h3>
              <p className="text-foreground/80 mb-6">
                I'm always interested in new opportunities and collaborations. Let's discuss how my expertise can help your organization leverage AI for growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button>Get in Touch</Button>
                </Link>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Schedule a Call</Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
                alt="Collaboration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;