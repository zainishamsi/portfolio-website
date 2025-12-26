import { Heart, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm">developer.portfolio</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>using React & Tailwind</span>
          </div>

          <div className="text-sm text-muted-foreground flex items-center gap-4">
            <span>© {currentYear} All rights reserved</span>
            <Link to="/admin" className="text-[10px] opacity-20 hover:opacity-100 transition-opacity">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
