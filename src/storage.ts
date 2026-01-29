import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { CONFIG } from "./config.js";
import type { ArtifactMeta } from "./types.js";

function artifactDir(id: string): string {
  return join(CONFIG.DATA_DIR, id);
}

export async function ensureDataDir(): Promise<void> {
  await mkdir(CONFIG.DATA_DIR, { recursive: true });
}

export async function writeArtifact(
  id: string,
  content: Buffer,
  meta: ArtifactMeta,
): Promise<void> {
  const dir = artifactDir(id);
  await mkdir(dir, { recursive: true });
  // Write content first, then metadata — so partial writes never have orphan metadata
  await writeFile(join(dir, "artifact"), content);
  await writeFile(join(dir, "meta.json"), JSON.stringify(meta));
}

export async function readMetadata(
  id: string,
): Promise<ArtifactMeta | null> {
  try {
    const raw = await readFile(join(artifactDir(id), "meta.json"), "utf-8");
    return JSON.parse(raw) as ArtifactMeta;
  } catch {
    return null;
  }
}

export async function readArtifact(id: string): Promise<Buffer | null> {
  try {
    return await readFile(join(artifactDir(id), "artifact"));
  } catch {
    return null;
  }
}

export async function deleteArtifact(id: string): Promise<void> {
  await rm(artifactDir(id), { recursive: true, force: true });
}

export async function listArtifactIds(): Promise<string[]> {
  try {
    return await readdir(CONFIG.DATA_DIR);
  } catch {
    return [];
  }
}
