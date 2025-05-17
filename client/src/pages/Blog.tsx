import { useState } from "react";
import { blogPosts } from "@/data";
import { Search, Calendar, MessageSquare, Eye, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import BlogSection from "@/components/sections/BlogSection";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = 
      activeCategory === "all" || post.category === activeCategory;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-20 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI/ML Blog</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 dark:text-foreground/70">
            Insights, tutorials, and trends in artificial intelligence and machine learning
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 h-5 w-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 bg-background dark:bg-secondary/70 border border-border dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <Button 
                variant="outline" 
                className="w-full md:w-auto"
                onClick={() => setSearchTerm("")}
              >
                Reset
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === "all" 
                  ? "bg-primary dark:bg-primary text-white dark:text-background" 
                  : "bg-secondary dark:bg-secondary/50 text-foreground hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background"
              }`}
              onClick={() => setActiveCategory("all")}
            >
              All Categories
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category 
                    ? "bg-primary dark:bg-primary text-white dark:text-background" 
                    : "bg-secondary dark:bg-secondary/50 text-foreground hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured Post */}
        <div className="mb-16">
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/70 absolute inset-0 opacity-20 z-0"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 relative z-10">
              <div className="flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary dark:bg-primary text-white dark:text-background rounded-full text-sm font-medium mb-4">
                  Featured Post
                </span>
                <h2 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
                <div className="flex items-center text-foreground/60 dark:text-foreground/60 mb-4 gap-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{blogPosts[0].views} views</span>
                  </div>
                  <span className="px-3 py-1 bg-secondary dark:bg-secondary/70 rounded-full text-xs">
                    {blogPosts[0].category}
                  </span>
                </div>
                <p className="text-foreground/80 dark:text-foreground/80 mb-8">
                  {blogPosts[0].excerpt}
                </p>
                <div>
                  <Button className="group">
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end items-center">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="rounded-lg shadow-lg max-h-[350px] w-auto object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-card dark:bg-card rounded-xl mb-16">
            <div className="w-16 h-16 rounded-full bg-secondary/40 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-foreground/60" />
            </div>
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p className="text-foreground/70 max-w-md mx-auto">
              Try adjusting your search or category filter to find what you're looking for.
            </p>
            <Button className="mt-6" onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.slice(1).map((post) => (
              <article 
                key={post.id} 
                className="bg-card dark:bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-border/5"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-foreground/60 dark:text-foreground/60 text-sm">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-foreground/80 dark:text-foreground/80 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <div className="flex items-center space-x-4 text-foreground/60 dark:text-foreground/60 text-sm">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary dark:text-primary group">
                      Read More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center mb-16">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="bg-primary/10 dark:bg-primary/5 rounded-xl p-8 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-primary/20 dark:bg-primary/10"></div>
          <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-primary/10 dark:bg-primary/5"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to My Newsletter</h3>
              <p className="text-foreground/80 dark:text-foreground/80 mb-6">
                Stay updated with my latest insights, tutorials, and industry news on AI, ML, and data science.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg bg-background dark:bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-foreground/60 dark:text-foreground/60 text-sm mt-2">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;