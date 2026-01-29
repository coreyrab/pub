const BANNER_STYLES = `
  position:fixed;bottom:0;left:0;right:0;height:32px;
  background:#000;color:#fff;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;
  font-size:12px;display:flex;align-items:center;justify-content:center;
  gap:4px;z-index:2147483647;letter-spacing:0.02em;
`.replace(/\n/g, "");

const BANNER_HTML = `<div style="${BANNER_STYLES}">published with <a href="https://pubit.ai" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;text-underline-offset:2px;">pubit.ai</a></div>`;

const BODY_PADDING = `<style>body{padding-bottom:40px}</style>`;

/**
 * Inject the pub banner into an existing HTML document.
 * Inserts before </body> if present, otherwise appends.
 */
export function wrapHtmlWithBanner(html: string): string {
  const payload = BODY_PADDING + BANNER_HTML;
  const idx = html.toLowerCase().indexOf("</body>");
  if (idx !== -1) {
    return html.slice(0, idx) + payload + html.slice(idx);
  }
  return html + payload;
}

/**
 * Wrap raw markdown in a minimal HTML page with the pub banner.
 */
export function wrapMarkdownWithBanner(markdown: string): string {
  const escaped = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
body{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;max-width:720px;margin:2rem auto;padding:0 1rem 40px;color:#1a1a1a;background:#fff;line-height:1.6}
pre{white-space:pre-wrap;word-wrap:break-word}
</style></head><body><pre>${escaped}</pre>${BANNER_HTML}</body></html>`;
}
