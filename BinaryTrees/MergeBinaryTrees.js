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

class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function mergeBinaryTrees(tree1, tree2) {
    if (tree1 === null) {
        return tree2;
    }

    if (tree2 === null) {
        return tree1;
    }

    tree1.value += tree2.value;
    tree1.left = mergeBinaryTrees(tree1.left, tree2.left);
    tree1.right = mergeBinaryTrees(tree1.right, tree2.right);
    return tree1;
}