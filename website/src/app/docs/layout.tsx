import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-4xl px-6 py-12">
      <DocsSidebar />
      <article className="min-w-0 flex-1">{children}</article>
    </div>
  );
}
