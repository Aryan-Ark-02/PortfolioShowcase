import { useEffect, useRef } from "react";
import { skillCategories, expertiseAreas } from "@/data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BookOpen, User, Calendar } from "lucide-react";

const Skills = () => {
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
    <div className="py-20 bg-gradient-to-b from-background to-secondary dark:from-background dark:to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 dark:text-foreground/70">
            My technical proficiencies and specialized knowledge in AI/ML
          </p>
        </div>
        
        {/* Skills Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 border-b border-border pb-4 flex items-center">
                <BookOpen className="mr-3 text-primary" /> Technical Skills
              </h2>
              
              {/* Programming Languages & Scripting */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6 text-foreground/90">{skillCategories[0].name}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {skillCategories[0].skills.map((skill) => (
                    <div 
                      key={skill.id} 
                      className="flex flex-col items-center justify-center bg-secondary/40 dark:bg-secondary/20 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:bg-secondary/60 dark:hover:bg-secondary/40 transform hover:-translate-y-1"
                    >
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <span className="text-primary font-bold text-xl">{skill.name.charAt(0)}</span>
                      </div>
                      <span className="text-foreground/90 dark:text-foreground/90 font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Machine Learning & AI */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6 text-foreground/90">{skillCategories[1].name}</h3>
                <div className="space-y-5">
                  {skillCategories[1].skills.map((skill) => (
                    <div key={skill.id} className="bg-secondary/30 dark:bg-secondary/20 rounded-lg p-5 hover:bg-secondary/50 dark:hover:bg-secondary/30 transition-all duration-300 hover:shadow-md">
                      <span className="font-bold">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Deep Learning Technologies */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-foreground/90">{skillCategories[2].name}</h3>
                <div className="space-y-5">
                  {skillCategories[2].skills.map((skill) => (
                    <div key={skill.id} className="bg-secondary/30 dark:bg-secondary/20 rounded-lg p-5 hover:bg-secondary/50 dark:hover:bg-secondary/30 transition-all duration-300 hover:shadow-md">
                      <span className="font-bold">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Certifications & Education (Exactly 1500px wide) */}
            <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-[1500px] mx-auto">
              <h2 className="text-3xl font-bold mb-6 border-b border-border pb-4 flex items-center">
                <Calendar className="mr-3 text-primary" /> Certifications & Education
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-lg mb-2">EDUCATION</h3>
                  <ul className="list-disc ml-6 text-foreground/90">
                    <li>
                      Pursuing <b>Master of Technology</b> in <b>Artificial Intelligence and Machine Learning</b> from Birla Institute of Technology and Science, India, <b>2025 (perusing)</b>
                    </li>
                    <li>
                      <b>Bachelor of Engineering</b> in <b>Computer Science</b> from CKPCET, South Gujarat University, India, <b>2010</b>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">CERTIFICATIONS AND OTHER COURSES</h3>
                  <ul className="list-disc ml-6 text-foreground/90">
                    <li>Advanced Certification in Generative AI with Large Language Models</li>
                    <li>Introduction to Attention Models</li>
                    <li>Comprehensive Course on Product A/B Testing with an Interview Guide</li>
                    <li>Detailed Study in Time Series Analysis and Forecasting using Python</li>
                    <li>Extensive Training in Machine Learning for Data Analysis: Focusing on Regression and Forecasting</li>
                    <li>MLOps Fundamentals: Mastering CI/CD/CT Pipelines of ML with Azure</li>
                    <li>Microsoft's DAT203x Data Science and Machine Learning Essentials</li>
                    <li>Machine Learning Specialization by Coursera</li>
                    <li>In-depth Learning in Getting and Cleaning Data</li>
                    <li>The Data Scientist's Toolbox</li>
                    <li>Practical Machine Learning</li>
                    <li>Neural Networks and Deep Learning</li>
                    <li>R Programming</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-5 space-y-10 flex flex-col">
            {/* Large Language Models section */}
            <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 border-b border-border pb-4 flex items-center">
                <User className="mr-3 text-primary" /> {skillCategories[3].name}
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {skillCategories[3].skills.map((skill) => (
                  <div key={skill.id} className="bg-secondary/30 dark:bg-secondary/20 rounded-lg p-5 hover:bg-secondary/50 dark:hover:bg-secondary/30 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mr-3">
                        <i className="fas fa-brain text-primary dark:text-primary"></i>
                      </div>
                      <h5 className="font-bold text-lg">{skill.name}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Expertise areas */}
            <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 border-b border-border pb-4">Specialized Areas</h2>
              
              <div className="flex flex-wrap gap-3">
                {expertiseAreas.map((area, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-secondary/30 dark:bg-secondary/20 rounded-full text-base transition-all duration-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background cursor-pointer"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Testimonial Card (ensure no overlap) */}
            <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 border-b border-border pb-4">Client Testimonial</h2>
              
              <div className="relative">
                <div className="text-6xl text-primary/20 absolute top-0 left-0">"</div>
                <blockquote className="text-lg italic text-foreground/80 relative z-10 pl-4 mt-4">
                  Puneet's strategic guidance helped us transform our approach to AI. His expertise in generative models was instrumental in launching our new product.
                </blockquote>
                <div className="text-6xl text-primary/20 absolute bottom-0 right-0">"</div>
              </div>
              
              <div className="flex items-center mt-6">
                <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/32.jpg" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-foreground/60">CTO, TechVision Inc.</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/services">
                  <Button className="w-full group">
                    Explore My Services <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 bg-primary/5 dark:bg-primary/10 p-8 rounded-xl">
          <div>
            <h3 className="text-2xl font-bold mb-4">Need Help With Your AI Project?</h3>
            <p className="text-foreground/80 mb-6">
              Ready to leverage my expertise for your organization? Let's discuss how my skills can accelerate your AI initiatives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button>Contact Me</Button>
              </Link>
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Schedule Consultation</Button>
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
              alt="Collaboration" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;