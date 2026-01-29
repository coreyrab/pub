import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { startCleanupLoop, stopCleanupLoop } from "./cleanup.js";
import { CONFIG } from "./config.js";
import { ensureDataDir } from "./storage.js";

const app = createApp();

await ensureDataDir();
startCleanupLoop();

const server = serve({ fetch: app.fetch, port: CONFIG.PORT }, (info) => {
  console.log(`pub listening on http://localhost:${info.port}`);
});

// Graceful shutdown
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    stopCleanupLoop();
    server.close();
    process.exit(0);
  });
}
