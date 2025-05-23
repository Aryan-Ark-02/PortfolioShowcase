import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, CheckCircle, UserPlus } from "lucide-react";

// Define the form schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type for the form values
type FormValues = z.infer<typeof formSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a production app, you would integrate with your authentication API
      // For now, we'll redirect to the login API endpoint
      window.location.href = '/api/login';
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for password strength visualization
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "No password", color: "bg-foreground/20" };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const strengthMap = [
      { text: "Very weak", color: "bg-red-500" },
      { text: "Weak", color: "bg-orange-500" },
      { text: "Medium", color: "bg-yellow-500" },
      { text: "Strong", color: "bg-green-500" },
      { text: "Very strong", color: "bg-green-600" },
    ];
    
    return {
      strength: (strength / 5) * 100,
      ...strengthMap[Math.min(strength, 4)]
    };
  };

  const passwordStrength = getPasswordStrength(form.watch("password"));

  return (
    <div className="py-20 min-h-[80vh] flex items-center bg-gradient-to-b from-background to-secondary/30 dark:from-background dark:to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-card dark:bg-card rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
              <p className="text-foreground/60 dark:text-foreground/60">
                Join the AI/ML community and connect with professionals.
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
                Sign Up with Google
              </a>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card dark:bg-card text-foreground/60">Or sign up with email</span>
              </div>
            </div>
            
            {/* Signup Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
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
                      
                      {/* Password strength meter */}
                      {field.value && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Password strength</span>
                            <span>{passwordStrength.text}</span>
                          </div>
                          <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${passwordStrength.color}`}
                              style={{ width: `${passwordStrength.strength}%` }}
                            />
                          </div>
                          
                          <ul className="mt-2 grid grid-cols-1 gap-1 text-xs text-foreground/60">
                            <li className="flex items-center">
                              <span className={`mr-1 ${/[A-Z]/.test(field.value) ? 'text-green-600' : ''}`}>
                                {/[A-Z]/.test(field.value) ? <CheckCircle size={12} /> : "•"}
                              </span>
                              At least one uppercase letter
                            </li>
                            <li className="flex items-center">
                              <span className={`mr-1 ${/[a-z]/.test(field.value) ? 'text-green-600' : ''}`}>
                                {/[a-z]/.test(field.value) ? <CheckCircle size={12} /> : "•"}
                              </span>
                              At least one lowercase letter
                            </li>
                            <li className="flex items-center">
                              <span className={`mr-1 ${/[0-9]/.test(field.value) ? 'text-green-600' : ''}`}>
                                {/[0-9]/.test(field.value) ? <CheckCircle size={12} /> : "•"}
                              </span>
                              At least one number
                            </li>
                            <li className="flex items-center">
                              <span className={`mr-1 ${field.value.length >= 8 ? 'text-green-600' : ''}`}>
                                {field.value.length >= 8 ? <CheckCircle size={12} /> : "•"}
                              </span>
                              Minimum 8 characters
                            </li>
                          </ul>
                        </div>
                      )}
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60"
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary mt-1"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel>
                          I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Creating account..."
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" /> Create Account
                    </>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-foreground/60">
                Already have an account?{" "}
                <Link 
                  href="/login"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-foreground/60">
            <p>By signing up, you agree to our Data Protection and Cookie Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;