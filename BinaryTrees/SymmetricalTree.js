// Write a function which takes in a Binary Tree, and returns if the input tree is symmetrical. A tree is symmetrical if the left and right subtrees are mirror images of each other.

// Each BinaryTree node has an integer value, a left child node, and a right child node. Children nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree =   1
//         / \
//        2   2
//       / \ / \
//      3  4 4  3
//     / \     / \
//    5   6   6   5

// Sample Output:

// true

// Solution 1:

// recursive solution checking for mirrored values at each node level

// O(n) time due to traversing n nodes in the input tree
// O(h) time due to potentially having h calls on the call stack at a given time, where h is tree height

// standard BinaryTree class with each node potentially having a value, left, and/or right node
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
// main function which takes in the input tree for evaluation
function symmetricalTree(tree) {
  // main function returns a call to helper function, which takes in the left and right nodes of input tree
  return treesAreMirrored(tree.left, tree.right);
}
// helper function which takes in left and right nodes to evaluate
function treesAreMirrored(left, right) {
  // check a few conditions: ensure neither the right or left node under evaluation are null,
  // and that the value of left and right nodes are equal, meaning mirrored
  if (left !== null && right !== null && left.value === right.value) {
    // if all three checks are true, return recursive calls, passing in
    // left.left and right.right AND left.right and right.left for next evaluating call
    return (
      treesAreMirrored(left.left, right.right) &&
      treesAreMirrored(left.right, right.left)
    );
  }
  // return a check of whether left is equal to right
  return left === right;
}

// Solution 2:

class BinaryTree2 {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function symmetricalTree2(tree) {
  let stackLeft = [tree.left];
  let stackRight = [tree.right];

  while (stackLeft.length > 0) {
    let left = stackLeft.pop();
    let right = stackRight.pop();

    if (left === null && right === null) {
      continue;
    }

    if (left === null || right === null || left.value !== right.value) {
      return false;
    }

    stackLeft.push(left.left);
    stackLeft.push(left.right);
    stackRight.push(right.right);
    stackRight.push(right.left);
  }
  return true;
}
