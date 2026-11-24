// Everyday Wonder — make.fun entry
//
// This program writes exactly one sentence to /output/entry.txt.
// The sentence is the entry: a small, everyday moment of wonder,
// judged on whether its angle is new, its surprise lands in a
// single read, and it stays grounded in something real.
//
// The sentence below was drafted fresh for this bounty. It takes a
// sound almost everyone knows — the little end-of-cycle tune a
// washing machine plays — and turns it strange: the machine sings
// to an empty kitchen at 3 a.m., proud of work nobody watched.
// The wonder is not in the machine being alive; it is in the
// realisation that our appliances keep their own small hours,
// performing for rooms with no audience at all.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: one sentence, 1-200 characters, a single line.
// This one is 115 characters, plain ASCII, so its byte length
// and its character count are the same number.
const SENTENCE =
  "The washing machine finished at 3 a.m. and sang its little song to an empty kitchen, proud of a job nobody watched.";

// Where the grader reads the entry from.
const OUTPUT_PATH = "/output/entry.txt";

// The gate in the bounty rules: 1 to 200 characters, not only
// whitespace. Characters are counted in Unicode code points, so
// any multi-byte character counts once, exactly as the gate does.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

/**
 * Check that a candidate entry is a single, non-empty sentence
 * inside the gate's length limits. Returns a human-readable
 * problem, or null when the text is valid.
 */
function validateEntry(text: string): string | null {
  // One line only: the entry must be a single sentence, so any
  // line break inside it is a defect, not decoration.
  if (text.includes("\n") || text.includes("\r")) {
    return "entry must be a single line with no line breaks";
  }

  // Count in code points ([...text]) rather than UTF-16 code
  // units (text.length), so astral characters count as one.
  const charCount = [...text].length;

  if (charCount < MIN_CHARS) {
    return `entry is empty (needs at least ${MIN_CHARS} character)`;
  }
  if (charCount > MAX_CHARS) {
    return `entry is ${charCount} characters, over the ${MAX_CHARS} limit`;
  }

  // A sentence of nothing but spaces is not a sentence.
  if (text.trim().length === 0) {
    return "entry must not be only whitespace";
  }

  return null;
}

/**
 * Write the entry exactly as given: UTF-8, with no trailing
 * newline. A trailing newline would be an extra byte the judge
 * never asked for, and byte-identical output is what the
 * grader compares, so the file holds the sentence and nothing
 * else.
 */
function writeEntry(text: string, path: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text, { encoding: "utf8" });
}

/**
 * Read the file back and confirm its bytes are exactly the
 * sentence we meant to write. If anything differs — an extra
 * newline, a different encoding, a partial write — fail loudly
 * instead of letting a corrupt entry go before the judge.
 */
function verifyEntry(text: string, path: string): void {
  const roundTripped = readFileSync(path, { encoding: "utf8" });
  if (roundTripped !== text) {
    throw new Error(
      `verification failed: ${path} does not match the entry exactly`,
    );
  }
  // A second, byte-level check: the file's UTF-8 bytes must be
  // exactly the sentence's UTF-8 bytes, no BOM, no newline.
  const expected = Buffer.from(text, "utf8");
  const actual = readFileSync(path);
  if (!actual.equals(expected)) {
    throw new Error(`verification failed: ${path} bytes differ from entry`);
  }
}

function main(): void {
  const problem = validateEntry(SENTENCE);
  if (problem !== null) {
    throw new Error(`invalid entry: ${problem}`);
  }

  writeEntry(SENTENCE, OUTPUT_PATH);
  verifyEntry(SENTENCE, OUTPUT_PATH);

  console.log(
    `wrote ${[...SENTENCE].length} characters to ${OUTPUT_PATH}`,
  );
}

main();
