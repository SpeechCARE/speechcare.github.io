import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useEffect } from "react";

const Join = () => {
  useEffect(() => {
    document.title = "Join Us - SpeechCARE Lab";
  }, []);
  const positions = [
    // {
    //   title: "PhD Positions",
    //   description: "Full-time doctoral research positions for candidates interested in medical informatics and AI.",
    //   requirements: [
    //     "Master's degree in Computer Science, Biomedical Engineering, or related field",
    //     "Strong background in machine learning or deep learning",
    //     "Experience with Python and relevant ML frameworks",
    //     "Interest in healthcare applications",
    //   ],
    // },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 animate-fade-in">
            Join Our Team
          </h1>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            We're always looking for talented, passionate researchers to join SpeechCARE. Explore
            current opportunities and learn how to apply.
          </p>

          <div className="space-y-6 mb-12">
            {positions.map((position, index) => (
              <Card
                key={index}
                className="shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-heading mb-2">{position.title}</CardTitle>
                  <CardDescription className="text-base">{position.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Requirements & Qualifications</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {position.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-card bg-gradient-hero">
            <CardHeader>
              <CardTitle className="text-2xl font-heading mb-2">How to Apply</CardTitle>
              <CardDescription className="text-base">
                Interested in joining our team? We'd love to hear from you!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Please send your application materials to our recruitment team. Include:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Curriculum Vitae (CV) or resume</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Cover letter explaining your research interests and fit with SpeechCARE</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Research statement (for postdoc and faculty positions)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Contact information for 2-3 references</span>
                </li>
              </ul>
              <Button size="lg" className="group">
                <Mail className="mr-2 h-4 w-4" />
                <a href="mailto:recruitment@speechcare.org">recruitment@speechcare.org</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Join;
