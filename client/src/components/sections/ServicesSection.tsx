import { services, testimonials } from "@/data";

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-gradient-to-b from-background to-secondary dark:from-background dark:to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Services & Consultation</h2>
          <div className="section-divider"></div>
          <p className="mt-4 max-w-2xl mx-auto">Professional AI services and consulting offerings</p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map(service => (
            <div 
              key={service.id} 
              className="bg-card dark:bg-card rounded-xl p-8 shadow-lg transition-theme transform hover:-translate-y-1 hover:shadow-xl duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary">
                  <i className={`fas ${service.icon} text-2xl`}></i>
                </span>
                
                {service.id === 1 && (
                  <span className="px-3 py-1 bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary rounded-full text-xs font-medium">
                    Popular
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              
              <p className="text-foreground/80 dark:text-foreground/80 mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check text-primary dark:text-primary mr-2 mt-1"></i>
                    <span className="text-foreground/80 dark:text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="text-right">
                <span className="text-3xl font-bold text-primary dark:text-primary">{service.price.split('/')[0]}</span>
                <span className="text-foreground/60 dark:text-foreground/60">{service.price.includes('/') ? `/${service.price.split('/')[1]}` : ''}</span>
              </div>
              
              <a href="#contact" className="block w-full mt-4 text-center btn-primary">
                Book Now
              </a>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Client Testimonials</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div 
                key={testimonial.id} 
                className="bg-card dark:bg-card rounded-xl p-6 shadow-md transition-theme"
              >
                <div className="flex justify-center mb-4">
                  <div className="text-primary dark:text-primary">
                    {Array.from({ length: Math.floor(testimonial.rating) }).map((_, index) => (
                      <i key={index} className="fas fa-star"></i>
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <i className="fas fa-star-half-alt"></i>
                    )}
                  </div>
                </div>
                
                <p className="text-center italic mb-6 text-foreground/80 dark:text-foreground/80">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="text-center">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-foreground/60 dark:text-foreground/60">
                    {testimonial.position}, {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-secondary dark:bg-secondary rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
          <p className="mb-6 max-w-2xl mx-auto text-foreground/80 dark:text-foreground/80">
            I also offer tailored AI/ML consulting services for specific business challenges. Let's discuss how I can help your organization leverage AI for growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn-primary">
              Contact Me
            </a>
            <a 
              href="https://calendly.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
