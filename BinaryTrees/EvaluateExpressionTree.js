// The problem presents a binary expression tree. Write a function to evaluate the tree 
// mathematically, and return a single resulting integer.

// All leaf nodes in the tree represent operands, which will always be positive integers. All
// of the other nodes represent operators. There are 4 operators supported, each of which
// is represented by a negative integer:

// * -1: Addition operator, adding the left and right subtrees.
// * -2: Subtraction operator, subtracting the right subtree from the left subtree.
// * -3: Division operator, dividing the left subtree by the right subtree. If the result
//       is a decimal, it should be rounded toward zero.
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