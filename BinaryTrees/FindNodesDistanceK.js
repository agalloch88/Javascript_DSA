// The problem presents the root node of a Binary Tree, a target value of a node contained in
// the tree, and a positive integer k. Write a function which returns the values of all the nodes
// which are exactly distance k from the node with target value.

// The distance between two nodes is defined as the number of edges which must be traversed to go
// from one node to the other. For example, the distance between a node and its immediate left
// or right child is 1. The same holds true in reverse: the distance between a child node
// and its parent is 1. In a tree of three nodes, where the root node has a left and right child,
// the left and right children at distance 2 from each other.

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children
// nodes can either be BinaryTree nodes themselves, or None/null.

// Note that, in the context of this problem, all BinaryTree values will be unique, and the
// function can return the output values in any order.

// Sample Input:

// tree = 1
//       / \
//      2   3
//     / \   \
//    4  5    6
//           / \
//          7   8

// target = 3
// k = 2

// Sample Output:

// [2, 7, 8]
// values may be ordered differently

// Solution 1:

class BinaryTree {
    constructor (value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

function findNodesDistanceK(tree, target, k) {
    let nodesToParents = {};
    populateNodesToParents(tree, nodesToParents);
    let targetNode = getNodeFromValue(target, tree, nodesToParents);
    return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k);
}

function populateNodesToParents(node, nodesToParents, parent = null) {
    if (node !== null) {
        nodesToParents[node.value] = parent;
        populateNodesToParents(node.left, nodesToParents, node);
        populateNodesToParents(node.right, nodesToParents, node);
    }
}

function getNodeFromValue(value, tree, nodesToParents) {
    if (tree.value === value) {
        return tree;
    }

    let nodeParent = nodesToParents[value];

    if (nodeParent.left !== null && nodeParent.left.value === value) {
        return nodeParent.left;
    }

    return nodeParent.right;
}

function breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k) {
    let queue = [[targetNode, 0]];
    let seen = new Set([targetNode.value]);

    while (queue.length > 0) {
        let [currentNode, distanceFromTarget] = queue.shift();

        if (distanceFromTarget === k) {
            let nodesDistanceK = queue.map(pair => pair[0].value);
            nodesDistanceK.push(currentNode.value);
            return nodesDistanceK;
        }

        let connectedNodes = [currentNode.left, currentNode.right, nodesToParents[currentNode.value]];
        for (let node of connectedNodes) {
            if (node === null) {
                continue;
            }

            if (seen.has(node.value)) {
                continue;
            }

            seen.add(node.value);
            queue.push([node, distanceFromTarget + 1]);
        }
    }
    return [];
}

// Solution 2:

class BinaryTree {
    constructor (value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

function findNodesDistanceK(tree, target, k) {
    let nodesDistanceK = [];
    findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK);
    return nodesDistanceK;
}

function findDistanceFromNodeToTarget(node, target, k, nodesDistanceK) {
    if (node === null) {
        return -1;
    }

    if (node.value === target) {
        addSubtreeNodeAtDistanceK(node, 0, k, nodesDistanceK);
        return 1;
    }

    let leftDistance = findDistanceFromNodeToTarget(node.left, target, k, nodesDistanceK);
    let rightDistance = findDistanceFromNodeToTarget(node.right, target, k, nodesDistanceK);

    if (leftDistance !== -1) {
        addSubtreeNodeAtDistanceK(node.right, leftDistance + 1, k, nodesDistanceK);
        return leftDistance + 1;
    }

    if (rightDistance !== -1) {
        addSubtreeNodeAtDistanceK(node.left, distance + 1, k, nodesDistanceK);
        return rightDistance + 1;
    }

    return -1;
}

function addSubtreeNodeAtDistanceK(node, distance, k, nodesDistanceK) {
    if (node === null) {
        return;
    }

    if (distance === k) {
        nodesDistanceK.push(node.value);
    } else {
        addSubtreeNodeAtDistanceK(node.left, distance + 1, k, nodesDistanceK);
        addSubtreeNodeAtDistanceK(node.right, distance + 1, k, nodesDistanceK);
    }
}