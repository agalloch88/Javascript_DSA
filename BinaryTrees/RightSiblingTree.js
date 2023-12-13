// Write a function whcih takes in a Binary Tree, transforms it into a Right Sibling Tree, and returns the root of the Right Sibling Tree.

// A Right Sibling Tree is obtained by making every node in a Binary Tree have its right property point to its right sibling instead of its right child. A nodes
// right sibling is the node immediately to its right on the same level, or None/null if there is no node immediately to its right.

// Note that once the transformation is complete, some nodes may no longer have a node pointing to them. For example, in the sample output below, the node with the value
// 10 no longer has any inbound pointers and is effectively unreable.

// The transformation should be done in place, meaning that the original data structure should be mutated, and no new data structure should be created.

// Each BinaryTree node has a integer value, a left child node, and a right child node. Children nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree =       1
//             / \
//            2   3
//          /  \  / \
//         4   5 6   7
//        / \  \ /   /\
//       8  9 1011  12 13
//              /
//             14

// Sample Output:

//      1
//  /
//  2--------3
// /         /
// 4---5--6--7
// /     /   /
// 8-9 10-11 12-13
//        /
//       14

// 1 remains the root node, and the node with value 10 no longer has a node pointing to it

// Solution 1:

function rightSiblingTree(root) {
    mutate(root, null, null);
    return root;
}

function mutate(node, parent, isLeftChild) {
    if (node === null) {
        return;
    }

    let {left, right} = node;
    mutate(left, node, true);

    if (parent === null) {
        node.right = null;
    } else if (isLeftChild) {
        node.right = parent.right;
    } else {
        if (parent.right === null) {
            node.right = null;
        } else {
            node.right = parent.right.left;
        }
    }

    mutate(right, node, false);
}