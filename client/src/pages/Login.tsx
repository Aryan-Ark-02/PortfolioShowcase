import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useLocation } from "wouter";
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
  const [location, setLocation] = useLocation();
  
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
      // Support redirect param from query string
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect") || "/";
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, redirect }),
        credentials: "include",
      });
      if (res.redirected) {
        window.location.href = res.url;
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }
      // If not redirected, go to home
      setLocation(redirect);
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
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
                href="/api/auth/google"
                className="flex items-center justify-center py-3 px-4 rounded-lg border border-border hover:bg-secondary transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <g>
                    <path fill="#4285F4" d="M21.35 11.1H12v2.8h5.35c-.23 1.25-1.4 3.66-5.35 3.66-3.22 0-5.85-2.67-5.85-5.96s2.63-5.96 5.85-5.96c1.83 0 3.06.78 3.76 1.44l2.57-2.5C17.09 3.59 14.76 2.5 12 2.5 6.73 2.5 2.5 6.73 2.5 12s4.23 9.5 9.5 9.5c5.47 0 9.09-3.84 9.09-9.23 0-.62-.07-1.09-.16-1.57z"/>
                    <path fill="#34A853" d="M3.15 7.68l2.29 1.68C6.5 8.09 8.99 6.04 12 6.04c1.83 0 3.06.78 3.76 1.44l2.57-2.5C17.09 3.59 14.76 2.5 12 2.5c-3.87 0-7.1 2.69-8.35 6.18z"/>
                    <path fill="#FBBC05" d="M12 21.5c2.76 0 5.09-.91 6.76-2.47l-3.13-2.57c-.87.59-2.01.94-3.63.94-2.95 0-5.44-1.97-6.34-4.62l-2.29 1.77C4.9 19.01 8.13 21.5 12 21.5z"/>
                    <path fill="#EA4335" d="M21.35 11.1H12v2.8h5.35c-.23 1.25-1.4 3.66-5.35 3.66-3.22 0-5.85-2.67-5.85-5.96s2.63-5.96 5.85-5.96c1.83 0 3.06.78 3.76 1.44l2.57-2.5C17.09 3.59 14.76 2.5 12 2.5c-3.87 0-7.1 2.69-8.35 6.18z"/>
                  </g>
                </svg>
                Continue with Google
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