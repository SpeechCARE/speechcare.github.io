import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import publicationsData from "@/data/publications.json";

const Publications = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (key: string) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Sort function for reverse chronological order
  const sortByDate = (a: typeof publicationsData[0], b: typeof publicationsData[0]) => {
    if (a.year !== b.year) {
      return b.year - a.year; // Newer year first
    }
    return (b.month || 0) - (a.month || 0); // If same year, newer month first
  };

  // Separate preprints from other publications
  const preprints = [...publicationsData]
    .filter((pub) => pub.type === "Preprint")
    .sort(sortByDate);
  
  const otherPublications = [...publicationsData]
    .filter((pub) => pub.type !== "Preprint")
    .sort(sortByDate);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 animate-fade-in">
            Publications
          </h1>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Our latest research papers, preprints, and conference proceedings in medical informatics and AI.
          </p>

          {/* Preprints Section */}
          {preprints.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">Preprints</h2>
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
                        className="shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
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
                                    {pub.month ? new Date(pub.year, pub.month - 1).toLocaleString('default', { month: 'long' }) : ''} {pub.year}
                                  </Badge>
                                </div>
                                <CardTitle className="text-xl font-heading mb-2">{pub.title}</CardTitle>
                                <CardDescription className="text-sm">
                                  {pub.authors}
                                </CardDescription>
                                <p className="text-sm text-muted-foreground mt-1 italic">{pub.venue}</p>
                              </div>
                              <ChevronDown
                                className={`h-5 w-5 text-muted-foreground transition-transform ${
                                  openItems.includes(itemKey) ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent>
                            <div className="pt-4 border-t border-border">
                              <h4 className="font-semibold text-sm mb-2">Abstract</h4>
                              <p className="text-sm text-muted-foreground">{pub.abstract}</p>
                            </div>
                            {pub.link && (
                              <div className="mb-4">
                                <a
                                  href={pub.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
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
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">Publications</h2>
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
                        className="shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
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
                                    {pub.month ? new Date(pub.year, pub.month - 1).toLocaleString('default', { month: 'long' }) : ''} {pub.year}
                                  </Badge>
                                </div>
                                <CardTitle className="text-xl font-heading mb-2">{pub.title}</CardTitle>
                                <CardDescription className="text-sm">
                                  {pub.authors}
                                </CardDescription>
                                <p className="text-sm text-muted-foreground mt-1 italic">{pub.venue}</p>
                              </div>
                              <ChevronDown
                                className={`h-5 w-5 text-muted-foreground transition-transform ${
                                  openItems.includes(itemKey) ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent>
                            <div className="pt-4 border-t border-border">
                              <h4 className="font-semibold text-sm mb-2">Abstract</h4>
                              <p className="text-sm text-muted-foreground">{pub.abstract}</p>
                            </div>
                            {pub.link && (
                              <div className="mb-4">
                                <a
                                  href={pub.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
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
      </div>
    </div>
  );
};

export default Publications;
