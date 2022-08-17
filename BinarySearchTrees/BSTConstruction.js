// Write a BST class for a Binary Search Tree. The class should support:

// - Inserting values with the insert method
// - Removing values with the remove method
//      - This method should only remove the first instance of a given value
// - Searching for values with the contains method

// Note that values cannot be removed from a single-node tree. In other words, calling the remove method on a single-node tree should do nothing.

// Each BST node has an integer value, a left child node, and a right child node. A node is said to be a valid BST node if and only if it satisfies the BST property:
// its value is strictly greater than the values of every node to its left, its value is less than or equal to the values of every node on its right, an dits children nodes
// are either valid BST nodes themselves, or None/null.

// Sample Usage:
// Assume the following BST is already create:
//          10
//         /  \
//        5    15
//      /   \ /  \
//     2    5 13  22
//    /         \
//   1           14

// All operations below are performed sequentially
// insert(12):          10
//                     /  \
//                    5    15
//                 /   \ /  \
//                2    5 13  22
//              /        / \
//             1        12  14

// remove(10):          12
//                     /  \
//                    5    15
//                 /   \ /  \
//                2    5 13  22
//              /          \
//             1           14

// contains(15): true

// Solution 1:

// recursive implementations which have slightly worse space complexity due to call stack frames

class BST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    // Average: O(log(n)) time due to eliminating half of remaining nodes at each step, Worst: O(n) time
    // Average: O(log(n)) space due to frames on call stack, Worst: O(n) space due to at most n frames on stack at a time if BST were straight line
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
        return this;
    }
    // Average: O(log(n)) time due to eliminating half of remaining nodes at each step, Worst: O(n) time
    // Average: O(log(n)) space due to frames on call stack, Worst: O(n) space due to at most n frames on stack at a time if BST were straight line
    contains(value) {
        if (value < this.value) {
            if (this.left === null) {
                return false;
            } else {
                return this.left.contains(value);
            }
        } else if (value > this.value) {
            if (this.right === null) {
                return false;
            } else {
                return this.right.contains(value);
            }
        } else {
            return true;
        }
    }
    // Average: O(log(n)) time due to eliminating half of remaining nodes at each step, Worst: O(n) time
    // Average: O(log(n)) space due to frames on call stack, Worst: O(n) space due to at most n frames on stack at a time if BST were straight line
    remove(value, parent = null) {
        if (value < this.value) {
            if (this.left !== null) {
                this.left.remove(value, this);
            }
        } else if (value > this.value) {
            if (this.right !== null) {
                this.right.remove(value, this);
            }
        } else {
            if (this.left !== null && this.right !== null) {
                this.value = this.right.getMinValue();
                this.right.remove(this.value, this);
            } else if (parent === null) {
                if (this.left !== null) {
                    this.value = this.left.value;
                    this.right = this.left.right;
                    this.left = this.left.left;
                } else if (this.right !== null) {
                    this.value = this.right.value;
                    this.left = this.right.left;
                    this.right = this.right.right;
                } else {
                    // empty single-node tree, so do nothing
                }
            } else if (parent.left === this) {
                parent.left = this.left !== null ? this.left : this.right;
            } else if (parent.right === this) {
                parent.right = this.left !== null? this.left : this.right;
            }
        }
        return this;
    }

    getMinValue() {
        if (this.left === null) {
            return this.value;
        } else {
            return this.left.getMinValue();
        }
    }
}

// Solution 2:

// iterative solution with better space complexity as no frames on call stack

class BST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insert(value) {
        let currentNode = this;
        while (true) {
            if (value < currentNode.value) {
                if (currentNode.left === null) {
                    currentNode.left = new BST(value);
                    break;
                } else {
                    currentNode = currentNode.left;
                }
            } else {
                 if (currentNode.right === null) {
                    currentNode.right = new BST(value);
                    break;
                 } else {
                    currentNode = currentNode.right;
                 }
            }
        }
        return this;
    }

    contains(value) {
        let currentNode = this;
        while (currentNode !== null) {
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else {
                return true;
            }
        }
        return false;
    }

    remove(value, parentNode = null) {
        let currentNode = this;
        while (currentNode !== null) {
            if (value < currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else {
                if (currentNode.left !== null && currentNode.right !== null) {
                    currentNode.value = currentNode.right.getMinValue();
                    currentNode.right.remove(currentNode.value, currentNode);
                } else if (parentNode === null) {
                    if (currentNode.left !== null) {
                        currentNode.value = currentNode.left.value;
                        currentNode.right = currentNode.left.right;
                        currentNode.left = currentNode.left.left;
                    } else if (currentNode.right !== null) {
                        currentNode.value = currentNode.right.value;
                        currentNode.left = currentNode.right.left;
                        currentNode.right = currentNode.right.right;
                    } else {
                        // single-node tree, so do nothing
                    }
                } else if (parentNode.left === currentNode) {
                    parentNode.left = currentNode.left !== null ? currentNode.left : currentNode.right;
                } else if (parentNode.right === currentNode) {
                    parentNode.right = currentNode.left !== null? currentNode.left : currentNode.right;
                }
                break;
            }
        }
        return this;
    }

    getMinValue() {
        let currentNode = this;
        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        }
        return currentNode.value;
    }
}