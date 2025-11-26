import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import publicationsData from "@/data/publications.json";

const Publications = () => {
  useEffect(() => {
    document.title = "Publications - SpeechCARE Lab";
  }, []);

  const [selectedPub, setSelectedPub] = useState<any>(null);

  const sortByDate = (a: any, b: any) => {
    if (a.year !== b.year) return b.year - a.year;
    return (b.month || 0) - (a.month || 0);
  };

  /** NEW SECTIONS **/
  const preprints = publicationsData
    .filter((pub) => pub.type === "Preprint")
    .sort(sortByDate);

  const inPrep = publicationsData
    .filter((pub) => pub.type === "In Preparation" || pub.type === "Under Review")
    .sort(sortByDate);

  const otherPublications = publicationsData
    .filter((pub) =>
      pub.type !== "Preprint" &&
      pub.type !== "In Preparation" &&
      pub.type !== "Under Review"
    )
    .sort(sortByDate);

  useEffect(() => {
    const firstPub =
      preprints[0] || otherPublications[0] || inPrep[0] || null;

    if (firstPub) setSelectedPub(firstPub);
  }, []);

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
              onClick={() => setSelectedPub(pub)}
            >
              <CardHeader className="p-0 mb-2">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{pub.type}</Badge>
                      <Badge variant="secondary" className="text-xs">
                        {pub.month ? new Date(pub.year, pub.month - 1).toLocaleString("default", { month: "long" }) : ""} {pub.year}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl font-heading mb-2">{pub.title}</CardTitle>
                    <CardDescription className="text-sm">{pub.authors}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-1 italic">{pub.venue}</p>
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
    <div className="min-h-screen py-20 lg:-ml-80">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Publications</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Our latest research papers, preprints, and conference proceedings.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT PANEL */}
            <div className="lg:col-span-2 space-y-12">

              <Section title="Preprints" items={preprints} />
              <Section title="Publications" items={otherPublications} />
              <Section title="In Preparation / Under Review" items={inPrep} />

            </div>

            {/* RIGHT PREVIEW */}
            <div className="
              order-last
              w-full
              mt-12
              lg:sticky lg:right-8 lg:top-32 lg:w-[420px]
              xl:w-[620px] mt-16
              2xl:w-[760px]
            ">
              <div className="min-h-[300px] bg-white rounded-xl p-6 shadow-md space-y-6 md:p-8">
                {selectedPub?.title && (
                  <h2 className="text-xl md:text-2xl font-semibold">{selectedPub.title}</h2>
                )}

                {selectedPub?.image && (
                  <img
                    src={selectedPub.image}
                    alt="Preview"
                    className="w-full max-h-[50vh] object-contain mx-auto"
                  />
                )}

                {selectedPub?.challenge && (
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Challenge</h3>
                    <p className="text-sm text-muted-foreground">{selectedPub.challenge}</p>
                  </div>
                )}

                {selectedPub?.solution && (
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Solution</h3>
                    <p className="text-sm text-muted-foreground">{selectedPub.solution}</p>
                  </div>
                )}

                {selectedPub?.result && (
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Result</h3>
                    <p className="text-sm text-muted-foreground">{selectedPub.result}</p>
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
