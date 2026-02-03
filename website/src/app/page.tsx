import { Hero } from "@/components/hero";
import { InstallSteps } from "@/components/install-steps";
import { CodeBlock } from "@/components/code-block";
import { LiveExamples } from "@/components/live-examples";
import { FeatureGrid } from "@/components/feature-grid";
import { UseCases } from "@/components/use-cases";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <InstallSteps />
      <CodeBlock />
      <LiveExamples />
      <FeatureGrid />
      <UseCases />
      <FAQ />
      <Footer />
    </main>
  );
}
