import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

interface BlogPostData {
  title: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  content: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app this would come from an API or shared data file
  const posts: Record<string, BlogPostData> = {
    "ai-integration": {
      title: "The Future of Web Development: AI Integration",
      date: "Oct 15, 2023",
      category: "Technology",
      readTime: "5 min read",
      author: "Zain",
      content: `
        <p class="mb-4">Artificial Intelligence is rapidly transforming the landscape of web development. From code generation to automated testing, AI tools are becoming an integral part of the developer's toolkit.</p>
        <h3 class="text-xl font-bold mb-2 mt-6">The Rise of AI Coding Assistants</h3>
        <p class="mb-4">Tools like GitHub Copilot and ChatGPT are changing how we write code. They can suggest entire functions, debug complex issues, and even refactor legacy code. This shift allows developers to focus more on architecture and problem-solving rather than syntax.</p>
        <h3 class="text-xl font-bold mb-2 mt-6">Automated Testing and QA</h3>
        <p class="mb-4">AI-driven testing frameworks can automatically generate test cases, identify edge cases, and predict potential failure points. This leads to more robust applications and faster deployment cycles.</p>
        <h3 class="text-xl font-bold mb-2 mt-6">Personalized User Experiences</h3>
        <p class="mb-4">Beyond development tools, AI is enabling hyper-personalized user experiences. Dynamic content generation and predictive UI adjustments are becoming standard features in modern web applications.</p>
      `
    },
    "react-hooks-guide": {
      title: "Mastering React Hooks: A Comprehensive Guide",
      date: "Sep 28, 2023",
      category: "Development",
      readTime: "8 min read",
      author: "Zain",
      content: `
        <p class="mb-4">React Hooks have revolutionized how we write functional components. They provide a cleaner, more concise way to manage state and side effects.</p>
        <h3 class="text-xl font-bold mb-2 mt-6">Understanding useEffect</h3>
        <p class="mb-4">The useEffect hook is powerful but often misunderstood. It handles side effects like data fetching, subscriptions, and manual DOM manipulations. Understanding the dependency array is crucial for preventing infinite loops and performance issues.</p>
        <h3 class="text-xl font-bold mb-2 mt-6">Custom Hooks</h3>
        <p class="mb-4">One of the best features of Hooks is the ability to create your own. Custom hooks allow you to extract component logic into reusable functions, keeping your components clean and DRY (Don't Repeat Yourself).</p>
      `
    },
    "web-security-2024": {
      title: "Web Security Best Practices for 2024",
      date: "Nov 02, 2023",
      category: "Security",
      readTime: "6 min read",
      author: "Yasir",
      content: `
        <p class="mb-4">As web applications become more complex, the attack surface increases. Security is no longer an afterthought but a fundamental part of the development process.</p>
        <h3 class="text-xl font-bold mb-2 mt-6">Zero Trust Architecture</h3>
        <p class="mb-4">The "never trust, always verify" approach is becoming the standard. This involves strict identity verification for every person and device trying to access resources on a private network.</p>
        <h3 class="text-xl font-bold mb-2 mt-6">CSP and XSS Prevention</h3>
        <p class="mb-4">Content Security Policy (CSP) is a powerful tool to prevent Cross-Site Scripting (XSS) attacks. By defining which dynamic resources are allowed to load, you can significantly reduce the risk of malicious script injection.</p>
      `
    }
  };

  const post = id ? posts[id] : null;

  // Get related posts (exclude current post)
  const relatedPosts = Object.entries(posts)
    .filter(([postId]) => postId !== id)
    .slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <button onClick={() => navigate("/")} className="btn-primary">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 px-4 pb-24">
        <article className="max-w-3xl mx-auto animate-fade-in">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </button>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-2">
              <Tag className="w-3 h-3" /> {post.category}
            </span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>
          
          <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map(([postId, postData]) => (
                  <div 
                    key={postId} 
                    onClick={() => navigate(`/blog/${postId}`)}
                    className="card-glass p-6 cursor-pointer hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className="text-primary font-medium">{postData.category}</span>
                      <span>•</span>
                      <span>{postData.readTime}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {postData.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium mt-auto">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;