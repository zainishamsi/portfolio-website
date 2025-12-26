import { ExternalLink, Github, Play, ShoppingCart, MessageSquare, Layout, Copy, Check } from "lucide-react";
import projectNetflix from "@/assets/project-netflix.png";
import projectFacebook from "@/assets/project-facebook.png";
import projectEcommerce from "@/assets/project-ecommerce.png";
import projectChat from "@/assets/project-chat.png";
import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  image: string;
  color: string;
  borderColor: string;
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectsProps {
  customProjects?: Project[];
}

interface ProjectData {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

const defaultProjects: Project[] = [
    {
      id: '1',
      title: "Netflix Clone",
      description: "A full-featured Netflix clone with user authentication, movie browsing, and responsive design. Built with React and styled to match the original platform.",
      tags: ["React", "CSS", "API Integration"],
      icon: Play,
      image: projectNetflix,
      color: "from-red-500/20 to-red-600/10",
      borderColor: "hover:border-red-500/30",
    },
    {
      id: '2',
      title: "Facebook Clone",
      description: "Social media platform clone featuring news feed, user profiles, posts, comments, and real-time interactions.",
      tags: ["React", "Firebase", "Tailwind"],
      icon: Layout,
      image: projectFacebook,
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "hover:border-blue-500/30",
    },
    {
      id: '3',
      title: "E-Commerce Site",
      description: "Complete e-commerce solution with product catalog, shopping cart, checkout process, and payment integration.",
      tags: ["React", "Node.js", "Stripe"],
      icon: ShoppingCart,
      image: projectEcommerce,
      color: "from-green-500/20 to-green-600/10",
      borderColor: "hover:border-green-500/30",
    },
    {
      id: '4',
      title: "Chat Application",
      description: "Real-time messaging application with private chats, group conversations, and message notifications.",
      tags: ["React", "Socket.io", "MongoDB"],
      icon: MessageSquare,
      image: projectChat,
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "hover:border-purple-500/30",
      },
    ];
  
  const Projects = ({ customProjects }: ProjectsProps) => {
    const [projects, setProjects] = useState<Project[]>(customProjects || defaultProjects);
    const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    if (customProjects) return; // Don't fetch if custom projects are provided

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        const data = await res.json();
        
        const mappedProjects = data.map((p: ProjectData) => ({
          id: p._id,
          title: p.title,
          description: p.description,
          tags: p.tags,
          icon: Layout, // Default icon for dynamic projects
          image: p.imageUrl.startsWith('http') ? p.imageUrl : `${API_URL}${p.imageUrl}`,
          color: "from-gray-500/20 to-gray-600/10",
          borderColor: "hover:border-gray-500/30",
          githubUrl: p.githubUrl,
          liveUrl: p.liveUrl
        }));

        setProjects([...defaultProjects, ...mappedProjects]);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, [customProjects]);

  const otherProjects = [
    "Portfolio Website",
    "Weather App",
    "Todo Application",
    "Landing Pages",
    "Dashboard UI",
  ];

  return (
    <section id="projects" className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// My Work</span>
          <h2 className="section-title mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A collection of projects I've built to solve real problems
          </p>
        </div>

        {/* Main Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group card-glass relative overflow-hidden ${project.borderColor}`}
            >
              {/* Project image */}
              <div className="relative h-48 -mx-6 -mt-6 mb-5 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <project.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <a
                      href={project.githubUrl || "https://github.com/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                    <button
                      onClick={() => handleCopyLink(project.githubUrl || "https://github.com/", project.id)}
                      className="p-1.5 hover:bg-primary/10 rounded-md transition-colors text-muted-foreground hover:text-primary"
                      title="Copy Code Link"
                    >
                      {copiedId === project.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={project.liveUrl || "#"}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="card-glass text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            + 5 More Frontend Projects
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {otherProjects.map((project) => (
              <span key={project} className="skill-tag">
                {project}
              </span>
            ))}
          </div>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-primary hover:underline"
          >
            <Github className="w-5 h-5" />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
