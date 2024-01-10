// Write a function which takes in the root nodes of two Binary Trees, and returns a boolean
// representing whether their leaf traversals are the same.

// The leaf traversal of a Binary Tree traverses only its leaf nodes from left to right. A leaf
// node is any node that has no left or right children.

// For example, the leaf traversal of the following Binary Tree is 1, 3, 2:

//  4
// / \
// 1  5
//   / \
//  3   2

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children
// nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree1 =  1
//         / \
//        2   3
//       / \   \
//      4   5   6
//         / \
//        7   8

// tree2 =  1
//         / \
//        2   3
//       / \   \
//      4   7   5
//             / \
//            8   6

// Sample Output:

// true

// Solution 1:

// naive pre-order traversal solution checking to see if each node is a leaf, and if so, adding to array then comparing arrays

// O(n + m) time due to checking all n and m nodes in each binary tree
// O(n + m) space due to storing leaf nodes plus recursive calls on call stack

// main BinaryTree class where every node has a value, and potentially a left and right child node pointer
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function which takes in two binary trees
function compareLeafTraversal(tree1, tree2) {
  // initially two empty arrays, leaves1 and leaves2, to hold the leaf nodes to compare
  leaves1 = [];
  leaves2 = [];

  // call helper function, passing in each input tree and each holder array for respective tree
  leafTraversal(tree1, leaves1);
  leafTraversal(tree2, leaves2);

  // check whether the length of the two leaves arrays are the same
  // if they are not the same length, need to return false since this is not the same leaf traversal
  if (leaves1.length !== leaves2.length) {
    return false;
  }

  // iterate over the leaves1 array
  for (let i = 0; i < leaves1.length; i++) {
    // if the value at i in leaves1 does NOT match the value at i in leaves2, this is not the same leaf traversal so must return false
    if (leaves1[i] !== leaves2[i]) {
      return false;
    }
  }

  //   if the leaf arrays are the same length, and the values at every index in both arrays are the same, then this is the same leaf traversal, so can return true
  return true;
}

// helper function which takes in the root node of a binary tree and an array of leaves
function leafTraversal(root, leaves) {
  // base case
  // if root is NOT null, so not an empty tree or beyond a leaf node, then execute below
  if (root !== null) {
    // if the left and right pointers of current node are null, already at a leaf node so need to capture it
    if (root.left === null && root.right === null) {
      // push the value of the current node into the leaves array
      leaves.push(root.value);
      // recursive case
    } else {
      // otherwise, recursively call leafTraversal passing in the left and right pointers of current node and the leaves array
      leafTraversal(root.left, leaves);
      leafTraversal(root.right, leaves);
    }
  }
}

// Solution 2:

class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function compareLeafTraversal(tree1, tree2) {
    let tree1TraversalStack = [tree1];
    let tree2TraversalStack = [tree2];

    while (tree1TraversalStack.length > 0 && tree2TraversalStack.length > 0) {
        let tree1Leaf = getNextLeafNode(tree1TraversalStack);
        let tree2Leaf = getNextLeafNode(tree2TraversalStack);

        if (tree1Leaf.value !== tree2Leaf.value) {
            return false;
        }
    }

    return tree1TraversalStack.length === 0 && tree2TraversalStack.length === 0;
}

function getNextLeafNode(traversalStack) {
    let currentNode = traversalStack.pop();

    while (!isLeafNode(currentNode)) {
        if (currentNode.right !== null) {
            traversalStack.push(currentNode.right);
        }

        if (currentNode.left !== null) {
            traversalStack.push(currentNode.left);
        }

        currentNode = traversalStack.pop();
    }

    return currentNode;
}

function isLeafNode(node) {
    return node.left === null && node.right === null;
}