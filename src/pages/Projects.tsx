import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import projectsData from "@/data/projects.json";
import { useEffect } from "react";

const Projects = () => {
  useEffect(() => {
    document.title = "Projects - SpeechCARE Lab";
  }, []);
  const statusPriority: Record<string, number> = {
    "Active": 1,
    "In Development": 2,
    "Completed": 3,
  };

  const projects = [...projectsData].sort((a, b) => {
    const priorityA = statusPriority[a.status] || 999;
    const priorityB = statusPriority[b.status] || 999;
    return priorityA - priorityB;
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 animate-fade-in">
            Research Projects
          </h1>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Explore our ongoing research initiatives at the intersection of AI, deep learning, and medical informatics.
          </p>

          <div className="space-y-6">
            {projects.map((project, index) => {
              const cardContent = (
                <Card
                  className={`shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in ${
                    project.slug ? "cursor-pointer" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors w-4/5">
                        {project.title}
                      </CardTitle>
                      <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );

              return project.slug ? (
                <Link key={index} to={`/projects/${project.slug}`} className="block group">
                  {cardContent}
                </Link>
              ) : (
                <div key={index} className="group">{cardContent}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
