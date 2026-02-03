# pubthis

Publish content from Claude Code and get a temporary, shareable URL.

pubthis takes markdown, HTML, documents, and images — and gives you a link that expires in 7 days. No accounts, no auth, no config. Just content in, URL out.

```
You: "share this report as a link"

Claude: I've published your report.
        https://pubthis.co/a/01JABCDEFG
        Expires in 7 days. Anyone with the link can view it.
```

## Install

### Claude Code plugin (recommended)

```bash
claude plugin install pubthis
```

This gives you the `publish` MCP tool and a `/pub` slash command.

### MCP server only

```bash
claude mcp add pubthis -- npx -y @pubthis/mcp-server
```

Or add it to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "pubthis": {
      "command": "npx",
      "args": ["-y", "@pubthis/mcp-server"]
    }
  }
}
```

### CLAUDE.md (zero-install)

Download [`CLAUDE.md`](./CLAUDE.md) into your project root. Claude Code will read it automatically and use pub directly — no MCP server or plugin required.

## Usage

Once installed, just ask naturally:

- "Share this as a link"
- "Publish this report"
- "Give me a URL for this analysis"

You can also use the `/pub` slash command directly. Claude figures out the content type, formats it, publishes it, and hands you the link.

## Supported content types

| Type | Notes |
|------|-------|
| Markdown | Default. Reports, docs, specs. |
| HTML | Previews, prototypes. Sandboxed. |
| Plain text | Logs, raw output. |
| PDF | Screenshots, documents. |
| PNG / JPEG / WebP | Images, diagrams. |

## Limits

| Limit | Value |
|-------|-------|
| Max payload | 10 MB |
| Max TTL | 7 days |

## Security

- **Artifacts are public.** Anyone with the link can view them.
- **Artifacts are immutable.** No edits — publish a new one.
- **Never publish secrets.** No API keys, tokens, passwords, or credentials.
- **Links expire.** Default and max TTL is 7 days.

## Self-hosting

pubthis is open source. To run your own instance:

```bash
git clone https://github.com/coreyrab/pubthis.git
cd pubthis
npm install
npm run dev
```

Set `PUB_BASE_URL` to your domain. To point the plugin at your instance:

```bash
claude mcp add pubthis -e PUBTHIS_API_URL=http://localhost:3000 -- npx -y @pubthis/mcp-server
```

## Running tests

```bash
npm test
```

## Links

- [Website](https://www.pubthis.co)
- [Docs](https://www.pubthis.co/docs)
- [MCP Server on npm](https://www.npmjs.com/package/@pubthis/mcp-server)

## License

MIT
