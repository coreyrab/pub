import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 pb-16">
      <Badge
        variant="outline"
        className="mb-6 font-mono text-xs border-tomato/30 text-tomato"
      >
        v0.1.0 — early preview
      </Badge>
      <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl">
        publish anything.
        <br />
        get a link<span className="text-tomato">.</span>
      </h1>
      <p className="mt-4 max-w-lg font-mono text-base text-muted-foreground leading-relaxed">
        pub is a publishing primitive for AI agents. Ask your coding agent to
        share something — a report, a preview, an image — and get back a
        temporary, shareable URL.
      </p>
      <p className="mt-2 font-mono text-sm text-muted-foreground/70">
        ngrok for AI artifacts.
      </p>
    </section>
  );
}
