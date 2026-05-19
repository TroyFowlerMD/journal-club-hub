# Project: Journal Club Hub

## Identity
- GitHub is the source of truth for this project: TroyFowlerMD/journal-club-hub.
- Notion is no longer the operating source of truth for this repo. Historical Notion content has been migrated into docs/ and the repo memory files.
- Durable documentation lives in docs/, AGENTS.md, TASKS.md, WORKLOG.md, and DECISIONS.md.
- Work in this repo in place. Do not move folders, clone over this repo, or rewrite history unless Dr. Fowler explicitly asks.
- Default branch: main.
- Live/public target: https://troyfowlermd.github.io/journal-club-hub/.

## Project Overview
- TroyMD Journal Club Hub for interactive addiction medicine journal club dashboards and evidence-review resources.
- Static HTML/CSS/JavaScript site served through GitHub Pages.
- Architecture and internal-link review are still pending, so inspect files before structural changes.

## Project Structure
- index.html and article/dashboard pages - public journal club experience
- articles/ or equivalent page folders where present - article-specific dashboards/resources
- docs/ - durable project documentation

## Documentation Map
- docs/journal-club-hub.md

## Required Startup Routine
1. Run git status --short in the repo root.
2. If there are uncommitted changes, stop and report exactly what is present before editing. Treat those changes as user or prior-Codex work and do not overwrite them.
3. If the working tree is clean and network access is available, run git pull --ff-only before starting work. Do not merge, rebase, or force update unless explicitly approved.
4. Read AGENTS.md, TASKS.md, WORKLOG.md, DECISIONS.md, and any task-relevant files in docs/.
5. Report the current branch, repo status, active task, blockers, and proposed next action.
6. Wait for approval before editing unless the user has already given explicit implementation approval.

## Required Shutdown Routine
1. Update WORKLOG.md with what changed, what remains, and any blockers.
2. Update TASKS.md if task status changed.
3. Update DECISIONS.md if an architectural, workflow, safety, or publishing decision was made.
4. Run the relevant tests/checks, or explain why they were not run.
5. Run git status --short and summarize the exact files changed.
6. Recommend a commit message, but ask before running git commit or git push.

## Worklog Entry Format
Append entries to WORKLOG.md using this shape:

    ### YYYY-MM-DD - [machine/profile] - [session summary]
    - Completed: ...
    - In progress: ...
    - Blockers/notes: ...

## Cross-Machine Rules
- Never assume prior chat context is available. Reconstruct state from Git, TASKS.md, WORKLOG.md, DECISIONS.md, and docs/.
- Use git pull --ff-only only when the working tree is clean.
- Avoid destructive Git operations such as reset --hard, force pushes, history rewrites, or deleting untracked work unless explicitly approved.
- Keep generated context inside this repo's memory files and docs/ so another Windows account or computer can resume.
- Do not store secrets, tokens, credentials, private keys, or unnecessary sensitive data in repo docs.
- Preserve user or prior-Codex changes that are already in the working tree.

## Project-Specific Rules
- Keep this repo separate from the broader SUD education hub.
- Public pages should be self-contained and should not link back to private/internal routing pages unless explicitly intended.
- Remove generated attribution or tooling references from public-facing pages.
- Verify live pages with more than HTTP 200 when changing rendered content.
- Architecture review is still pending; inspect current files before making structural changes.

## Verification Guidance
- For content/rendering changes, verify headings and expected controls render, not just HTTP 200.
- For route changes, spot-check public article/dashboard URLs after publish.
- If tests cannot run, record the reason in WORKLOG.md.
