# Architecture and solution contract

## What “architecture” means here

This is a curated source corpus rather than a running system. Its principal architecture is **taxonomy + self-contained exercise files**:

```text
<topic>/<ProblemName>.js
```

There is no central app bootstrap, router, package API, cross-topic import graph, persistence layer, or shared utility directory. Topic folders are the navigation boundary and each file owns its problem statement, implementation choices, and local helpers.

The declared purpose in [`README.md`](../README.md) is to hold JavaScript solutions for common DSA problems organized by problem type or data structure. The top-level folders implement that statement directly; see [Domain guide](domains.md).

## File-level contract

A representative file follows this sequence:

1. **Natural-language prompt** with assumptions and required behavior.
2. **Sample input/output** showing the intended contract.
3. **One or more labelled solutions**, usually with time/space complexity comments.
4. **A primary implementation**, followed by numbered alternatives and local helper functions/classes as needed.

Examples:

- [`Arrays/TwoNumberSum.js`](../Arrays/TwoNumberSum.js) retains multiple function implementations in one exercise.
- [`Searching/BinarySearch.js`](../Searching/BinarySearch.js) presents recursive and iterative variants with helpers.
- [`DynamicProgramming/KnapsackProblem.js`](../DynamicProgramming/KnapsackProblem.js) keeps both the DP table construction and result-reconstruction helper together.
- [`LinkedLists/LRUCache.js`](../LinkedLists/LRUCache.js) co-locates `LRUCache`, the doubly linked list, and node class because they form one solution.

### Naming convention

- Files use PascalCase problem names: `KnapsackProblem.js`, `GenerateDocument.js`.
- Main functions/methods use camelCase; data structures/classes use PascalCase.
- Alternative implementations are differentiated with numeric suffixes: `generateDocument`, `generateDocument2`, `generateDocument3`; helpers are likewise suffixed when alternatives require their own helpers.

The numeric suffixes matter. Recent Git history is a sustained cleanup of duplicate declarations across `Searching/`, `Sorting/`, `Stacks/`, and `Strings/`. For example, commit `7bc4275` renamed later alternatives and helper functions in [`Strings/GenerateDocument.js`](../Strings/GenerateDocument.js) so all three approaches can coexist. Preserve that uniqueness when adding or editing variants.

### Data-shape conventions are local

Classes and node structures are defined where a problem requires them, rather than imported from a shared model. Common examples include:

- graph/tree-like traversal nodes with `name` and `children` ([`Graphs/BreadthFirstSearch.js`](../Graphs/BreadthFirstSearch.js));
- binary-search-tree nodes with `value`, `left`, and `right` ([`BinarySearchTrees/BSTConstruction.js`](../BinarySearchTrees/BSTConstruction.js));
- linked-list nodes with `value`, `next`, and, where needed, `prev` ([`LinkedLists/LRUCache.js`](../LinkedLists/LRUCache.js)).

Do not infer that independently defined `Node`, `BST`, or `LinkedList` classes are interchangeable. Read the target file’s prompt and constructor before reusing an idea.

## Multiple approaches are a feature

The corpus is designed to contrast strategies—not to select and publish one production implementation. Examples include recursive versus iterative BST operations in [`BinarySearchTrees/BSTConstruction.js`](../BinarySearchTrees/BSTConstruction.js), and progressively improved character-counting approaches in [`Strings/GenerateDocument.js`](../Strings/GenerateDocument.js).

When adding an approach:

- keep its complexity comment adjacent to it;
- use a unique numeric suffix for every top-level function/class and alternative-specific helper;
- keep helpers local unless a deliberate repository-wide architectural change introduces a shared module; and
- make inputs, return values, mutation behavior, and edge cases clear in comments/examples.

## Change boundaries

**Safe, normal change:** edit one problem file within its topic and preserve its standalone nature.

**Cross-cutting change:** alter naming conventions, formatting/lint configuration, test strategy, exports, or documentation automation. These changes affect the entire corpus and should be validated broadly; follow [Authoring, verification, and operations](workflows.md).

There is no source-level integration boundary to update after a typical problem-file change. The relevant check is semantic: every solution and helper in the edited file must agree with the stated problem contract.
