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

// O(n) time due to finding target, expanding out via BFS, processing nodes from queue
// O(n) space due to using queue, additional set for seen nodes

// main BinaryTree class, where every node had a value, and potential right and left pointer
class BinaryTree {
    constructor (value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

// main function which takes in the tree, the target value, and k value
function findNodesDistanceK(tree, target, k) {
    // initialize variable nodesToParents and set equal to empty JS object
    // will use this to track which parents correspond with which child nodes and backtrack through
    // the tree with reduced time complexity
    let nodesToParents = {};
    // call helper populateNodesToParents, passing in the input tree and the nodesToParents object
    populateNodesToParents(tree, nodesToParents);
    // initialize variable targetNode and set equal return value of helper call, passing
    // in the target, the tree, and nodesToParents object which should now be filled out
    let targetNode = getNodeFromValue(target, tree, nodesToParents);
    // return a call to helper BFS function to expand out from the target node k distance
    return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k);
}

// helper function which takes in a node, the nodesToParents object, and sets parent equal
// to null on first pass
function populateNodesToParents(node, nodesToParents, parent = null) {
    // if there is a node and it's not null (meaning an end leaf node) then execute below
    if (node !== null) {
        // set the node.value within nodesToParents object equal to the parent value
        nodesToParents[node.value] = parent;
        // recursively call the function on node.left and node.right to work down the tree
        populateNodesToParents(node.left, nodesToParents, node);
        populateNodesToParents(node.right, nodesToParents, node);
    }
}

// helper function which takes in a value, the input tree, and nodesToParents object
function getNodeFromValue(value, tree, nodesToParents) {
    // if the root node value is the value being looked for, then return this value
    if (tree.value === value) {
        return tree;
    }
    // initialize variable nodeParent, and set equal to the value within nodesToParents object
    let nodeParent = nodesToParents[value];
    // check whether the left value of current nodeParent value is not null AND whether the left
    // value of nodeParent is equal to the value
    if (nodeParent.left !== null && nodeParent.left.value === value) {
        // if both conditions above are true, then return the left value of nodeParent
        return nodeParent.left;
    }
    // otherwise, if not left, must be right, so return the right value of nodeParent
    return nodeParent.right;
}

// helper function which takes in the targetNode, nodesToParents object, and the k distance
function breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k) {
    // initialize variable queue and insert first item to queue, which is value of targetNode
    // with the k distance of 0
    let queue = [[targetNode, 0]];
    // initialize variable seen, and set equal to a new Set object with the value of targetNode
    let seen = new Set([targetNode.value]);
    // while the queue is not empty, keep looping
    while (queue.length > 0) {
        // destructure the currentNode value and distanceFromTarget from the shifted value of queue
        // which removes first item from an array/queue
        let [currentNode, distanceFromTarget] = queue.shift();
        // if the distanceFromTarget is equal to given k value, then execute below
        if (distanceFromTarget === k) {
            // if current at K distance, need to handle and grab all nodes at this level
            // initialize variable nodesDistanceK and set equal to a map over the queue, grabbing the
            let nodesDistanceK = queue.map(pair => pair[0].value);
            nodesDistanceK.push(currentNode.value);
            return nodesDistanceK;
        }
        // otherwise, if not at k distance yet, initialize variable connectedNodes and set equal to
        // array of values containing the left and right pointers of currentNode, and the
        // currentNode value from nodesToParents 
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