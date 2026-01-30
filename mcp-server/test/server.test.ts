import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { resolve } from "path";

const SERVER_PATH = resolve(import.meta.dirname, "../src/index.ts");

describe("MCP server", () => {
  let client: Client;
  let transport: StdioClientTransport;

  beforeAll(async () => {
    transport = new StdioClientTransport({
      command: "npx",
      args: ["tsx", SERVER_PATH],
      env: {
        ...process.env,
        PUBTHIS_API_URL: "https://pubthis.co",
      },
    });

    client = new Client({
      name: "test-client",
      version: "1.0.0",
    });

    await client.connect(transport);
  });

  afterAll(async () => {
    await client.close();
  });

  it("initializes with correct server info", () => {
    const info = client.getServerVersion();
    expect(info).toBeDefined();
    expect(info?.name).toBe("pubthis");
    expect(info?.version).toBe("0.1.0");
  });

  it("lists the publish tool", async () => {
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(1);
    expect(tools[0].name).toBe("publish");
    expect(tools[0].description).toContain("pubthis.co");
  });

  it("publish tool has correct input schema", async () => {
    const { tools } = await client.listTools();
    const publish = tools[0];
    const props = publish.inputSchema.properties as Record<string, unknown>;

    expect(props).toHaveProperty("content");
    expect(props).toHaveProperty("content_type");
    expect(props).toHaveProperty("ttl_seconds");
  });

  it("publishes markdown content successfully", async () => {
    const result = await client.callTool({
      name: "publish",
      arguments: {
        content: "# Test\n\nHello from MCP server tests.",
        content_type: "text/markdown",
      },
    });

    expect(result.isError).toBeFalsy();
    expect(result.content).toHaveLength(1);

    const text = (result.content[0] as { type: string; text: string }).text;
    expect(text).toContain("Published successfully!");
    expect(text).toContain("https://pubthis.co/a/");
    expect(text).toContain("text/markdown");
  });

  it("publishes with custom TTL", async () => {
    const result = await client.callTool({
      name: "publish",
      arguments: {
        content: "TTL test content",
        content_type: "text/plain",
        ttl_seconds: 3600,
      },
    });

    expect(result.isError).toBeFalsy();
    const text = (result.content[0] as { type: string; text: string }).text;
    expect(text).toContain("Published successfully!");
    expect(text).toContain("text/plain");
  });

  it("returns error for empty content", async () => {
    const result = await client.callTool({
      name: "publish",
      arguments: {
        content: "",
        content_type: "text/plain",
      },
    });

    expect(result.isError).toBe(true);
    const text = (result.content[0] as { type: string; text: string }).text;
    expect(text).toContain("Error");
  });
});
