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

// Solution 2:

// iterative solution using stacks to store matching nodes for each tree and handling nulls, returning updated tree1

// O(n) time, where n is the number of nodes in the smaller tree, due to needing to address at least n node values
// O(h) space, where h is the height of the smaller tree, as there will be at most h items in each stack at a given time

// base BinaryTree class, where every node has a value, and potentially a left/right pointer
class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
// main function which takes in the two binary trees
function mergeBinaryTrees(tree1, tree2) {
    // edge case check to see if tree1 is null, and in that case, return tree2
    if (tree1 === null) {
        return tree2;
    }
    // set up variables to create stacks for each binary tree's nodes
    let tree1Stack = [tree1];
    let tree2Stack = [tree2];
    // keep looping so long as the tree1Stack has items in it
    while (tree1Stack.length > 0) {
        // create variable tree1Node to store the top value popped off of tree1Stack
        let tree1Node = tree1Stack.pop();
        // create variable tree2Node to store the top value popped off of tree2Stack
        let tree2Node = tree1Stack.pop();
        // check for null value in tree2Node, and if true, simply continue
        if (tree2Node === null) {
            continue;
        }
        // add tree1Node value to tree2Node value
        tree1Node.value += tree2Node.value;
        // if the left value of tree1Node is null, then set tree1Node's left value equal to the left value of tree2Node
        if (tree1Node.left === null) {
            tree1Node.left = tree2Node.left
        // if the tree1Node's left value is NOT null, then push the left values of tree1Node and tree2Node onto their respective stacks
        } else {
            tree1Stack.push(tree1Node.left);
            tree2Stack.push(tree2Node.left);
        }
        // if the right value of tree1Node is null, then set tree1Node's right value equal to the right value of tree2Node
        if (tree1Node.right === null) {
            tree1Node.right = tree2Node.right;
        // if the tree1Node's right value is NOT null, then push the right values of tree1Node and tree2Node onto their respective stacks
        } else {
            tree1Stack.push(tree1Node.right);
            tree2Stack.push(tree2Node.right);
        }
    }
    // once the while loop breaks, this means the tree1Stack is empty and all values should be merged, so return the modified tree1
    return tree1;
}