// The problem presents a Binary Search Tree (BST) which has at least 2 nodes, and which only has nodes with unique values (meaning no duplicate-value nodes). Exactly
// two nodes in the given BST have had their valeus swapped, thereforce breaking the BST's defined structure. Write a function which returns a repaired version of the BST
// with all values on the correct nodes.

// The function can mutate the original, input BST; the problem does not require creating a new BST. Moreover, the shape of the returned BST should be exactly the same as
// the shape of the original input tree.

// Each BST node has an integer value, a left child node, and a right child node. A node is said to be a valid BST node if, and only if, it satisfies the BST property:
// its value is strictly greater than the values of every node to its left, its value is less than or equal to the values of every node to its right, and its children
// nodes are either valid BST nodes themselves, or None/null.

// Sample Input:

// tree =   10
//         /  \
//        7    20
//       / \   / \
//      3  12 8   22
//     /       \
//    2         14

// Sample Output:

// tree =   10
//         /  \
//        7    20
//       / \   / \
//      3   8 12  22
//     /       \
//    2         14

// Solution 1: 

// recursive solution using in-order traversal to go all the way left, then recurse back up, processing nodes, then going right

// O(n) time due to going over every node in the input tree
// O(h) space, where h is the height of the tree, due to having that many calls on the call stack

// main BST class, where every BST node potentially has a value, a left child node, and a right child node
class BST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// main function which takes in the input tree
function repairBST(tree) {
    // initialize variables nodeOne and nodeTwo to track the two nodes needing to be swapped
    let nodeOne = null;
    let nodeTwo = null;
    // initialize variable previousNode, which will help track and isolate when an encountered node is out of order
    let previousNode = null;

    // declare helper function to handle in-order traversal inside main function,
    // so it retains access to global nodeOne, nodeTwo, and previousNode values
    function inOrderTraversal(node) {
        // if the current node is null, nothing to process to simply return
        if (node === null) {
            return;
        }
        // recursively call inOrderTraversal, passing in node.left
        inOrderTraversal(node.left);
        // if previousNode is null AND the value at previousNode is greater than the value at node,
        // there is a possibility this is one of the two misplaced nodes, so then execute below
        if (previousNode !== null && previousNode.value > node.value) {
            // if nodeOne is still null, need to set nodeOne equal to previousNode as it may
            // be a possible answer
            if (nodeOne === null) {
                nodeOne = previousNode;
            }
            // set nodeTwo equal to the current node
            nodeTwo = node;
            // once node.left is processed, then recursively call inOrderTraversal, passing in
            // node.right
            inOrderTraversal(node.right);
        }
    }
    // back in main function, call inOrderTraversal helper, passing in the input tree
    inOrderTraversal(tree);
    // since there's no built-in swap for JS, swap the two nodes found out of place
    let temp = nodeOne.value;
    nodeOne.value = nodeTwo.value;
    nodeTwo.value = temp;
    // return the repaired tree as the answer
    return tree;
}