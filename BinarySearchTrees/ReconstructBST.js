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

// recursive solution finding right subtree root first, then recursively creating new BST nodes by whittling down those subtree values

// O(n^2) time due to constructing n nodes and performing n checks
// O(h) space on call stack at a given time, where h is max height of tree, but technically O(n) space for solution overall as the buildout of n nodes
// must factor in

// main class for creating a BST node
class BST {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function reconstructBST(preOrderTraversalValues) {
    // if provided an empty tree, do nothing
    if (preOrderTraversalValues.length === 0) {
        return null;
    }
    // find the root of the BST, which is first node/first value in given array
    let currentValue = preOrderTraversalValues[0];
    // don't know position of right subtree root yet, so could be all the way at the end
    let rightSubtreeRootIdx = preOrderTraversalValues.length;
    // starting from second value, so first value after tree root, check to see if value is right subtree root node
    for (let idx = 1; idx < preOrderTraversalValues.length; idx++) {
        // grab given value at index
        let value = preOrderTraversalValues[idx];
        // if the given value is greater than the tree root, or equal, this would be the first value seen as such and therefore the right subtree root
        if (value >= currentValue) {
            // set right subtree root to start at this value, then break from this check as do not need to look further
            rightSubtreeRootIdx = idx;
            break;
        }
    }
    // recursively call reconstructBST function, passing in remaining values for left subtree from second value/index 1 up to the right subtree root found above
    let leftSubtree = reconstructBST(preOrderTraversalValues.slice(1, rightSubtreeRootIdx));
    // recursively call reconstructBST function, passing in remaining values for right subtree from right subtree root found above to end of array
    let rightSubtree = reconstructBST(preOrderTraversalValues.slice(rightSubtreeRootIdx));
    // return newly created BST node with left and right values, recursively continue this process until done
    return new BST(currentValue, leftSubtree, rightSubtree);
}

// Solution 2:

// recursive solution improving time complexity by keeping track of root index at each step and checking if current value is valid based on upper/lower bound params

class BST {
    constructor(value) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class TreeInfo {
    constructor(rootIdx) {
        this.rootIdx = rootIdx;
    }
}

function reconstructBST(preOrderTraversalValues) {
    let treeInfo = new TreeInfo(0);
    return reconstructBstFromRange(-Infinity, Infinity, preOrderTraversalValues, treeInfo);
}

function reconstructBstFromRange(lowerBound, upperBound, preOrderTraversalValues, currentSubtreeInfo) {
    if (currentSubtreeInfo.rootIdx === preOrderTraversalValues.length) {
        return null;
    }
    
    let rootValue = preOrderTraversalValues[currentSubtreeInfo.rootIdx];
    if (rootValue < lowerBound || rootValue >= upperBound) {
        return null;
    }

    currentSubtreeInfo++;
    let leftSubtree = reconstructBstFromRange(lowerBound, rootValue, preOrderTraversalValues, currentSubtreeInfo);
    let rightSubtree = reconstructBstFromRange(rootValue, upperBound, preOrderTraversalValues, currentSubtreeInfo);
    return new BST(rootValue, leftSubtree, rightSubtree);
}