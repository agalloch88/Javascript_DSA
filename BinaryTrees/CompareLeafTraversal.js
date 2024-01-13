// Write a function which takes in the root nodes of two Binary Trees, and returns a boolean
// representing whether their leaf traversals are the same.

// The leaf traversal of a Binary Tree traverses only its leaf nodes from left to right. A leaf
// node is any node that has no left or right children.

// For example, the leaf traversal of the following Binary Tree is 1, 3, 2:

//  4
// / \
// 1  5
//   / \
//  3   2

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children
// nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree1 =  1
//         / \
//        2   3
//       / \   \
//      4   5   6
//         / \
//        7   8

// tree2 =  1
//         / \
//        2   3
//       / \   \
//      4   7   5
//             / \
//            8   6

// Sample Output:

// true

// Solution 1:

// naive pre-order traversal solution checking to see if each node is a leaf, and if so, adding to array then comparing arrays

// O(n + m) time due to checking all n and m nodes in each binary tree
// O(n + m) space due to storing leaf nodes plus recursive calls on call stack

// main BinaryTree class where every node has a value, and potentially a left and right child node pointer
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function which takes in two binary trees
function compareLeafTraversal(tree1, tree2) {
  // initially two empty arrays, leaves1 and leaves2, to hold the leaf nodes to compare
  leaves1 = [];
  leaves2 = [];

  // call helper function, passing in each input tree and each holder array for respective tree
  leafTraversal(tree1, leaves1);
  leafTraversal(tree2, leaves2);

  // check whether the length of the two leaves arrays are the same
  // if they are not the same length, need to return false since this is not the same leaf traversal
  if (leaves1.length !== leaves2.length) {
    return false;
  }

  // iterate over the leaves1 array
  for (let i = 0; i < leaves1.length; i++) {
    // if the value at i in leaves1 does NOT match the value at i in leaves2, this is not the same leaf traversal so must return false
    if (leaves1[i] !== leaves2[i]) {
      return false;
    }
  }

  //   if the leaf arrays are the same length, and the values at every index in both arrays are the same, then this is the same leaf traversal, so can return true
  return true;
}

// helper function which takes in the root node of a binary tree and an array of leaves
function leafTraversal(root, leaves) {
  // base case
  // if root is NOT null, so not an empty tree or beyond a leaf node, then execute below
  if (root !== null) {
    // if the left and right pointers of current node are null, already at a leaf node so need to capture it
    if (root.left === null && root.right === null) {
      // push the value of the current node into the leaves array
      leaves.push(root.value);
      // recursive case
    } else {
      // otherwise, recursively call leafTraversal passing in the left and right pointers of current node and the leaves array
      leafTraversal(root.left, leaves);
      leafTraversal(root.right, leaves);
    }
  }
}

// Solution 2:

// iterative preorder traversal solution utilizing two stacks to compare the leaf node values

// O(n + m) time since going through all nodes in both binary trees
// O(h1 + h2) space since at most will have amount of nodes equal to each tree's height on stack at a time

// main BinaryTree class, where every node has a value and potentially a left/right child node pointer
class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// main function which takes in two binary trees
function compareLeafTraversal(tree1, tree2) {
    // initialize tree1TraversalStack and tree2TraversalStack variables to store the respective stacks, starting with the root node of each tree
    let tree1TraversalStack = [tree1];
    let tree2TraversalStack = [tree2];

    // keep looping so long as the stacks have 1 or more items in them
    while (tree1TraversalStack.length > 0 && tree2TraversalStack.length > 0) {
        // initialize variables tree1Leaf and tree2Leaf, and set equal to calls to helper function getNextLeafNode, passing in respective stacks
        let tree1Leaf = getNextLeafNode(tree1TraversalStack);
        let tree2Leaf = getNextLeafNode(tree2TraversalStack);

        // if the value between the two leaves is NOT the same, return false, as the leaf traversal does not match
        if (tree1Leaf.value !== tree2Leaf.value) {
            return false;
        }
    }

    // return a check of whether both stacks are zeroed out and empty, which may not be the case, as the answer
    return tree1TraversalStack.length === 0 && tree2TraversalStack.length === 0;
}

// helper function to obtain next leaf node from a traversal stack
function getNextLeafNode(traversalStack) {
    // initialize variable current node and set equal to the top item on the stack by popping it off
    let currentNode = traversalStack.pop();

    // keep looping so long as the currentNode value is not a leaf node, as determined by helper function
    while (!isLeafNode(currentNode)) {
        // intentionally handling right child nodes first in order to preserve correct order in stack to pop nodes off
        // if a right child exists for current node, then push current node onto the traversalStack
        if (currentNode.right !== null) {
            traversalStack.push(currentNode.right);
        }

        // if a left child exists for current node, then push current node onto the traversalStack
        if (currentNode.left !== null) {
            traversalStack.push(currentNode.left);
        }

        // set currentNode equal to the node popped off the top of traversalStack
        currentNode = traversalStack.pop();
    }

    // once while loop breaks, return the current value for currentNode
    return currentNode;
}

// helper function to determine if a given node is a leaf node
function isLeafNode(node) {
    return node.left === null && node.right === null;
}

// Solution 3:

// clever recurisve solution linking the leaf nodes in a linked list and comparing the linked lists

// O(n + m) time due to going through n and m nodes in the two binary trees
// O(max(h1, h2)) space due to having at most h1 or h2 calls on call stack at any given point, depending on height of tallest binary tree

// main BinaryTree class, where every node has a value and potentially a left/right child node pointer 
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function which takes in the two binary trees
function compareLeafTraversal(tree1, tree2) {
  // destructure the return from call to connectLeadNodes for tree1 into tree1LeafNodesLinkedList and throwaway _1 value
  let [tree1LeafNodesLinkedList, _1] = connectLeafNodes(tree1);
  // destructure the return from call to connectLeadNodes for tree2 into tree2LeafNodesLinkedList and throwaway _2 value
  let [tree2LeafNodesLinkedList, _2] = connectLeafNodes(tree2);

  // initialize variables list1CurrentNode and list2CurrentNode, and set equal tot he LeafNodesLinkedList variables obtained from the returned calls to connectLeafNodes helper
  let list1CurrentNode = tree1LeafNodesLinkedList;
  let list2CurrentNode = tree2LeafNodesLinkedList;

  // keep looping so long as the currentNode for each list is NOT null
  while (list1CurrentNode !== null && list2CurrentNode !== null) {
    // check whether the value for each node is NOT the same, and if so, return false as these are not the same leaf traversals
    if (list1CurrentNode.value !== list2CurrentNode.value) {
      return false;
    }

    // if condition above does not trigger, set each value to the right value to continue traversing the linked lists
    list1CurrentNode = list1CurrentNode.right;
    list2CurrentNode = list2CurrentNode.right;
  }

  // once while loop breaks, return check of whether each currentNode value is null, meaning traversed through the full list
  return list1CurrentNode === null && list2CurrentNode === null;
}

// helper function which takes in current node, head node, and previousNode values to connect nodes into a linked list
function connectLeafNodes(currentNode, head = null, previousNode = null) {
  // check whether currentNode is null, meaning potentially beyond leafs or looking in empty left/right subtree
  if (currentNode === null) {
    // return the head and previousNode valuess for use in main function
    return [head, previousNode];
  }

  // check whether the currentNode is a leaf node via call to isLeafNode helper, and if so, execute below
  if (isLeafNode(currentNode)) {
    // check whether previousNode is null, and if so, likely the first leaf in a linked list, so set head equal to this currentNode
    if (previousNode === null) {
      head = currentNode;
    // otherwise, if previousNode is NOT null, that means there should be a right child pointer available, so set previousNode.right equal to current node to extend the linked list
    } else {
      previousNode.right = currentNode;
    }

    // set previousNode equal to current node
    previousNode = currentNode;
  }

  // destructure recursive call to connectLeafNodes, passing in currentNode.left, the current head, and previousNode, into the leftHead and leftPreviousNode
  let [leftHead, leftPreviousNode] = connectLeafNodes(currentNode.left, head, previousNode);
  // return a recursive call to connectLeafNodes, passing in currentNode.right, the leftHead value as head, and leftPreviousNode as previousNode, for use in the main function
  return connectLeafNodes(currentNode.right, leftHead, leftPreviousNode);
}

// helper function to determine whether a given node is a leaf based on whether the node has no left AND no right pointer
function isLeafNode(node) {
  return node.left === null && node.right === null;
}