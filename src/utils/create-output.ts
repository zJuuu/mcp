import type { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';

export function createOutput<T>(result: T): ReturnType<ToolCallback> {
  return {
    content: [{ type: 'text', text: JSON.stringify(result) }],
  };
}
