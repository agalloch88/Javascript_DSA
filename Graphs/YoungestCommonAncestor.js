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

// iterative solution utilizing a couple helper methods

// O(d) time, where d represents the depth of the deepest descendant
// O(1) space, as no extra data structures are used and only store a few variables

// ancestral tree class, giving every node a name and ancestor property (except root node)
class AncestralTree {
  constructor(name) {
    this.name = name;
    this.ancestor = null;
  }
}

function youngestCommonAncestor(topAncestor, descendantOne, descendantTwo) {
  // determine depths of the two descendants using helper function
  let depthOne = getDescendantDepth(descendantOne, topAncestor);
  let depthTwo = getDescendantDepth(descendantTwo, topAncestor);
  // if descendant one is deeper, use backtrack helper to get descendants on same level then return result
  if (depthOne > depthTwo) {
    return backtrackAncestralTree(
      descendantOne,
      descendantTwo,
      depthOne - depthTwo,
    );
    // if descendant two is deeper, use backtrack helper to get descendants on same level then return result
  } else {
    return backtrackAncestralTree(
      descendantTwo,
      descendantOne,
      depthTwo - depthOne,
    );
  }
}
// helper function to determine the depth of given descendant relevant to top/root ancestor
function getDescendantDepth(descendant, topAncestor) {
  // set initial depth
  let depth = 0;
  // while moving up the tree, increment depth and set descendant to be equal to its ancestor
  while (descendant !== topAncestor) {
    depth++;
    descendant = descendant.ancestor;
  }
  // return the final depth once reaching the root/top ancestor
  return depth;
}
// helper function to get descendants on same level to then deduce the youngest common ancestor
function backtrackAncestralTree(lowerDescendant, higherDescendant, diff) {
  // while the descendants still have depth difference between them, keep going
  while (diff > 0) {
    // set the lower of the two descendants to be equal to its ancestor, decrement the diff value
    lowerDescendant = lowerDescendant.ancestor;
    diff--;
  }
  // while descendants are not on same level, keep going
  while (lowerDescendant !== higherDescendant) {
    lowerDescendant = lowerDescendant.ancestor;
    higherDescendant = higherDescendant.ancestor;
  }
  return lowerDescendant;
}
