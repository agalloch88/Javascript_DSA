// Write a function which takes in a Binary Tree and inverts the tree. In other words, the function
// should swap every left node in the tree for its corresponding right node.

// Each Binary Tree node has an integer value, a left child node, and a right child node. Children nodes can either be Binary Tree nodes themselves, or None/null.

// Sample Input:
// tree =       1
//             /  \
//            2    3
//           / \  / \
//          4   5 6  7
//         / \
//        8   9

// Sample Output:
// tree =       1
//             /  \
//            3    2
//           / \  / \
//          7   6 5  4
//                  / \
//                 9   8

// Solution 1:

// iterative approach employing a Breadth First Search type of method, using a queue.

// O(n) time due to going over n nodes in tree.
// O(n) space due to storing at max n/2 leaf nodes in queue, which simplifies to n.

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function invertBinaryTree(tree) {
  // initialize queue with root node of tree
  let queue = [tree];
  // while queue is not empty, keep going
  while (queue.length > 0) {
    // pop out next value via FIFO
    let current = queue.shift();
    // will hit these cases once we start reaching leaf nodes, so simply continue
    if (current === null) {
      continue;
    }
    // call helper function to perform the swap
    swapLeftAndRight(current);
    // push left and right values into queue to continue onward
    queue.push(current.left);
    queue.push(current.right);
  }
}

function swapLeftAndRight(tree) {
  let left = tree.left;
  tree.left = tree.right;
  tree.right = left;
}

// Solution 2:

// recursive solution which is more elegant and reduces space complexity somewhat

// O(n) time due to visiting n nodes.
// O(d) space since storing at most d frames on call stack, where d is depth of longest branch in tree.

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function invertBinaryTree(tree) {
  // base case
  if (tree === null) {
    return;
  }

  // recursive case
  swapLeftAndRight(tree);
  invertBinaryTree(tree.left);
  invertBinaryTree(tree.right);
}

function swapLeftAndRight(tree) {
  let left = tree.left;
  tree.left = tree.right;
  tree.right = left;
}
