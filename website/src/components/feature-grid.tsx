import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "agent-native",
    description:
      "Designed for Claude Code. Install the plugin and publish artifacts with natural language — zero config required.",
  },
  {
    title: "ephemeral",
    description:
      "Links expire automatically. Default TTL is 7 days. No permanent hosting, no cleanup, no forgotten deployments.",
  },
  {
    title: "any format",
    description:
      "Markdown, HTML, plain text, PDFs, PNG, JPEG, WebP. Claude handles the formatting — you just say \"share this.\"",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <div className="grid gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-mono text-sm font-semibold">
                {f.title}
                <span className="text-tomato">.</span>
              </CardTitle>
              <CardDescription className="font-mono text-xs leading-relaxed">
                {f.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
