import { services, testimonials } from "@/data";
import { Link } from "wouter";
import { ArrowRight, Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Services = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="py-20 bg-gradient-to-b from-background to-secondary dark:from-background dark:to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Services</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 dark:text-foreground/70">
            Expert AI/ML consulting and development services to drive your digital transformation
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-card dark:bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-border/5"
            >
              <div className="h-3 bg-primary w-full"></div>
              <div className="p-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl">
                    {service.icon === "brain" && "🧠"}
                    {service.icon === "chart" && "📊"}
                    {service.icon === "robot" && "🤖"}
                    {service.icon === "data" && "📈"}
                    {service.icon === "security" && "🛡️"}
                    {service.icon === "cloud" && "☁️"}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                
                <p className="text-foreground/80 dark:text-foreground/80 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 dark:text-foreground/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-border pt-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold">{service.price}</span>
                      {service.price !== "Custom Quote" && (
                        <span className="text-foreground/60 text-sm">/project</span>
                      )}
                    </div>
                    <Button variant="outline" className="group">
                      Enquire <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">My Consulting Process</h2>
            <p className="text-foreground/80 dark:text-foreground/80 max-w-2xl mx-auto">
              A structured approach to help you achieve your AI/ML goals efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-card dark:bg-card rounded-xl p-6 text-center relative hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300">1</div>
              <div className="hidden md:block absolute top-16 right-0 w-16 h-2 bg-primary/30 transform translate-x-8"></div>
              <h3 className="text-lg font-bold mb-2">Discovery</h3>
              <p className="text-foreground/70 dark:text-foreground/70">
                Understanding your business needs, challenges, and goals for the AI solution.
              </p>
            </div>
            
            <div className="bg-card dark:bg-card rounded-xl p-6 text-center relative hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300">2</div>
              <div className="hidden md:block absolute top-16 right-0 w-16 h-2 bg-primary/30 transform translate-x-8"></div>
              <h3 className="text-lg font-bold mb-2">Planning</h3>
              <p className="text-foreground/70 dark:text-foreground/70">
                Developing a strategic roadmap with clear milestones and deliverables.
              </p>
            </div>
            
            <div className="bg-card dark:bg-card rounded-xl p-6 text-center relative hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300">3</div>
              <div className="hidden md:block absolute top-16 right-0 w-16 h-2 bg-primary/30 transform translate-x-8"></div>
              <h3 className="text-lg font-bold mb-2">Execution</h3>
              <p className="text-foreground/70 dark:text-foreground/70">
                Hands-on implementation, model development, and integration with existing systems.
              </p>
            </div>
            
            <div className="bg-card dark:bg-card rounded-xl p-6 text-center relative hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300">4</div>
              <h3 className="text-lg font-bold mb-2">Evaluation</h3>
              <p className="text-foreground/70 dark:text-foreground/70">
                Measuring impact, refining models, and planning for future enhancements.
              </p>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-16 bg-card dark:bg-card rounded-xl p-8 relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-foreground/80 dark:text-foreground/80 max-w-2xl mx-auto">
              Hear what my clients have to say about my services and impact.
            </p>
          </div>
          
          <div className="relative px-12">
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-background dark:bg-background rounded-full shadow-md hover:bg-secondary dark:hover:bg-secondary transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-secondary/30 dark:bg-secondary/10 p-8 rounded-xl">
                      <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      
                      <blockquote className="text-lg italic mb-6">
                        "{testimonial.testimonial}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div className="mr-4 w-12 h-12 rounded-full overflow-hidden bg-primary/10">
                          <img 
                            src={`https://randomuser.me/api/portraits/${testimonial.id % 2 === 0 ? 'women' : 'men'}/${testimonial.id + 30}.jpg`} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <div className="font-bold">{testimonial.name}</div>
                          <div className="text-sm text-foreground/60">
                            {testimonial.position}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-background dark:bg-background rounded-full shadow-md hover:bg-secondary dark:hover:bg-secondary transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-primary' : 'bg-foreground/20'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-foreground/80 dark:text-foreground/80 max-w-2xl mx-auto">
              Answers to common questions about my services and working process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card dark:bg-card p-6 rounded-xl hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3">What industries do you specialize in?</h3>
              <p className="text-foreground/80 dark:text-foreground/80">
                I have extensive experience in healthcare, finance, retail, and manufacturing, but my expertise in AI/ML is applicable across industries. Each engagement is customized to the specific industry context.
              </p>
            </div>
            
            <div className="bg-card dark:bg-card p-6 rounded-xl hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3">How long does a typical project take?</h3>
              <p className="text-foreground/80 dark:text-foreground/80">
                Project timelines vary based on complexity. Simple implementations might take 1-2 months, while comprehensive enterprise solutions can span 4-6 months. During our initial consultation, I'll provide a detailed timeline.
              </p>
            </div>
            
            <div className="bg-card dark:bg-card p-6 rounded-xl hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3">Do you offer ongoing support after project completion?</h3>
              <p className="text-foreground/80 dark:text-foreground/80">
                Yes, I offer various support packages that include model monitoring, retraining, and technical assistance. These can be customized based on your needs and can be discussed during the project planning phase.
              </p>
            </div>
            
            <div className="bg-card dark:bg-card p-6 rounded-xl hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3">How do you handle data privacy and security?</h3>
              <p className="text-foreground/80 dark:text-foreground/80">
                I adhere to strict data security protocols and compliance standards (GDPR, HIPAA, etc.). All client data is protected through encryption, secure access controls, and I can work within your security infrastructure.
              </p>
            </div>
            
            <div className="bg-card dark:bg-card p-6 rounded-xl hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3">What is your pricing model?</h3>
              <p className="text-foreground/80 dark:text-foreground/80">
                I offer flexible pricing models including project-based, hourly consulting, and retainer arrangements. Pricing depends on the project scope, complexity, and resource requirements. Contact me for a customized quote.
              </p>
            </div>
            
            <div className="bg-card dark:bg-card p-6 rounded-xl hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3">Can you work with my existing tech stack?</h3>
              <p className="text-foreground/80 dark:text-foreground/80">
                Yes, I'm experienced in integrating AI solutions with various tech stacks including AWS, Azure, Google Cloud, and on-premises infrastructure. I'll work with your team to ensure seamless integration with existing systems.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-foreground/80 dark:text-foreground/80 mb-6">
              Have more questions? Feel free to reach out for a consultation.
            </p>
            <Link href="/contact">
              <Button>Contact Me</Button>
            </Link>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-primary/10 dark:bg-primary/5 rounded-xl p-8 lg:p-12 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-primary/10 dark:bg-primary/5 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-primary/10 dark:bg-primary/5 transform translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
            <p className="text-lg text-foreground/80 dark:text-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how my services can help your organization leverage the power of AI/ML to drive growth and innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  Schedule a Free Consultation
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;