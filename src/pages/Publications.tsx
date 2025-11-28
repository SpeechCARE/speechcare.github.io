import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import publicationsData from "@/data/publications.json";

const Publications = () => {
  useEffect(() => {
    document.title = "Publications - SpeechCARE Lab";
  }, []);

  const [selectedPub, setSelectedPub] = useState<any>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const sortByDate = (a: any, b: any) => {
    if (a.year !== b.year) return b.year - a.year;
    return (b.month || 0) - (a.month || 0);
  };

  const underReview = publicationsData
    .filter((pub) => pub.type === "Under Review")
    .sort(sortByDate);

  const inPrep = publicationsData
    .filter((pub) => pub.type === "In Preparation")
    .sort(sortByDate);

  const publications = publicationsData
    .filter((pub) => pub.type !== "In Preparation" && pub.type !== "Under Review")
    .sort(sortByDate);

  // Handle publication selection with loading state
  const handlePublicationClick = (pub: any) => {
    setSelectedPub(null); // Clear previous publication
    setImageLoading(true); // Show loading state
    
    // Small delay to ensure state updates
    setTimeout(() => {
      setSelectedPub(pub);
    }, 0);
  };

  // Handle image load completion
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Reset loading state when selectedPub changes
  useEffect(() => {
    if (selectedPub?.image) {
      setImageLoading(true);
    } else {
      setImageLoading(false);
    }
  }, [selectedPub]);

  // 🔥 PRELOAD ALL IMAGES ONCE AFTER MOUNT
  useEffect(() => {
    const allPubs = [...publications, ...underReview, ...inPrep];

    allPubs.forEach((pub) => {
      if (pub.image) {
        const img = new Image();
        img.src = pub.image;
      }
    });
  }, [publications, underReview, inPrep]);

  const Section = ({ title, items }: any) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
          {title}
        </h2>

        <div className="space-y-4">
          {items.map((pub: any) => (
            <Card
              key={pub.title + pub.year}
              className="shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer p-4"
              onClick={() => handlePublicationClick(pub)}
            >
              <CardHeader className="p-0 mb-2">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{pub.type}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {pub.month
                          ? new Date(pub.year, pub.month - 1).toLocaleString("default", {
                              month: "long",
                            })
                          : ""}{" "}
                        {pub.year}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl font-heading mb-2">
                      {pub.title}
                    </CardTitle>
                    <CardDescription className="text-sm">{pub.authors}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-1 italic">
                      {pub.venue}
                    </p>
                  </div>
                </div>
              </CardHeader>

              {pub.link && (
                <CardContent className="p-0 pt-3">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Publication <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-20 lg:-ml-60">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Publications
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Our latest research papers and conference proceedings.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT PANEL */}
            <div className="lg:col-span-2 space-y-12">
              <Section title="Publications" items={publications} />
              <Section title="Under Review" items={underReview} />
              <Section title="In Preparation" items={inPrep} />
            </div>

            {/* RIGHT PREVIEW PANEL */}
            <div
              className="
                order-last
                w-full
                mt-12
                lg:sticky lg:right-8 lg:top-32 lg:w-[400px]
                xl:w-[600px] mt-16
                2xl:w-[700px]
              "
            >
              <div className="min-h-[300px] bg-white rounded-xl p-6 shadow-md space-y-6 text-center">
                {!selectedPub && (
                  <div className="space-y-4 opacity-70">
                    <img
                      src="/default-preview.png"
                      alt="Default preview"
                      className="w-full max-h-[40vh] object-contain mx-auto"
                    />
                    <p className="text-sm text-muted-foreground italic">
                      Click on any publication to view details.
                    </p>
                  </div>
                )}

                {selectedPub && (
                  <>
                    <h2 className="text-lg md:text-xl font-semibold">
                      {selectedPub.title}
                    </h2>

                    {selectedPub?.image && (
                      <div className="relative w-full max-h-[50vh] flex items-center justify-center">
                        {imageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                          </div>
                        )}
                        <img
                          src={selectedPub.image}
                          alt="Preview"
                          className={`w-full max-h-[50vh] object-contain mx-auto cursor-zoom-in transition-opacity duration-200 ${
                            imageLoading ? 'opacity-0' : 'opacity-100'
                          }`}
                          onClick={() => !imageLoading && setZoomImage(selectedPub.image)}
                          onLoad={handleImageLoad}
                        />
                      </div>
                    )}

                    {selectedPub?.challenge && (
                      <div className="text-left">
                        <h3 className="text-lg font-semibold mb-1">Challenge</h3>
                        <p className="text-sm text-muted-foreground">{selectedPub.challenge}</p>
                      </div>
                    )}

                    {selectedPub?.solution && (
                      <div className="text-left">
                        <h3 className="text-lg font-semibold mb-1">Solution</h3>
                        <p className="text-sm text-muted-foreground">{selectedPub.solution}</p>
                      </div>
                    )}

                    {selectedPub?.result && (
                      <div className="text-left">
                        <h3 className="text-lg font-semibold mb-1">Result</h3>
                        <p className="text-sm text-muted-foreground">{selectedPub.result}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN ZOOM OVERLAY */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setZoomImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setZoomImage(null);
            }}
          >
            <X className="w-8 h-8" />
          </button>

          <img
            src={zoomImage}
            alt="Zoomed Image"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Publications;