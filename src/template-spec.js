/* spec.template.js  – blank MCP-spec boilerplate
 *
 * HOW TO USE
 * ----------
 * 1. Search/replace all  __PLACEHOLDER__  tokens.
 * 2. Duplicate the “/* TOOL *\/” block for every tool you need.
 * 3. Each tool **must** return `makeResult(value)` (helper below).
 */

import { nanoid } from 'nanoid';
import { z }      from 'zod';

/* ───────── helpers ─────────────────────────────────────────────── */

/** Wrap any value or string in the standard MCP “result” envelope. */
export const makeResult = (v) => ({
  content: [
    {
      type: 'text',
      text: typeof v === 'string' ? v : JSON.stringify(v, null, 2),
    },
  ],
});

/* ───────── example parameter-shape (edit / duplicate / delete) ─── */

const ExampleShape = {
  message: z.string().describe('Any message you want echoed back.'),
};

/* ───────── spec object ─────────────────────────────────────────── */

export const spec = {
  id         : '__ID__',          // e.g. "echo"
  instanceId : nanoid(),
  description: '__DESCRIPTION__', // e.g. "Tiny echo demonstration.",

  tools: [
    /* TOOL: echo ---------------------------------------------------- */
    {
      name       : 'echo',
      description: 'Return whatever message you send.',
      parameters : ExampleShape,   // raw Zod shape (NOT z.object)
      async execute({ message }) {
        return makeResult(`You said: ${message}`);
      },
    },

    /* ── COPY FROM HERE FOR MORE TOOLS ─────────────────────────────
    {
      name       : '__TOOL_NAME__',
      description: '__WHAT_THE_TOOL_DOES__',
      parameters : { /* …parameter Zod shape… *\/ },
      async execute(args) {
        // …tool logic…
        return makeResult('__RESPONSE__');
      },
    },
    ─────────────────────────────────────────────────────────────── */
  ],
};

export default spec;
