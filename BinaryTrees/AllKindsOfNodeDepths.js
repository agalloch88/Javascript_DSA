// The distance between a node in a Binary Tree, and the tree's root node, is called the 
// node's depth.

// Write a function which takes in a Binary Tree, and returns the sum of all its subtrees'
// nodes' depths.

// Each BinaryTree node has an integer value, a left child node, and a right child node.
// Children nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree =   1
//         / \
//        2   3
//       / \ / \
//      4  5 6  7
//     / \
//    8   9

// Sample Output:

// 26
// the sum of root tree's node depths is 16
// the sum of the subtree rooted at 2's node depths is 6
// the sum of the subtree rooted at 3's node depths is 2
// the sum of the subtree rooted at 4's node depths is 2
// in total, these subtrees sum to 26

// Solution 1: