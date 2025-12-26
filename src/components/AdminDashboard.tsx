import { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2, Upload, X, Lock, LogOut, Loader2, AlertCircle, ChevronLeft, ChevronRight, Search, FileText } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    liveUrl: "",
    githubUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchProjects();
    } else if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated, fetchProjects]);

  useEffect(() => {
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [projects, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check as requested
    if (password === "admin51214@") {
      localStorage.setItem("token", "admin-access-token");
      setIsAuthenticated(true);
      setErrors({});
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    const urlRegex = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/i;
    if (formData.liveUrl && !urlRegex.test(formData.liveUrl)) {
      newErrors.liveUrl = "Please enter a valid URL";
    }
    if (formData.githubUrl && !urlRegex.test(formData.githubUrl)) {
      newErrors.githubUrl = "Please enter a valid URL";
    }

    if (!isEditing && !imageFile) {
      newErrors.image = "Project image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("tags", formData.tags);
    data.append("liveUrl", formData.liveUrl);
    data.append("githubUrl", formData.githubUrl);
    if (imageFile) {
      data.append("image", imageFile);
    }

    const token = localStorage.getItem("token");
    try {
      const url = isEditing 
        ? `${API_URL}/api/projects/${isEditing}`
        : `${API_URL}/api/projects`;
      
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Authorization": `Bearer ${token}` },
        body: data,
      });

      if (res.ok) {
        fetchProjects();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await fetch(`${API_URL}/api/projects/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` },
        });
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags.join(", "),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
    });
    setIsEditing(project._id);
    setShowForm(true);
    setErrors({});
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tags: "",
      liveUrl: "",
      githubUrl: "",
    });
    setImageFile(null);
    setIsEditing(null);
    setShowForm(false);
    setErrors({});
  };

  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return;
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const res = await fetch(`${API_URL}/api/upload-resume`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        alert("Resume uploaded successfully");
        setResumeFile(null);
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

        <div className="card-glass p-8 w-full max-w-md text-center relative z-10 animate-fade-in">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="btn-primary w-full justify-center">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 animate-fade-in">
          <div>
            <span className="text-primary font-mono text-sm mb-2 block">// Management</span>
            <h1 className="text-3xl md:text-4xl font-bold">Project Dashboard</h1>
          </div>
          <div className="flex gap-4">
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus className="w-5 h-5" /> Add Project
          </button>
          <button onClick={handleLogout} className="btn-outline border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/30">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Resume Upload Section */}
      <div className="card-glass p-6 mb-8 animate-fade-in">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Update Resume
        </h2>
        <form onSubmit={handleResumeUpload} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              Upload PDF Resume
            </label>
            <div className="border border-border rounded-lg p-2 bg-secondary/30">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={!resumeFile}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Resume
          </button>
        </form>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="card-glass w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold">{isEditing ? "Edit Project" : "New Project"}</h2>
              <button onClick={resetForm}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    placeholder="Project Title *"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className={`input-field p-3 rounded-lg bg-secondary/30 border w-full focus:ring-2 focus:ring-primary/50 outline-none transition-all ${errors.title ? 'border-red-500' : 'border-border'}`}
                  />
                  {errors.title && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.title}</p>}
                </div>
                <input
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="input-field p-3 rounded-lg bg-secondary/30 border border-border w-full focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <textarea
                  placeholder="Description *"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`input-field p-3 rounded-lg bg-secondary/30 border w-full h-32 focus:ring-2 focus:ring-primary/50 outline-none transition-all ${errors.description ? 'border-red-500' : 'border-border'}`}
                />
                {errors.description && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.description}</p>}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    placeholder="Live URL"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                    className={`input-field p-3 rounded-lg bg-secondary/30 border w-full focus:ring-2 focus:ring-primary/50 outline-none transition-all ${errors.liveUrl ? 'border-red-500' : 'border-border'}`}
                  />
                  {errors.liveUrl && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.liveUrl}</p>}
                </div>
                <div className="space-y-1">
                  <input
                    placeholder="GitHub URL"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                  className={`input-field p-3 rounded-lg bg-secondary/30 border w-full focus:ring-2 focus:ring-primary/50 outline-none transition-all ${errors.githubUrl ? 'border-red-500' : 'border-border'}`}
                  />
                  {errors.githubUrl && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.githubUrl}</p>}
                </div>
              </div>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:bg-secondary/30 ${errors.image ? 'border-red-500 bg-red-500/5' : 'border-border'}`}>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  accept="image/*"
                />
                <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {imageFile ? imageFile.name : "Click to upload project image"}
                  </span>
                </label>
                {errors.image && <p className="text-red-500 text-xs mt-2 flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.image}</p>}
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                {isEditing ? "Update Project" : "Save Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Search Bar */}
          <div className="mb-8 relative max-w-md animate-fade-in">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project, index) => (
              <div key={project._id} className="card-glass p-4 group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-secondary">
                  {project.imageUrl && (
                    <img src={`${API_URL}${project.imageUrl}`} alt={project.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleEdit(project)} className="p-2 hover:text-primary"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(project._id)} className="p-2 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border hover:bg-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-10 h-10 rounded-lg border transition-colors ${
                    currentPage === number
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-secondary/50"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-border hover:bg-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default AdminDashboard;