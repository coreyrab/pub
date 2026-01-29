import { Hero } from "@/components/hero";
import { CodeBlock } from "@/components/code-block";
import { FeatureGrid } from "@/components/feature-grid";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <CodeBlock />
      <FeatureGrid />
      <Footer />
    </main>
  );
}
