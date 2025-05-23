import { personalInfo, highlights } from "@/data";
import { experiences } from "@/data";
import { CheckCircle, ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-background to-secondary dark:from-background dark:to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">About Me</h2>
          <div className="section-divider"></div>
          <p className="mt-4 max-w-2xl mx-auto">My professional journey and philosophy</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            {/* Professional photo in office environment */}
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://media.licdn.com/dms/image/v2/D4D03AQHqSwYXJbvpkw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1694860038854?e=1753315200&v=beta&t=h9jvdCxcVKOPsjh5JyocoN39678xJ8rIxJRNdD_XkuI" 
                alt="Puneet Sinha in professional setting" 
                className="w-full h-auto max-w-lg"
              />
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Professional Summary</h3>
              <p className="text-foreground/80 dark:text-foreground/80 leading-relaxed">
                As a Data Science Leader with over 15 years of experience, I specialize in developing advanced AI/ML solutions that drive tangible business value. My expertise spans GenAI, Deep Learning, and ML technologies, with a focus on innovative applications that solve complex business challenges.
              </p>
              <p className="text-foreground/80 dark:text-foreground/80 leading-relaxed mt-4">
                I have successfully led teams in developing cutting-edge Agentic AI systems, conversational AI assistants, and trust & safety frameworks. My approach combines technical excellence with strategic business acumen to deliver solutions that not only leverage the latest AI innovations but also align with organizational goals.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Key Highlights</h3>
              <ul className="space-y-3">
                {highlights.slice(0, 5).map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary dark:text-primary mr-2 mt-1 flex-shrink-0" />
                    <span className="text-foreground/80 dark:text-foreground/80">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">My Philosophy</h3>
              <p className="text-foreground/80 dark:text-foreground/80 leading-relaxed">
                I believe in creating AI solutions that are not just technically sound but also ethically responsible and business-focused. My approach centers on developing systems that enhance human capabilities rather than replacing them, always with an eye toward practical application and measurable impact.
              </p>
            </div>
            
            <div className="pt-4">
              <a href="#experience" className="btn-primary inline-flex items-center">
                View My Experience <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Career Timeline */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">Career Progression</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary dark:bg-primary transform md:translate-x-px"></div>
            
            {/* Timeline entries */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:text-left md:pl-12'}`}>
                    <div className={`hidden md:block absolute ${index % 2 === 0 ? 'right-0 transform translate-x-2' : 'left-0 transform -translate-x-2'} top-0 w-4 h-4 rounded-full bg-primary dark:bg-primary`}></div>
                    <h4 className="text-xl font-bold">{exp.position}</h4>
                    <p className="text-primary dark:text-primary font-medium">{exp.company}</p>
                    <p className="text-foreground/60 dark:text-foreground/60">{exp.period}</p>
                  </div>
                  <div className={`${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:col-start-1 md:row-start-1'}`}>
                    <div className={`md:hidden absolute left-0 top-0 w-4 h-4 rounded-full bg-primary dark:bg-primary transform -translate-x-2`}></div>
                    <p className="text-foreground/80 dark:text-foreground/80">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
