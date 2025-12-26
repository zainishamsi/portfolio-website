import { Github, Linkedin, MessageCircle, Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const contactLinks = [
    {
      icon: Github,
      label: "GitHub",
      value: "github.com",
      href: "https://github.com/",
      color: "hover:text-foreground",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com",
      href: "https://www.linkedin.com/feed/",
      color: "hover:text-blue-400",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with me",
      href: "https://wa.me/923206438834",
      color: "hover:text-green-400",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// Get In Touch</span>
          <h2 className="section-title mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Contact Info */}
          <div className="space-y-6">
            <div className="card-glass">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email Me</h3>
                  <p className="text-muted-foreground text-sm">I'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground text-sm">Available for remote work worldwide</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 card-glass group ${link.color}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{link.label}</h4>
                    <p className="text-sm text-muted-foreground">{link.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right - CTA Card */}
          <div className="card-glass flex flex-col items-center justify-center text-center p-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 glow">
              <Send className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start?</h3>
            <p className="text-muted-foreground mb-8">
              Whether you have a project idea or just want to chat about web development, feel free to reach out!
            </p>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              Message on WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center mt-3"
            >
              <Linkedin className="w-5 h-5" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
