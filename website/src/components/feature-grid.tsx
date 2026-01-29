import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "agent-native",
    description:
      "Designed for AI coding agents. Add CLAUDE.md to your project and your agent can publish artifacts with zero setup.",
  },
  {
    title: "ephemeral",
    description:
      "Links expire automatically. Default TTL is 7 days. No permanent hosting, no cleanup, no forgotten deployments.",
  },
  {
    title: "any format",
    description:
      "Markdown, HTML, plain text, PDFs, PNG, JPEG, WebP. One endpoint handles all of them.",
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
