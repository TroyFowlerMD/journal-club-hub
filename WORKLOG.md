# Worklog

This file records completed Codex work sessions for Journal Club Hub. Append new entries during the shutdown routine so future sessions can resume without prior chat context.

---

### 2026-07-22 - Codex Work Mode - Medetomidine PDF typography correction
- Completed: Rebuilt the two-page Medetomidine journal-club handout with an embedded condensed sans-serif font, normal character positioning, and body text approximately one point larger than the smallest text in the prior PDF.
- Completed: Preserved the page-2 ASAM section break, direct Journal Club Hub QR footer, content hierarchy, and two-page format; rendered and visually inspected both pages.
- Completed: Triggered a fresh production deployment after confirming Vercel had not received the PDF typography commit through its Git integration.
- Blockers/notes: None known.

### 2026-07-22 - Codex desktop - Medetomidine journal club entry
- Completed: Read the complete eight-page source article, synthesized its clinical concepts, and cross-checked additional professional context from CDC, UPMC, PubMed, and AAFP resources.
- Completed: Added `articles/medetomidine-2026/index.html` and added the article to the public Hub library.
- Completed: Added a printable two-page handout PDF, its HTML source, and a QR PNG whose decoded payload is exactly `https://journal-club-hub.vercel.app/`.
- Completed: Verified local article links, PDF metadata/rendering, and QR decoding.
- Completed: Committed as `4a8b951` (`Expose Medetomidine handout and deployment status`, following `1afc49f`), pushed to `origin/main`, deployed to the canonical Vercel production site, and live-verified at the Hub root and article route.
- Completed: Added a direct printable-handout link to the live article dashboard; the QR payload remains the canonical Hub URL with no redirect or tracking intermediary.
- Completed: Revised the handout so the header no longer says `TroyMD Journal Club Hub`; the label now sits beside the direct QR code in the last-page footer.
- Completed: Added a two-paragraph facilitator discussion addressing all six prompts and forced `Clinical implications for ASAM 3.7/3.5 practice` to the top of page 2; rendered both pages for visual inspection.
- Blockers/notes: None known. Deployment `dpl_5t9o58jvok3jw3nRiksRBZjsiihM` is serving the production route.

## Entry Format

    ### YYYY-MM-DD - [machine/profile] - [session summary]
    - Completed: ...
    - In progress: ...
    - Blockers/notes: ...

### 2026-05-19 - Codex desktop - Repository maintenance sweep
- Completed: Fast-forward pulled `origin/main` and confirmed the working tree was clean before maintenance logging.
- Completed: Smoke-checked the public Journal Club Hub live URL; it returned HTTP 200 with expected journal/club text.
- Completed: Ran a local relative href/src scan with no missing local targets found for this repo.
- In progress: Existing architecture review, live article rendering checks, and generated-attribution sweep remain open in TASKS.md.
- Blockers/notes: No app code changed; TASKS.md and DECISIONS.md were not changed.

### 2026-05-22 - Codex desktop - Owner communication and workflow preference
- Completed: Added `AGENTS.md` Owner Communication guidance so future Codex sessions explain Git, GitHub, GitHub Desktop, Codex workspace behavior, local-vs-remote state, commits, pushes, pulls, branches, and deployments with extra beginner-friendly context.
- Completed: Added guidance to proactively surface opportunities to streamline Dr. Fowler's workflow, including expected benefit, risk/cost, and smallest safe next step.
- In progress: Existing Journal Club Hub tasks remain unchanged.
- Blockers/notes: Instruction-only change; no app runtime code changed.

### 2026-06-12 - Codex desktop - Vercel migration and legacy redirect cutover
- Completed: Created the `journal-club-hub` Vercel project, linked the local repo, and verified live production rendering at `https://journal-club-hub.vercel.app/` plus `https://journal-club-hub.vercel.app/articles/fda-7oh-2025/`.
- Completed: Added a dedicated `gh-pages` branch with redirect files, repointed GitHub Pages to that branch, and verified the legacy article URL resolves to the Vercel-hosted content after propagation.
- Completed: Updated repo docs and the linked `my-dashboard` card to use the canonical Vercel hostname.
- In progress: Architecture review and generated-attribution sweep remain open in TASKS.md.
- Blockers/notes: The requested `redirect + private` combination is not supported on the current GitHub account for this repo; making the repo private unpublished Pages and broke the legacy URL, so the repo was restored to `public`.
