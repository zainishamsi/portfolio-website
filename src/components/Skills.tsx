import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
}

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: "React", level: 90, color: "from-cyan-400 to-blue-500" },
    { name: "JavaScript", level: 85, color: "from-yellow-400 to-orange-500" },
    { name: "TypeScript", level: 80, color: "from-blue-400 to-blue-600" },
    { name: "HTML5", level: 95, color: "from-orange-400 to-red-500" },
    { name: "CSS3 / Tailwind", level: 90, color: "from-teal-400 to-cyan-500" },
    { name: "Node.js", level: 70, color: "from-green-400 to-green-600" },
    { name: "Git & GitHub", level: 85, color: "from-gray-400 to-gray-600" },
    { name: "Responsive Design", level: 90, color: "from-pink-400 to-purple-500" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// My Skills</span>
          <h2 className="section-title mb-4">Technical Proficiency</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies I work with to build amazing web experiences
          </p>
        </div>

        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-foreground">{skill.name}</span>
                <span className="text-primary font-mono text-sm">{skill.level}%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative`}
                  style={{
                    width: isVisible ? `${skill.level}%` : "0%",
                    transitionDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { label: "Projects", value: "9+" },
            { label: "Technologies", value: "10+" },
            { label: "Experience", value: "1 Year" },
            { label: "Commits", value: "500+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="card-glass text-center py-6 opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.8 + index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
