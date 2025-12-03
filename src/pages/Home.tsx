import { useEffect } from "react";
import { ArrowRight, Brain, Activity, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import aiCardBg from "@/assets/ai-card-bg.jpg";
import healthcareCardBg from "@/assets/healthcare-card-bg.jpg";
import dataCardBg from "@/assets/data-card-bg.jpg";

const Home = () => {
  useEffect(() => {
    document.title = "Home - SpeechCARE Lab";
  }, []);
  const highlights = [
    {
      icon: Brain,
      title: "AI & Deep Learning",
      description: "Leveraging cutting-edge AI technologies to solve complex medical challenges.",
      backgroundImage: aiCardBg,
    },
    {
      icon: Activity,
      title: "Healthcare Innovation",
      description: "Transforming patient care through intelligent medical informatics solutions.",
      backgroundImage: healthcareCardBg,
    },
    {
      icon: Database,
      title: "Data-Driven Research",
      description: "Building robust models from comprehensive healthcare datasets.",
      backgroundImage: dataCardBg,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
              Advancing Healthcare Through
              <span className="block mt-2 bg-gradient-primary bg-clip-text text-transparent">
                AI & Medical Informatics
              </span>
            </h1>
            <p className="text-xl text-foreground/75 mb-8 animate-fade-in font-medium" style={{ animationDelay: "0.1s" }}>
            SpeechCARE is a research team based at Columbia University, dedicated to developing innovative AI and deep learning solutions that transform medical informatics and improve patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="group">
                <Link to="/projects">
                  Explore Our Research
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/join">Join Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="relative rounded-xl p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-card/60 backdrop-blur-sm" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-2">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold mb-3">{item.title}</h3>
                  <p className="text-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              At SpeechCARE, we combine expertise in artificial intelligence, deep learning, and
              medical informatics to develop innovative solutions that address critical challenges
              in healthcare. Our interdisciplinary approach enables us to create impactful research
              that bridges technology and medicine.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link to="/members">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
