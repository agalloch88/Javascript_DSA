// The distance between a given node in a Binary Tree, and the tree's root, is called the node's depth.

// Write a function which takes in a Binary Tree, and returns the sum of its node's depths. Each Binary Tree node has an integer value, a left
// child node, and a right child node. Children nodes can either be Binary Tree nodes themselves, or None/null.

// Sample Input:
// tree =   1
//         / \
//        2   3
//       / \ / \
//      4  5 6  7
//     / \
//    8  9

// Sample Output:
// 16 ((1 * 2) + (2 * 4) + (3 * 2))

// Solution 1:

// iterative approach, which ends up much more verbose and longform

// O(n) time due to iteratively visiting every node once
// O(h) space due to at most h layers in stack, with h = height of the binary tree

// main BinaryTree class, where every node has a value, and potentially a left/right pointer
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function nodeDepths(root) {
  // set up running depth total
  let sumOfDepths = 0;
  // keep track of nodes via a stack
  const stack = [{ node: root, depth: 0 }];
  // while stack not empty, keep going
  while (stack.length > 0) {
    // pop top layer off stack
    const { node, depth } = stack.pop();
    // if node is null, keep going
    if (node === null) {
      continue;
    }
    // increment depth
    sumOfDepths += depth;
    // push nodes left and/or right children into stack and increase depth by 1
    stack.push({ node: node.left, depth: depth + 1 });
    stack.push({ node: node.right, depth: depth + 1 });
  }
  return sumOfDepths;
}

// Solution 2:

// recursive solution which recursively calls function on left and right subtrees, incrementing the depth
// variable at every step, then simply summing the depths

// O(n) time due to going over n nodes in Binary Tree once
// O(h) space, where h is the height of the Binary Tree, due to having at most h calls on call stack at once

// main BinaryTree class, where every node has a value, and potentially a left/right pointer
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

// main function which takes in a BinaryTree root node, and adding another argument depth
// to track how deep a given call goes
function nodeDepths(root, depth = 0) {
  // base case
  // check whether root is null, meaning the tree is empty OR hit a leaf node, and if so, return 0
  if (root === null) {
    return 0;
  }
  
  // return the current total for depth argument, plus the returned value for recursive call
  // to nodeDepths for the root.left subtree which increments depth by 1, plus a recursive call
  // to nodeDepths for the root.right subtree which increments depth by 1
  return depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1);
}
