import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import publicationsData from "@/data/publications.json";

const Publications = () => {
  useEffect(() => {
    document.title = "Publications - SpeechCARE Lab";
  }, []);

  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedPub, setSelectedPub] = useState<any>(null);

  const toggleItem = (key: string) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Sort function for reverse chronological order
  const sortByDate = (a: typeof publicationsData[0], b: typeof publicationsData[0]) => {
    if (a.year !== b.year) return b.year - a.year;
    return (b.month || 0) - (a.month || 0);
  };

  const preprints = [...publicationsData]
    .filter((pub) => pub.type === "Preprint")
    .sort(sortByDate);

  const otherPublications = [...publicationsData]
    .filter((pub) => pub.type !== "Preprint")
    .sort(sortByDate);

  // Set default hover image
    useEffect(() => {
      const firstPub =
        preprints.length > 0 ? preprints[0] :
        otherPublications.length > 0 ? otherPublications[0] :
        null;

      if (firstPub) {
        setSelectedPub(firstPub);
      }
    }, []);

  return (
    <div className="min-h-screen py-20 -ml-80">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Title + Subtitle */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Publications
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Our latest research papers, preprints, and conference proceedings in medical informatics and AI.
          </p>

          {/* =======================
              GRID LAYOUT (LEFT + RIGHT PANEL)
              ======================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT SIDE – Publication Cards */}
            <div className="lg:col-span-2 space-y-12">

              {/* Preprints Section */}
              {preprints.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
                    Preprints
                  </h2>
                  <div className="space-y-4">
                    {preprints.map((pub, index) => {
                      const itemKey = `preprint-${pub.title}-${pub.year}`;
                      return (
                        <Collapsible
                          key={itemKey}
                          open={openItems.includes(itemKey)}
                          onOpenChange={() => toggleItem(itemKey)}
                        >
                          <Card
                            onClick={() => setSelectedPub(pub)}
                            className="cursor-pointer shadow-card hover:shadow-hover transition-all duration-300"
                          >
                            <CollapsibleTrigger className="w-full text-left">
                              <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {pub.type}
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs">
                                        {pub.month ? new Date(pub.year, pub.month - 1).toLocaleString("default", { month: "long" }) : ""} {pub.year}
                                      </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-heading mb-2">
                                      {pub.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                      {pub.authors}
                                    </CardDescription>
                                    <p className="text-sm text-muted-foreground mt-1 italic">{pub.venue}</p>
                                  </div>

                                  <ChevronDown
                                    className={`h-5 w-5 transition-transform ${
                                      openItems.includes(itemKey) ? "rotate-180" : ""
                                    }`}
                                  />
                                </div>
                              </CardHeader>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <CardContent>
                                {pub.link && (
                                  <div className="mt-4">
                                    <a
                                      href={pub.link}
                                      target="_blank"
                                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                                    >
                                      View Publication
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                )}
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </Collapsible>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Other Publications Section */}
              {otherPublications.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
                    Publications
                  </h2>
                  <div className="space-y-4">
                    {otherPublications.map((pub, index) => {
                      const itemKey = `pub-${pub.title}-${pub.year}`;
                      return (
                        <Collapsible
                          key={itemKey}
                          open={openItems.includes(itemKey)}
                          onOpenChange={() => toggleItem(itemKey)}
                        >
                          <Card
                            className="shadow-card hover:shadow-hover transition-all duration-300"
                            onClick={() => setSelectedPub(pub)}
                          >
                            <CollapsibleTrigger className="w-full text-left">
                              <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {pub.type}
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs">
                                        {pub.month ? new Date(pub.year, pub.month - 1).toLocaleString("default", { month: "long" }) : ""} {pub.year}
                                      </Badge>
                                    </div>
                                    <CardTitle className="text-xl font-heading mb-2">
                                      {pub.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                      {pub.authors}
                                    </CardDescription>
                                    <p className="text-sm text-muted-foreground mt-1 italic">{pub.venue}</p>
                                  </div>

                                  <ChevronDown
                                    className={`h-5 w-5 transition-transform ${
                                      openItems.includes(itemKey) ? "rotate-180" : ""
                                    }`}
                                  />
                                </div>
                              </CardHeader>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <CardContent>
                                {pub.link && (
                                  <div className="mt-4">
                                    <a
                                      href={pub.link}
                                      target="_blank"
                                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                                    >
                                      View Publication
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                )}
                              </CardContent>
                            </CollapsibleContent>
                          </Card>
                        </Collapsible>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
            {/* RIGHT SIDE – HOVER IMAGE PREVIEW PANEL */}
              <div className="hidden lg:block sticky right-8 top-32 pr-4 pt-16">
                <div className="w-[800px] min-h-[450px] space-y-6 bg-white rounded-xl p-8">

                  {/* Image */}
                  {selectedPub?.image && (
                    <img
                      src={selectedPub.image}
                      alt="Preview"
                      className="w-auto h-auto max-w-full max-h-[50vh] transition-opacity duration-300"
                    />
                  )}

                  {/* Challenge */}
                  {selectedPub?.challenge && (
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Challenge</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedPub.challenge}
                      </p>
                    </div>
                  )}

                  {/* Solution */}
                  {selectedPub?.solution && (
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Solution</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedPub.solution}
                      </p>
                    </div>
                  )}

                  {/* Result */}
                  {selectedPub?.result && (
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Result</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedPub.result}
                      </p>
                    </div>
                  )}

                </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Publications;
