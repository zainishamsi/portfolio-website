import { Github, Shield, ChevronLeft, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const YasirProfile = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 px-4 relative overflow-hidden flex flex-col items-center justify-center">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        <div className="max-w-4xl w-full mx-auto relative z-10 mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="card-glass p-8 md:p-12 animate-fade-in border-primary/20 shadow-primary/5">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Icon */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-4 border-primary/20 shadow-lg shadow-primary/10 shrink-0">
                <Shield className="w-16 h-16 text-primary" />
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">Hi, I'm Yasir</h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xl md:text-2xl text-primary font-medium">
                    <Lock className="w-5 h-5" />
                    <h2>Ethical Hacker</h2>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ethical hacker focused on penetration testing, web security, vulnerability research, and responsible disclosure. With professional experience equivalent to the founder, I specialize in identifying and mitigating security risks in web applications and infrastructure before they can be exploited.
                </p>

                <div>
                  <h3 className="text-sm font-mono text-primary mb-3 uppercase tracking-wider">// Key Skills</h3>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {[
                      "Ethical Hacking", 
                      "Penetration Testing", 
                      "Bug Bounty", 
                      "Web Application Security",
                      "Vulnerability Assessment"
                    ].map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-md bg-secondary/50 border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="https://github.com/syedyasirh299-hash"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 px-6 py-3"
                  >
                    <Github className="w-5 h-5" />
                    View GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default YasirProfile;