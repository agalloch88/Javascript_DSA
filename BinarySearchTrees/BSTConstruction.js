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

class BST {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
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
        return this;
    }

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