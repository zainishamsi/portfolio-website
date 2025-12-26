import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Certifications from "./components/Certifications";
import Blog from "./components/Blog";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import YasirPage from "./components/YasirPage";
import ScrollInteraction from "./components/ScrollInteraction";
import BlogPost from "./components/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <main className="min-h-screen bg-background text-foreground font-sans antialiased">
                <Navbar />
                <Hero />
                <About />
                <Skills />
                <Services />
                <Certifications />
                <Projects />
                <Blog />
                <Testimonials />
                <Contact />
                <Footer />
                <ScrollInteraction />
              </main>
            } 
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/yasir" element={<YasirPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
