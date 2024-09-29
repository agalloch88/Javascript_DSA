// Write a function which takes in a non-negative integer, `n`, and returns the number of possible
// Binary Tree topologies which may be created with exactly `n` nodes.

// A Binary Tree topoloigy is defined as any Binary Tree configuration, irrespective of 
// node values. For instance, there exist only two Binary Tree topologies where `n` is equal
// to 2: a root node with a left node, and a root node with a right node.

// Note that when `n` is equal to 0, there is one topoloigy which may be created: the None/Null node.

// Sample Input:

// n = 3

// Sample Output:

// 5

// Solution 1:

function numberOfBinaryTreeTopologies(n) {
    if (n === 0) {
        return 1;
    }

    let numberOfTrees = 0;

    for (let leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
        let rightTreeSize = n - 1 - leftTreeSize;
        let numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize);
        let numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize);
        numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
    }
    return numberOfTrees;
}