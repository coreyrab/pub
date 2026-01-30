import { Hono } from "hono";
import { publishRoute } from "./routes/publish.js";
import { serveRoute } from "./routes/serve.js";
import { rateLimiter } from "./middleware/rate-limit.js";
import { getDiskStatus } from "./health.js";

const WEBSITE_URL = "https://www.pubthis.co";

/** Paths served by the API — everything else redirects browsers to the website */
const API_PREFIXES = ["/v1/", "/a/"];

function isBrowser(accept: string): boolean {
  return accept.includes("text/html");
}

export function createApp(): Hono {
  const app = new Hono();

  app.get("/", async (c) => {
    if (isBrowser(c.req.header("Accept") || "")) {
      return c.redirect(WEBSITE_URL, 302);
    }

    try {
      const disk = await getDiskStatus();
      return c.json({ status: "ok", disk });
    } catch {
      return c.json({ status: "ok" });
    }
  });

  // Redirect non-API browser requests (e.g. /docs) to the website
  app.use("*", async (c, next) => {
    const path = c.req.path;
    const isApiPath = API_PREFIXES.some((p) => path.startsWith(p));
    if (!isApiPath && path !== "/" && isBrowser(c.req.header("Accept") || "")) {
      return c.redirect(`${WEBSITE_URL}${path}`, 302);
    }
    return next();
  });

  app.use("/v1/*", rateLimiter());

  app.route("/v1", publishRoute);
  app.route("/a", serveRoute);

  return app;
}
