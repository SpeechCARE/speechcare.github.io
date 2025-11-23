import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import patientsData from "./explainability_patients.json";
import { useState } from "react";

const PatientReport = () => {
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
              <div className="flex gap-6 items-center flex-1">
                <div className="flex-shrink-0">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-60 h-60 rounded-full object-cover border-4 border-[#1E3658]"
                  />
                </div>
                <div className="flex-1 space-y-2 text-lg">
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

              {/* System Outcome Section */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#1E3658] mb-4 border-b-2 border-[#7fa37f] w-48 pb-2">
                  System Outcome
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-3 text-lg">
                    <div>
                      <span className="font-bold text-[#350a29]">Cognitive Status:</span>{" "}
                      <span className="font-bold">{patient.condition}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#350a29]">System Confidence:</span>{" "}
                      <span className="font-bold">{patient.systemConfidence || "94.0%"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    {(patient as any).pieChart ? (
                      <img
                        src={(patient as any).pieChart}
                        alt="Modality Contribution Pie Chart"
                        className="w-60 h-60 object-contain"
                      />
                    ) : (
                      <div className="w-60 h-60 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs text-center px-2">
                        Pie Chart Placeholder
                      </div>
                    )}
                    <div className="text-sm text-gray-600 text-center">
                      <span className="font-bold">Modality Contribution of Speech & Demographic</span>
                      <button
                        onClick={() => setShowPieChartInfo(!showPieChartInfo)}
                        className="text-[#7fa37f] font-bold text-sm ml-2 hover:underline"
                      >
                        ({showPieChartInfo ? "Less Info" : "More Info"})
                      </button>
                    </div>
                    {showPieChartInfo && (
                      <div className="text-sm text-gray-600 text-center mt-2 max-w-md">
                        ** The baseline SpeechCARE model was trained using only speech and demographic
                        information. At this stage, we are unable to generate a pie chart showing the
                        separate contributions of Clinical, Speech, and Demographic information. However,
                        as we enhance the model by incorporating clinical, demographic, and speech data,
                        the updated pie chart will reflect the contribution of each modality more
                        comprehensively.
                      </div>
                    )}
                  </div>
                </div>
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
                <audio controls className="w-full max-w-md">
                  <source src={patient.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
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
                  <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658]">
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
                  <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658]">
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
                  <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658]">
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
                      <div className="border-2 border-[#1E3658] rounded-lg p-4">
                        <div className="bg-[#E5F1F3] p-4 rounded">
                          <p className="text-sm leading-relaxed">{patient.linguistic?.transcription || "No transcription available."}</p>
                        </div>
                      </div>

                      {/* Linguistic Interpretation */}
                      <div className="border-2 border-[#1E3658] rounded-lg p-4">
                        <div className="space-y-3">
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
                        <div className="border-2 border-[#1E3658] rounded-lg p-4">
                          <img
                            src={patient.acoustic.waveform.image}
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
                      )}

                      {/* Spectrogram */}
                      {patient.acoustic?.spectrogram && (
                        <div className="border-2 border-[#1E3658] rounded-lg p-4">
                          <img
                            src={patient.acoustic.spectrogram.image}
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
                      )}

                      {/* Entropy */}
                      {patient.acoustic?.entropy && (
                        <div className="border-2 border-[#1E3658] rounded-lg p-4">
                          <img
                            src={patient.acoustic.entropy.image}
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
                <span className="absolute -top-3 left-4 bg-[#E5F1F3] px-2 font-semibold text-[#1E3658]">
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
