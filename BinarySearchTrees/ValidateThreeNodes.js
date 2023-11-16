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

// recursive solution checking which node between one and three is descendant or ancestor

// O(h) time, where h is the height of the BST, due to potentially going h nodes deep on a descendant/ancestor check
// O(h) space, where h is the height of the BST, due to potentially having up to h calls on the call stack

// BST class, where every node has a value, and potentially a left/right pointer, or None/null
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function taking in the three nodes to validate
function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  // check whether nodeOne is a descendant of nodeTwo via calling helper function, and if so, execute below
  if (isDescendant(nodeTwo, nodeOne)) {
    // return a check via helper function as to whether, given nodeOne is a descendant of nodeTwo, whether nodeTwo is a descendant of nodeThree
    return isDescendant(nodeThree, nodeTwo);
  }

  // check whether nodeThree is a descendant of nodeTwo via calling helper function, and if so, execute below
  if (isDescendant(nodeTwo, nodeThree)) {
    // return a check via helper function as to whether, given nodeThree is a descendant of nodeTwo, whether nodeTwo is a descendant of nodeOne
    return isDescendant(nodeOne, nodeTwo);
  }

  // if neither if block returns anything, simply return false
  return false;
}
// helper function taking in two inputs: a given node, and a target node based on the given node
function isDescendant(node, target) {
  // base cases
  // check whether the given node is null, and if so, return false as a null node cannot be a descendant
  if (node === null) {
    return false;
  }

  // check whether the node and target are equal, and if so, return true
  if (node === target) {
    return true;
  }

  // return the result of a ternary checking whether the target.value is less than the node.value
  // due to BST properties, if the target value IS smaller than the node value, then will be looking in the left subtree
  // if not, then will be looking in the right subtree
  return target.value < node.value
    ? isDescendant(node.left, target)
    : isDescendant(node.right, target);
}

// Solution 2:

// another recursive solution simplying the logic in helper to reduce space complexity

// O(h) time, where h is the height of the BST, due to potentially searching h levels deep in BST
// O(1) space due to simplified logic in helper

// BST class, where every node has a value, and potentially a left/right pointer, or None/null
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function taking in the three nodes to validate
function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  // check via call to helper whether nodeOne is a descendant of nodeTwo, and if so, execute below
  if (isDescendant(nodeTwo, nodeOne)) {
    // return another call to helper to check whether nodeTwo is a descendant of nodeThree
    return isDescendant(nodeThree, nodeTwo);
  }

  // check via call to helper whether nodeThree is a descendant of nodeTwo, and if so, execute below
  if (isDescendant(nodeTwo, nodeThree)) {
    // return another call to helper to check whether nodeTwo is a descendant of nodeOne
    return isDescendant(nodeOne, nodeTwo);
  }

  // if neither blocks above return, then return false as cannot validate the three nodes
  return false;

}

// helper function taking in two inputs: a given node, and a target node based on the given node
function isDescendant(node, target) {
  // so long as node is not null AND the node is not equal to the target, keep looping
  while (node !== null && node !== target) {
    // set node equal to result from ternary checking whether value of target is less than value of node
    // if so, look to the left so set node equal to node.left
    // if not, look to the right so set node equal to node.right
    node = target.value < node.value ? node.left : node.right;
  }

  // once while loop exits, return a check of whether node is equal to target for use in main function
  return node === target;
}

// Solution 3:

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  let searchOne = nodeOne;
  let searchTwo = nodeThree;

  while (true) {
    let foundThreeFromOne = searchOne === nodeThree;
    let foundOneFromThree = searchTwo === nodeOne;
    let foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
    let finishedSearching = searchOne === null && searchTwo === null;

    if (foundThreeFromOne || foundOneFromThree || foundNodeTwo || finishedSearching) {
      break;
    }

    if (searchOne !== null) {
      searchOne = searchOne.value > nodeTwo.value ? searchOne.left : searchOne.right;
    }

    if (searchTwo !== null) {
      searchTwo = searchTwo.value > nodeTwo.value ? searchTwo.left : searchTwo.right;
    }
  }

  let foundNodeFromOther = searchOne === nodeThree || searchTwo === nodeOne;
  let foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;

  if (!foundNodeTwo || foundNodeFromOther) {
    return false;
  }

  return searchForTarget(nodeTwo, searchOne === nodeTwo ? nodeThree : nodeOne);
}

function searchForTarget(node, target) {
  while (node !== null && node !== target) {
    node = target.value < node.value ? node.left : node.right;
  }

  return node === target;
}