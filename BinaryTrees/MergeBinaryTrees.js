// Given two binary trees, merge them and return the resulting tree. If two nodes overlap during the merger, then sum the values; otherwise, user the existing node.

// Note that a solution can either mutate the existing trees, or return a new binary tree.

// Sample Input:

// tree1 =  1
//         / \
//        3   2
//       / \
//      7   4

// tree2 =  1
//         / \
//        5   9
//       /   / \
//      2   7   6

// Sample Output:

// output =     2
//             / \
//            8   11
//           / \  / \
//          9  4 7   6

// Solution 1:

// recursive solution checking for nulls and adding left/right values into tree1

// O(n) time, where n is the number of nodes in the smaller tree, due to needing to hit all nodes
// O(h) space, where h is the height of the shorter tree, due to at most h calls on the call stack

// base BinaryTree class, where every node has a value, and potentially a left/right pointer
class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// main function taking in the two Binary Trees
function mergeBinaryTrees(tree1, tree2) {
    // if tree1 is null then return tree2
    if (tree1 === null) {
        return tree2;
    }
    // if tree2 is null then return tree1
    if (tree2 === null) {
        return tree1;
    }
    // take current tree1 node's value and add value of current tree2 nodes to it
    tree1.value += tree2.value;
    // set tree1.left equal to a recursive call to function, passing in values for tree1 and tree2 left
    tree1.left = mergeBinaryTrees(tree1.left, tree2.left);
    // set tree1.right equal to a recursive call to function, passing in values for tree1 and tree2 right
    tree1.right = mergeBinaryTrees(tree1.right, tree2.right);
    // once done, return tree1, as this is the modified, final merged tree
    return tree1;
}