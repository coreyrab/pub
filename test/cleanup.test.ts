import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { CONFIG } from "../src/config.js";
import {
  ensureDataDir,
  writeArtifact,
  readMetadata,
  listArtifactIds,
} from "../src/storage.js";
import type { ArtifactMeta } from "../src/types.js";

// We test the cleanup logic by importing the internals rather than
// waiting for setInterval. For that we replicate the sweep logic inline.
import { deleteArtifact } from "../src/storage.js";

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

async function sweep() {
  const ids = await listArtifactIds();
  const now = Date.now();
  for (const id of ids) {
    const meta = await readMetadata(id);
    if (meta && !meta.pinned && new Date(meta.expires_at).getTime() <= now) {
      await deleteArtifact(id);
    }
  }
}

describe("cleanup sweep", () => {
  it("deletes expired artifacts", async () => {
    const meta: ArtifactMeta = {
      artifact_id: "EXPIRED1",
      content_type: "text/plain",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() - 1000).toISOString(),
      size_bytes: 3,
    };
    await writeArtifact("EXPIRED1", Buffer.from("old"), meta);

    await sweep();
    expect(await readMetadata("EXPIRED1")).toBeNull();
  });

  it("skips pinned artifacts during sweep", async () => {
    const meta: ArtifactMeta = {
      artifact_id: "PINNED01",
      content_type: "text/plain",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() - 1000).toISOString(), // technically expired
      size_bytes: 6,
      pinned: true,
    };
    await writeArtifact("PINNED01", Buffer.from("pinned"), meta);

    await sweep();
    expect(await readMetadata("PINNED01")).not.toBeNull();
  });

  it("keeps non-expired artifacts", async () => {
    const meta: ArtifactMeta = {
      artifact_id: "FRESH001",
      content_type: "text/plain",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 3600_000).toISOString(),
      size_bytes: 5,
    };
    await writeArtifact("FRESH001", Buffer.from("fresh"), meta);

    await sweep();
    expect(await readMetadata("FRESH001")).not.toBeNull();
  });
});
