// The problem presents a binary expression tree. Write a function to evaluate the tree
// mathematically, and return a single resulting integer.

// All leaf nodes in the tree represent operands, which will always be positive integers. All
// of the other nodes represent operators. There are 4 operators supported, each of which
// is represented by a negative integer:

// * -1: Addition operator, adding the left and right subtrees.
// * -2: Subtraction operator, subtracting the right subtree from the left subtree.
// * -3: Division operator, dividing the left subtree by the right subtree. If the result
// *     is a decimal, it should be rounded toward zero.
// * -4: Multiplication operator, multiplying the left and right subtrees.

// For the purposes of the problem, assume the tree will always be a valid expression tree.
// Each operator also works as a grouping symbol, mesaning the bottom of the tree is
// always evaluated first, regardless of the operator.

// Sample Input:

// tree =   -1
//          / \
//        -2   -3
//        / \  / \
//      -4  2 8   3
//      / \
//     2   3

// Sample Output:
// 6
// (((2 * 3) - 2) + (8 / 3))

// Solution 1:

// recursive solution evaluating leaf nodes then handling the expressions back up to root

// O(n) time due recursing through all n nodes in input tree
// O(h) space, where h is the height of the binary tree, due to at most h calls on call stack at a given time

// BinaryTree class, where each node has a value, and potential left/right child nodes
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function which takes in input tree
function evaluateExpressionTree(tree) {
  // check whether the value of current node is greater than or equal to 0. if so, this is a numerical node which should be considered for an expression evaluation
  if (tree.value >= 0) {
    // if greater than or equal to zero, return the tree.value
    return tree.value;
  }
  // initialize variable leftValue and set equal to a recursive call to evaluateExpressionTree, passing in the tree.left
  let leftValue = evaluateExpressionTree(tree.left);
  // initialize variable rightValue and set equal to a recursive call to evaluateExpressionTree, passing in the tree.right
  let rightValue = evaluateExpressionTree(tree.right);
  // below are checks to handle the various evaluations, depending on the tree.value of the next node up in the tree
  // if the tree.value is -1, then perform addition of leftValue and rightValue
  if (tree.value === -1) {
    return leftValue + rightValue;
  }
  // if the tree.value is -2, then perform subtraction of leftValue and rightValue
  if (tree.value === -2) {
    return leftValue - rightValue;
  }
  // if the tree.value is -3, then perform division of leftValue by rightValue
  if (tree.value === -3) {
    return Math.trunc(leftValue / rightValue);
  }
  // since the only other option is -4, can simply return the multiplication of leftValue by rightValue
  return leftValue * rightValue;
}
