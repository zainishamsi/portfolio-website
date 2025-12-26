import { useState, useEffect } from "react";
import { X, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScrollPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // FOR TESTING: Show immediately (ignoring scroll and session storage)
    const timer = setTimeout(() => {
      setIsVisible(true);
      const audio = new Audio("/sounds/notification.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenEthicalHackerPopup", "true");
  };

  const handleNavigate = () => {
    handleClose();
    navigate("/team/yasir");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-4 md:right-8 z-50 animate-fade-in-up">
      <div className="card-glass p-5 max-w-sm relative shadow-2xl border-primary/20 bg-background/95 backdrop-blur-md">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
          aria-label="Close popup"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-4 pr-6">
          <div className="p-3 rounded-full bg-primary/10 shrink-0">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-base mb-1">Security Services</h3>
            <p className="text-sm text-muted-foreground mb-3 leading-tight">
              Interested in exploring Ethical Hacking projects?
            </p>
            <button 
              onClick={handleNavigate}
              className="btn-primary text-xs py-2 px-4 w-full justify-center flex items-center gap-2"
            >
              View Ethical Hacker Profile
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollPopup;