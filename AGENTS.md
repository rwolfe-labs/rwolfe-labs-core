AGENT.md - rwolfe-labs-core

Purpose

This repository is part of the Wolfe Labs portfolio. It must be survivable to run and maintain as a solo builder.

Operating constraints
- Family first, job second, portfolio third.
- No "catch-up" hours. If scope doesn't fit the timebox, scope shrinks.
- Favor boring solutions and minimal operational surface.

Code quality bar
- Prefer clarity over cleverness.
- Keep dependencies small and current.
- Add tests where regressions would be painful.
- Document any non-obvious behavior.

Security & privacy
- Avoid collecting sensitive data by default.
- Never send secrets to analytics.
- Prefer first-party analytics endpoints (proxy) when using PostHog.

Change discipline
- Use ADRs for durable decisions: docs/adr/NNNN-title.md
- Update CHANGELOG.md for user-visible changes.
