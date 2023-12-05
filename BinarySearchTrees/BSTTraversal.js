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

// recursive solution calling tree.left until hitting leaf node, then grabbing current node value
// before calling tree.right for in order traversal

// pre-order simply have the grabbing of the value prior to any left/right calls, and post-order
// saves the grabbing until after recursive calls to left/right

// O(n) time due to touching every node in tree
// O(n) space due to storing every node value in array

function inOrderTraverse(tree, array) {
  // checking to ensure not an empty tree
  if (tree !== null) {
    // recursive call to left until hitting leaf node
    inOrderTraverse(tree.left, array);
    // push the current value into the array
    array.push(tree.value);
    // recursive call to right
    inOrderTraverse(tree.right, array);
  }
  // return the contents of array
  return array;
}

function preOrderTraverse(tree, array) {
  // checking to ensure not an empty tree
  if (tree !== null) {
    // push the current node's value into the array
    array.push(tree.value);
    // recursive calls to left and right
    preOrderTraverse(tree.left, array);
    preOrderTraverse(tree.right, array);
  }
  // return the contents of array
  return array;
}

function postOrderTraverse(tree, array) {
  // checking to ensure not an empty tree
  if (tree !== null) {
    // recursive calls to left and right
    postOrderTraverse(tree.left, array);
    postOrderTraverse(tree.right, array);
    // push the current value into the array
    array.push(tree.value);
  }
  // return the contents of array
  return array;
}
