import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Skills from "@/pages/Skills";
import Jobs from "@/pages/Jobs";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { ChatBot } from "@/components/layout/ChatBot";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Enroll from "@/pages/Enroll";
import CoursePlayer from "@/pages/CoursePlayer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/experience" component={Experience} />
          <Route path="/skills" component={Skills} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/services" component={Services} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/courses" component={Courses} />
          <Route path="/course/:id" component={CourseDetail} />
          <Route path="/enroll/:id" component={Enroll} />
          <Route path="/player/:id" component={CoursePlayer} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="puneet-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatBot />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
