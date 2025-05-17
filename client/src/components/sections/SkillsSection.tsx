import { useEffect, useRef } from "react";
import { skillCategories, expertiseAreas } from "@/data";

const SkillsSection = () => {
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animate progress bars when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLDivElement;
            const width = target.dataset.progress || "0";
            target.style.width = `${width}%`;
          }
        });
      },
      { threshold: 0.1 }
    );

    progressRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      progressRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="skills" className="py-16 bg-gradient-to-b from-secondary to-background dark:from-secondary/30 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Skills & Expertise</h2>
          <div className="section-divider"></div>
          <p className="mt-4 max-w-2xl mx-auto">Technical proficiencies and specialized knowledge</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
            
            {/* Skill Categories */}
            <div className="space-y-8">
              {skillCategories.slice(0, 3).map((category) => (
                <div key={category.id}>
                  <h4 className="text-lg font-medium mb-4">{category.name}</h4>
                  
                  {category.id === 1 ? (
                    // Programming Languages & Scripting - grid layout
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {category.skills.map((skill) => (
                        <div 
                          key={skill.id} 
                          className="flex items-center justify-center bg-card dark:bg-card rounded-lg p-3 transition-theme"
                        >
                          <span className="text-foreground/80 dark:text-foreground/80 font-medium">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Other categories - progress bars
                    <div className="space-y-4">
                      {category.skills.map((skill, index) => (
                        <div key={skill.id}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-foreground/70">{skill.level}%</span>
                          </div>
                          <div className="progress-bar">
                            <div 
                              ref={el => progressRefs.current[index] = el}
                              className="progress-value transition-all duration-1000 ease-out" 
                              style={{ width: '0%' }} 
                              data-progress={skill.level}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Areas of Expertise */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Areas of Expertise</h3>
            
            {/* Large Language Models section */}
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-4">{skillCategories[3].name}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCategories[3].skills.map((skill) => (
                  <div key={skill.id} className="bg-card dark:bg-card rounded-lg p-5 shadow">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-brain text-primary dark:text-primary text-xl mr-3"></i>
                      <h5 className="font-medium">{skill.name}</h5>
                    </div>
                    <div className="w-full bg-secondary-foreground/10 dark:bg-secondary-foreground/10 rounded-full h-1.5">
                      <div 
                        className="bg-primary dark:bg-primary h-1.5 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: '0%' }}
                        ref={el => progressRefs.current.push(el)}
                        data-progress={skill.level}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Expertise areas grid */}
            <div>
              <h4 className="text-lg font-medium mb-4">Specialized Areas</h4>
              <div className="flex flex-wrap gap-3">
                {expertiseAreas.map((area, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-card dark:bg-card rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
