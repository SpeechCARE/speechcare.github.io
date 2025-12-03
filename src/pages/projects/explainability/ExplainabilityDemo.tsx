import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import patientsData from "./explainability_patients.json";
import { useEffect } from "react";

const ExplainabilityDemo = () => {
  useEffect(() => {
    document.title = "Explainability Demo - SpeechCARE Lab";
  }, []);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Button variant="default" asChild className="mb-6 -mt-4">
            <Link to="/projects/explainability">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
          </Button>

          <div className="space-y-6">
            {/* Title */}
            <div className="text-center mb-20 md:mb-28">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                SpeechCARE Explainability Framework Demonstration
              </h1>
            </div>

            {/* Guide Section */}
            <div className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg space-y-3">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Select a Patient
              </h2>
              <p className="text-base text-muted-foreground">
                Choose from the available patient assessment reports below. (The cognitive status of the patient is shown in the parentheses.)
              </p>
            </div>

            {/* Patient Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {patientsData.map((patient) => (
                <Card
                  key={patient.id}
                  className="bg-card border-2 border-border rounded-lg p-5 text-center transition-all hover:transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  onClick={() => navigate(`/projects/explainability/demo/${patient.id}`)}
                >
                  <div className="text-2xl font-bold text-foreground mb-3">
                    {patient.name} ({patient.condition})
                  </div>
                  <Button
                    className="w-full bg-[#3A4558] hover:bg-[#2D3748] text-white font-semibold py-3 px-6 rounded dark:bg-[#4A5568] dark:hover:bg-[#5A6578]"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/explainability/demo/${patient.id}`);
                    }}
                  >
                    View Report
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplainabilityDemo;

