import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ExternalLink, X, Loader2, ChevronRight, Info, Target, Lightbulb, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import publicationsData from "@/data/publications.json";

const LG_BREAKPOINT = 1024; // Tailwind's lg breakpoint

const Publications = () => {
  useEffect(() => {
    document.title = "Publications - SpeechCARE Lab";
  }, []);

  const [selectedPub, setSelectedPub] = useState<any>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

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
    // Only clear if switching to a different publication
    if (selectedPub && selectedPub.title !== pub.title) {
      setImageLoading(true);
    }
    setSelectedPub(pub);
  };

  // Handle image zoom
  const handleImageZoom = (imageUrl: string) => {
    setZoomImage(imageUrl);
  };

  // Preview content component (reusable for both desktop and mobile)
  const PreviewContent = ({ pub }: { pub: any }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Publication Title */}
      <div>
        <h2 className="text-xl font-heading font-semibold mb-3 leading-tight">
          {pub.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {pub.type}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {pub.month
              ? new Date(pub.year, pub.month - 1).toLocaleString("default", {
                  month: "long",
                })
              : ""}{" "}
            {pub.year}
          </Badge>
        </div>
        {pub.link && (
          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
          >
            View Full Publication <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Publication Image */}
      {pub?.image && (
        <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          <img
            src={pub.image}
            alt={pub.title}
            className={`w-full max-h-[50vh] object-contain mx-auto cursor-zoom-in transition-opacity duration-300 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onClick={() => !imageLoading && handleImageZoom(pub.image)}
            onLoad={handleImageLoad}
          />
          {!imageLoading && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
              Click to zoom
            </div>
          )}
        </div>
      )}

      {/* Challenge Section */}
      {pub?.challenge && (
        <div className="text-left space-y-2">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Challenge
          </h3>
          <div 
            className="text-sm text-muted-foreground text-justify leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:mt-1.5 [&_p]:mb-2"
            dangerouslySetInnerHTML={{
              __html: pub.challenge
            }}
          />
        </div>
      )}

      {/* Solution Section */}
      {pub?.solution && (
        <div className="text-left space-y-2">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Solution
          </h3>
          <div 
            className="text-sm text-muted-foreground text-justify leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:mt-1.5 [&_p]:mb-2"
            dangerouslySetInnerHTML={{
              __html: pub.solution
            }}
          />
        </div>
      )}

      {/* Result Section */}
      {pub?.result && (
        <div className="text-left space-y-2">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Result
          </h3>
          <div 
            className="text-sm text-muted-foreground text-justify leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:mt-1.5 [&_p]:mb-2"
            dangerouslySetInnerHTML={{
              __html: pub.result
            }}
          />
        </div>
      )}
    </div>
  );

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

  // Track screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < LG_BREAKPOINT);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
          {items.map((pub: any) => {
            const isSelected = selectedPub?.title === pub.title;
            return (
              <Card
                key={pub.title + pub.year}
                className={`
                  group shadow-card transition-all duration-300 cursor-pointer p-4
                  hover:shadow-hover hover:border-primary/50
                  ${isSelected 
                    ? "border-2 border-primary bg-primary/5 shadow-hover" 
                    : "border border-border hover:border-primary/30"
                  }
                `}
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

                      <CardTitle className="text-xl font-heading mb-2 group-hover:text-primary transition-colors">
                        {pub.title}
                      </CardTitle>
                      <CardDescription className="text-sm">{pub.authors}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-1 italic">
                        {pub.venue}
                      </p>
                    </div>
                    <ChevronRight 
                      className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-all ${
                        isSelected ? "text-primary translate-x-1" : "group-hover:text-primary group-hover:translate-x-1"
                      }`}
                    />
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
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Publications
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Our latest research papers and conference proceedings.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* LEFT PANEL */}
            <div className="lg:col-span-3 space-y-12">
              <Section title="Publications" items={publications} />
              <Section title="Under Review" items={underReview} />
              <Section title="In Preparation" items={inPrep} />
            </div>

            {/* RIGHT PREVIEW PANEL - Desktop Only */}
            <div className="hidden lg:block lg:col-span-2 mt-[4.5rem]">
              <div className="sticky top-20">
                <div className="w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-300">
                  {/* Preview Header */}
                  <div className="bg-muted/50 border-b border-border px-4 py-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      Publication Details
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedPub ? "Viewing details" : "Select a publication to view details"}
                    </p>
                  </div>

                  {/* Preview Content */}
                  <div className="p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                    {!selectedPub && (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                          <Info className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold">Select a Publication</h4>
                          <p className="text-sm text-muted-foreground max-w-xs">
                            Click on any publication card from the list to view its detailed information, including challenges, solutions, and results.
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border w-full justify-center">
                          <ChevronRight className="h-4 w-4 rotate-[-90deg]" />
                          <span>Interactive cards highlight on hover</span>
                        </div>
                      </div>
                    )}

                    {selectedPub && <PreviewContent pub={selectedPub} />}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* MOBILE/TABLET SHEET - Shows preview in a drawer */}
          {isMobileOrTablet && (
            <Sheet 
              open={!!selectedPub} 
              onOpenChange={(open) => {
                // Don't close the Sheet if zoom overlay is open
                if (!open && !zoomImage) {
                  setSelectedPub(null);
                }
              }}
            >
              <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Publication Details
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {selectedPub && <PreviewContent pub={selectedPub} />}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      {/* FULLSCREEN ZOOM OVERLAY - Rendered via Portal */}
      {zoomImage && typeof document !== 'undefined' 
        ? createPortal(
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]"
              onClick={() => setZoomImage(null)}
              style={{ pointerEvents: 'auto' }}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-gray-300 z-10"
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
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              />
            </div>,
            document.body
          )
        : null
      }
    </div>
  );
};

export default Publications;