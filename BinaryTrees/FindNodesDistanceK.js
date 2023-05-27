// The problem presents the root node of a Binary Tree, a target value of a node contained in
// the tree, and a positive integer k. Write a function which returns the values of all the nodes
// which are exactly distance k from the node with target value.

// The distance between two nodes is defined as the number of edges which must be traversed to go
// from one node to the other. For example, the distance between a node and its immediate left
// or right child is 1. The same holds true in reverse: the distance between a child node
// and its parent is 1. In a tree of three nodes, where the root node has a left and right child,
// the left and right children at distance 2 from each other.

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children
// nodes can either be BinaryTree nodes themselves, or None/null.

// Note that, in the context of this problem, all BinaryTree values will be unique, and the
// function can return the output values in any order.

// Sample Input:

// tree = 1
//       / \
//      2   3
//     / \   \
//    4  5    6
//           / \
//          7   8

// target = 3
// k = 2

// Sample Output:

// [2, 7, 8]
// values may be ordered differently

// Solution 1: