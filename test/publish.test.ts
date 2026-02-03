import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { CONFIG } from "../src/config.js";
import { ensureDataDir } from "../src/storage.js";
import { createApp } from "../src/app.js";

let originalDataDir: string;

beforeEach(async () => {
  originalDataDir = CONFIG.DATA_DIR;
  const tmp = await mkdtemp(join(tmpdir(), "pub-test-"));
  (CONFIG as any).DATA_DIR = tmp;
  await ensureDataDir();
});

afterEach(async () => {
  await rm(CONFIG.DATA_DIR, { recursive: true, force: true });
  (CONFIG as any).DATA_DIR = originalDataDir;
});

let originalAdminSecret: string;

beforeEach(() => {
  originalAdminSecret = CONFIG.ADMIN_SECRET;
});

afterEach(() => {
  (CONFIG as any).ADMIN_SECRET = originalAdminSecret;
});

function publish(body: unknown, headers?: Record<string, string>) {
  const app = createApp();
  return app.request("/v1/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

describe("POST /v1/publish", () => {
  it("publishes plain text and returns 201", async () => {
    const res = await publish({ content: "Hello, world!" });
    expect(res.status).toBe(201);

    const json = await res.json();
    expect(json.artifact_id).toBeDefined();
    expect(json.url).toContain(json.artifact_id);
    expect(json.content_type).toBe("text/plain");
    expect(json.expires_at).toBeDefined();
  });

  it("publishes markdown", async () => {
    const res = await publish({
      content: "# Title\n\nBody text",
      content_type: "text/markdown",
    });
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.content_type).toBe("text/markdown");
  });

  it("rejects missing content", async () => {
    const res = await publish({});
    expect(res.status).toBe(400);
  });

  it("rejects empty content", async () => {
    const res = await publish({ content: "" });
    expect(res.status).toBe(400);
  });

  it("rejects unsupported content type", async () => {
    const res = await publish({ content: "x", content_type: "application/zip" });
    expect(res.status).toBe(415);
  });

  it("rejects TTL exceeding max", async () => {
    const res = await publish({ content: "x", ttl_seconds: 999_999 });
    expect(res.status).toBe(400);
  });

  it("accepts custom TTL within limits", async () => {
    const res = await publish({ content: "x", ttl_seconds: 3600 });
    expect(res.status).toBe(201);
  });

  it("rejects pinned artifact without admin secret", async () => {
    const res = await publish({ content: "pin me", pinned: true });
    expect(res.status).toBe(403);
  });

  it("rejects pinned artifact with wrong admin secret", async () => {
    (CONFIG as any).ADMIN_SECRET = "correct-secret";
    const res = await publish(
      { content: "pin me", pinned: true },
      { "X-Admin-Secret": "wrong-secret" },
    );
    expect(res.status).toBe(403);
  });

  it("publishes pinned artifact with correct admin secret", async () => {
    (CONFIG as any).ADMIN_SECRET = "test-secret";
    const res = await publish(
      { content: "pinned content", pinned: true },
      { "X-Admin-Secret": "test-secret" },
    );
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.pinned).toBe(true);
    expect(json.expires_at).toBe("9999-12-31T23:59:59.000Z");
  });
});
