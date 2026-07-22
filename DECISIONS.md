# Decisions

This file records durable architectural, workflow, safety, and publishing decisions for Journal Club Hub. Each entry should include Context, Decision, Rationale, and Consequences.

---

### 2026-05-06 - Keep Journal Club Hub As Separate Repo
Context: The TroyMD portfolio contains several education and clinical tool repos, including SUD education and journal club resources.
Decision: Keep `journal-club-hub` separate from `sud-education-hub`.
Rationale: Journal club dashboards serve an evidence-review/session workflow distinct from topic-based SUD education pages.
Consequences: Future journal club resources should default here unless the user explicitly assigns them elsewhere.

### 2026-05-16 - Publish Cleanup As Separate Repo Pass
Context: Public cleanup work spanned more than one repo.
Decision: Treat `journal-club-hub` as its own publish artifact with separate commit, verification, and Notion/log entry.
Rationale: Keeps unrelated public repo changes reviewable and reversible.
Consequences: Future multi-repo cleanup should continue using repo-specific commits and checks.

### 2026-05-22 - Explain Repo Work With Beginner Context
Context: Dr. Fowler is new to Git, GitHub, GitHub Desktop, Codex, and local-vs-remote repository workflows.
Decision: Codex should explain repo work with extra beginner-friendly context by default, including definitions, why each step matters, exact local paths/button names when useful, and a clear distinction between local files, local commits, pushed GitHub commits, pull requests, and deployed site changes.
Rationale: Better context reduces accidental duplicate clones, OneDrive/Git confusion, and uncertainty about whether work is local, synced, or live.
Consequences: Future repo instructions and shutdown summaries should favor plain outcome language and step-by-step guidance over unexplained Git shorthand.

### 2026-05-22 - Surface Workflow Streamlining Opportunities
Context: Dr. Fowler wants Codex to notice chances to make his coding, GitHub, GitHub Desktop, deployment, and cross-machine workflows smoother.
Decision: When Codex sees a practical workflow improvement, it should present the opportunity proactively with the expected benefit, any risk or cost, and the smallest safe next step.
Rationale: Small workflow improvements compound, especially while Dr. Fowler is learning Git and using Codex across multiple machines.
Consequences: Future sessions should separate optional workflow suggestions from required task work so recommendations help without derailing the current task.

### 2026-06-12 - Use Vercel As Canonical Host And Keep GitHub Pages Only As A Public Redirect
Context: Journal Club Hub was migrated off GitHub Pages to Vercel, but the old `troyfowlermd.github.io/journal-club-hub` URL still needed a legacy forwarder.
Decision: Treat `https://journal-club-hub.vercel.app/` as the canonical live host and keep the repo public while GitHub Pages serves only the `gh-pages` redirect branch.
Rationale: Live verification showed the requested `redirect + private` combination unpublished Pages and broke the old URL on the current GitHub account.
Consequences: Do not make `TroyFowlerMD/journal-club-hub` private unless the legacy Pages URL is being retired or a different redirect strategy replaces GitHub Pages.

### 2026-07-22 - Medetomidine Entry Uses Explicit Evidence Labels And Direct Hub QR
Context: The Medetomidine article presents early clinical recommendations from limited, evolving evidence, and the printable handout needs a QR link back to the Journal Club Hub.
Decision: Label claims by evidence type where relevant and encode `https://journal-club-hub.vercel.app/` directly in the QR asset without a URL shortener, tracking wrapper, or forwarding intermediary.
Rationale: Prevents expert protocol suggestions from appearing equivalent to trial evidence and keeps the printed link durable and auditable.
Consequences: Future article handouts should preserve direct canonical URLs and make evidence strength visible when the source is a narrative review, case series, or expert framework.
