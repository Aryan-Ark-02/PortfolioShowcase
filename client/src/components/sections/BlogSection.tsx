import { useState } from 'react';
import { blogPosts } from '@/data';
import { ArrowRight, Eye, MessageSquare } from 'lucide-react';

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Topics');
  
  // Get all unique categories
  const categories = ['All Topics', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  // Filter blog posts based on active category
  const filteredPosts = activeCategory === 'All Topics' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <section id="blog" className="py-16 bg-secondary dark:bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Blog & Insights</h2>
          <div className="section-divider"></div>
          <p className="mt-4 max-w-2xl mx-auto">Thoughts, insights, and analysis on AI/ML trends</p>
        </div>
        
        {/* Blog Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category 
                  ? "bg-primary dark:bg-primary text-white dark:text-background" 
                  : "bg-background dark:bg-background text-foreground dark:text-foreground hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              className="bg-card dark:bg-card rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/10 text-primary dark:text-primary rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-foreground/60 dark:text-foreground/60">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                
                <p className="text-foreground/80 dark:text-foreground/80 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex justify-between items-center">
                  <a href="#" className="text-primary dark:text-primary font-medium inline-flex items-center hover:underline">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                  
                  <div className="flex items-center space-x-3">
                    {post.views !== undefined && (
                      <span className="flex items-center text-foreground/60 dark:text-foreground/60 text-sm">
                        <Eye className="w-4 h-4 mr-1" /> {post.views}
                      </span>
                    )}
                    
                    {post.comments !== undefined && (
                      <span className="flex items-center text-foreground/60 dark:text-foreground/60 text-sm">
                        <MessageSquare className="w-4 h-4 mr-1" /> {post.comments}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <a href="#" className="btn-secondary">
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
