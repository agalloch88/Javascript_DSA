// The pre-order traversal of a Binary Search Tree is a traversal technique starting at the tree's root node and then visits nodes in the following order:

// 1. Current node
// 2. Left subtree
// 3. Right subtree

// Given a non-mepty array of integers representing the pre-order traversal of a Binary Search Tree (BST), write a function which creates the relevant BST, and
// returns its root node.

// The input array will contain the values of BST nodes in the order in which these nodes would be visited with a pre-order traversal.

// Each BT node has an integer value, a left child node, and a right child node. A node is said to be a valid BST node if and only if it satisfies the BST property:
// its value is strictly grater than the values of every node to ts left, its value is less than or equal to the values of every node to its right, and its
// children nodes are either valid BST nodes themselves, or None/null.

// Sample Input:
// preOrderTraversalValues = [10, 4, 2, 1, 5, 17, 19, 18]

// Sample Output:
//          10
//         /  \
//        4    17
//       / \     \
//      2   5     19
//     /          /
//    1          18

// Solution 1: