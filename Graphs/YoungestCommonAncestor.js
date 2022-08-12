// The problem presents three inputs, all of which are instances of an AncestralTree class which have an ancestor property, and points to their youngest ancestor.
// The first input is the top ancestor in an ancestral tree (ie, the only instance which has no ancestor, as its ancestor property points to None/null), and the
// other two inputs are descendants in the ancestral tree.

// Write a function which returns the youngest common ancestor to the two descendants.

// Note that a descendant is considered its own ancestor. So, in the simple ancestral tree below, the youngest common ancestor to nodes A and B is node A.

//  A
//   \
//    B

// Sample Input:
// topAncestor = node A
// descendantOne = node E
// descendantTwo = node I

//          A
//         / \
//        B   C
//       / \ / \
//      D  E F  G
//     / \
//    H   I

// Sample Output:
// node B

// Solution 1:

class AncestralTree {
    constructor(name) {
        this.name = name;
        this.ancestor = null;
    }
}

function youngestCommonAncestor(topAncestor, descendantOne, descendantTwo) {
    let depthOne = getDescendantDepth(descendantOne, topAncestor);
    let depthTwo = getDescendantDepth(descendantTwo, topAncestor);

    if (depthOne > depthTwo) {
        return backtrackAncestralTree(descendantOne, descendantTwo, depthOne - depthTwo);
    } else {
        return backtrackAncestralTree(descendantTwo, descendantOne, depthTwo - depthOne);
    }
}

function getDescendantDepth(descendant, topAncestor) {
    let depth = 0;

    while (descendant !== topAncestor) {
        depth++;
        descendant = descendant.ancestor;
    }
    return depth;
}

function backtrackAncestralTree(lowerDescendant, higherDescendant, diff) {
    while (diff > 0) {
        lowerDescendant = lowerDescendant.ancestor;
        diff--;
    }

    while (lowerDescendant !== higherDescendant) {
        lowerDescendant = lowerDescendant.ancestor;
        higherDescendant = higherDescendant.ancestor;
    }
    return lowerDescendant;
}