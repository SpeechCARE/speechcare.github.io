import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github } from "lucide-react";
import membersData from "@/data/members.json";
import { useEffect } from "react";

const Members = () => {
  useEffect(() => {
    document.title = "Members - SpeechCARE Lab";
  }, []);
  const members = [...membersData];

  // Helper function to get image URL
  const getImageUrl = (imageName: string) => {
    // Use Vite's asset handling - images should be in src/assets/member_images/
    return new URL(`../assets/member_images/${imageName}`, import.meta.url).href;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 animate-fade-in">
            Our Team
          </h1>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Meet the researchers and scientists driving innovation in medical informatics and AI at SpeechCARE.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {members.map((member, index) => (
              <Card
                key={index}
                className="shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  {member.image && (
                    <div className="mb-4 flex justify-center">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-border shadow-lg">
                        <img
                          src={getImageUrl(member.image)}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image doesn't exist
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-2xl font-heading mb-1">{member.name}</CardTitle>
                      <Badge className="mb-3">{member.role}</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base">{member.bio}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((area, areaIndex) => (
                          <Badge key={areaIndex} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <a
                        href={`mailto:${member.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="h-6 w-6" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
