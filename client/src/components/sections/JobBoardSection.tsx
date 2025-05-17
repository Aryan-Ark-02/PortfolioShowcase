import { useState } from "react";
import { jobs } from "@/data";
import { Search, MapPin, Briefcase, DollarSign, Heart, Share2 } from "lucide-react";

interface Filters {
  searchTerm: string;
  location: string;
  jobType: string;
}

const JobBoardSection = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    location: "",
    jobType: "",
  });

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
    <section id="jobs" className="py-16 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Job Board</h2>
          <div className="section-divider"></div>
          <p className="mt-4 max-w-2xl mx-auto">Discover AI/ML career opportunities</p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-secondary dark:bg-secondary rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
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
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="bg-background dark:bg-secondary/70 border border-border dark:border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors"
              >
                <option value="">Location</option>
                <option value="remote">Remote</option>
                <option value="india">India</option>
                <option value="ca">California</option>
              </select>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="bg-background dark:bg-secondary/70 border border-border dark:border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors"
              >
                <option value="">Experience</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="exec">Executive</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="space-y-6 mb-12">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-foreground/70">No jobs match your search criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div 
                key={job.id} 
                className="bg-secondary dark:bg-secondary rounded-xl p-6 transition-theme shadow-sm hover:shadow-md"
                style={{ borderLeft: '4px solid hsl(var(--primary))' }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-16 md:h-16 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <img 
                      src={job.logo} 
                      alt={`${job.company} logo`} 
                      className="w-16 h-16 object-contain rounded"
                    />
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
                      <div className="flex flex-wrap items-center text-foreground/60 dark:text-foreground/60 text-sm mb-2 gap-x-3 gap-y-1">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          <span>{job.company}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-foreground/80 dark:text-foreground/80 mb-4">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.requirements.map((req, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-secondary-foreground/5 dark:bg-secondary-foreground/5 text-foreground/70 dark:text-foreground/70 rounded text-xs"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-between items-center">
                      {job.salary && (
                        <div className="text-primary dark:text-primary font-medium mb-2 md:mb-0 flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        <button 
                          className="p-2 bg-background dark:bg-background rounded-full hover:bg-secondary/70 dark:hover:bg-secondary/70 transition-colors"
                          title="Save to favorites"
                          aria-label="Save job to favorites"
                        >
                          <Heart className="w-4 h-4 text-foreground/60 dark:text-foreground/60" />
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
        
        <div className="text-center">
          <button className="btn-secondary">
            Load More Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobBoardSection;
