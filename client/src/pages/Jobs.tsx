import { useState } from "react";
import { jobs } from "@/data";
import { Search, MapPin, Briefcase, DollarSign, Heart, Share2, FilterIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Filters {
  searchTerm: string;
  location: string;
  jobType: string;
}

const Jobs = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    location: "",
    jobType: "",
  });
  
  const [favorites, setFavorites] = useState<number[]>([]);

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      filters.searchTerm === "" ||
      job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.requirements.some(req => req.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    
    const matchesLocation =
      filters.location === "" ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesJobType =
      filters.jobType === "" ||
      job.type.toLowerCase() === filters.jobType.toLowerCase();
    
    return matchesSearch && matchesLocation && matchesJobType;
  });

  // Toggle favorite job
  const toggleFavorite = (jobId: number) => {
    if (favorites.includes(jobId)) {
      setFavorites(favorites.filter(id => id !== jobId));
    } else {
      setFavorites([...favorites, jobId]);
    }
  };

  // Share job on social media
  const shareJob = (platform: string, job: typeof jobs[0]) => {
    let shareUrl = "";
    const jobText = `${job.title} at ${job.company}`;
    
    switch(platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this job: ${jobText}`)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(`Job Opportunity: ${jobText}`)}&body=${encodeURIComponent(`I found this job that might interest you: ${jobText}`)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(jobText)}`;
        break;
      default:
        shareUrl = "";
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="py-20 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI/ML Job Board</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 dark:text-foreground/70">
            Discover exciting career opportunities in AI/ML and related technologies
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-card dark:bg-card rounded-xl p-6 mb-8 shadow-lg border border-border/50">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-foreground/50" />
                </span>
                <input 
                  type="text"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  placeholder="Search for roles, skills, or companies..."
                  className="w-full pl-10 pr-4 py-3 bg-background dark:bg-secondary/70 border border-border dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className="h-4 w-4 text-foreground/50" />
                </span>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="pl-10 bg-background dark:bg-secondary/70 border border-border dark:border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors"
                >
                  <option value="">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                </select>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Briefcase className="h-4 w-4 text-foreground/50" />
                </span>
                <select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                  className="pl-10 bg-background dark:bg-secondary/70 border border-border dark:border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors"
                >
                  <option value="">Job Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="contract">Contract</option>
                  <option value="part-time">Part-time</option>
                </select>
              </div>
              <Button className="sm:self-start" onClick={() => setFilters({ searchTerm: "", location: "", jobType: "" })}>
                <FilterIcon className="h-4 w-4 mr-2" /> Reset
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-foreground/70">
            Showing <span className="font-bold text-foreground">{filteredJobs.length}</span> job openings
          </p>
          <Link href="/contact">
            <Button variant="outline" size="sm">Post a Job</Button>
          </Link>
        </div>
        
        {/* Job Listings */}
        <div className="space-y-6 mb-12">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-card dark:bg-card rounded-xl">
              <div className="w-16 h-16 rounded-full bg-secondary/40 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-foreground/60" />
              </div>
              <h3 className="text-xl font-bold mb-2">No jobs match your criteria</h3>
              <p className="text-foreground/70 max-w-md mx-auto">Try adjusting your filters or search terms to see more jobs.</p>
              <Button className="mt-6" onClick={() => setFilters({ searchTerm: "", location: "", jobType: "" })}>
                Reset Filters
              </Button>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div 
                key={job.id} 
                className="bg-card dark:bg-card rounded-xl p-6 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 border border-border/50"
                style={{ borderLeft: '4px solid hsl(var(--primary))' }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-20 md:h-20 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-lg bg-white shadow">
                      <img 
                        src={job.logo} 
                        alt={`${job.company} logo`} 
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="mt-2 md:mt-0">
                        <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary rounded-full text-xs font-medium">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center text-foreground/60 dark:text-foreground/60 text-sm mb-2 gap-x-4 gap-y-1">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center text-primary dark:text-primary">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>{job.salary}</span>
                          </div>
                        )}
                        <div className="text-foreground/50 text-xs">
                          Posted {job.datePosted}
                        </div>
                      </div>
                      
                      <p className="text-foreground/80 dark:text-foreground/80 my-4">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.requirements.map((req, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 bg-secondary dark:bg-secondary/50 text-foreground/80 dark:text-foreground/80 rounded-full text-xs"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                        <Button variant="outline" size="sm" className="group">
                          Apply Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" size="sm">View Details</Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          className="p-2 bg-background dark:bg-background rounded-full hover:bg-secondary/70 dark:hover:bg-secondary/70 transition-colors"
                          title="Save to favorites"
                          aria-label="Save job to favorites"
                          onClick={() => toggleFavorite(job.id)}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(job.id) ? 'fill-primary text-primary' : 'text-foreground/60 dark:text-foreground/60'}`} />
                        </button>
                        <button 
                          onClick={() => shareJob("whatsapp", job)}
                          className="p-2 bg-background dark:bg-background rounded-full hover:bg-secondary/70 dark:hover:bg-secondary/70 transition-colors"
                          title="Share via WhatsApp"
                          aria-label="Share job via WhatsApp"
                        >
                          <i className="fab fa-whatsapp text-foreground/60 dark:text-foreground/60"></i>
                        </button>
                        <button 
                          onClick={() => shareJob("email", job)}
                          className="p-2 bg-background dark:bg-background rounded-full hover:bg-secondary/70 dark:hover:bg-secondary/70 transition-colors"
                          title="Share via Email"
                          aria-label="Share job via Email"
                        >
                          <i className="far fa-envelope text-foreground/60 dark:text-foreground/60"></i>
                        </button>
                        <button 
                          onClick={() => shareJob("linkedin", job)}
                          className="p-2 bg-background dark:bg-background rounded-full hover:bg-secondary/70 dark:hover:bg-secondary/70 transition-colors"
                          title="Share on LinkedIn"
                          aria-label="Share job on LinkedIn"
                        >
                          <i className="fab fa-linkedin-in text-foreground/60 dark:text-foreground/60"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination and CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
          
          <div>
            <Button variant="outline" className="mr-2">
              <span className="mr-2">💾</span> Save Search
            </Button>
            <Button>
              <span className="mr-2">📱</span> Get Job Alerts
            </Button>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-card dark:bg-card p-8 rounded-xl shadow-lg mt-16 border border-border/50 relative overflow-hidden">
          {/* Background design element */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary/10 dark:bg-primary/5"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10"></div>
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Looking for AI talent?</h3>
                <p className="text-foreground/80 dark:text-foreground/80 mb-6">
                  Post your job openings on our board to reach qualified AI/ML professionals. Connect with experts who can drive your projects forward.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button>Post a Job</Button>
                  </Link>
                  <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">Schedule a Call</Button>
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350" 
                  alt="Team collaboration" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;