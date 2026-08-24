# Pending Actions

This file exists because of a real gap on 2026-08-23: Claude asked
Purna to do something outside the chat, the conversation moved on to a
new topic before it was confirmed, and the gap went unnoticed for
several turns. See PRINCIPLES.md for the full account.

**The idea, following Purna's own framing of it:** a human's unaided
memory has real limits under stress — so does a single AI
conversation's attention across a long, dense session. Neither of us
needs to overcome that limit through more willpower or more careful
attention alone. The actual fix is the same one humans have always
used for this: build an external system that holds the state instead,
so correctness doesn't depend on anyone remembering anything in the
moment. (Purna's own example: humans didn't get stronger to move heavy
loads — they trained elephants, then built machines, that had a kind
of strength human muscle never will.) This file is that external
system, for one specific, important class of risk: things asked for
outside the chat that can't simply be verified by reading code.

## How this file gets used

- Whenever Claude asks Purna to do something outside the chat that
  Claude can't later verify just by reading a file — running a
  command, checking something in a browser, giving a subjective human
  judgment like "does this feel right" — Claude adds a line here, in
  the same turn, before moving on to anything else.
- An item is only ever removed once its confirmation genuinely
  happens — Purna reporting back, or Claude directly re-checking.
  Never removed just because the conversation moved on to something
  else.
- Anyone — Purna, or a future Claude session with zero memory of any
  specific conversation — can open this one file and know exactly
  what's still open, without needing to reconstruct anything from a
  chat transcript.
- Things that CAN be mechanically verified straight from the code
  (like whether a content file has actually been reviewed) don't need
  to live here — see `scripts/check-review-status.js` for that class
  of check instead. This file is specifically for the things a script
  can't check on its own.

---

## Currently open

*(nothing currently open)*

## Resolved

- [x] Confirm the two Wikimedia images (Hirakud Dam, coal) actually
      render correctly on the live "Our Resources" lesson —
      **confirmed 2026-08-24** by Purna, checked directly on the
      live site.
- [x] Review "Who Runs Our Country and State?" (civics) fresh —
      **confirmed 2026-08-24** by real commit output (commit
      `bed0ff6`) and `scripts/check-review-status.js` showing
      `reviewedBy: Purna, reviewedAt: 2026-08-24`.
- [x] Review "Our Resources" fresh — **confirmed 2026-08-24** by the
      same commit (`bed0ff6`) and script output.
- [x] Confirm the updated `.git/hooks/pre-commit` (with the
      review-status + pending-actions check added, 2026-08-23) has
      actually been pasted onto the local machine — **confirmed
      2026-08-23** by real commit output (commit 3b45139) showing both
      the review-status report and this file's open items printing
      automatically. Not assumed — actually seen.