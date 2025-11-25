import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import patientsData from "./explainability_patients.json";

// Helper function to get image URL from JSON paths
const getImageUrl = (path: string | undefined): string => {
  if (!path) return "";
  // Convert /src/pages/projects/explainability/images/... to relative path
  if (path.startsWith("/src/pages/projects/explainability/")) {
    const relativePath = path.replace("/src/pages/projects/explainability/", "");
    return new URL(`./${relativePath}`, import.meta.url).href;
  }
  // Handle /assets/images/... paths (some entries use this format)
  if (path.startsWith("/assets/images/")) {
    const relativePath = path.replace("/assets/images/", "images/");
    return new URL(`./${relativePath}`, import.meta.url).href;
  }
  // Handle /src/pages/projects/explainability/audios/... for audio files
  if (path.startsWith("/src/pages/projects/explainability/audios/")) {
    const relativePath = path.replace("/src/pages/projects/explainability/", "");
    return new URL(`./${relativePath}`, import.meta.url).href;
  }
  // Fallback: return as-is if path doesn't match expected patterns
  return path;
};

const PatientReport = () => {
  useEffect(() => {
    document.title = "Patient Report - SpeechCARE Lab";
  }, []);
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const patient = patientsData.find((p) => p.id === patientId);
  const [isHealthExpanded, setIsHealthExpanded] = useState(false);
  const [isSpeechExpanded, setIsSpeechExpanded] = useState(false);
  const [isLinguisticExpanded, setIsLinguisticExpanded] = useState(false);
  const [isAcousticExpanded, setIsAcousticExpanded] = useState(false);
  const [showPieChartInfo, setShowPieChartInfo] = useState(false);

  if (!patient) {
    return (
      <div className="min-h-screen bg-[#E5F1F3] py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-xl">Patient not found</p>
            <Button onClick={() => navigate("/projects/explainability/demo")} className="mt-4">
              Back to Patient List
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E5F1F3] py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button variant="default" asChild className="mb-6 -mt-4">
            <Link to="/projects/explainability/demo">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patient List
            </Link>
          </Button>

          {/* Patient Profile and System Outcome Section */}
          <Card className="bg-white border-2 border-[#1E3658] rounded-lg p-6 mb-6 border-b-2 border-[#1E3658]">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Patient Profile */}
              <div className="flex flex-col items-center lg:w-1/4 w-full gap-3">
                <div className="flex-shrink-0 mb-2">
                  <img
                    src={getImageUrl(patient.image)}
                    alt={patient.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-[#1E3658]"
                  />
                </div>
                <div className="flex-1 space-y-2 text-md w-full">
                  <div>
                    <span className="font-bold text-[#1E3658]">Name:</span> {patient.name}
                  </div>
                  <div>
                    <span className="font-bold text-[#1E3658]">Gender:</span> {patient.gender}
                  </div>
                  <div>
                    <span className="font-bold text-[#1E3658]">Age:</span> {patient.age}
                  </div>
                  <div>
                    <span className="font-bold text-[#1E3658]">Primary Language:</span> English
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block h-80 border-l-2 border-[#1E3658] mx-4"></div>

              {/* System Outcome Section */}
              <div className="lg:w-3/4 w-full">
                <div className="flex justify-center">
                  <h2 className="text-2xl font-bold text-[#1E3658] mb-4 border-b-2 border-[#7fa37f] w-48 pb-2 text-center">
                    System Outcome
                  </h2>
                </div>
                <div className="flex md:flex-row gap-8 items-center">
                  <div className="flex flex-col items-start gap-2 w-1/3">
                    <div>
                      <span className="font-bold text-[#350a29]">Cognitive Status:</span>{" "}
                      <span className="font-bold">{patient.condition}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#350a29]">System Confidence:</span>{" "}
                      <span className="font-bold">{patient.systemConfidence || "94.0%"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-1/2">
                    {(patient as any).pieChart ? (
                      <img
                        src={getImageUrl((patient as any).pieChart)}
                        alt="Modality Contribution Pie Chart"
                        className="w-60 h-60 object-contain"
                      />
                    ) : (
                      <div className="w-60 h-60 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs text-center px-2">
                        Pie Chart Placeholder
                      </div>
                    )}
                    <div className="text-sm text-gray-600 text-center mt-2">
                      <span className="font-bold">Modality Contribution of Speech & Demographic</span>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-4 text-sm text-gray-600 text-center">
                  <button
                    onClick={() => setShowPieChartInfo(!showPieChartInfo)}
                    className="text-[#7fa37f] font-bold text-sm hover:underline"
                  >
                    {showPieChartInfo ? "Less Info" : "More Info"}
                  </button>
                  {showPieChartInfo && (
                    <div className="text-sm text-gray-600 text-center mt-2 max-w-2xl mx-auto">
                      ** The baseline SpeechCARE model was trained using only speech and demographic
                      information. At this stage, we are unable to generate a pie chart showing the
                      separate contributions of Clinical, Speech, and Demographic information. However,
                      as we enhance the model by incorporating clinical, demographic, and speech data,
                      the updated pie chart will reflect the contribution of each modality more
                      comprehensively.
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </Card>

          {/* Significant Factors and Audio Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <Card className="bg-white border-2 border-[#1E3658] rounded-lg p-6 flex-1">
              <h2 className="text-xl font-bold text-[#1E3658] mb-4">Significant Factors</h2>
              <ul className="space-y-3">
                {(patient.significantFactors || []).map((factor, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-white border-2 border-[#1E3658] rounded-lg p-6 flex-1">
              <h2 className="text-xl font-bold text-[#1E3658] mb-4">Listen to the audio!</h2>
              {patient.audioUrl && (
                <div className="bg-[#E5F1F3] rounded-lg p-4 border-2 border-[#1E3658]">
                  <audio 
                    controls 
                    className="w-full"
                    style={{
                      accentColor: '#1E3658',
                      height: '40px'
                    }}
                  >
                    <source src={getImageUrl(patient.audioUrl)} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </Card>
          </div>

          {/* Patient Health Assessment Section */}
          <Card className="bg-white border-2 border-[#1E3658] rounded-lg mb-6 overflow-hidden">
            <button
              onClick={() => setIsHealthExpanded(!isHealthExpanded)}
              className="w-full bg-[#1E3658] text-white text-xl font-semibold py-3 px-4 flex justify-between items-center hover:bg-[#1a2d47] transition-colors"
            >
              Patient Health Assessment
              <span className={`transform transition-transform ${isHealthExpanded ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isHealthExpanded ? "max-h-[5000px]" : "max-h-0"
              }`}
            >
              <div className="p-6 space-y-6">
                {/* Clinical and Functional Overview */}
                <div className="border-2 border-[#1E3658] rounded-lg p-5 relative">
                  <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658] rounded-lg">
                    Clinical and Functional Overview
                  </span>
                  <div className="mt-4 space-y-3">
                    <div className="font-bold text-[#004d0c] mt-4">Physiological</div>
                    <div className="space-y-2">
                      {(patient.clinical?.physiological || []).map((item, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>
                            <span className="font-semibold">{item.key}:</span> {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="font-bold text-[#004d0c] mt-4">Psychological and Behavioral</div>
                    <div className="space-y-2">
                      {(patient.clinical?.psychological || []).map((item, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>
                            <span className="font-semibold">{item.key}:</span> {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lab Tests */}
                <div className="border-2 border-[#1E3658] rounded-lg p-5 relative">
                  <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658] rounded-lg">
                    Lab Tests
                  </span>
                  <div className="mt-4 space-y-2">
                    {(patient.labTests || []).map((test, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>
                          <span className="font-semibold">{test.key}:</span> {test.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Determinants of Health */}
                <div className="border-2 border-[#1E3658] rounded-lg p-5 relative">
                  <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658] rounded-lg">
                    Social Determinants of Health (SDOH)
                  </span>
                  <div className="mt-4">
                    <p>{patient.sdoh || "No SDOH data available."}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Speech Explainability Section */}
          <Card className="bg-white border-2 border-[#1E3658] rounded-lg mb-6 overflow-hidden">
            <button
              onClick={() => setIsSpeechExpanded(!isSpeechExpanded)}
              className="w-full bg-[#1E3658] text-white text-xl font-semibold py-3 px-4 flex justify-between items-center hover:bg-[#1a2d47] transition-colors"
            >
              Speech Explainability
              <span className={`transform transition-transform ${isSpeechExpanded ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isSpeechExpanded ? "max-h-[5000px]" : "max-h-0"
              }`}
            >
              <div className="p-6 space-y-4">
                {/* Linguistic Module */}
                <div className="border-2 border-[#7fa37f] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsLinguisticExpanded(!isLinguisticExpanded)}
                    className="w-full bg-[#7fa37f] text-white text-lg font-semibold py-2 px-4 flex justify-between items-center hover:bg-[#6a8f6a] transition-colors"
                  >
                    Linguistic Module
                    <span className={`transform transition-transform ${isLinguisticExpanded ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isLinguisticExpanded ? "max-h-[5000px]" : "max-h-0"
                    }`}
                  >
                    <div className="p-4 space-y-4">
                      {/* Transcription */}
                      <p className="text-sm text-gray-600 mb-2">The transcription of the audio is shown below. Words are highlighted based on their SHAP value. <br />Greater SHAP value = Richer highlight color = More important for the prediction</p>
                      
                      <div className="border-2 border-[#1E3658] rounded-lg p-5 relative">
                        <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658] rounded-lg">
                          Transcription
                        </span>
                        <div className="mt-4 bg-[#E5F1F3] p-4 rounded">
                          {(patient.linguistic as any)?.tokens ? (
                            <div className="text-sm leading-relaxed">
                              {(() => {
                                const tokens = (patient.linguistic as any).tokens;
                                const maxVal =
                                  Math.max(...tokens.map((t: any) => Math.abs(t.value))) || 1;
                                
                                // Color scheme based on condition
                                const getColors = (condition: string) => {
                                  switch (condition) {
                                    case "ADRD":
                                      return {
                                        positive: "171, 105, 212", // Purple
                                        negative: "230, 242, 244", // Light blue/background
                                      };
                                    case "MCI":
                                      return {
                                        positive: "255, 140, 0", // Orange
                                        negative: "255, 237, 213", // Light orange
                                      };
                                    case "Control":
                                      return {
                                        positive: "76, 175, 80", // Green
                                        negative: "200, 230, 201", // Light green
                                      };
                                    default:
                                      return {
                                        positive: "171, 105, 212", // Default to purple
                                        negative: "230, 242, 244",
                                      };
                                  }
                                };

                                const colors = getColors(patient.condition);
                                
                                return tokens.map((token: any, index: number) => {
                                  const opacity = (Math.abs(token.value) / maxVal) * 2;
                                  const backgroundColor =
                                    token.value > 0
                                      ? `rgba(${colors.positive}, ${opacity})`
                                      : `rgba(${colors.negative}, ${opacity})`;

                                  return (
                                    <span
                                      key={index}
                                      style={{ backgroundColor }}
                                      className="rounded px-0.5 inline-block"
                                      title={`SHAP Value: ${token.value}`}
                                    >
                                      {token.text}
                                    </span>
                                  );
                                });
                              })()}
                            </div>
                          ) : (
                            <p className="text-sm leading-relaxed">
                              {patient.linguistic?.transcription || "No transcription available."}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Linguistic Interpretation */}
                      <div className="border-2 border-[#1E3658] rounded-lg p-5 relative">
                        <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658] rounded-lg">
                          Linguistic Interpretation
                        </span>
                        <div className="mt-4 space-y-3">
                          {(patient.linguistic?.interpretations || []).map((interpretation, index) => (
                            <div key={index} className="relative pl-5">
                              <span className="absolute left-0 top-3 w-2 h-2 bg-[#1E3658] rounded-full"></span>
                              <div>
                                <span className="font-bold text-[#1E3658] whitespace-nowrap">
                                  {interpretation.title}:
                                </span>{" "}
                                {interpretation.text}
                              </div>
                            </div>
                          ))}
                          <div className="border-t-2 border-[#1E3658] pt-3 mt-3">
                            <span className="font-bold text-[#1E3658]">
                              The speaker is predicted to be cognitively impaired.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acoustic Module */}
                <div className="border-2 border-[#7fa37f] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsAcousticExpanded(!isAcousticExpanded)}
                    className="w-full bg-[#7fa37f] text-white text-lg font-semibold py-2 px-4 flex justify-between items-center hover:bg-[#6a8f6a] transition-colors"
                  >
                    Acoustic Module
                    <span className={`transform transition-transform ${isAcousticExpanded ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isAcousticExpanded ? "max-h-[5000px]" : "max-h-0"
                    }`}
                  >
                    <div className="p-4 space-y-4">
                      {/* Waveform */}
                      {patient.acoustic?.waveform && (
                        <div className="border-2 border-[#1E3658] rounded-lg p-5 relative">
                          <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658] rounded-lg">
                            Waveform
                          </span>
                          <div className="mt-4">
                            <img
                              src={getImageUrl(patient.acoustic.waveform.image)}
                              alt="Waveform"
                              className="w-full mb-4"
                            />
                            <div className="space-y-2">
                            {patient.acoustic.waveform.interpretations.map((text, index) => (
                              <div key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>{text}</span>
                              </div>
                            ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Spectrogram */}
                      {patient.acoustic?.spectrogram && (
                        <div className="border-2 border-[#1E3658] rounded-lg p-5 relative">
                          <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658] rounded-lg">
                            Spectrogram
                          </span>
                          <div className="mt-4">
                            <img
                              src={getImageUrl(patient.acoustic.spectrogram.image)}
                              alt="Spectrogram"
                              className="w-full mb-4"
                            />
                            <div className="space-y-2">
                            {patient.acoustic.spectrogram.interpretations.map((text, index) => (
                              <div key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>{text}</span>
                              </div>
                            ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Entropy */}
                      {patient.acoustic?.entropy && (
                        <div className="border-2 border-[#1E3658] rounded-lg p-5 relative">
                          <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658] rounded-lg">
                            Entropy
                          </span>
                          <div className="mt-4">
                            <img
                              src={getImageUrl(patient.acoustic.entropy.image)}
                              alt="Entropy"
                              className="w-full mb-4"
                            />
                            <div className="space-y-2">
                            {patient.acoustic.entropy.interpretations.map((text, index) => (
                              <div key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>{text}</span>
                              </div>
                            ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Consideration Section */}
          <Card className="bg-white border-2 border-[#1E3658] rounded-lg mb-6">
            <div className="bg-[#1E3658] text-white text-xl font-semibold py-3 px-4 rounded-t-lg">
              Consideration
            </div>
            <div className="p-6 space-y-4">
              <p>
                Please be advised that the sensitivity of this system is not 100%. A more comprehensive
                evaluation should include the individual's medical history and additional cognitive
                assessments.
              </p>
              <div className="border-2 border-[#1E3658] rounded-lg p-5 relative">
                <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658] rounded-lg">
                  Recommendations
                </span>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Having regular exercise</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Connecting with family/community</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-[#1E3658] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Limiting alcohol intake</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientReport;
