import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import projectsData from "@/data/projects.json";

const RiskFactorModule = () => {
  const project = projectsData.find((p) => p.slug === "risk factor");

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

                {/* Challenge */}
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Challenge</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Risk factors for cognitive impairment are dispersed across EHRs, and patient–clinician conversations, 
                    making it difficult to form a complete risk profile. Clinicians, already constrained by limited time, 
                    often struggle to translate these fragmented data into high-quality, individualized care plans, 
                    and current approaches rarely incorporate patient or caregiver perspectives.
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Solution</h2>
                  <p className="text-muted-foreground leading-relaxed">
                      Our solution provides an evidence-based LLM framework that consolidates risk factors into a 
                      validated knowledge graph, extracts patient-specific risks through retrieval-augmented methods,
                       and generates personalized care plans that align with clinical guidelines while reflecting 
                       patient and caregiver needs.
                  </p>
                </div>

                {/* Detailed Solution */}
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Methodology</h2>

                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We develop an explainable LLM-based framework to extract MCI-ED risk factors from patient data 
                    and generate individualized care plans. A curated MCI-ED Knowledge Graph is constructed from 
                    PubMed abstracts (1990–2025) using a GPT-5.1–based literature pipeline, mapping evidence-linked
                    risk factors to standardized terminologies. A retrieval-augmented pipeline extracts predefined
                    risk factors from multimodal patient data and informs risk factor extraction from textual data.
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

export default RiskFactorModule;
