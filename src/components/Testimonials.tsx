import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Smith",
      role: "Project Manager",
      company: "Tech Solutions",
      content: "Zain delivered an exceptional e-commerce website for our company. His attention to detail and ability to translate our vision into reality was impressive. Highly recommended!",
      avatar: "JS",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Startup Founder",
      company: "InnovateTech",
      content: "Working with Zain was a great experience. He built our landing page with clean code and beautiful design. Fast turnaround and excellent communication throughout the project.",
      avatar: "SJ",
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Product Designer",
      company: "Creative Agency",
      content: "Zain's React skills are top-notch. He implemented complex UI components with smooth animations that exceeded our expectations. A true professional!",
      avatar: "MC",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Team Lead",
      company: "Web Studio",
      content: "Excellent developer! Zain completed our chat application project ahead of schedule. His code is clean, well-documented, and easy to maintain.",
      avatar: "ED",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// Testimonials</span>
          <h2 className="section-title mb-4">What People Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Feedback from clients and colleagues I've worked with
          </p>
        </div>

        <div className="relative">
          {/* Main testimonial card */}
          <div className="card-glass p-8 md:p-12 relative">
            {/* Quote icon */}
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Quote className="w-6 h-6 text-primary" />
            </div>

            <div className="transition-all duration-500">
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full glass border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full glass border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
