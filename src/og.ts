/**
 * Extract Open Graph title and description from artifact content.
 * Runs at publish time — no AI, just string parsing.
 */

const CONTENT_TYPE_LABELS: Record<string, string> = {
  "text/markdown": "markdown",
  "text/html": "HTML",
  "text/plain": "text",
  "application/pdf": "PDF",
  "image/png": "image",
  "image/jpeg": "image",
  "image/webp": "image",
};

interface OgMeta {
  og_title: string;
  og_description: string;
}

export function extractOgMeta(content: string, contentType: string): OgMeta {
  const label = CONTENT_TYPE_LABELS[contentType] || "document";

  if (contentType === "text/markdown") {
    return extractFromMarkdown(content, label);
  }
  if (contentType === "text/html") {
    return extractFromHtml(content, label);
  }
  if (contentType === "text/plain") {
    return extractFromPlainText(content, label);
  }

  // Binary types — no content to parse
  return {
    og_title: "Shared via /pub",
    og_description: `A shared ${label} on pubthis.co`,
  };
}

function extractFromMarkdown(content: string, label: string): OgMeta {
  const lines = content.split("\n");

  // Find first heading (# Title)
  let title = "";
  let titleIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^#{1,6}\s+(.+)/);
    if (match) {
      title = match[1].trim();
      titleIndex = i;
      break;
    }
  }

  // Find first paragraph after the title (skip blanks, HRs, and other headings)
  let description = "";
  if (titleIndex !== -1) {
    for (let i = titleIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "" || line === "---" || line.startsWith("#")) continue;
      // Found a content line — collect the paragraph
      const paraLines: string[] = [];
      for (let j = i; j < lines.length; j++) {
        const pLine = lines[j].trim();
        if (pLine === "") break;
        paraLines.push(pLine);
      }
      description = stripMarkdownFormatting(paraLines.join(" "));
      break;
    }
  }

  return {
    og_title: title || "Shared via /pub",
    og_description: truncate(description, 160) || `A shared ${label} document on pubthis.co`,
  };
}

function extractFromHtml(content: string, label: string): OgMeta {
  // Extract first <h1> content
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = h1Match ? stripHtmlTags(h1Match[1]).trim() : "";

  // Extract first <p> content
  const pMatch = content.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const description = pMatch ? stripHtmlTags(pMatch[1]).trim() : "";

  return {
    og_title: title || "Shared via /pub",
    og_description: truncate(description, 160) || `A shared ${label} document on pubthis.co`,
  };
}

function extractFromPlainText(content: string, label: string): OgMeta {
  const lines = content.split("\n").filter((l) => l.trim() !== "");
  const title = lines[0]?.trim() || "";

  // Collect lines after the first as description
  const descLines = lines.slice(1);
  const description = descLines.join(" ").trim();

  return {
    og_title: title || "Shared via /pub",
    og_description: truncate(description, 160) || `A shared ${label} document on pubthis.co`,
  };
}

/** Strip markdown bold, italic, links, inline code */
function stripMarkdownFormatting(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) → text
    .replace(/\*\*(.+?)\*\*/g, "$1") // **bold** → bold
    .replace(/\*(.+?)\*/g, "$1") // *italic* → italic
    .replace(/`(.+?)`/g, "$1") // `code` → code
    .replace(/~~(.+?)~~/g, "$1"); // ~~strike~~ → strike
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}
