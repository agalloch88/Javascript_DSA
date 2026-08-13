---
type: "Reference"
title: "Domain guide"
description: "Topic taxonomy for the 15 problem-family folders, what each covers, recommended entry points, and placement guidance for new exercises."
tags: [domain, taxonomy, placement-guide]
---

# Domain guide

The repository is organized by the dominant algorithmic technique or data structure. Topic placement is the primary discovery mechanism; there is no central catalog or runtime registry. Open a problem file to obtain its authoritative prompt, input/output shape, and complexity claims.

## Sequence, ordering, and text

| Area | Folder | What it covers | Good entry points |
| --- | --- | --- | --- |
<!-- openwiki: broken internal link [../Arrays] file "../Arrays" does not exist. Fix the href or restore the target, then delete this comment. -->
| Array / matrix problems | [`Arrays/`](../Arrays) | Two pointers, intervals, matrix traversal, sums, ranges, scheduling-style scans | `TwoNumberSum.js`, `MergeOverlappingIntervals.js`, `SpiralTraverse.js`, `CalendarMatching.js` |
<!-- openwiki: broken internal link [../Searching] file "../Searching" does not exist. Fix the href or restore the target, then delete this comment. -->
| Searching | [`Searching/`](../Searching) | Binary-search variants, selection, and sorted-data search | `BinarySearch.js`, `SearchForRange.js`, `MedianOfTwoSortedArrays.js` |
<!-- openwiki: broken internal link [../Sorting] file "../Sorting" does not exist. Fix the href or restore the target, then delete this comment. -->
| Sorting | [`Sorting/`](../Sorting) | Elementary, divide-and-conquer, heap, radix, inversion, and constrained sorting | `BubbleSort.js`, `QuickSort.js`, `CountInversions.js`, `RadixSort.js` |
<!-- openwiki: broken internal link [../Strings] file "../Strings" does not exist. Fix the href or restore the target, then delete this comment. -->
| Strings | [`Strings/`](../Strings) | Character frequency, substrings, palindromes, matching, encoding, and string transforms | `GenerateDocument.js`, `GroupAnagrams.js`, `SmallestSubstringContaining.js` |
<!-- openwiki: broken internal link [../FamousAlgorithms] file "../FamousAlgorithms" does not exist. Fix the href or restore the target, then delete this comment. -->
| Famous algorithms | [`FamousAlgorithms/`](../FamousAlgorithms) | Named/general algorithms and structures | `DijkstrasAlgorithm.js`, `KadanesAlgorithm.js`, `UnionFind.js` |

## Trees, graphs, and linked structures

| Area | Folder | What it covers | Good entry points |
| --- | --- | --- | --- |
<!-- openwiki: broken internal link [../Graphs] file "../Graphs" does not exist. Fix the href or restore the target, then delete this comment. -->
| Graphs | [`Graphs/`](../Graphs) | Traversals, connectivity, coloring, cycles, grid/graph transformations | `BreadthFirstSearch.js`, `DepthFirstSearch.js`, `CycleInGraph.js`, `RiverSizes.js` |
<!-- openwiki: broken internal link [../BinaryTrees] file "../BinaryTrees" does not exist. Fix the href or restore the target, then delete this comment. -->
| Binary trees | [`BinaryTrees/`](../BinaryTrees) | Tree traversals, depth/path calculations, balancing, transformation, and relationships | `BranchSums.js`, `BinaryTreeDiameter.js`, `FindSuccessor.js`, `MaxPathSumInBinaryTree.js` |
<!-- openwiki: broken internal link [../BinarySearchTrees] file "../BinarySearchTrees" does not exist. Fix the href or restore the target, then delete this comment. -->
| Binary search trees | [`BinarySearchTrees/`](../BinarySearchTrees) | Ordered-tree construction, validation, traversal, rebuilding, and rank/order operations | `BSTConstruction.js`, `ValidateBST.js`, `MinHeightBST.js`, `ReconstructBST.js` |
<!-- openwiki: broken internal link [../LinkedLists] file "../LinkedLists" does not exist. Fix the href or restore the target, then delete this comment. -->
| Linked lists | [`LinkedLists/`](../LinkedLists) | List construction/manipulation, cycle detection, merging, and LRU design | `LinkedListConstruction.js`, `FindLoop.js`, `MergeLinkedLists.js`, `LRUCache.js` |
<!-- openwiki: broken internal link [../Heaps] file "../Heaps" does not exist. Fix the href or restore the target, then delete this comment. -->
| Heaps | [`Heaps/`](../Heaps) | Heap construction, rolling median, and nearly-sorted data | `MinHeapConstruction.js`, `ContinuousMedian.js`, `SortKSortedArray.js` |
<!-- openwiki: broken internal link [../Stacks] file "../Stacks" does not exist. Fix the href or restore the target, then delete this comment. -->
| Stacks | [`Stacks/`](../Stacks) | Stack parsing, monotonic-stack patterns, path normalization, and stack sorting | `BalancedBrackets.js`, `NextGreaterElement.js`, `ShortenPath.js`, `LargestRectangleUnderSkyline.js` |
<!-- openwiki: broken internal link [../Tries] file "../Tries" does not exist. Fix the href or restore the target, then delete this comment. -->
| Tries | [`Tries/`](../Tries) | Suffix-trie construction and lookup | `SuffixTrieConstruction.js` |

## Recursion, optimization, and combinatorics

| Area | Folder | What it covers | Good entry points |
| --- | --- | --- | --- |
<!-- openwiki: broken internal link [../DynamicProgramming] file "../DynamicProgramming" does not exist. Fix the href or restore the target, then delete this comment. -->
| Dynamic programming | [`DynamicProgramming/`](../DynamicProgramming) | Table/memoized optimization, subsequences, partitions, path/counting, and matrix problems | `KnapsackProblem.js`, `LongestCommonSubsequence.js`, `MaxProfitWithKTransactions.js`, `SquareOfZeroes.js` |
<!-- openwiki: broken internal link [../Recursion] file "../Recursion" does not exist. Fix the href or restore the target, then delete this comment. -->
| Recursion | [`Recursion/`](../Recursion) | Recursive construction, backtracking, combinatorics, games, and recursive probability | `Permutations.js`, `Powerset.js`, `SolveSudoku.js`, `NonAttackingQueens.js` |
<!-- openwiki: broken internal link [../GreedyAlgorithms] file "../GreedyAlgorithms" does not exist. Fix the href or restore the target, then delete this comment. -->
| Greedy algorithms | [`GreedyAlgorithms/`](../GreedyAlgorithms) | Locally optimal assignment, ordering, scheduling, and route decisions | `TaskAssignment.js`, `OptimalFreelancing.js`, `ValidStartingCity.js` |

## Choosing where a new exercise belongs

1. Prefer the **dominant technique** over superficial input type: a sequence task based on a monotonic stack belongs in `Stacks/`, while a sequence task whose core is binary search belongs in `Searching/`.
2. Prefer an existing folder over creating a new category for one file. The current 15 folders cover the repository’s intended taxonomy from [`README.md`](../README.md).
3. If a problem legitimately combines techniques, put it where a future reader would first look for its core invariant and explain the supporting structure in the file comments.
4. Follow the standalone contract in [Architecture and solution contract](architecture.md), including alternatives and local helper types.

## Care points for maintainers

Not every comment/example is an executable guarantee. For example, [`Searching/BinarySearch.js`](../Searching/BinarySearch.js) has a likely typo (`Match.floor`) in its recursive variant while its iterative variant uses `Math.floor`; [`Tries/SuffixTrieConstruction.js`](../Tries/SuffixTrieConstruction.js) has method/property name inconsistencies. Without tests, treat representative code as source evidence of style and intent—not automatically as a correctness oracle.
