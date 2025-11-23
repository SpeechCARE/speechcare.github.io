import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import projectsData from "@/data/projects.json";

const ExplainableModels = () => {
  const project = projectsData.find((p) => p.slug === "explainability");

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6 -mt-8">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <CardTitle className="text-3xl md:text-4xl font-heading mb-3">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <CardDescription className="text-lg">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <Button size="lg" asChild>
                    <Link to="/projects/explainability/demo">View Demonstration</Link>
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This project focuses on developing explainable transformer-based models for
                    detecting Alzheimer's disease from speech and text data. Our research aims to
                    create models that not only achieve high accuracy but also provide
                    interpretable insights into the decision-making process, which is crucial for
                    clinical applications.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Research Objectives</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Develop transformer-based architectures optimized for speech and text
                        analysis in the context of Alzheimer's disease detection
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Implement explainability techniques to provide interpretable model
                        predictions for clinical decision support
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Validate model performance on diverse datasets to ensure generalizability
                        across different populations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Create tools and frameworks for clinicians to understand and trust AI-based
                        diagnostic recommendations
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Methodology</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Our approach combines state-of-the-art transformer architectures with
                    explainability techniques such as attention visualization, gradient-based
                    attribution methods, and feature importance analysis. We process both speech
                    signals and transcribed text to capture linguistic and acoustic markers
                    associated with early-stage Alzheimer's disease.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The models are trained on carefully curated datasets and evaluated using
                    standard clinical metrics, with a focus on early detection capabilities that
                    can support timely intervention.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Impact</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This research contributes to the growing field of explainable AI in healthcare,
                    addressing the critical need for transparent and interpretable diagnostic tools.
                    By providing clinicians with understandable model predictions, we aim to
                    facilitate better integration of AI technologies into clinical workflows and
                    improve patient care outcomes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExplainableModels;

