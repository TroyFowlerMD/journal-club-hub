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
