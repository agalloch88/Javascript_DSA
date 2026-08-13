---
type: "Reference"
title: "Source map"
description: "Path-oriented index of content folders, root tooling files, the tools/openwiki CI install location, and generated wiki controls."
tags: [source-map, navigation, tooling]
---

# Source map

Use this page as a path-oriented index. The source tree is intentionally shallow: topic folders hold the product content, while root files provide authoring and documentation tooling.

## Content folders

| Path | Role | Representative starting points |
| --- | --- | --- |
<!-- openwiki: broken internal link [../Arrays] file "../Arrays" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`Arrays/`](../Arrays) | Largest collection: arrays, intervals, matrices, and sequence scans | `TwoNumberSum.js`, `CalendarMatching.js`, `WaterfallStreams.js` |
<!-- openwiki: broken internal link [../Strings] file "../Strings" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`Strings/`](../Strings) | String scanning, transformation, matching, and frequency algorithms | `GenerateDocument.js`, `GroupAnagrams.js`, `LongestBalancedSubstring.js` |
<!-- openwiki: broken internal link [../DynamicProgramming] file "../DynamicProgramming" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`DynamicProgramming/`](../DynamicProgramming) | State recurrence/table problems and reconstruction | `KnapsackProblem.js`, `LongestCommonSubsequence.js`, `NumbersInPi.js` |
<!-- openwiki: broken internal link [../BinaryTrees] file "../BinaryTrees" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`BinaryTrees/`](../BinaryTrees) | General binary-tree problems | `BranchSums.js`, `BinaryTreeDiameter.js`, `FindNodesDistanceK.js` |
<!-- openwiki: broken internal link [../Recursion] file "../Recursion" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`Recursion/`](../Recursion) | Backtracking and recursive/combinatorial exercises | `Permutations.js`, `SolveSudoku.js`, `StaircaseTraversal.js` |
<!-- openwiki: broken internal link [../LinkedLists] file "../LinkedLists" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`LinkedLists/`](../LinkedLists) | List operations plus an LRU composite structure | `LinkedListConstruction.js`, `LRUCache.js`, `ZipLinkedList.js` |
<!-- openwiki: broken internal link [../BinarySearchTrees] file "../BinarySearchTrees" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`BinarySearchTrees/`](../BinarySearchTrees) | BST-specific mutation, traversal, and validation | `BSTConstruction.js`, `ValidateBST.js`, `RepairBST.js` |
<!-- openwiki: broken internal link [../Graphs] file "../Graphs" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`Graphs/`](../Graphs) | Graph/tree traversal and grid connectivity | `BreadthFirstSearch.js`, `CycleInGraph.js`, `RemoveIslands.js` |
<!-- openwiki: broken internal link [../Stacks] file "../Stacks" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`Stacks/`](../Stacks) | Stack and monotonic-stack exercises | `BalancedBrackets.js`, `ShortenPath.js`, `SortStack.js` |
<!-- openwiki: broken internal link [../Searching] file "../Searching" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`Searching/`](../Searching) | Binary/search-space and selection problems | `BinarySearch.js`, `Quickselect.js`, `ShiftedBinarySearch.js` |
<!-- openwiki: broken internal link [../Sorting] file "../Sorting" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`Sorting/`](../Sorting) | Sort implementations and sort-adjacent algorithms | `QuickSort.js`, `HeapSort.js`, `CountInversions.js` |
<!-- openwiki: broken internal link [../GreedyAlgorithms] file "../GreedyAlgorithms" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`GreedyAlgorithms/`](../GreedyAlgorithms) | Greedy assignments and scheduling | `TaskAssignment.js`, `OptimalFreelancing.js` |
<!-- openwiki: broken internal link [../FamousAlgorithms] file "../FamousAlgorithms" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`FamousAlgorithms/`](../FamousAlgorithms) | Named algorithms and structures | `DijkstrasAlgorithm.js`, `UnionFind.js` |
<!-- openwiki: broken internal link [../Heaps] file "../Heaps" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`Heaps/`](../Heaps) | Heap construction and heap consumers | `MinHeapConstruction.js`, `ContinuousMedian.js` |
<!-- openwiki: broken internal link [../Tries] file "../Tries" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`Tries/`](../Tries) | Suffix-trie exercise | `SuffixTrieConstruction.js` |

For conceptual grouping and placement advice, see [Domain guide](domains.md).

## Root files and tooling

| Path | Why it matters |
| --- | --- |
| [`README.md`](../README.md) | Project purpose, topic links, installation, and documented formatting command. |
| [`package.json`](../package.json) | npm scripts and development dependencies; confirms no package entrypoint or runnable test suite. |
<!-- openwiki: broken internal link [../tools/openwiki] file "../tools/openwiki" does not exist. Fix the href or restore the target, then delete this comment. -->
| [`tools/openwiki/`](../tools/openwiki) | Pinned OpenWiki CLI install location for CI (`openwiki-ci`, depends on `openwiki@0.3.2`); only `package.json`/`package-lock.json` are tracked, `node_modules/` is gitignored. |
| [`.prettierrc`](../.prettierrc) | Valid JSON code-formatting preferences; see [workflows](workflows.md#validation-and-test-guidance). |
| [`.eslintrc.json`](../.eslintrc.json) | ESLint/Babel parser configuration; not strict JSON (inline comment), so parse with JSONC/ESLint, not `JSON.parse`. |
| [`.gitignore`](../.gitignore) / [`.prettierignore`](../.prettierignore) | `.gitignore` ignores `node_modules/`; `.prettierignore` additionally ignores `build/`. |
| [`.github/workflows/openwiki-update.yml`](../.github/workflows/openwiki-update.yml) | Push-to-`main` and manual-dispatch documentation refresh; installs from `tools/openwiki/` and opens an `openwiki`-scoped PR. |
| [`AGENTS.md`](../AGENTS.md) / [`CLAUDE.md`](../CLAUDE.md) | Agent entry instructions that point to the generated wiki. Do not routinely edit. |

## Generated wiki controls

| Path | Role |
| --- | --- |
| [`openwiki/INSTRUCTIONS.md`](INSTRUCTIONS.md) | User-authored wiki brief; control metadata, not routine generated content. |
| [`openwiki/quickstart.md`](quickstart.md) | Wiki entrypoint and orientation. |
| [`openwiki/architecture.md`](architecture.md) | Source-file contract and naming/structure conventions. |
| [`openwiki/domains.md`](domains.md) | Topic taxonomy and placement guide. |
| [`openwiki/workflows.md`](workflows.md) | Editing, validation, automation, and integration runbook. |
| [`openwiki/.last-update.json`](.last-update.json) | Records this initial wiki update. |

## Where to investigate first

- **Wrong answer or complexity question:** read that exercise’s prompt, every variant, and local helpers; then inspect focused Git history.
- **Category/placement question:** start with [Domain guide](domains.md), then inspect neighboring filenames.
- **Formatting failure:** inspect `package.json`, `.prettierrc`, and `.eslintrc.json`; verify Node/tool availability before editing algorithm source.
- **OpenWiki automation question:** begin with the workflow and `openwiki/INSTRUCTIONS.md`; generated pages should be refreshed through the OpenWiki workflow/CLI.
