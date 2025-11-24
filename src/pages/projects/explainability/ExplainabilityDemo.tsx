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
    <div className="min-h-screen bg-[#E5F1F3] py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Button variant="default" asChild className="mb-6 -mt-4">
            <Link to="/projects/explainability">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>
          </Button>

          <div className="space-y-6">
            {/* Banner */}
            <div className="bg-[#1E3658] text-white text-xl font-semibold py-3 px-4 rounded-md text-center">
              SpeechCARE Explainability Framework Demonstration
            </div>

            {/* Welcome Text */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-[#1E3658]">
                Select a Patient
              </h2>
              <p className="text-lg text-[#1E3658]">
                Choose from the available patient assessment reports below.
              </p>
            </div>

            {/* Patient Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {patientsData.map((patient) => (
                <Card
                  key={patient.id}
                  className="bg-white border-2 border-[#1E3658] rounded-lg p-5 text-center transition-all hover:transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  onClick={() => navigate(`/projects/explainability/demo/${patient.id}`)}
                >
                  <div className="text-2xl font-bold text-[#1E3658] mb-3">
                    {patient.name} ({patient.condition})
                  </div>
                  <Button
                    className="w-full bg-[#7fa37f] hover:bg-[#6a8f6a] text-white font-semibold py-3 px-6 rounded"
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

