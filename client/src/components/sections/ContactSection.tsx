import { useState } from "react";
import { personalInfo } from "@/data";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PanelLeftOpen, Phone, MapPin, Loader2 } from "lucide-react";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      setIsSubmitting(true);
      
      // Send form data to server
      const response = await apiRequest(
        "POST",
        "/api/contact",
        values
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }
      
      // Reset form on success
      form.reset();
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      
      toast({
        title: "Error Sending Message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-secondary to-background dark:from-secondary/30 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Get In Touch</h2>
          <div className="section-divider"></div>
          <p className="mt-4 max-w-2xl mx-auto">Interested in working together? Reach out to discuss how I can help your organization leverage AI for growth.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card dark:bg-card rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
                <input 
                  id="name"
                  type="text" 
                  placeholder="Enter your name"
                  className={`w-full py-3 px-4 bg-secondary dark:bg-secondary/70 border border-border dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors ${
                    form.formState.errors.name ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  placeholder="Enter your email" 
                  className={`w-full py-3 px-4 bg-secondary dark:bg-secondary/70 border border-border dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors ${
                    form.formState.errors.email ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                <input 
                  id="subject"
                  type="text" 
                  placeholder="What's this regarding?"
                  className={`w-full py-3 px-4 bg-secondary dark:bg-secondary/70 border border-border dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors ${
                    form.formState.errors.subject ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                  {...form.register("subject")}
                />
                {form.formState.errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea 
                  id="message"
                  rows={5} 
                  placeholder="Tell me about your project or inquiry" 
                  className={`w-full py-3 px-4 bg-secondary dark:bg-secondary/70 border border-border dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors ${
                    form.formState.errors.message ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  disabled={isSubmitting}
                  {...form.register("message")}
                ></textarea>
                {form.formState.errors.message && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="w-full btn-primary flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="bg-card dark:bg-card rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/10 flex items-center justify-center mr-4">
                    <PanelLeftOpen className="h-5 w-5 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <a 
                      href={`mailto:${personalInfo.email}`} 
                      className="hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/10 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <a 
                      href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} 
                      className="hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/10 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Location</h4>
                    <p>{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="bg-card dark:bg-card rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-secondary dark:bg-secondary/70 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors"
                >
                  <i className="fab fa-linkedin text-xl mr-3"></i>
                  <span>LinkedIn</span>
                </a>
                
                <a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-secondary dark:bg-secondary/70 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors"
                >
                  <i className="fab fa-github text-xl mr-3"></i>
                  <span>GitHub</span>
                </a>
                
                <a 
                  href={personalInfo.kaggle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-secondary dark:bg-secondary/70 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors"
                >
                  <i className="fab fa-kaggle text-xl mr-3"></i>
                  <span>Kaggle</span>
                </a>
                
                <a 
                  href={personalInfo.stackoverflow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-secondary dark:bg-secondary/70 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors"
                >
                  <i className="fab fa-stack-overflow text-xl mr-3"></i>
                  <span>Stack Overflow</span>
                </a>
                
                <a 
                  href={personalInfo.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-secondary dark:bg-secondary/70 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background transition-colors col-span-2"
                >
                  <i className="fas fa-cube text-xl mr-3"></i>
                  <span>HuggingFace</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
