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

class BST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function repairBST(tree) {
    let nodeOne = null;
    let nodeTwo = null;
    let previousNode = null;

    function inOrderTraversal(node) {
        if (node === null) {
            return;
        }

        inOrderTraversal(node.left);

        if (previousNode !== null && previousNode.value > node.value) {
            if (nodeOne === null) {
                nodeOne = previousNode;
            }

            nodeTwo = node;

            inOrderTraversal(node.right);
        }
    }

    inOrderTraversal(tree);

    let temp = nodeOne.value;
    nodeOne.value = nodeTwo.value;
    nodeTwo.value = temp;

    return tree;
}