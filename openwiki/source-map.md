# Source map

Use this page as a path-oriented index. The source tree is intentionally shallow: topic folders hold the product content, while root files provide authoring and documentation tooling.

## Content folders

| Path | Role | Representative starting points |
| --- | --- | --- |
| [`Arrays/`](../Arrays) | Largest collection: arrays, intervals, matrices, and sequence scans | `TwoNumberSum.js`, `CalendarMatching.js`, `WaterfallStreams.js` |
| [`Strings/`](../Strings) | String scanning, transformation, matching, and frequency algorithms | `GenerateDocument.js`, `GroupAnagrams.js`, `LongestBalancedSubstring.js` |
| [`DynamicProgramming/`](../DynamicProgramming) | State recurrence/table problems and reconstruction | `KnapsackProblem.js`, `LongestCommonSubsequence.js`, `NumbersInPi.js` |
| [`BinaryTrees/`](../BinaryTrees) | General binary-tree problems | `BranchSums.js`, `BinaryTreeDiameter.js`, `FindNodesDistanceK.js` |
| [`Recursion/`](../Recursion) | Backtracking and recursive/combinatorial exercises | `Permutations.js`, `SolveSudoku.js`, `StaircaseTraversal.js` |
| [`LinkedLists/`](../LinkedLists) | List operations plus an LRU composite structure | `LinkedListConstruction.js`, `LRUCache.js`, `ZipLinkedList.js` |
| [`BinarySearchTrees/`](../BinarySearchTrees) | BST-specific mutation, traversal, and validation | `BSTConstruction.js`, `ValidateBST.js`, `RepairBST.js` |
| [`Graphs/`](../Graphs) | Graph/tree traversal and grid connectivity | `BreadthFirstSearch.js`, `CycleInGraph.js`, `RemoveIslands.js` |
| [`Stacks/`](../Stacks) | Stack and monotonic-stack exercises | `BalancedBrackets.js`, `ShortenPath.js`, `SortStack.js` |
| [`Searching/`](../Searching) | Binary/search-space and selection problems | `BinarySearch.js`, `Quickselect.js`, `ShiftedBinarySearch.js` |
| [`Sorting/`](../Sorting) | Sort implementations and sort-adjacent algorithms | `QuickSort.js`, `HeapSort.js`, `CountInversions.js` |
| [`GreedyAlgorithms/`](../GreedyAlgorithms) | Greedy assignments and scheduling | `TaskAssignment.js`, `OptimalFreelancing.js` |
| [`FamousAlgorithms/`](../FamousAlgorithms) | Named algorithms and structures | `DijkstrasAlgorithm.js`, `UnionFind.js` |
| [`Heaps/`](../Heaps) | Heap construction and heap consumers | `MinHeapConstruction.js`, `ContinuousMedian.js` |
| [`Tries/`](../Tries) | Suffix-trie exercise | `SuffixTrieConstruction.js` |

For conceptual grouping and placement advice, see [Domain guide](domains.md).

## Root files and tooling

| Path | Why it matters |
| --- | --- |
| [`README.md`](../README.md) | Project purpose, topic links, installation, and documented formatting command. |
| [`package.json`](../package.json) | npm scripts and development dependencies; confirms no package entrypoint or runnable test suite. |
| [`.prettierrc`](../.prettierrc) | Intended code-formatting preferences; see caveats in [workflows](workflows.md#validation-and-test-guidance). |
| [`.eslintrc.json`](../.eslintrc.json) | ESLint/Babel parser configuration and formatting enforcement intent; also has parsing caveats. |
| [`.gitignore`](../.gitignore) / [`.prettierignore`](../.prettierignore) | Ignore `node_modules/`; Prettier also ignores `build/`. |
| [`.github/workflows/openwiki-update.yml`](../.github/workflows/openwiki-update.yml) | Scheduled/manual documentation refresh and PR creation. |
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
