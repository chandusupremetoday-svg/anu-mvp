#!/usr/bin/env node
/**
 * check-review-status.js
 *
 * WHY THIS EXISTS: on 2026-08-23, Claude asked Purna to set reviewedBy/
 * reviewedAt on a chapter, the conversation moved to a new topic before
 * he confirmed it, and the gap sat unflagged for several turns before
 * being caught by chance. That's a real failure mode: relying on a chat
 * transcript (human or AI memory of it) to know whether something
 * actually happened. This script makes "is this chapter reviewed?" a
 * mechanical, code-verified fact instead — anyone, or any future Claude
 * session with zero memory of this conversation, can run one command
 * and get real ground truth from the actual files, not from what
 * anybody remembers being said.
 *
 * Run any time:  node scripts/check-review-status.js
 * Runs automatically on every commit via the local pre-commit hook —
 * see README.md for how to (re-)install that hook, since git hooks
 * are NOT version-controlled and won't survive a fresh clone on a new
 * machine. This script itself always will, because it's a real file
 * in the repo, not a local-only setting.
 */
const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "..", "src", "content");
const files = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith(".json"))
  .sort();

console.log("\n📋 ANU content review status");
console.log("─".repeat(50));

let anyUnreviewed = false;

for (const file of files) {
  const full = path.join(contentDir, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(full, "utf-8"));
  } catch (e) {
    console.log(`⚠️  ${file}: could not parse (${e.message})`);
    continue;
  }
  const title = data.chapterTitle || file;
  const reviewed = Boolean(data.reviewedBy && data.reviewedAt);
  if (reviewed) {
    console.log(`✅  ${title}`);
    console.log(`     reviewed by ${data.reviewedBy} on ${data.reviewedAt}`);
  } else {
    anyUnreviewed = true;
    console.log(`❌  ${title}`);
    console.log(`     NOT reviewed — locked from learners until reviewedBy/reviewedAt are set (${file})`);
  }
}

console.log("─".repeat(50));
if (anyUnreviewed) {
  console.log(
    "👉  At least one chapter is still waiting on a human review.\n" +
      "    Normal during active editing — just don't lose track of it.\n"
  );
} else {
  console.log("👉  Everything in src/content is reviewed and unlocked.\n");
}