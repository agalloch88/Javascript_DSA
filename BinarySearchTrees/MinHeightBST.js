// Write a function which takes in a non-empty sorted array of distinct integers, constructs a 
// BST from the integers, and returns the root of the BST.

// The function should minimize the height of the BST.

// Provided is a BST class which must be used to construct the BST, as well as an insert function.

// Each BST node has an integer value, a left child node, and a right child node. A node is said to be
// a valid BST node if and only if it satisfies the BST property: its value is strictlly greater than the values
// of every node to its left, its value is less than or equal to the values of every node to its right, and its children
// nodes are either valid BST nodes themselves, or None/null.

// A BST is valud if and only if all of its nodes are valid BST nodes.

// Sample Input:
// array = [1, 2, 5, 7, 10, 13, 14, 15, 22]

// Sample Output:
//          10
//         /  \
//        2    14
//       / \  /  \
//      1   5 13  15
//           \      \
//            7      22

// Note that the above is simply one example of a min height BST constructed with the input. There
// are other valid solutions.

// Solution 1:

// interative solution which uses provided insert(), but to the detriment of time complexity

// O(nlog(n)) time due to iterating over n values and inserting with log(n) time implications
// O(n) space due to constructing new BST with n values from array

// provided BST class, where each node has a value, left, and right
class BST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;''
    }
    // provided insert method, which takes in a value
    insert(value) {
        // if provided value is less than the current value, then do additional checks
        if (value < this.value) {
            // if not already a node for current node's left, then insert a new BST node using provided value
            if (this.left === null) {
                this.left = new BST(value);
            // if already a node there, replace value with provided value
            } else {
                this.left.insert(value);
            }
        // if provided value is greater than the current value, do additional checks
        } else {
            // if not already a node for current node's right, then insert a new BST node using the provided value
            if (this.right === null) {
                this.right = new BST(value);
            // if already a node there, replace value with the provided value
            } else {
                this.right.insert(value);
            }
        }
    }
}

function minHeightBst(array) {
    // return result of helper function which takes in the input array, value for the bst, the startIdx, and endIdx as params
    return constructMinHeightBst(array, null, 0, array.length - 1);
}
// helper function which will return results to main function
function constructMinHeightBst(array, bst, startIdx, endIdx) {
    // base case
    // if endIdx is less than startIdx, nothing to do, so return
    if (endIdx < startIdx) {
        return;
    }
    // find the middle index, which should be the root of the BST, and roots of successive branches
    let midIdx = Math.floor((startIdx + endIdx) / 2);
    // figure out the first value to add and store in variable valueToAdd
    let valueToAdd = array[midIdx];
    // if no current value for the BST, bst will be a new BST node of value valueToAdd
    if (bst === null) {
        bst = new BST(valueToAdd);
    // if we have a running BST, use the insert method to add valueToAdd
    } else {
        bst.insert(valueToAdd);
    }
    // recursively call this function for the left and right branches, then return the built BST
    constructMinHeightBst(array, bst, startIdx, midIdx - 1);
    constructMinHeightBst(array, bst, midIdx + 1, endIdx);
    return bst;
}

// Solution 2:

// recursive solution opting to manually insert nodes in proper position

// O(n) time due to manual insert of n nodes
// O(n) space due to constructing new BST of n nodes, at most n calls on call stack at a time

function minHeightBst(array) {
    return constructMinHeightBst(array, null, 0, array.length - 1);
}

function constructMinHeightBst(array, bst, startIdx, endIdx) {
    if (endIdx < startIdx) {
        return;
    }

    let midIdx = Math.floor((startIdx < endIdx) / 2);
    let newBstNode = new BST(array[midIdx]);

    if (bst === null) {
        bst = newBstNode;
    } else {
        if (array[midIdx] < bst.value) {
            bst.left = newBstNode;
            bst = bst.left;
        } else {
            bst.right = newBstNode;
            bst = bst.right;
        }
    }

    constructMinHeightBst(array, bst, startIdx, midIdx - 1);
    constructMinHeightBst(array, bst, midIdx + 1, endIdx);
    return bst;
}

class BST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;''
    }

    insert(value) {
        if (value < this.value) {
            if (this.left === null) {
                this.left = new BST(value);
            } else {
                this.left.insert(value);
            }
        } else {
            if (this.right === null) {
                this.right = new BST(value);
            } else {
                this.right.insert(value);
            }
        }
    }
}

// Solution 3:

// cleaner recursive solution

// O(n) time due to manual insert of n nodes
// O(n) space due to constructing new BST of n nodes, at most n calls on call stack at a time

function minHeightBst(array) {
    return constructMinHeightBst(array, 0, array.length - 1);
}

function constructMinHeightBst(array, startIdx, endIdx) {
    if (endIdx < startIdx) {
        return null;
    }

    let midIdx = Math.floor((startIdx + endIdx) / 2);
    let bst = new BST(array[midIdx]);

    bst.left = constructMinHeightBst(array, startIdx, midIdx - 1);
    bst.right = constructMinHeightBst(array, midIdx + 1, endIdx);
    return bst;
}

class BST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;''
    }

    insert(value) {
        if (value < this.value) {
            if (this.left === null) {
                this.left = new BST(value);
            } else {
                this.left.insert(value);
            }
        } else {
            if (this.right === null) {
                this.right = new BST(value);
            } else {
                this.right.insert(value);
            }
        }
    }
}