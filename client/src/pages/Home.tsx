import HeroSection from "@/components/sections/HeroSection";
import QuickOverview from "@/components/sections/QuickOverview";
import { Link } from "wouter";
import { ArrowRight, Calendar, Briefcase, Brain, Code, Book, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, experiences, services, blogPosts } from "@/data";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Quick Overview */}
      <QuickOverview />
      
      {/* About Summary */}
      <section className="py-16 bg-background dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">About Me</h2>
              <div className="w-16 h-1 bg-primary mb-4"></div>
              <p className="max-w-lg text-foreground/80">
                As a Data Science Leader with over 15 years of experience, 
                I specialize in developing advanced AI/ML solutions that drive tangible business value.
              </p>
            </div>
            <Link href="/about">
              <Button className="group">
                Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Experience Summary */}
      <section className="py-16 bg-secondary/20 dark:bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Experience</h2>
              <div className="w-16 h-1 bg-primary mb-4"></div>
              <p className="max-w-lg text-foreground/80">
                My professional journey across leading organizations in the AI/ML field.
              </p>
            </div>
            <Link href="/experience">
              <Button className="group">
                View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.slice(0, 3).map((exp) => (
              <div key={exp.id} className="bg-card dark:bg-card p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-xl mb-1">{exp.position}</h3>
                <p className="text-primary mb-2">{exp.company}</p>
                <p className="text-sm text-foreground/60 mb-3">{exp.period}</p>
                <p className="text-foreground/80 line-clamp-3">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Summary */}
      <section className="py-16 bg-background dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Services</h2>
              <div className="w-16 h-1 bg-primary mb-4"></div>
              <p className="max-w-lg text-foreground/80">
                Professional AI/ML consulting and development services I offer.
              </p>
            </div>
            <Link href="/services">
              <Button className="group">
                All Services <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="bg-card dark:bg-card p-6 rounded-xl shadow-md border-t-4 border-primary">
                <div className="text-3xl mb-4">
                  {service.icon === "brain" && "🧠"}
                  {service.icon === "chart" && "📊"}
                  {service.icon === "robot" && "🤖"}
                  {service.icon === "data" && "📈"}
                  {service.icon === "security" && "🛡️"}
                  {service.icon === "cloud" && "☁️"}
                </div>
                <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-foreground/80 line-clamp-3 mb-4">{service.description}</p>
                <p className="font-bold text-primary">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Summary */}
      <section className="py-16 bg-secondary/20 dark:bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
              <div className="w-16 h-1 bg-primary mb-4"></div>
              <p className="max-w-lg text-foreground/80">
                Insights and perspectives on AI/ML technologies and trends.
              </p>
            </div>
            <Link href="/blog">
              <Button className="group">
                Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-card dark:bg-card rounded-xl overflow-hidden shadow-md">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-foreground/60">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3">{post.title}</h3>
                  <p className="text-foreground/80 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-primary/10 dark:bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
            Let's discuss how my AI/ML expertise can help drive innovation and growth for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg">
                Get in Touch
              </Button>
            </Link>
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Book a Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
