#!/usr/bin/env node
/**
 * validate-content.js
 *
 * WHY THIS EXISTS: tonight, real structural bugs in lesson content
 * were caught by manually reading JSON files line by line — a "does
 * this correct answer actually appear in its own options list" check,
 * done by eye, over and over. That's exactly backwards. This kind of
 * check has ONE correct answer, mechanically derivable from the file
 * itself — it should never depend on anyone's attention holding up.
 *
 * This script is the elephant, not the wheelbarrow: it doesn't do
 * this faster than a careful human/AI check, it does it in a way that
 * literally cannot get tired, distracted, or miss a case 40 messages
 * into a long session. What it checks for is narrow and mechanical on
 * purpose — anything requiring real judgment (is this explanation
 * actually warm? is this fact true in the real world?) still needs a
 * human or Claude reading it directly. This only catches the class of
 * bug that has one unambiguous right answer.
 *
 * Run any time:  node scripts/validate-content.js
 * Wired into the same local pre-commit hook as check-review-status.js.
 */
const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "..", "src", "content");
const files = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith(".json"))
  .sort();

console.log("\n🔍 ANU content structural validation");
console.log("─".repeat(50));

let totalErrors = 0;

for (const file of files) {
  const full = path.join(contentDir, file);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(full, "utf-8"));
  } catch (e) {
    console.log(`❌  ${file}: invalid JSON (${e.message})`);
    totalErrors++;
    continue;
  }

  const errors = [];
  const seenIds = new Set();

  for (const concept of data.concepts || []) {
    if (!concept.id) {
      errors.push(`concept titled "${concept.title}" has no id`);
    } else if (seenIds.has(concept.id)) {
      errors.push(`duplicate concept id "${concept.id}" — recall tracking will conflate these two concepts`);
    } else {
      seenIds.add(concept.id);
    }

    if (concept.activityType === "match_zones") {
      const zoneIds = new Set((concept.zones || []).map((z) => z.id));
      for (const item of concept.items || []) {
        if (!zoneIds.has(item.correctZone)) {
          errors.push(
            `[${concept.id}] item "${item.label}" points to correctZone "${item.correctZone}", which doesn't match any real zone id — this item can NEVER be placed correctly, the activity is unsolvable as written`
          );
        }
      }
      if (!concept.items || concept.items.length === 0) {
        errors.push(`[${concept.id}] match_zones activity has no items`);
      }
    } else {
      for (const q of concept.checkQuestions || []) {
        if (!Array.isArray(q.options) || !q.options.includes(q.correct)) {
          errors.push(
            `[${concept.id}] question "${q.prompt}" has correct="${q.correct}", which does not appear in its own options list [${(q.options || []).join(", ")}] — this question can never be answered correctly`
          );
        }
      }
      if (!concept.representations || concept.representations.length === 0) {
        errors.push(`[${concept.id}] has no representations — nothing would render on screen`);
      }
    }
  }

  if (errors.length === 0) {
    console.log(`✅  ${file} — ${(data.concepts || []).length} concepts, no structural issues found`);
  } else {
    console.log(`❌  ${file}:`);
    errors.forEach((e) => console.log(`     - ${e}`));
    totalErrors += errors.length;
  }
}

console.log("─".repeat(50));
if (totalErrors === 0) {
  console.log("👉  All content files are structurally sound.\n");
} else {
  console.log(`👉  ${totalErrors} structural issue(s) found — these are unambiguous bugs, not style opinions. Fix before this content reaches a learner.\n`);
}