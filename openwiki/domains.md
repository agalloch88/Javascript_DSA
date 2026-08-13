# Domain guide

The repository is organized by the dominant algorithmic technique or data structure. Topic placement is the primary discovery mechanism; there is no central catalog or runtime registry. Open a problem file to obtain its authoritative prompt, input/output shape, and complexity claims.

## Sequence, ordering, and text

| Area | Folder | What it covers | Good entry points |
| --- | --- | --- | --- |
| Array / matrix problems | [`Arrays/`](../Arrays) | Two pointers, intervals, matrix traversal, sums, ranges, scheduling-style scans | `TwoNumberSum.js`, `MergeOverlappingIntervals.js`, `SpiralTraverse.js`, `CalendarMatching.js` |
| Searching | [`Searching/`](../Searching) | Binary-search variants, selection, and sorted-data search | `BinarySearch.js`, `SearchForRange.js`, `MedianOfTwoSortedArrays.js` |
| Sorting | [`Sorting/`](../Sorting) | Elementary, divide-and-conquer, heap, radix, inversion, and constrained sorting | `BubbleSort.js`, `QuickSort.js`, `CountInversions.js`, `RadixSort.js` |
| Strings | [`Strings/`](../Strings) | Character frequency, substrings, palindromes, matching, encoding, and string transforms | `GenerateDocument.js`, `GroupAnagrams.js`, `SmallestSubstringContaining.js` |
| Famous algorithms | [`FamousAlgorithms/`](../FamousAlgorithms) | Named/general algorithms and structures | `DijkstrasAlgorithm.js`, `KadanesAlgorithm.js`, `UnionFind.js` |

## Trees, graphs, and linked structures

| Area | Folder | What it covers | Good entry points |
| --- | --- | --- | --- |
| Graphs | [`Graphs/`](../Graphs) | Traversals, connectivity, coloring, cycles, grid/graph transformations | `BreadthFirstSearch.js`, `DepthFirstSearch.js`, `CycleInGraph.js`, `RiverSizes.js` |
| Binary trees | [`BinaryTrees/`](../BinaryTrees) | Tree traversals, depth/path calculations, balancing, transformation, and relationships | `BranchSums.js`, `BinaryTreeDiameter.js`, `FindSuccessor.js`, `MaxPathSumInBinaryTree.js` |
| Binary search trees | [`BinarySearchTrees/`](../BinarySearchTrees) | Ordered-tree construction, validation, traversal, rebuilding, and rank/order operations | `BSTConstruction.js`, `ValidateBST.js`, `MinHeightBST.js`, `ReconstructBST.js` |
| Linked lists | [`LinkedLists/`](../LinkedLists) | List construction/manipulation, cycle detection, merging, and LRU design | `LinkedListConstruction.js`, `FindLoop.js`, `MergeLinkedLists.js`, `LRUCache.js` |
| Heaps | [`Heaps/`](../Heaps) | Heap construction, rolling median, and nearly-sorted data | `MinHeapConstruction.js`, `ContinuousMedian.js`, `SortKSortedArray.js` |
| Stacks | [`Stacks/`](../Stacks) | Stack parsing, monotonic-stack patterns, path normalization, and stack sorting | `BalancedBrackets.js`, `NextGreaterElement.js`, `ShortenPath.js`, `LargestRectangleUnderSkyline.js` |
| Tries | [`Tries/`](../Tries) | Suffix-trie construction and lookup | `SuffixTrieConstruction.js` |

## Recursion, optimization, and combinatorics

| Area | Folder | What it covers | Good entry points |
| --- | --- | --- | --- |
| Dynamic programming | [`DynamicProgramming/`](../DynamicProgramming) | Table/memoized optimization, subsequences, partitions, path/counting, and matrix problems | `KnapsackProblem.js`, `LongestCommonSubsequence.js`, `MaxProfitWithKTransactions.js`, `SquareOfZeroes.js` |
| Recursion | [`Recursion/`](../Recursion) | Recursive construction, backtracking, combinatorics, games, and recursive probability | `Permutations.js`, `Powerset.js`, `SolveSudoku.js`, `NonAttackingQueens.js` |
| Greedy algorithms | [`GreedyAlgorithms/`](../GreedyAlgorithms) | Locally optimal assignment, ordering, scheduling, and route decisions | `TaskAssignment.js`, `OptimalFreelancing.js`, `ValidStartingCity.js` |

## Choosing where a new exercise belongs

1. Prefer the **dominant technique** over superficial input type: a sequence task based on a monotonic stack belongs in `Stacks/`, while a sequence task whose core is binary search belongs in `Searching/`.
2. Prefer an existing folder over creating a new category for one file. The current 15 folders cover the repository’s intended taxonomy from [`README.md`](../README.md).
3. If a problem legitimately combines techniques, put it where a future reader would first look for its core invariant and explain the supporting structure in the file comments.
4. Follow the standalone contract in [Architecture and solution contract](architecture.md), including alternatives and local helper types.

## Care points for maintainers

Not every comment/example is an executable guarantee. For example, [`Searching/BinarySearch.js`](../Searching/BinarySearch.js) has a likely typo (`Match.floor`) in its recursive variant while its iterative variant uses `Math.floor`; [`Tries/SuffixTrieConstruction.js`](../Tries/SuffixTrieConstruction.js) has method/property name inconsistencies. Without tests, treat representative code as source evidence of style and intent—not automatically as a correctness oracle.
