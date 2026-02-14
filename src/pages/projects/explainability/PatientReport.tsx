import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import patientsData from "./explainability_patients.json";

// Import all images and audio files using Vite's glob import
const images = import.meta.glob('./images/*', { eager: true, as: 'url' });
const audios = import.meta.glob('./audios/*', { eager: true, as: 'url' });

// Helper function to get the correct asset path
const getAssetPath = (path: string): string => {
  if (!path) return '';
  
  // Extract filename from path
  const filename = path.split('/').pop();
  if (!filename) return '';
  
  // Check if it's an image or audio
  if (path.includes('/images/')) {
    const imageKey = `./images/${filename}`;
    return images[imageKey] || '';
  } else if (path.includes('/audios/')) {
    const audioKey = `./audios/${filename}`;
    return audios[audioKey] || '';
  }
  
  return '';
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
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  // Monitor dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Check on mount and when class changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Also listen to media query changes (for system preference)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {
      // Small delay to let the class update
      setTimeout(checkDarkMode, 10);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  if (!patient) {
    return (
      <div className="min-h-screen bg-background py-8">
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
    <div className="min-h-screen bg-background py-8">
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
          <Card className="bg-card border-2 border-border rounded-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Patient Profile */}
              <div className="flex flex-col items-center lg:w-1/4 w-full gap-3">
                <div className="flex-shrink-0 mb-2">
                  <img
                    src={getAssetPath(patient.image)}
                    alt={patient.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-primary"
                  />
                </div>
                <div className="flex-1 space-y-2 text-md w-full">
                  <div>
                    <span className="font-bold text-foreground">Name:</span> <span className="text-foreground/90">{patient.name}</span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Gender:</span> <span className="text-foreground/90">{patient.gender}</span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Age:</span> <span className="text-foreground/90">{patient.age}</span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Primary Language:</span> <span className="text-foreground/90">English</span>
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block h-80 border-l-2 border-border mx-4"></div>

              {/* System Outcome Section */}
              <div className="lg:w-3/4 w-full">
                <div className="flex justify-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4 border-b-2 border-[#3A4558] dark:border-[#4A5568] w-48 pb-2 text-center">
                    System Outcome
                  </h2>
                </div>
                <div className="flex md:flex-row gap-8 items-center">
                  <div className="flex flex-col items-start gap-2 w-1/3">
                    <div>
                      <span className="font-bold text-foreground">Cognitive Status:</span>{" "}
                      <span className="font-bold text-foreground">{patient.condition}</span>
                    </div>
                    <div>
                      <span className="font-bold text-foreground">System Confidence:</span>{" "}
                      <span className="font-bold text-foreground">{patient.systemConfidence || "94.0%"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-1/2">
                    {(patient as any).pieChart ? (
                      <img
                        src={getAssetPath((patient as any).pieChart)}
                        alt="Modality Contribution Pie Chart"
                        className="w-60 h-60 object-cover"
                      />
                    ) : (
                      <div className="w-60 h-60 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs text-center px-2">
                        Pie Chart Placeholder
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground text-center mt-2">
                      <span className="font-bold">Modality Contribution of Speech & Demographic</span>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-4 text-sm text-muted-foreground text-center">
                  <button
                    onClick={() => setShowPieChartInfo(!showPieChartInfo)}
                    className="text-primary font-bold text-sm hover:underline"
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
            <Card className="bg-card border-2 border-border rounded-lg p-6 flex-1">
              <h2 className="text-xl font-bold text-foreground mb-4">Significant Factors</h2>
              <ul className="space-y-3">
                {(patient.significantFactors || []).map((factor, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground/90">{factor}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-card border-2 border-border rounded-lg p-6 flex-1">
              <h2 className="text-xl font-bold text-foreground mb-4">Listen to the audio!</h2>
              {patient.audioUrl && (
                <div className="rounded-lg p-4 border-2 border-border">
                  <audio 
                    controls 
                    className="w-full"
                    style={{
                      accentColor: 'hsl(var(--primary))',
                      height: '40px'
                    }}
                  >
                    <source src={getAssetPath(patient.audioUrl)} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </Card>
          </div>

          {/* Speech Explainability Section */}
          <Card className="bg-card border-2 border-border rounded-lg mb-6 overflow-hidden">
            <button
              onClick={() => setIsSpeechExpanded(!isSpeechExpanded)}
              className="w-full bg-primary text-primary-foreground text-xl font-semibold py-3 px-4 flex justify-between items-center hover:bg-primary/90 transition-colors"
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
                <div className="border-2 border-[#3A4558] dark:border-[#4A5568] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsLinguisticExpanded(!isLinguisticExpanded)}
                    className="w-full bg-[#3A4558] hover:bg-[#2D3748] text-white text-lg font-semibold py-2 px-4 flex justify-between items-center dark:bg-[#4A5568] dark:hover:bg-[#5A6578] transition-colors"
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
                    <div className="p-4 space-y-5">
                      {/* Transcription */}
                      <p className="text-sm text-muted-foreground mb-2">The transcription of the audio is shown below. Words are highlighted based on their SHAP value. <br />Greater SHAP value = Richer highlight color = More important for the prediction</p>
                      
                      <div className="border-2 border-border rounded-lg p-2 relative">
                        <span className="absolute -top-3 left-4 bg-background px-2 py-1 font-semibold text-foreground rounded-lg">
                          Transcription
                        </span>
                        <div className="mt-1 p-4 rounded">
                          {(patient.linguistic as any)?.tokens ? (
                            <div className="text-sm leading-relaxed space-y-2">
                              {(() => {
                                const tokens = (patient.linguistic as any).tokens;
                                const maxVal =
                                  Math.max(...tokens.map((t: any) => Math.abs(t.value))) || 1;
                                
                                // Color scheme based on condition - adjusted for light and dark mode
                                const getColors = (condition: string, isDark: boolean) => {
                                  if (isDark) {
                                    // Dark mode: use lighter, more saturated colors
                                    switch (condition) {
                                      case "ADRD":
                                        return {
                                          positive: "200, 150, 240", // Lighter purple for dark mode
                                          negative: "60, 70, 90", // Darker background for dark mode
                                        };
                                      case "MCI":
                                        return {
                                          positive: "255, 180, 80", // Lighter orange for dark mode
                                          negative: "80, 60, 40", // Darker background for dark mode
                                        };
                                      case "Control":
                                        return {
                                          positive: "120, 220, 130", // Lighter green for dark mode
                                          negative: "40, 70, 50", // Darker background for dark mode
                                        };
                                      default:
                                        return {
                                          positive: "200, 150, 240", // Default to lighter purple
                                          negative: "60, 70, 90",
                                        };
                                    }
                                  } else {
                                    // Light mode: original colors
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
                                  }
                                };

                                const colors = getColors(patient.condition, isDarkMode);
                                
                                // Opacity range: min 0.25 for very low values, max 0.95 for high values
                                // This ensures lower values are dimmer and higher values are more visible
                                // Increased range for more intensive colors
                                const minOpacity = 0.0;
                                const maxOpacity = 1;
                                
                                return tokens.map((token: any, index: number) => {
                                  // Normalize value to 0-1 range
                                  const normalizedValue = Math.abs(token.value) / maxVal * 1.5;
                                  // Scale to opacity range, ensuring lower values are dimmer
                                  const opacity = minOpacity + (normalizedValue * (maxOpacity - minOpacity));
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
                      <div className="border-2 border-border rounded-lg p-5 relative">
                        <span className="absolute -top-3 left-4 bg-background px-2 py-1 font-semibold text-foreground rounded-lg">
                          Linguistic Interpretation
                        </span>
                        <div className="mt-4 space-y-3">
                          {(patient.linguistic?.interpretations || []).map((interpretation, index) => (
                            <div key={index} className="relative pl-5">
                              <span className="absolute left-0 top-3 w-2 h-2 bg-primary rounded-full"></span>
                              <div className="text-foreground/90">
                                <span className="font-bold text-foreground whitespace-nowrap">
                                  {interpretation.title}:
                                </span>{" "}
                                {interpretation.text}
                              </div>
                            </div>
                          ))}
                          {/* <div className="border-t-2 border-border pt-3 mt-3">
                            <span className="font-bold text-foreground">
                              The speaker is predicted to be {patient.condition}.
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acoustic Module */}
                <div className="border-2 border-[#3A4558] dark:border-[#4A5568] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsAcousticExpanded(!isAcousticExpanded)}
                    className="w-full bg-[#3A4558] hover:bg-[#2D3748] text-white text-lg font-semibold py-2 px-4 flex justify-between items-center dark:bg-[#4A5568] dark:hover:bg-[#5A6578] transition-colors"
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
                        <div className="border-2 border-border rounded-lg p-5 relative">
                          <span className="absolute -top-3 left-4 bg-background px-2 py-1 font-semibold text-foreground rounded-lg">
                            Waveform
                          </span>
                          <div className="mt-4">
                            <img
                              src={getAssetPath(patient.acoustic.waveform.image)}
                              alt="Waveform"
                              className="w-full mb-4"
                            />
                            <div className="space-y-2">
                            {patient.acoustic.waveform.interpretations.map((text, index) => (
                              <div key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-foreground/90">{text}</span>
                              </div>
                            ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Spectrogram */}
                      {patient.acoustic?.spectrogram && (
                        <div className="border-2 border-border rounded-lg p-5 relative">
                          <span className="absolute -top-3 left-4 bg-background px-2 py-1 font-semibold text-foreground rounded-lg">
                            Spectrogram
                          </span>
                          <div className="mt-4">
                            <img
                              src={getAssetPath(patient.acoustic.spectrogram.image)}
                              alt="Spectrogram"
                              className="w-full mb-4"
                            />
                            <div className="space-y-2">
                            {patient.acoustic.spectrogram.interpretations.map((text, index) => (
                              <div key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-foreground/90">{text}</span>
                              </div>
                            ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Entropy */}
                      {patient.acoustic?.entropy && (
                        <div className="border-2 border-border rounded-lg p-5 relative">
                          <span className="absolute -top-3 left-4 bg-background px-2 py-1 font-semibold text-foreground rounded-lg">
                            Entropy
                          </span>
                          <div className="mt-4">
                            <img
                              src={getAssetPath(patient.acoustic.entropy.image)}
                              alt="Entropy"
                              className="w-full mb-4"
                            />
                            <div className="space-y-2">
                            {patient.acoustic.entropy.interpretations.map((text, index) => (
                              <div key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-foreground/90">{text}</span>
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

          {/* Patient Health Assessment Section */}
          <Card className="bg-card border-2 border-border rounded-lg mb-6 overflow-hidden">
            <button
              onClick={() => setIsHealthExpanded(!isHealthExpanded)}
              className="w-full bg-primary text-primary-foreground text-xl font-semibold py-3 px-4 flex justify-between items-center hover:bg-primary/90 transition-colors"
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
                <div className="border-2 border-border rounded-lg p-5 relative">
                  <span className="absolute -top-3 left-4 bg-background px-2 py-1 font-semibold text-foreground rounded-lg">
                    Clinical and Functional Overview
                  </span>
                  <div className="mt-4 space-y-3">
                    <div className="font-bold text-foreground mt-4">Physiological</div>
                    <div className="space-y-2">
                      {(patient.clinical?.physiological || []).map((item, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-foreground/90">
                            <span className="font-semibold">{item.key}:</span> {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="font-bold text-foreground mt-4">Psychological and Behavioral</div>
                    <div className="space-y-2">
                      {(patient.clinical?.psychological || []).map((item, index) => (
                        <div key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-foreground/90">
                            <span className="font-semibold">{item.key}:</span> {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lab Tests */}
                <div className="border-2 border-border rounded-lg p-5 relative">
                  <span className="absolute -top-3 left-4 bg-background px-2 py-1 font-semibold text-foreground rounded-lg">
                    Lab Tests
                  </span>
                  <div className="mt-4 space-y-2">
                    {(patient.labTests || []).map((test, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-foreground/90">
                          <span className="font-semibold">{test.key}:</span> {test.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Determinants of Health */}
                <div className="border-2 border-border rounded-lg p-5 relative">
                  <span className="absolute -top-3 left-4 bg-background px-2 py-1 font-semibold text-foreground rounded-lg">
                    Social Determinants of Health (SDOH)
                  </span>
                    <div className="mt-4 text-foreground/90">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: patient.sdoh || "No SDOH data available.",
                        }}
                      />
                    </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Consideration Section */}
          <Card className="bg-card border-2 border-border rounded-lg mb-6">
            <div className="bg-primary text-primary-foreground text-xl font-semibold py-3 px-4 rounded-t-sm">
              Consideration
            </div>
            <div className="p-6 space-y-4">
              <p className="text-foreground/90">
                Please be advised that the sensitivity of this system is not 100%. A more comprehensive
                evaluation should include the individual's medical history and additional cognitive
                assessments.
              </p>
              <div className="border-2 border-border rounded-lg p-5 relative">
                <span className="absolute -top-3 left-4 bg-background px-2 py-1 font-semibold text-foreground rounded-lg">
                  Recommendations
                </span>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground/90">Having regular exercise</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground/90">Connecting with family/community</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-foreground/90">Limiting alcohol intake</span>
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
