import { Layout, Database, Smartphone, Rocket } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Layout,
      title: "Frontend Development",
      description: "Building responsive, interactive, and pixel-perfect user interfaces using React, Tailwind CSS, and modern JavaScript frameworks.",
    },
    {
      icon: Database,
      title: "Backend Integration",
      description: "Connecting frontend applications with robust backend APIs, databases, and server-side logic for dynamic functionality.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Ensuring your website looks and functions perfectly across all devices, from large desktop monitors to mobile phones.",
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description: "Optimizing web applications for speed, accessibility, and search engine visibility (SEO) to ensure the best user experience.",
    },
  ];

  return (
    <section id="services" className="py-24 px-4 relative">
       {/* Background decoration */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// What I Offer</span>
          <h2 className="section-title mb-4">My Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Professional web development solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="card-glass p-6 hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;