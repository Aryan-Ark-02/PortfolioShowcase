import { personalInfo, highlights } from "@/data";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary dark:from-background dark:to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 dark:text-foreground/70">
            My professional journey and philosophy in AI/ML leadership
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            {/* Professional photo in office environment */}
            <div className="relative rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-105 duration-300">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                alt="Puneet Sinha in professional setting" 
                className="w-full h-auto max-w-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <p className="font-bold text-xl">{personalInfo.name}</p>
                  <p className="text-white/80">{personalInfo.title}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-card dark:bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 border-b border-border pb-4">Professional Summary</h2>
              <p className="text-foreground/80 dark:text-foreground/80 leading-relaxed text-lg">
                As a Data Science Leader with over 15 years of experience, I specialize in developing advanced AI/ML solutions that drive tangible business value. My expertise spans GenAI, Deep Learning, and ML technologies, with a focus on innovative applications that solve complex business challenges.
              </p>
              <p className="text-foreground/80 dark:text-foreground/80 leading-relaxed mt-4 text-lg">
                I have successfully led teams in developing cutting-edge Agentic AI systems, conversational AI assistants, and trust & safety frameworks. My approach combines technical excellence with strategic business acumen to deliver solutions that not only leverage the latest AI innovations but also align with organizational goals.
              </p>
              
              <div className="mt-8">
                <Link href="/experience">
                  <Button className="group">
                    View My Experience <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="ml-4">
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-card dark:bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 border-b border-border pb-4">Key Highlights</h2>
              <ul className="space-y-4">
                {highlights.slice(0, 5).map((highlight, index) => (
                  <li key={index} className="flex items-start bg-secondary/30 dark:bg-secondary/20 p-4 rounded-lg hover:bg-secondary/50 transition-colors duration-200">
                    <CheckCircle className="w-6 h-6 text-primary dark:text-primary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-foreground/80 dark:text-foreground/80">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-card dark:bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 border-b border-border pb-4">My Philosophy</h2>
              <p className="text-foreground/80 dark:text-foreground/80 leading-relaxed text-lg">
                I believe in creating AI solutions that are not just technically sound but also ethically responsible and business-focused. My approach centers on developing systems that enhance human capabilities rather than replacing them, always with an eye toward practical application and measurable impact.
              </p>
              
              <div className="mt-8">
                <Link href="/services">
                  <Button className="group">
                    Explore My Services <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="ml-4">
                    Schedule a Consultation
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;