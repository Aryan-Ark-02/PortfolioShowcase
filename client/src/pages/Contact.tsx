import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Use the schema from shared
type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  // Handle form submission
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest<{success: boolean}>("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you shortly.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 dark:text-foreground/70">
            Have a project or opportunity to discuss? I'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <a 
                      href="mailto:puneet.sinha@example.com" 
                      className="text-foreground/80 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      puneet.sinha@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <a 
                      href="tel:+919876543210" 
                      className="text-foreground/80 dark:text-foreground/80 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      +91 9876 543 210
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Location</h3>
                    <p className="text-foreground/80 dark:text-foreground/80">
                      Bangalore, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                    <p className="text-foreground/80 dark:text-foreground/80">
                      Monday - Friday: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-border">
                <h3 className="font-bold text-lg mb-4">Connect with me</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn Profile"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                    aria-label="Twitter Profile"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                    aria-label="GitHub Profile"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a 
                    href="https://medium.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                    aria-label="Medium Profile"
                  >
                    <i className="fab fa-medium-m"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">Quick Links</h2>
              
              <div className="space-y-4">
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block p-4 bg-secondary/30 dark:bg-secondary/20 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors duration-300"
                >
                  <div className="font-bold mb-1">Schedule a Meeting</div>
                  <p className="text-sm text-foreground/70 dark:text-foreground/70">
                    Book a time slot for a consultation or project discussion
                  </p>
                </a>
                
                <a 
                  href="/services" 
                  className="block p-4 bg-secondary/30 dark:bg-secondary/20 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors duration-300"
                >
                  <div className="font-bold mb-1">View Services</div>
                  <p className="text-sm text-foreground/70 dark:text-foreground/70">
                    Learn more about my AI/ML consultation and development services
                  </p>
                </a>
                
                <a 
                  href="/cv.pdf" 
                  target="_blank"
                  className="block p-4 bg-secondary/30 dark:bg-secondary/20 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors duration-300"
                >
                  <div className="font-bold mb-1">Download CV</div>
                  <p className="text-sm text-foreground/70 dark:text-foreground/70">
                    Get a copy of my detailed curriculum vitae
                  </p>
                </a>
                
                <a 
                  href="/jobs" 
                  className="block p-4 bg-secondary/30 dark:bg-secondary/20 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors duration-300"
                >
                  <div className="font-bold mb-1">Browse Job Board</div>
                  <p className="text-sm text-foreground/70 dark:text-foreground/70">
                    Find or post AI/ML job opportunities
                  </p>
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">Send a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Project Inquiry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project or inquiry..." 
                            {...field} 
                            rows={6} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="px-8" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          Send Message <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            
            {/* FAQ */}
            <div className="mt-8 bg-card dark:bg-card p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">Frequently Asked Contact Questions</h2>
              
              <div className="space-y-6">
                <div className="bg-secondary/30 dark:bg-secondary/20 rounded-lg p-5">
                  <h3 className="font-bold text-lg mb-2">What information should I include in my initial message?</h3>
                  <p className="text-foreground/80 dark:text-foreground/80">
                    For the most effective communication, please include your project scope, timeline, budget range, and any specific technologies or requirements you have in mind.
                  </p>
                </div>
                
                <div className="bg-secondary/30 dark:bg-secondary/20 rounded-lg p-5">
                  <h3 className="font-bold text-lg mb-2">What is your typical response time?</h3>
                  <p className="text-foreground/80 dark:text-foreground/80">
                    I aim to respond to all inquiries within 24-48 hours. For urgent matters, please indicate this in your subject line.
                  </p>
                </div>
                
                <div className="bg-secondary/30 dark:bg-secondary/20 rounded-lg p-5">
                  <h3 className="font-bold text-lg mb-2">Do you work with international clients?</h3>
                  <p className="text-foreground/80 dark:text-foreground/80">
                    Yes, I work with clients globally. I'm comfortable with remote collaboration and can accommodate different time zones for meetings and calls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map and Location */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 bg-card dark:bg-card p-8 rounded-xl shadow-lg">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6">My Location</h2>
            <p className="text-foreground/80 dark:text-foreground/80 mb-4">
              I'm based in Bangalore, India's technology hub, and work with clients globally. While I primarily work remotely, I'm available for in-person meetings in the Bangalore metro area.
            </p>
            <div className="flex items-center mt-4">
              <MapPin className="w-5 h-5 text-primary mr-2" />
              <span className="text-foreground/80 dark:text-foreground/80">
                Koramangala, Bangalore, Karnataka, India
              </span>
            </div>
          </div>
          <div className="h-[300px] bg-secondary rounded-xl overflow-hidden">
            {/* Placeholder for map - In a real implementation, this would be replaced with an actual map component */}
            <div className="w-full h-full flex items-center justify-center bg-secondary/50 dark:bg-secondary/30">
              <MapPin className="w-10 h-10 text-primary" />
              <span className="ml-2 font-medium">Interactive Map Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;