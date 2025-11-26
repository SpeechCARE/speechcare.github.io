"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import awardsList from "@/data/awards.json";

export default function AwardsPage() {
  useEffect(() => {
    document.title = "Awards - SpeechCARE Lab";
  }, []);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Awards & Achievements
          </h1>

          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            The <strong>SpeechCARE</strong> team was honored with <strong>three major awards</strong> in the{" "}
            <a
              className="underline"
              target="_blank"
              href="https://www.drivendata.org/competitions/299/competition-nih-alzheimers-acoustic-2/leaderboard/"
            >
              PREPARE Challenge
            </a>{" "}
            organized by the U.S. <strong>National Institute on Aging (NIA)</strong>, an institute within the NIH.
            <br />
            Our full technical report is available on{" "}
            <a
              className="underline"
              target="_blank"
              href="https://arxiv.org/abs/2511.08132"
            >
              arXiv
            </a>.
          </p>

          {/* Awards List */}
          <div className="space-y-8">
            {awardsList.map((award) => (
              <Card
                key={award.title}
                className="shadow-card hover:shadow-hover transition-all duration-300 p-6 rounded-xl"
              >
                <CardHeader className="flex flex-row items-start gap-4 p-0 mb-2">
                  <CardTitle className="text-2xl font-heading">
                    {award.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 text-muted-foreground leading-relaxed">
                  {award.description}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learn More Links */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-3">Learn More</h3>

            <ul className="space-y-2 text-primary text-sm">
              <li>
                <a
                  className="inline-flex items-center gap-2 hover:underline"
                  href="https://www.drivendata.org/competitions/299/competition-nih-alzheimers-acoustic-2/leaderboard/"
                  target="_blank"
                >
                  PREPARE Challenge Leaderboard <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 hover:underline"
                  href="https://arxiv.org/abs/2511.08132"
                  target="_blank"
                >
                  SpeechCARE Technical Report (arXiv) <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
