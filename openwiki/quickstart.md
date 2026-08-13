# JavaScript DSA — Quickstart

This repository is an educational collection of standalone JavaScript solutions to data-structure-and-algorithm problems. It is **not** an application or published library: there is no runtime entry point, shared package API, persistence layer, or service integration. The meaningful unit is one problem file in one topic directory.

Each exercise generally co-locates its prose prompt, sample input/output, complexity notes, one or more labelled implementations, and any helper types it needs. Read the whole file before changing it—numbered variants are often intentional comparisons of algorithmic tradeoffs.

## Start here

1. Read the root [`README.md`](../README.md) for the stated repository scope and documented setup.
2. Use [Domain guide](domains.md) to find the appropriate problem family.
3. Read the selected source file from prompt through helpers; it is the authoritative contract for that exercise.
4. Follow [Authoring, verification, and operations](workflows.md) before adding or changing an implementation.
5. Use [Architecture and solution contract](architecture.md) for file conventions and [Source map](source-map.md) for direct navigation.

## Wiki map

- [Architecture and solution contract](architecture.md) — the intentionally decentralized snippet model, local data shapes, alternatives, and change boundaries.
- [Domain guide](domains.md) — all 15 problem families, their purposes, and useful starting files.
- [Authoring, verification, and operations](workflows.md) — safe editing workflow, known validation gaps, recent Git-history signals, and OpenWiki automation.
- [Source map](source-map.md) — direct path-oriented index for content, tooling, and documentation controls.

## Repository facts

- **Content:** 179 JavaScript exercise files organized by algorithmic technique or data structure, from `Arrays/` through `Tries/`.
- **Tooling:** npm, Prettier, ESLint, and Babel parser support are declared in [`package.json`](../package.json). The only substantive npm script is a write/autofix formatter.
- **Interface model:** source files use top-level functions or classes and generally have no imports or exports. Treat them as independent study snippets, not composable modules.
- **Variants:** a primary declaration is commonly followed by alternatives such as `functionName2` and `functionName3`. Recent history focuses on fixing duplicate alternative declarations by numbering them.
- **Automation:** [`.github/workflows/openwiki-update.yml`](../.github/workflows/openwiki-update.yml) schedules a daily OpenWiki documentation update and supports manual dispatch. It is not a test or deployment pipeline.

## Guardrails

- `npm run format` runs `prettier --write` and `eslint --fix` against JavaScript globs. It can change unrelated files; inspect its diff.
- `npm test` is configured as `none`. Complexity comments and samples explain intent but are not executable correctness evidence.
- Do not assume similarly named `Node`, `BST`, heap, or linked-list types work together across files. Their contracts are local.
- Keep generated wiki content under `openwiki/`. Treat [`openwiki/INSTRUCTIONS.md`](INSTRUCTIONS.md) as user-authored control metadata; do not rewrite it during normal documentation maintenance.

## Backlog

- **Executable correctness inventory** — source anchor: all topic directories, particularly multi-variant exercises. Deferred because there is no test harness and this pass inspected representative source rather than executing every solution.
- **Reusable module/API design** — source anchor: standalone top-level declarations across `Arrays/`–`Tries/`. Deferred because no package entrypoint or export contract exists; introducing one is a product/design change, not documentation work.
