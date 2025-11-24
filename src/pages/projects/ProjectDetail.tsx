import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import projectsData from "@/data/projects.json";
import NotFound from "../NotFound";
import { useEffect } from "react";
// Import individual project pages
import ExplainableModels from "./explainability/ExplainableModels";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} - SpeechCARE Lab`;
    } else {
      document.title = "Project Detail - SpeechCARE Lab";
    }
  }, [project]);

  if (!project) {
    return <NotFound />;
  }

  // Route to specific project pages based on slug
  const projectPages: Record<string, React.ComponentType> = {
    "explainability": ExplainableModels,
  };

  const ProjectPage = projectPages[slug || ""];

  // If a specific page exists, use it; otherwise use the generic detail page
  if (ProjectPage) {
    return <ProjectPage />;
  }

  // Fallback generic project detail page
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
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
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
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

export default ProjectDetail;

