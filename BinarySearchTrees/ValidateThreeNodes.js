// The problem presents three nodes which are contained in the same Binary Search Tree: nodeOne, nodeTwo, and nodeThree. Write a function which returns a boolean representing whether
// one of nodeOne or nodeThree is an ancestor of nodeTwo, and the nother node is a descendant of nodeTwo. For example, if the function determines that nodeOne is an ancestor of nodeTwo,
// then it needs to check whether nodeThree is a descendant of nodeTwo. If the function determines nodeThree is an ancestor, then it needs to see if nodeOne is a descendant.

// A descendant of a node, N, is defined as a node contained in the tree rooted at node N. A node, N, is an ancestor of another node, M, if M is a desscendant of N.

// It is not guaranteed that nodeOne or nodeThree will be ancestors or descendants of nodeTwo, but it IS guaranteed that all three nodes will be unique and will never be
// None/null. In other words, the problem will provide valid input nodes.

// Each BST node has an integer value, a left child node, and a right child node. A node is said to be a valid BST node if, and only if, it satisfies the BST property:
// its value is strictly greater than the values of every node to its left, its value is less than or equal to the values of ever node to its right, and its children nodes
// are either valid BSt nodes themselves, or None/null.

// Sample Input:

// tree =       5
//             / \
//            2   7
//           / \ / \
//          1  4 6  8
//         /  /
//        0  3

// nodeOne = 5
// nodeTwo = 2
// nodeThree = 3

// Sample Output:

// true
// nodeOne is an ancestor of nodeTwo, and nodeThree is a descendant of nodeTwo

// Solution 1:

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  if (isDescendant(nodeTwo, nodeOne)) {
    return isDescendant(nodeThree, nodeTwo);
  }

  if (isDescendant(nodeTwo, nodeThree)) {
    return isDescendant(nodeOne, nodeTwo);
  }

  return false;
}

function isDescendant(node, target) {
  if (node === null) {
    return false;
  }

  if (node === target) {
    return true;
  }

  return target.value < node.value
    ? isDescendant(node.left, target)
    : isDescendant(node.right, target);
}
