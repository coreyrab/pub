import { Hono } from "hono";
import { deleteArtifact, readArtifact, readMetadata } from "../storage.js";

const ULID_RE = /^[0-9A-Z]{26}$/i;

export const serveRoute = new Hono();

serveRoute.get("/:id", async (c) => {
  const id = c.req.param("id");

  // Path traversal protection: strict ULID format
  if (!ULID_RE.test(id)) {
    return c.json({ error: "Invalid artifact ID" }, 400);
  }

  const meta = await readMetadata(id);
  if (!meta) {
    return c.json({ error: "Not found" }, 404);
  }

  // Lazy TTL enforcement
  if (new Date(meta.expires_at).getTime() <= Date.now()) {
    await deleteArtifact(id);
    return c.json({ error: "Not found" }, 404);
  }

  const content = await readArtifact(id);
  if (!content) {
    return c.json({ error: "Not found" }, 404);
  }

  return new Response(new Uint8Array(content), {
    status: 200,
    headers: {
      "Content-Type": meta.content_type,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
