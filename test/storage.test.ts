import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { CONFIG } from "../src/config.js";
import {
  ensureDataDir,
  writeArtifact,
  readMetadata,
  readArtifact,
  deleteArtifact,
  listArtifactIds,
} from "../src/storage.js";
import type { ArtifactMeta } from "../src/types.js";

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

const makeMeta = (id: string): ArtifactMeta => ({
  artifact_id: id,
  content_type: "text/plain",
  created_at: new Date().toISOString(),
  expires_at: new Date(Date.now() + 3600_000).toISOString(),
  size_bytes: 5,
});

describe("storage", () => {
  it("write and read round-trip", async () => {
    const id = "01TEST000000000000000001";
    const content = Buffer.from("hello");
    const meta = makeMeta(id);

    await writeArtifact(id, content, meta);

    const readBack = await readArtifact(id);
    expect(readBack).toEqual(content);

    const metaBack = await readMetadata(id);
    expect(metaBack).toEqual(meta);
  });

  it("returns null for missing artifact", async () => {
    expect(await readArtifact("NONEXISTENT")).toBeNull();
    expect(await readMetadata("NONEXISTENT")).toBeNull();
  });

  it("deletes an artifact", async () => {
    const id = "01TEST000000000000000002";
    await writeArtifact(id, Buffer.from("bye"), makeMeta(id));
    await deleteArtifact(id);

    expect(await readArtifact(id)).toBeNull();
    expect(await readMetadata(id)).toBeNull();
  });

  it("lists artifact IDs", async () => {
    await writeArtifact("AAA", Buffer.from("a"), makeMeta("AAA"));
    await writeArtifact("BBB", Buffer.from("b"), makeMeta("BBB"));

    const ids = await listArtifactIds();
    expect(ids.sort()).toEqual(["AAA", "BBB"]);
  });
});
