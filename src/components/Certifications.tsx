import { Award, ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

interface CertificationsProps {
  certifications?: Certification[];
}

const Certifications = ({ certifications }: CertificationsProps) => {
  const defaultCerts = [
    {
      title: "Meta Frontend Developer",
      issuer: "Meta",
      date: "2023",
      credentialUrl: "#"
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialUrl: "#"
    }
  ];

  const items = certifications || defaultCerts;

  return (
    <section id="certifications" className="py-24 px-4 relative">
       {/* Background decoration */}
       <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// Credentials</span>
          <h2 className="section-title mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Professional qualifications and achievements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((cert, index) => (
            <div 
              key={index}
              className="card-glass p-6 flex items-start gap-4 group hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-sm text-foreground/80 mb-1">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground mb-3">{cert.date}</p>
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Verify Credential <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;