# Rekey

An agent that rotates leaked API keys and fixes everything that depended on them.

Built for the [Multi-App AI Agent Hackathon](https://multiappagenthackathon.com/), September 13, 2026.

## What it does

When a credential leaks (a GitHub secret-scanning alert fires), Rekey rotates it at
the provider, propagates the new value to every place it's used, verifies the old
key is dead and production is healthy, and closes the loop — exactly once, without
an outage.

See `SPEC.md` for the state machine and tool contracts, `BRIEF.md` for the
reliability brief, and `scenarios/` for the eval suite.

## Setup

```bash
npm install
cp .env.example .env   # fill in credentials
npm run typecheck
```

## Commands

```bash
npm run run -- --alert scenarios/S01.yaml   # replay one scenario through the actor
npm run verify -- --run <run-id>            # independently grade a run's end state
npm run eval -- --suite scenarios/          # run the full scenario suite, N trials each
npm run approve -- <run-id>                 # approve a halted run awaiting a human
```

`TARGET` in `.env` selects which base URL each tool client hits: `live` (real
accounts), `twin` (Arga twins), or `mock` (local fixtures, the default for tests).

## Status

Scaffolding only — see `SPEC.md` for what's next.
