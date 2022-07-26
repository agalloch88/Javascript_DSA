// Write a function which takes in a Binary Tree (where nodes have an additional pointer to their parent node), as well as a node contained within that tree,
// and returns the given node's successor.

// A node's successor is the next node to be visited (immediately after the given node) when traversing the tree using the in-order tree-traversal
// technique. A node has no successor if it is the last node to be visited in the in-order traversal.

// If a node has no successor, the function should return None/null.

// Each Binary Tree has an integer value, a parent node, a left child node, and a right child node. Children nodes can either be Binary Tree nodes themselves,
// or None/null.

// Sample Input:
// tree =           1
//                 / \
//                2   3
//               / \
//              4   5
//             /
//            6

// node = 5

// Sample Output:
// 1, as the in-order traversal is [6, 4, 2, 5, 1, 3], and 1 comes immediately after 5

// Solution 1:

class BinaryTree{
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

function findSuccessor(tree, node) {
    const inOrderTraversalOrder = getInOrderTraversalOrder(tree);

    for (let idx = 0; idx < inOrderTraversalOrder.length; idx++) {
        let currentNode = inOrderTraversalOrder[idx];

        if (currentNode !== node) {
            continue;
        }

        if (idx === inOrderTraversalOrder.length - 1) {
            return null;
        }

        return inOrderTraversalOrder[idx + 1];
    }
}

function getInOrderTraversalOrder(node, order = []) {
    if (node === null) {
        return order;
    }

    getInOrderTraversalOrder(node.left, order);
    order.push(node);
    getInOrderTraversalOrder(node.right, order);

    return order;
}