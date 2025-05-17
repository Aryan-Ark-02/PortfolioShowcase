import { useState } from "react";
import { experiences } from "@/data";
import { ArrowRight } from "lucide-react";

const ExperienceSection = () => {
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
    <section id="experience" className="py-16 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Experience & Projects</h2>
          <div className="section-divider"></div>
          <p className="mt-4 max-w-2xl mx-auto">Featured work and key achievements</p>
        </div>
        
        {/* Project Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeFilter === "all" 
                ? "bg-primary dark:bg-primary text-white dark:text-background" 
                : "bg-secondary dark:bg-secondary text-foreground dark:text-foreground hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All Projects
          </button>
          
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeFilter === category 
                  ? "bg-primary dark:bg-primary text-white dark:text-background" 
                  : "bg-secondary dark:bg-secondary text-foreground dark:text-foreground hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background"
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-secondary dark:bg-secondary rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
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
                
                <button className="text-primary dark:text-primary font-medium inline-flex items-center hover:underline">
                  View details <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <a href="#contact" className="btn-primary inline-flex items-center">
            Discuss Your Project <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
