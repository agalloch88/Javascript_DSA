// Write a function which takes in a Binary Tree, flattens it, and returns the Binary Tree's
// leftmost node.

// A flattened Binary Tree is a structure which is nearly identical to a Doubly-Linked List
// (except that nodes have left and right pointers, rather than prev and next pointers),
// where nodes follow the original tree's left-to-right order.

// Note that if the input Binary Tree happens to be a valid Binary Search Tree, the nodes in
// the flattened tree will be sorted.

// The flattening of the Binary Tree should be done in place, meaning that the original data
// structure should be mutated, and no new data structure should be created.

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children
// nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree =   1
//         / \
//        2   3
//       / \ /
//      4  5 6
//        / \
//       7   8

// Sample Output:

// 4 <-> 2 <-> 7 <-> 5 <-> 8 <-> 1 <-> 6 <-> 3
// returns 4, the leftmost node

// Solution 1:

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

function flattenBinaryTree(root) {
  let inOrderNodes = getNodesInOrder(root, []);

  for (let i = 0; i < inOrderNodes.length - 1; i++) {
    let leftNode = inOrderNodes[i];
    let rightNode = inOrderNodes[i + 1];
    leftNode.right = rightNode;
    rightNode.left = leftNode;
  }
  return inOrderNodes[0];
}

function getNodesInOrder(tree, array) {
  if (tree !== null) {
    getNodesInOrder(tree.left, array);
    array.push(tree);
    getNodesInOrder(tree.right, array);
  }
  return array;
}
