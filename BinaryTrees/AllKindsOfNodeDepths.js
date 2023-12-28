// The distance between a node in a Binary Tree, and the tree's root node, is called the
// node's depth.

// Write a function which takes in a Binary Tree, and returns the sum of all its subtrees'
// nodes' depths.

// Each BinaryTree node has an integer value, a left child node, and a right child node.
// Children nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree =   1
//         / \
//        2   3
//       / \ / \
//      4  5 6  7
//     / \
//    8   9

// Sample Output:

// 26
// the sum of root tree's node depths is 16
// the sum of the subtree rooted at 2's node depths is 6
// the sum of the subtree rooted at 3's node depths is 2
// the sum of the subtree rooted at 4's node depths is 2
// in total, these subtrees sum to 26

// Solution 1:

// iterative solution using formula from NodeDepths solution and calling this on every root node

// O(nlog(n)) time in case of balanced binary tree, at worst O(n^2) if linear tree
// O(h) space, where h is the height of the Binary Tree

// main BinaryTree class where each node has a value, and potentially a left/right child node pointer
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function which takes in the root node of the BinaryTree
function allKindsOfNodeDepths(root) {
  // initialize variable sumOfAllDepths to keep running count
  let sumOfAllDepths = 0;
  // initialize a stack with the root value inside
  let stack = [root];

  // keep looping so long as the stack is not empty
  while (stack.length > 0) {
    // initialize variable node, and store the top popped value off the stack inside
    let node = stack.pop();

    // if the node is null, so likely a leaf, simply continue
    if (node === null) {
      continue;
    }

    // increment sumOfAllDepths counter by the returned result from nodeDepths helper, passing in
    // the current node
    sumOfAllDepths += nodeDepths(node);
    // push the left and right children of current node onto the stack, if applicable
    stack.push(node.left);
    stack.push(node.right);
  }

  // return the current total for sumOfAllDepths
  return sumOfAllDepths;
}

// helper function which finds the depth of a given tree, taking in a node and initializing depth
// as 0
function nodeDepths(node, depth = 0) {
  // check whether node is null, and if so, return 0
  if (node === null) {
    return 0;
  }

  //   if node is not null, then return the current value of depth PLUS the return value of a recursive call to
  // nodeDepths, passing in the left child of node and incrementing depth by 1 PLUS the return value of
  // a recursive call to nodeDepths, passing in the right child of node and incrementing depth by 1
  return (
    depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1)
  );
}

// Solution 2:

// recursive naive solution

// O(nlog(n)) time in case of balanced BinaryTree, up to O(n^2) if it is linear
// O(h) space, where h is the height of the tree, due to that maximum number of calls on call stack

// main BinaryTree class, where each node has a value, and potentially a left/right child node pointer
class BinaryTree {
  construtor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function which takes in a root node
function allKindsOfNodeDepths(root) {
  // base case
  // check whether the root input is null, meaning tree is empty or beyond leaf nodes
  // if so, simply return 0
  if (root === null) {
    return 0;
  }

  // recursive case
  // return recursive calls on left pointer of root PLUS right pointer of root, PLUS call
  // to nodeDepths helper function on root node
  return (
    allKindsOfNodeDepths(root.left) +
    allKindsOfNodeDepths(root.right) +
    nodeDepths(root)
  );
}

// helper function which calculates the depth on a given BinaryTree
function nodeDepths(node, depth = 0) {
  // base case
  // check whether node is null, and if so, simply return 0
  if (node === null) {
    return 0;
  }

  // recursive case
  // return the current value of depth argument PLUS a recursive call on node's left pointer plus
  // depth + 1 and a recursive call on node's right pointer plus depth + 1
  return (
    depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1)
  );
}

// Solution 3:

// improved time complexity solution making three passes over tree to count nodes, depths, then sum
// all the depths

// O(n) time due to 3 passes, where 3n simplifies to n
// O(n) space due to storing extra attributes on each node

// main BinaryTree class, where every node has a value, and potentially a left/right child pointer
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function taking in root node of a Binary Tree
function allKindsOfNodeDepths(root) {
  // first count the nodes, passing in root
  // next add the depths, passing in root
  // finally, return a call to sumAllNodeDepths to sum all the depths, passing in root, which will
  // be the answer
  addNodeCounts(root);
  addNodeDepths(root);
  return sumAllNodeDepths(root);
}

// helper which makes one last pass through tree to sum all the subtree depths
function sumAllNodeDepths(node) {
  // base case
  // check whether the current node is null, and if so, return 0 since nothing to sum
  if (node === null) {
    return 0;
  }

  // recursive case
  // return a recursive call for use in main function to sumAllNodeDepths, passing in the left and right subtrees,
  // if applicable, and adding them together along with the value of _sumOfDepths on current node
  return sumAllNodeDepths(node.left) + sumAllNodeDepths(node.right) + node._sumOfDepths;
}

// helper which makes a second pass through tree to calculate all the depths
function addNodeDepths(node) {
  // set value of _sumOfDepths on the current node equal to 0 at the outset
  node._sumOfDepths = 0;

  // if there is a left node and left is NOT null, execute below
  if (node.left !== null) {
    // recursively call addNodeDepths, passing in the left child node
    addNodeDepths(node.left);
    // increment _sumOfDepths on the current node by the value of _sumOfDepths on left which
    // tells how far this subtree descends, as well as
    // the _numNodesInTree value on left, since this will be the total number of nodes to reconcile
    node._sumOfDepths += node.left._sumOfDepths + node.left._numNodesInTree;
  }

  // if there is a right node and right is NOT null, execute below
  if (node.right !== null) {
    // recursively call addNodeDepths, passing in the right child node
    addNodeDepths(node.right);
    // increment _sumOfDepths on the current node by the value of _sumOfDepths on right which
    // tells how far this subtree descends, as well as
    // the _numNodesInTree value on right, since this will be the total number of nodes to reconcile
    node._sumOfDepths += node.right._sumOfDepths + node.right._numNodesInTree
  }
}

// helper which makes a first pass through tree to count all the nodes in a given left/right subtree
function addNodeCounts(node) {
  // set value of _numNodesInTree parameter of node equal to 1, since there is at least one node
  // in the current tree
  node._numNodesInTree = 1;

  // if there is a left node and left is NOT null, execute below
  if (node.left !== null) {
    // recursively call addNodeCounts, passing in the left child node
    addNodeCounts(node.left);
    // add the value of _numNodesInTree parameter on left to the base value on this current node
    node._numNodesInTree += node.left._numNodesInTree;
  }

  // if there is a right node and right is NOT null, execute below
  if (node.right !== null) {
    // recursively call addNodeCounts, passing in the right child node
    addNodeCounts(node.right);
    // add the value of _numNodesInTree parameter on left to the base value on this current node
    node._numNodesInTree += node.right._numNodesInTree;
  }
}

// Solution 4:

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function allKindsOfNodeDepths(root) {
  return getTreeInfo(root).sumOfAllDepths;
}

function getTreeInfo(tree) {
  if (tree === null) {
    return {
      numNodesInTree: 0,
      sumOfDepths: 0,
      sumOfAllDepths: 0,
    };
  }

  let leftTreeInfo = getTreeInfo(tree.left);
  let rightTreeInfo = getTreeInfo(tree.right);

  let sumOfLeftDepths = leftTreeInfo.sumOfDepths + leftTreeInfo.numNodesInTree;
  let sumOfRightDepths = rightTreeInfo.sumOfDepths + rightTreeInfo.numNodesInTree;

  let numNodesInTree = 1 + leftTreeInfo.numNodesInTree + rightTreeInfo.numNodesInTree;
  let sumOfDepths = sumOfLeftDepths + sumOfRightDepths;
  let sumOfAllDepths = sumOfDepths + leftTreeInfo.sumOfAllDepths + rightTreeInfo.sumOfAllDepths;

  return {
    numNodesInTree,
    sumOfDepths,
    sumOfAllDepths,
  };
}