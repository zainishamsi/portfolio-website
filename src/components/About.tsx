import { Code2, Palette, Zap, Users, Download } from "lucide-react";

interface AboutProps {
  bio?: React.ReactNode;
  techStack?: string[];
  highlights?: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[];
  resumeUrl?: string;
}

const About = ({ bio, techStack, highlights, resumeUrl = "/resume.pdf" }: AboutProps) => {
  const defaultHighlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable and scalable code",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating beautiful user interfaces",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing for speed and efficiency",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively in teams",
    },
  ];

  const displayHighlights = highlights || defaultHighlights;

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// About Me</span>
          <h2 className="section-title mb-4">Passionate Developer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Building the web, one component at a time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6">
            {bio || (
              <>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate web developer with <span className="text-primary font-semibold">1+ year of experience</span> building modern web applications. I love turning ideas into reality through code.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My journey in web development has led me to work on diverse projects, from social media clones to e-commerce platforms. I specialize in creating responsive, user-friendly interfaces using the latest technologies.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When I'm not coding, I'm exploring new technologies and contributing to open-source projects. I believe in continuous learning and staying updated with industry trends.
                </p>
              </>
            )}

            {/* Tech stack */}
            <div className="pt-6">
              <h3 className="text-sm font-mono text-primary mb-4">{"// Tech Stack"}</h3>
              <div className="flex flex-wrap gap-3">
                {(techStack || ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind", "Node.js", "Git"]).map((tech) => (
                  <span key={tech} className="skill-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Download CV Button */}
            <div className="pt-4">
              <a 
                href={resumeUrl}
                download 
                className="btn-primary inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* Right side - Cards */}
          <div className="grid grid-cols-2 gap-4">
            {displayHighlights.map((item, index) => (
              <div
                key={item.title}
                className="card-glass group cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
