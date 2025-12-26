import { Github, Linkedin, MessageCircle, ChevronDown, User, Camera, X, Loader2, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { useState, useEffect } from "react";

const Hero = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden pt-24">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      {/* Floating code elements */}
      <div className="absolute top-1/4 left-[10%] text-primary/20 font-mono text-sm animate-float hidden md:block">
        {"<Developer />"}
      </div>
      <div className="absolute bottom-1/3 right-[15%] text-accent/20 font-mono text-sm animate-float hidden md:block" style={{ animationDelay: "2s" }}>
        {"{ code: true }"}
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto">
        {/* Profile photo placeholder */}
        <div className="mb-8 opacity-0 animate-fade-in">
          <div 
            className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent p-1 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden relative">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
              <img 
                src="/images/profile.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
                onLoad={() => setIsImageLoading(false)}
              />
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Available for opportunities</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Hi, I'm <span className="gradient-text glow-text">Zain</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <span className="text-primary">Web Developer</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Crafting <span className="text-primary">beautiful</span> and{" "}
          <span className="text-accent">functional</span> web experiences with modern technologies
        </p>

        {/* Experience badge */}
        <div className="flex items-center justify-center gap-4 mb-10 opacity-0 animate-fade-in flex-wrap" style={{ animationDelay: "0.5s" }}>
          <div className="card-glass px-6 py-3">
            <span className="text-3xl font-bold gradient-text">1+</span>
            <span className="text-muted-foreground ml-2">Year Experience</span>
          </div>
          <div className="card-glass px-6 py-3">
            <span className="text-3xl font-bold gradient-text">9+</span>
            <span className="text-muted-foreground ml-2">Projects Built</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <button onClick={scrollToProjects} className="btn-primary">
            View My Work
            <ChevronDown className="w-5 h-5" />
          </button>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
          <a href="/resume.pdf" download className="btn-outline gap-2">
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://wa.me/923206438834"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full glass border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors z-50 bg-background/20 rounded-full backdrop-blur-md"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <img 
              src="/images/profile.png" 
              alt="" 
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl border border-primary/20 bg-card"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll down</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
