import TeamMember from "./TeamMember";
import { MessageCircle } from "lucide-react";

const Team = () => {
  return (
    <section id="team" className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// Our Team</span>
          <h2 className="section-title mb-4">Meet the Experts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Combining development expertise with security intelligence
          </p>
        </div>

        <div className="grid gap-8">
          {/* New Team Member (Ethical Hacker) */}
          <TeamMember 
            name="[Team Member Name]"
            headline="Ethical Hacker | Cybersecurity Researcher | Penetration Tester"
            bio="A dedicated security professional with a passion for strengthening digital defenses, I specialize in offensive security and vulnerability assessment. With a deep understanding of attacker methodologies, I focus on identifying and mitigating risks in web applications and infrastructure before they can be exploited."
            skills={[
              "Ethical Hacking",
              "Penetration Testing",
              "Web Security",
              "Bug Bounty",
              "Vulnerability Assessment",
              "Cybersecurity Research"
            ]}
            githubUrl="https://github.com/syedyasirh299-hash"
            // No imageUrl provided, will fallback to default user icon
          />
        </div>

                {/* Hire Us Button */}
                <div className="mt-12 flex justify-center animate-fade-in">
                  <a href="#contact" className="btn btn-primary inline-flex items-center gap-2">
                    <MessageCircle size={20} />
                    Hire Us
                  </a>
                </div>
              </div>
            </section>
          );
        };
        
        export default Team;
