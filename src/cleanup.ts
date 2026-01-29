import { CONFIG } from "./config.js";
import { pruneRateLimitEntries } from "./middleware/rate-limit.js";
import { deleteArtifact, listArtifactIds, readMetadata } from "./storage.js";

let intervalId: ReturnType<typeof setInterval> | null = null;

export function startCleanupLoop(): void {
  intervalId = setInterval(async () => {
    try {
      const ids = await listArtifactIds();
      const now = Date.now();
      for (const id of ids) {
        try {
          const meta = await readMetadata(id);
          if (meta && new Date(meta.expires_at).getTime() <= now) {
            await deleteArtifact(id);
          }
        } catch {
          // Log per-artifact errors but don't fail the entire sweep
        }
      }
    } catch {
      // Sweep failed entirely — will retry next interval
    }
    pruneRateLimitEntries();
  }, CONFIG.CLEANUP_INTERVAL_MS);
}

export function stopCleanupLoop(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
