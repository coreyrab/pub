const useCases = [
  {
    prompt: '"Summarize this conversation and share it with the team"',
    description:
      "Turn long Claude Code sessions into clean, readable summaries with a shareable link.",
  },
  {
    prompt: '"Write a weekly report from our git log and publish it"',
    description:
      "Generate formatted reports from commit history and share them — no copy-pasting into docs.",
  },
  {
    prompt: '"Build an HTML mockup of this design and give me a preview link"',
    description:
      "Prototype landing pages, dashboards, or UI components and share instant previews.",
  },
  {
    prompt: '"Analyze our error logs and share the findings"',
    description:
      "Generate data analysis with tables, charts, and recommendations — published for the team to review.",
  },
  {
    prompt: '"Review this PR and publish a summary for the team"',
    description:
      "Create structured code reviews with severity labels and share them via Slack, email, or anywhere.",
  },
];

export function UseCases() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <h2 className="font-mono text-lg font-semibold mb-8">
        use cases<span className="text-tomato">.</span>
      </h2>
      <div className="space-y-6">
        {useCases.map((uc) => (
          <div key={uc.prompt}>
            <p className="font-mono text-sm font-semibold text-foreground">
              {uc.prompt}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground leading-relaxed">
              {uc.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
