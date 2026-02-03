import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const examples = [
  {
    title: "Weekly Project Report",
    content_type: "markdown",
    description:
      "An engineering team's weekly status update with metrics, progress, and priorities.",
    url: "https://pubthis.co/a/01KGJ45792Q8D9KQD2JGM04YH8",
  },
  {
    title: "Landing Page Prototype",
    content_type: "html",
    description:
      "A self-contained HTML mockup of a product landing page with inline styling.",
    url: "https://pubthis.co/a/01KGJ457JGF0X9Q9FPCD7P9W1X",
  },
  {
    title: "PR Review Summary",
    content_type: "markdown",
    description:
      "A structured code review with file-by-file analysis and severity labels.",
    url: "https://pubthis.co/a/01KGJ457PXR3ENNCPXWV7P07WF",
  },
  {
    title: "Data Analysis Report",
    content_type: "markdown",
    description:
      "API usage analytics with tables, trend analysis, and ASCII visualizations.",
    url: "https://pubthis.co/a/01KGJ457V1GM3Z54ZFQ5GR0102",
  },
];

export function LiveExamples() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <h2 className="font-mono text-lg font-semibold mb-8">
        live examples<span className="text-tomato">.</span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {examples.map((ex) => (
          <a
            key={ex.title}
            href={ex.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="bg-card border-border hover:border-tomato/40 transition-colors cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="font-mono text-sm font-semibold">
                    {ex.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] border-border"
                  >
                    {ex.content_type}
                  </Badge>
                </div>
                <CardDescription className="font-mono text-xs leading-relaxed">
                  {ex.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
