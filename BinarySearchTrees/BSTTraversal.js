// Write three functions which take in a Binary Search Tree (BST) and an empty array. The functions
// will traverse through the BST, add the BST's nodes' values to the input array, and return
// said array. The three functions should traverse the BST using the in-order, pre-order, and
// post-order traversal techniques, respectively.

// Each BST node has an integer value, a left child node, and a right child node. A node is said
// to be a valid BST node if and only if it satisfies the BST property: its value is strictly greater
// than the values of every node to its left, its value is less than or equal to the values of every node
// to its right, and its children nodes are either valid BST nodes themselves or None/null values.

// Sample Input:
// tree =   10
//          /\
//         5  15
//        / \   \
//       2   5   22
//      /
//     1

// array = []

// Sample Output:
// inOrderTraverse: [1, 2, 5, 5, 10, 15, 22]
// preOrderTraverse: [10, 5, 2, 1, 5, 15, 22]
// postOrderTraverse: [1, 2, 5, 5, 22, 15, 10]

// Solution 1:

// O(n) time due to touching every node in tree
// O(n) space due to storing every node value in array

function inOrderTraverse(tree, array) {
  if (tree !== null) {
    inOrderTraverse(tree.left, array);
    array.push(tree.value);
    inOrderTraverse(tree.right, array);
  }
  return array;
}

function preOrderTraverse(tree, array) {
  if (tree !== null) {
    array.push(tree.value);
    preOrderTraverse(tree.left, array);
    preOrderTraverse(tree.right, array);
  }
  return array;
}

function postOrderTraverse(tree, array) {
  postOrderTraverse(tree.left, array);
  postOrderTraverse(tree.right, array);
  array.push(tree.value);
}
