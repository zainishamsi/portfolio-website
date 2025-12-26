import { useState, useEffect, useRef } from "react";
import { Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScrollInteraction = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/Show Logic: Hide when scrolling down (>50px), Show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <button
      onClick={() => navigate("/yasir")}
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 transform hover:scale-105 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 shadow-lg shadow-primary/5 hover:bg-primary/20 hover:border-primary/50 transition-all group">
        <div className="relative flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary group-hover:animate-pulse" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider leading-none mb-0.5">Team Member</span>
          <span className="text-sm font-bold text-foreground leading-none flex items-center gap-1">
            Meet Ethical Hacker <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </button>
  );
};

export default ScrollInteraction;