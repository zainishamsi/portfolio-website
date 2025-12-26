import { FormEvent } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Certifications from "../components/Certifications";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import { Shield, Lock, Terminal, Search, Send, Bug } from "lucide-react";

const YasirPage = () => {
  // Yasir's Data
  const yasirSkills = [
    { name: "Ethical Hacking", level: 95, color: "from-red-500 to-red-700" },
    { name: "Penetration Testing", level: 90, color: "from-orange-500 to-red-500" },
    { name: "Web App Security", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "Bug Bounty", level: 85, color: "from-green-500 to-emerald-600" },
    { name: "Vulnerability Assessment", level: 90, color: "from-purple-500 to-indigo-600" },
    { name: "Network Security", level: 80, color: "from-gray-500 to-slate-600" },
  ];

  const yasirProjects = [
    {
      id: 'y1',
      title: "Vulnerability Scanner",
      description: "Automated security tool for detecting common web vulnerabilities like SQLi and XSS in real-time.",
      tags: ["Python", "Security", "Automation"],
      icon: Search,
      image: "/images/project-security.png",
      color: "from-red-500/20 to-red-600/10",
      borderColor: "hover:border-red-500/30",
      githubUrl: "https://github.com/syedyasirh299-hash",
    },
    {
      id: 'y2',
      title: "Penetration Testing Lab",
      description: "A virtualized environment designed for safe ethical hacking practice and exploit development.",
      tags: ["Docker", "Linux", "Networking"],
      icon: Terminal,
      image: "/images/project-lab.png",
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "hover:border-blue-500/30",
      githubUrl: "https://github.com/syedyasirh299-hash",
    },
    {
      id: 'y3',
      title: "Secure Chat App",
      description: "End-to-end encrypted messaging application focusing on privacy and data integrity.",
      tags: ["Encryption", "Node.js", "Socket.io"],
      icon: Lock,
      image: "/images/project-chat-sec.png",
      color: "from-green-500/20 to-green-600/10",
      borderColor: "hover:border-green-500/30",
      githubUrl: "https://github.com/syedyasirh299-hash",
    }
  ];

  const yasirCerts = [
    { title: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", date: "2023", credentialUrl: "#" },
    { title: "Offensive Security Certified Professional (OSCP)", issuer: "OffSec", date: "2022", credentialUrl: "#" },
    { title: "CompTIA Security+", issuer: "CompTIA", date: "2021", credentialUrl: "#" },
    { title: "Certified Information Systems Security Professional (CISSP)", issuer: "ISC2", date: "2023", credentialUrl: "#" }
  ];

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    
    // Construct mailto link
    window.location.href = `mailto:yasir@example.com?subject=Contact from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />
      
      <Hero 
        name="Yasir"
        role="Ethical Hacker"
        description={
          <>
            Securing digital landscapes through <span className="text-primary">advanced penetration testing</span> and <span className="text-accent">responsible disclosure</span>.
          </>
        }
        githubUrl="https://github.com/syedyasirh299-hash"
        linkedinUrl="#"
        whatsappUrl="#"
        resumeUrl="#"
      />

      <About 
        bio={
          <>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a professional <span className="text-primary font-semibold">Ethical Hacker</span> with strong hands-on experience in web application security, penetration testing, and vulnerability research.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My work focuses on identifying and mitigating risks before they can be exploited. I am dedicated to responsible disclosure and real-world security testing to protect critical infrastructure and user data.
            </p>
          </>
        }
        techStack={["Burp Suite", "Metasploit", "Python", "OWASP Top 10", "Linux", "Bash", "Wireshark", "Nmap"]}
        highlights={[
          { icon: Shield, title: "Web Security", description: "Securing modern web apps" },
          { icon: Terminal, title: "Pen Testing", description: "Advanced exploitation" },
          { icon: Lock, title: "Cryptography", description: "Data protection & encryption" },
          { icon: Bug, title: "Bug Bounty", description: "Vulnerability discovery" },
        ]}
        resumeUrl="#"
      />

      <Skills customSkills={yasirSkills} />

      <Certifications certifications={yasirCerts} />
      
      <Projects customProjects={yasirProjects} />

      <section id="contact" className="py-24 px-4 relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm mb-4 block">// Get In Touch</span>
            <h2 className="section-title mb-4">Contact Yasir</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Have a security concern or project? Send me a message directly.
            </p>
          </div>

          <div className="card-glass p-8 md:p-10">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input required type="text" id="name" name="name" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input required type="email" id="email" name="email" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea required id="message" name="message" rows={5} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="How can I help you?"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-4 text-lg">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default YasirPage;
