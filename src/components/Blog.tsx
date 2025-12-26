import { Calendar, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const posts = [
    {
      id: "ai-integration",
      title: "The Future of Web Development: AI Integration",
      excerpt: "Exploring how Artificial Intelligence is reshaping the way we build and interact with web applications.",
      date: "Oct 15, 2023",
      category: "Technology",
      readTime: "5 min read"
    },
    {
      id: "react-hooks-guide",
      title: "Mastering React Hooks: A Comprehensive Guide",
      excerpt: "Deep dive into useEffect, useState, and custom hooks to write cleaner and more efficient React code.",
      date: "Sep 28, 2023",
      category: "Development",
      readTime: "8 min read"
    },
    {
      id: "web-security-2024",
      title: "Web Security Best Practices for 2024",
      excerpt: "Essential security measures every developer should implement to protect their applications from modern threats.",
      date: "Nov 02, 2023",
      category: "Security",
      readTime: "6 min read"
    }
  ];

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="blog" className="py-24 px-4 relative bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// Insights</span>
          <h2 className="section-title mb-4">Latest Articles</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Thoughts on technology, development, and security
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article key={index} className="card-glass p-0 overflow-hidden group hover:border-primary/50 transition-colors flex flex-col">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary/20">Blog Post</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="text-primary font-medium">{post.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1">
                  {post.excerpt}
                </p>
                <button 
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No articles found matching your search.
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;