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
                    This project develops an integrated, explainable AI framework that uses large language models (LLMs) 
                    to extract, structure, and apply MCI-ED risk factors to generate individualized care plans.
                    The foundation is a comprehensive MCI-ED Knowledge Graph (KG) built from PubMed abstracts  (1990–2025) 
                    retrieved through an automated literature-review pipeline using GPT-5.1. Through a structured, multi-stage prompting process,
                    GPT-5.1 identifies clinical, social, and behavioral risk factors in each article, links them to supporting evidence, 
                    and maps them to standardized medical terminologies (e.g., SNOMED CT). The resulting KG provides a vetted, machine-readable 
                    representation of risk factors and their relationships.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-3">
                    The foundation is a comprehensive MCI-ED Knowledge Graph (KG) built from 
                    PubMed abstracts (1990–2025), retrieved using an automated 
                    literature-review pipeline powered by GPT-5.1. Through a structured, 
                    multi-stage prompting process, GPT-5.1 identifies clinical, social, and 
                    behavioral risk factors, links them to supporting evidence, and 
                    maps them to standardized medical terminologies (e.g., SNOMED CT). 
                    The resulting KG provides a vetted, machine-readable representation 
                    of risk factors and their relationships.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Using this KG, we develop an LLM-based retrieval-augmented generation (RAG) pipeline that extracts
                    risk factors directly from multimodal patient data, including patient–clinician conversations, 
                    free-text clinical notes, and structured EHR fields. The RAG pipeline retrieves relevant nodes 
                    from the KG and constrains the LLM to extract only risk factors and attributes defined in the 
                    schema—such as intensity, frequency, duration, temporal context, and family history—ensuring 
                    accuracy, reduced hallucination, and transparent evidence tracing.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    Identified risk factors then feed a generative care-plan module built on evidence-based dementia-care 
                    guidelines (e.g., CMS GUIDE Model dementia care standards and relevant NIA recommendations). 
                    Using the patient-specific risk profile and KG-linked evidence, the LLM generates precise, 
                    culturally responsive recommendations that address clinical, social, and behavioral needs. Generated care plans 
                    include modifiable risk-factor targets, monitoring steps, caregiver guidance, and guideline-based referrals. 
                    All care plans undergo human-in-the-loop review to ensure clinical safety, fairness, and relevance across 
                    sociolinguistic groups.
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
