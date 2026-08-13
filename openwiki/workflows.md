---
type: "Reference"
title: "Authoring, verification, and operations"
description: "Editing workflow, validation/test limitations, Git-aware maintenance, OpenWiki CI automation, and integration runbook for the JavaScript DSA repository."
tags: [workflow, validation, operations, ci]
---

# Authoring, verification, and operations

## Add or revise an exercise

1. **Choose the closest existing topic** with [Domain guide](domains.md); do not create a new category for a lone exercise.
2. **Preserve the standalone lesson format:** prompt, assumptions, sample input/output, labelled solution(s), complexity notes, and file-local helpers/classes.
3. **Define the behavioral contract:** document empty/null handling, duplicates, output ordering, sentinels, and whether input is sorted, swapped, reversed, or relinked.
4. **Keep alternatives distinct.** Label later approaches `Solution 2`, `Solution 3`, etc. Use unique numeric suffixes for every alternative top-level function/class and any alternative-specific helper (`functionName2`, `helperName2`).
5. **Keep data structures local** unless the task explicitly introduces an exported/shared model. Similar `Node`, `BST`, `MinHeap`, and `LinkedList` declarations in different exercises are not shared APIs.
6. **Walk through examples and edge cases manually.** Check empty and singleton inputs, bounds, duplicate keys/values, mutation behavior, recursive base cases, and the problem’s required sentinel/output ordering.
7. **Update this wiki only for changes to navigation, repository conventions, tooling, or automation.** Do not rewrite `openwiki/INSTRUCTIONS.md` during routine updates.

[`Strings/GenerateDocument.js`](../Strings/GenerateDocument.js), [`BinarySearchTrees/BSTConstruction.js`](../BinarySearchTrees/BSTConstruction.js), and [`LinkedLists/LRUCache.js`](../LinkedLists/LRUCache.js) are representative patterns for multi-approach functions, tree classes, and co-located helper structures.

## Validation and test guidance

### Formatter/linter command

```bash
npm run format
```

[`package.json`](../package.json) defines it as:

```bash
prettier --write '**/*.js' && eslint --fix '**/*.js'
```

This is a **write/autofix** command, not a read-only validation check. Run it only when its scope is acceptable, then review `git diff`. The configured `test` script is `none`; no project test runner, test directory, or fixtures were found.

### Current limitations

- [`.eslintrc.json`](../.eslintrc.json) is not strict JSON: it contains an inline `//` comment, so `JSON.parse` rejects it (ESLint itself reads it as JSONC). [`.prettierrc`](../.prettierrc) is valid JSON. Verify that local tooling can parse the checked-in ESLint configuration before relying on it as a gate.
- Existing source is not guaranteed correct. For example, the recursive variant in [`Searching/BinarySearch.js`](../Searching/BinarySearch.js) uses `Match.floor`, while its iterative counterpart uses `Math.floor`; [`Tries/SuffixTrieConstruction.js`](../Tries/SuffixTrieConstruction.js) has method/property-name inconsistencies. Treat these as validation priorities, not a request for incidental corpus-wide edits.

If adding a real test suite, decide first whether the repository will retain standalone scripts or introduce deliberate exports. Today there is no `export`/`module.exports` contract, so testing requires either controlled evaluation or an intentional module-boundary migration.

## Git-aware maintenance

The repository history is currently a single commit, so there is no deep per-file history to mine. The corpus itself shows the durable convention: multi-variant files number later alternatives and helpers so every approach can coexist without duplicate declarations (e.g. [`Strings/GenerateDocument.js`](../Strings/GenerateDocument.js)).

This convention signals incremental standardization rather than broad refactors:

- preserve the unsuffixed primary implementation and numbered alternatives unless a task deliberately changes the teaching surface;
- prefer a focused problem-level review/change unit;
- avoid combining algorithmic edits with broad formatter churn; and
- inspect targeted history when naming or helper relationships are unclear.

Useful review sequence:

```bash
git status --short
git diff --check
git diff -- <topic>/<Problem>.js
git log --oneline -- <topic>/<Problem>.js
```

## Integration and operations

The only repository-level integration found is OpenWiki automation:

- [`.github/workflows/openwiki-update.yml`](../.github/workflows/openwiki-update.yml) triggers on push to `main` (ignoring changes under `openwiki/**` and `tools/openwiki/**`) and on manual `workflow_dispatch`.
<!-- openwiki: broken internal link [../tools/openwiki] file "../tools/openwiki" does not exist. Fix the href or restore the target, then delete this comment. -->
- It sets up Node 22, installs the pinned OpenWiki CLI with `npm ci` from [`tools/openwiki/`](../tools/openwiki) (a private `openwiki-ci` package depending on `openwiki@0.3.2`), and runs `tools/openwiki/node_modules/.bin/openwiki --update --print`.
- The model is configured via the `OPENROUTER_API_KEY` secret and `OPENWIKI_MODEL_ID: z-ai/glm-5.2`. Never put credential values in source, documentation, or commits.
- It creates a pull request scoped to `add-paths: openwiki` (commit message `docs: update OpenWiki`, branch `openwiki/update`). Only the `openwiki/` tree is included in the PR; `AGENTS.md`, `CLAUDE.md`, and the workflow file are not regenerated by it.
- [`AGENTS.md`](../AGENTS.md) and [`CLAUDE.md`](../CLAUDE.md) point agents at this wiki; leave them unchanged during normal source/wiki work.

No external algorithm APIs, databases, queues, deployments, or application services were found.

## Change checklist

- [ ] Correct topic folder and PascalCase problem filename.
- [ ] Standalone prompt, samples, complexity claims, and helper contract remain coherent.
- [ ] Alternative functions/classes and their helpers have unique names.
- [ ] Manual example and edge-case walkthrough completed.
- [ ] Formatting/lint behavior verified locally before using it as a gate; any write diff reviewed.
- [ ] Docs updated if topology, conventions, tooling, or automation changed.
- [ ] No secrets, `node_modules`, or unrelated changes added.
