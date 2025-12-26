import { Github, Shield, User } from "lucide-react";

interface TeamMemberProps {
  name?: string;
  headline?: string;
  bio?: string;
  skills?: string[];
  githubUrl?: string;
  imageUrl?: string;
}

const TeamMember = ({
  name = "[Team Member Name]",
  headline = "Ethical Hacker | Cybersecurity Researcher | Penetration Tester",
  bio = "A dedicated security professional with a passion for strengthening digital defenses, I specialize in offensive security and vulnerability assessment. With a deep understanding of attacker methodologies, I focus on identifying and mitigating risks in web applications and infrastructure before they can be exploited. My work is driven by a commitment to ethical standards, responsible disclosure, and continuous research in the rapidly evolving cybersecurity landscape.",
  skills = [
    "Ethical Hacking",
    "Penetration Testing",
    "Web Security",
    "Bug Bounty",
    "Vulnerability Assessment",
    "Cybersecurity Research"
  ],
  githubUrl = "https://github.com/syedyasirh299-hash",
  imageUrl
}: TeamMemberProps) => {
  return (
    <div className="card-glass p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start animate-fade-in">
      {/* Profile Image & Socials */}
      <div className="w-full md:w-1/3 flex flex-col items-center text-center space-y-4">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg shadow-primary/5">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
              <User className="w-20 h-20 text-muted-foreground/50" />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-primary font-medium text-sm">{headline}</p>
        </div>

        <a 
          href={githubUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-outline flex items-center gap-2 text-sm py-2 px-4 rounded-full hover:bg-primary/10 transition-colors border border-border"
        >
          <Github className="w-4 h-4" />
          <span>GitHub Profile</span>
        </a>
      </div>

      {/* Bio & Skills */}
      <div className="w-full md:w-2/3 space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Shield className="w-5 h-5 text-primary" />
            Professional Bio
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            {bio}
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-foreground">Key Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 rounded-md bg-secondary/50 border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;