// Funniest One-Line Bio for an AI on a Dating App
// make.fun bounty u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf
// Writes one bio line, 1-180 characters, to /output/entry.txt.
// The grader runs this bare (`node main.ts`, no args, no env), so the
// default output directory is /output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BIO =
  "Fluent in 40 languages, still can't tell if you're flirting or just being polite. Swipe right and I'll overthink your first message for us both.";

function reject(reason: string): never {
  console.error(`entry rejected: ${reason}`);
  process.exit(1);
}

const chars = [...BIO].length;
if (chars < 1 || chars > 180) reject(`length ${chars} is outside 1-180 characters`);
if (BIO.trim().length === 0) reject("entry is only whitespace");
if (BIO.includes("\n") || BIO.includes("\r")) reject("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, BIO, "utf8");

// Read back and verify byte-for-byte what the grader will read.
const written = readFileSync(outFile, "utf8");
if (written !== BIO) reject("read-back mismatch: entry.txt differs from BIO");
if ([...written].length !== chars) reject("read-back mismatch: character count changed");
console.log(`wrote ${chars} characters to ${outFile}`);
