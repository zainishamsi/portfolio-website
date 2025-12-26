import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-foreground font-bold text-xl group"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname !== "/") {
              navigate("/");
              window.scrollTo(0, 0);
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Code2 className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
          <span className="font-mono">
            <span className="text-primary">&lt;</span>
            Dev
            <span className="text-primary">/&gt;</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-4"
          >
            View GitHub
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-border">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-foreground hover:text-primary transition-colors font-medium py-2 text-left"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center"
            >
              View GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
