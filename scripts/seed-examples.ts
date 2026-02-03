/**
 * Seed script — publishes pinned example artifacts for the website gallery.
 *
 * Usage:
 *   PUB_ADMIN_SECRET=your-secret npm run seed
 *   PUB_ADMIN_SECRET=your-secret PUB_API_URL=https://pubthis.co npm run seed
 */

const API_URL = process.env.PUB_API_URL || "http://localhost:3000";
const ADMIN_SECRET = process.env.PUB_ADMIN_SECRET;

if (!ADMIN_SECRET) {
  console.error("Error: PUB_ADMIN_SECRET environment variable is required");
  process.exit(1);
}

interface Example {
  title: string;
  content_type: string;
  content: string;
}

const examples: Example[] = [
  {
    title: "Weekly Project Report",
    content_type: "text/markdown",
    content: `# Engineering Weekly — Jan 27–31, 2026

## Summary

Strong week across the board. Auth migration shipped to 100% of users with zero incidents. Performance work on the dashboard paid off — p95 load time dropped from 2.4s to 1.1s. Two new hires started on Monday and are already contributing.

---

## Shipped

| Feature | Owner | Status | Notes |
|---------|-------|--------|-------|
| Auth v2 migration | Sarah | \u2705 Done | Rolled out to 100%. Old auth deprecated. |
| Dashboard perf overhaul | Marcus | \u2705 Done | Lazy loading + query optimization |
| Webhook retry logic | Priya | \u2705 Done | Exponential backoff, max 5 retries |
| Billing page redesign | Tom | \ud83d\udfe1 In review | Final design review Monday |
| API rate limit headers | Sarah | \u2705 Done | X-RateLimit-* headers on all endpoints |

## Metrics

| Metric | Last Week | This Week | Change |
|--------|-----------|-----------|--------|
| API requests/day | 2.1M | 2.4M | +14% |
| p50 latency | 45ms | 42ms | -7% |
| p95 latency | 180ms | 165ms | -8% |
| Error rate | 0.12% | 0.08% | -33% |
| Dashboard p95 load | 2.4s | 1.1s | -54% |

## Highlights

- **Auth migration complete**: After 6 weeks of incremental rollout, auth v2 is now serving 100% of traffic. Session management is faster, token refresh is seamless, and we can finally deprecate the legacy auth service. No user-facing issues during the final rollout phase.

- **Dashboard performance**: Marcus identified that the main dashboard was making 47 separate API calls on load. After batching queries and adding lazy loading for below-fold widgets, p95 dropped from 2.4s to 1.1s. Users on slower connections will see the biggest improvement.

- **Webhook reliability**: Priya shipped retry logic with exponential backoff. Failed webhooks are now retried up to 5 times with jittered delays. Early data shows webhook delivery success rate improved from 94% to 99.7%.

## Next Week

- [ ] Ship billing page redesign (Tom — pending design review)
- [ ] Start work on org-level permissions (Sarah)
- [ ] API versioning RFC — first draft (Marcus)
- [ ] Set up staging environment for mobile app beta (Priya)
- [ ] Onboarding check-in with new hires (All)

## Blockers

None this week.

---

*Generated from project data by Claude Code and shared via [/pub](https://pubthis.co).*`,
  },
  {
    title: "Landing Page Prototype",
    content_type: "text/html",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tempo — Time tracking for teams that ship</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      color: #1a1a1a;
      background: #fafaf9;
      line-height: 1.6;
    }
    .container { max-width: 960px; margin: 0 auto; padding: 0 24px; }

    /* Nav */
    nav {
      border-bottom: 1px solid #e8e6e1;
      padding: 16px 0;
    }
    nav .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .logo span { color: #e54d2e; }
    nav a {
      color: #666;
      text-decoration: none;
      font-size: 14px;
      margin-left: 24px;
    }
    nav a:hover { color: #1a1a1a; }

    /* Hero */
    .hero {
      padding: 80px 0 60px;
      text-align: center;
    }
    .hero h1 {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -1.5px;
      line-height: 1.1;
      margin-bottom: 16px;
    }
    .hero p {
      font-size: 18px;
      color: #666;
      max-width: 520px;
      margin: 0 auto 32px;
    }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      background: #1a1a1a;
      color: white;
      border-radius: 8px;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
    }
    .btn:hover { background: #333; }
    .btn-outline {
      background: transparent;
      color: #1a1a1a;
      border: 1px solid #d4d4d4;
      margin-left: 12px;
    }
    .btn-outline:hover { background: #f5f5f5; }

    /* Features */
    .features {
      padding: 60px 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .feature {
      padding: 24px;
      border: 1px solid #e8e6e1;
      border-radius: 12px;
      background: white;
    }
    .feature-icon {
      width: 40px;
      height: 40px;
      background: #fef0ec;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin-bottom: 12px;
    }
    .feature h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .feature p {
      font-size: 14px;
      color: #666;
    }

    /* Social proof */
    .social-proof {
      text-align: center;
      padding: 40px 0 60px;
      border-top: 1px solid #e8e6e1;
    }
    .social-proof p {
      font-size: 14px;
      color: #999;
      margin-bottom: 16px;
    }
    .logos {
      display: flex;
      justify-content: center;
      gap: 40px;
      opacity: 0.4;
      font-size: 18px;
      font-weight: 600;
      color: #666;
    }

    /* Footer */
    footer {
      border-top: 1px solid #e8e6e1;
      padding: 24px 0;
      text-align: center;
      font-size: 13px;
      color: #999;
    }

    @media (max-width: 640px) {
      .hero h1 { font-size: 32px; }
      .features { grid-template-columns: 1fr; }
      .logos { flex-wrap: wrap; gap: 20px; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <div class="logo">tempo<span>.</span></div>
      <div>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#docs">Docs</a>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <h1>Time tracking for<br>teams that ship.</h1>
      <p>Automatic time tracking that stays out of your way. Know where time goes without filling out timesheets.</p>
      <a href="#" class="btn">Start free trial</a>
      <a href="#" class="btn btn-outline">See how it works</a>
    </div>
  </section>

  <section id="features">
    <div class="container">
      <div class="features">
        <div class="feature">
          <div class="feature-icon">\u23f1\ufe0f</div>
          <h3>Auto-tracking</h3>
          <p>Tracks time across your tools automatically. No manual entry, no timers to forget.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">\ud83d\udcca</div>
          <h3>Team insights</h3>
          <p>See where your team's time goes. Identify bottlenecks before they slow you down.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">\ud83d\udd17</div>
          <h3>Integrations</h3>
          <p>Works with GitHub, Linear, Slack, and Figma. Time data flows where you need it.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">\ud83d\udcc5</div>
          <h3>Sprint reports</h3>
          <p>Automatic sprint summaries with time breakdowns by project, feature, and engineer.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">\ud83d\udd12</div>
          <h3>Privacy-first</h3>
          <p>No screenshots, no keylogging. We track time, not behavior. Your team trusts it.</p>
        </div>
        <div class="feature">
          <div class="feature-icon">\u26a1</div>
          <h3>Fast setup</h3>
          <p>Install in 2 minutes. No onboarding calls, no training sessions. It just works.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="social-proof">
    <div class="container">
      <p>Trusted by engineering teams at</p>
      <div class="logos">
        <span>Acme Co</span>
        <span>Widgets Inc</span>
        <span>StartupHQ</span>
        <span>DevTools Co</span>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; 2026 Tempo. This is a prototype published with <a href="https://pubthis.co" style="color:#e54d2e">/pub</a>.</p>
    </div>
  </footer>
</body>
</html>`,
  },
  {
    title: "PR Review Summary",
    content_type: "text/markdown",
    content: `# Code Review: PR #247 — Add webhook retry logic

**Author:** priya
**Branch:** \`feat/webhook-retries\`
**Base:** \`main\`
**Files changed:** 6
**Additions:** +184  **Deletions:** -23

---

## Summary

This PR adds exponential backoff retry logic to outbound webhooks. Previously, a failed webhook was silently dropped. Now failed deliveries are retried up to 5 times with jittered exponential delays.

**Verdict: Approve with minor suggestions** \u2705

---

## File-by-file review

### \`src/webhooks/dispatcher.ts\` (+82, -8)

The core retry logic lives here. The implementation is clean.

\`\`\`typescript
async function dispatchWithRetry(
  webhook: Webhook,
  payload: unknown,
  attempt = 1
): Promise<DispatchResult> {
  try {
    const res = await fetch(webhook.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return { success: true, attempts: attempt };
  } catch (err) {
    if (attempt >= MAX_RETRIES) {
      return { success: false, attempts: attempt, error: String(err) };
    }
    const delay = baseDelay * 2 ** (attempt - 1) + jitter();
    await sleep(delay);
    return dispatchWithRetry(webhook, payload, attempt + 1);
  }
}
\`\`\`

**\ud83d\udfe2 Good:** 10-second timeout per attempt prevents hanging.
**\ud83d\udfe1 Suggestion:** Consider adding a total timeout across all retries (e.g., 2 minutes). A webhook that times out 5 times would take ~5 minutes total.

### \`src/webhooks/config.ts\` (+12, -0)

New constants:

| Constant | Value | Notes |
|----------|-------|-------|
| \`MAX_RETRIES\` | 5 | Reasonable for webhooks |
| \`BASE_DELAY_MS\` | 1000 | 1s, 2s, 4s, 8s, 16s progression |
| \`JITTER_MAX_MS\` | 500 | Prevents thundering herd |

\ud83d\udfe2 All values look sensible.

### \`src/webhooks/types.ts\` (+15, -2)

Added \`DispatchResult\` interface and updated \`WebhookEvent\` to include retry metadata.

\ud83d\udfe2 Clean type additions. No concerns.

### \`src/webhooks/queue.ts\` (+38, -5)

Updated the queue processor to use \`dispatchWithRetry\` instead of raw \`fetch\`.

**\ud83d\udfe1 Suggestion:** The dead letter handling (line 47) logs the failure but doesn't expose it via any observable metric. Consider emitting a \`webhook.delivery.failed\` event or incrementing a counter for monitoring.

### \`test/webhooks/dispatcher.test.ts\` (+31, -6)

Good test coverage of the retry paths:
- \u2705 Succeeds on first attempt
- \u2705 Retries on 500 and succeeds on attempt 3
- \u2705 Gives up after MAX_RETRIES
- \u2705 Respects timeout per attempt

**\ud83d\udfe1 Missing test:** No test for jitter randomness bounds. Not critical, but would catch regressions if the jitter function changes.

### \`test/webhooks/queue.test.ts\` (+6, -2)

Minor updates to accommodate the new \`DispatchResult\` return type.

\ud83d\udfe2 No issues.

---

## Summary of findings

| Severity | Count | Details |
|----------|-------|---------|
| \ud83d\udfe2 Looks good | 4 | Types, config, queue tests, dispatcher core |
| \ud83d\udfe1 Suggestion | 3 | Total timeout, dead letter metrics, jitter test |
| \ud83d\udd34 Blocking | 0 | — |

## Recommendation

**Approve.** The retry logic is well-implemented with proper backoff, jitter, and timeout handling. The suggestions above are improvements, not blockers. Ship it and iterate.

---

*Review generated by Claude Code and shared via [/pub](https://pubthis.co).*`,
  },
  {
    title: "Data Analysis Report",
    content_type: "text/markdown",
    content: `# API Usage Analysis — January 2026

## Executive Summary

API traffic grew **23% month-over-month**, driven primarily by the mobile SDK launch on Jan 12. Error rates remain healthy at 0.09%. The \`/v2/search\` endpoint is the new top consumer, overtaking \`/v1/users\` for the first time.

---

## Traffic Overview

| Metric | December | January | Change |
|--------|----------|---------|--------|
| Total requests | 58.2M | 71.6M | +23% |
| Unique API keys | 1,247 | 1,589 | +27% |
| Avg requests/day | 1.88M | 2.31M | +23% |
| Peak requests/day | 2.9M | 4.1M | +41% |
| p50 latency | 48ms | 44ms | -8% |
| p99 latency | 320ms | 285ms | -11% |
| Error rate | 0.11% | 0.09% | -18% |

## Requests by Endpoint

\`\`\`
/v2/search       \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  28.4M (40%)
/v1/users         \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591  18.6M (26%)
/v1/auth          \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591  10.7M (15%)
/v2/analytics     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591   7.2M (10%)
/v1/webhooks      \u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591   3.6M  (5%)
other             \u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591   3.1M  (4%)
\`\`\`

## Daily Traffic Trend

\`\`\`
4.5M \u2502
     \u2502                                          \u250c\u2500\u2510
4.0M \u2502                                       \u250c\u2500\u2518  \u2514\u2500\u2510
     \u2502                                    \u250c\u2500\u2518      \u2514\u2500\u2510
3.5M \u2502                                 \u250c\u2500\u2518         \u2514\u2510
     \u2502                              \u250c\u2500\u2518            \u2514\u2500\u2510
3.0M \u2502                  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518               \u2514\u2500\u2500
     \u2502               \u250c\u2500\u2518
2.5M \u2502            \u250c\u2500\u2500\u2518
     \u2502         \u250c\u2500\u2500\u2518
2.0M \u2502  \u250c\u2500\u2500\u2500\u2500\u2500\u2518
     \u2502\u2500\u2518
1.5M \u2502
     \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      Jan 1    Jan 8   Jan 15   Jan 22   Jan 29
                         \u2191
                  Mobile SDK launch (Jan 12)
\`\`\`

## Top Consumers

| Rank | API Key | Requests | Endpoint Focus | Notes |
|------|---------|----------|----------------|-------|
| 1 | \`sk_prod_acme_***\` | 8.2M | /v2/search | Mobile SDK integration |
| 2 | \`sk_prod_widg_***\` | 5.1M | /v1/users | User sync pipeline |
| 3 | \`sk_prod_star_***\` | 4.7M | /v2/search | Search-heavy SPA |
| 4 | \`sk_prod_devt_***\` | 3.9M | /v2/analytics | Dashboard polling |
| 5 | \`sk_prod_bolt_***\` | 2.8M | /v1/auth | High-frequency auth |

## Error Breakdown

| Error | Count | Rate | Trend |
|-------|-------|------|-------|
| 429 Too Many Requests | 38,200 | 0.053% | \u2193 Down (rate limit tuning) |
| 500 Internal Server | 12,100 | 0.017% | \u2192 Flat |
| 404 Not Found | 9,800 | 0.014% | \u2191 Up (stale mobile cache) |
| 408 Request Timeout | 4,500 | 0.006% | \u2193 Down |

## Latency by Endpoint

| Endpoint | p50 | p95 | p99 |
|----------|-----|-----|-----|
| /v2/search | 62ms | 180ms | 340ms |
| /v1/users | 28ms | 85ms | 190ms |
| /v1/auth | 15ms | 42ms | 95ms |
| /v2/analytics | 88ms | 250ms | 520ms |
| /v1/webhooks | 35ms | 110ms | 280ms |

## Recommendations

1. **Rate limit adjustment for mobile SDK**: The Acme integration is hitting rate limits during peak hours. Consider a dedicated tier or burst allowance for high-volume mobile clients.

2. **Cache strategy for /v2/search**: 40% of all traffic goes to search. Adding a 30-second cache layer could reduce origin load by ~60% based on query pattern analysis.

3. **Investigate /v2/analytics p99**: The 520ms p99 is the highest across all endpoints. Likely caused by large date range queries. Consider adding query complexity limits.

4. **404 spike from mobile**: Stale cache in the mobile SDK is generating 404s for deleted resources. The next SDK release should include cache invalidation on 404.

---

*Analysis generated by Claude Code from API gateway logs. Shared via [/pub](https://pubthis.co).*`,
  },
];

async function seed() {
  console.log(`Seeding examples to ${API_URL}...\n`);

  for (const ex of examples) {
    const res = await fetch(`${API_URL}/v1/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Secret": ADMIN_SECRET,
      },
      body: JSON.stringify({
        content: ex.content,
        content_type: ex.content_type,
        pinned: true,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`Failed to publish "${ex.title}": ${res.status} ${err}`);
      continue;
    }

    const json = (await res.json()) as { url: string; artifact_id: string };
    console.log(`${ex.title}`);
    console.log(`  ${json.url}\n`);
  }

  console.log("Done. Copy the URLs above into the website components.");
}

seed();
