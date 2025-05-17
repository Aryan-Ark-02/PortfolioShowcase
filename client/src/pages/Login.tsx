import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";

// Define the form schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

// Type for the form values
type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a production app, you would integrate with your authentication API
      // For now, we'll redirect to the login API endpoint
      window.location.href = '/api/login';
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 min-h-[80vh] flex items-center bg-gradient-to-b from-background to-secondary/30 dark:from-background dark:to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-card dark:bg-card rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Log In</h1>
              <p className="text-foreground/60 dark:text-foreground/60">
                Welcome back! Please log in to your account.
              </p>
            </div>
            
            {/* Social Login Buttons */}
            <div className="flex flex-col space-y-4 mb-6">
              <a 
                href="/api/login"
                className="flex items-center justify-center py-3 px-4 rounded-lg border border-border hover:bg-secondary transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.229,1.314-0.878,2.484-1.855,3.361 c-1.856,1.671-4.574,1.916-6.243,0.06c-1.269-1.409-1.723-3.215-1.234-4.956c0.268-0.954,0.879-1.816,1.831-2.514 c0.951-0.698,1.96-1.031,3.062-0.999c0.489,0.015,0.976,0.092,1.453,0.232"
                  />
                  <path
                    fill="currentColor"
                    d="M21.545,12.151L21.545,12.151h-6.818c-0.354-0.012-0.683-0.192-0.886-0.49c-0.218-0.321-0.258-0.75-0.104-1.114 c0.153-0.364,0.489-0.608,0.878-0.635l0.112-0.005h3.333c-0.535-0.663-1.251-1.146-2.131-1.451 c-1.863-0.647-3.766,0.339-4.413,2.202c-0.231,0.663-0.259,1.388-0.08,2.057"
                  />
                </svg>
                Continue with Replit
              </a>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card dark:bg-card text-foreground/60">Or continue with email</span>
              </div>
            </div>
            
            {/* Login Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      onChange={(e) => form.setValue("remember", e.target.checked)}
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm">
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Forgot password?
                  </a>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Logging in..."
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" /> Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-foreground/60">
                Don't have an account yet?{" "}
                <Link 
                  href="/signup"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-foreground/60">
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="/contact" className="hover:text-primary">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;