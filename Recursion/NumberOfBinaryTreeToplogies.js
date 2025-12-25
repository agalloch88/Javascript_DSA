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

// recursive solution checking left and right tree possibilities

// O((n * (2n)!)/(n!(n+1)!)) time due to function calling n recursively calling itself n times
// O(n) space due to recursive call stack usage

function numberOfBinaryTreeTopologies(n) {
  // Base case: If there are 0 nodes, there's exactly 1 valid tree (the empty tree).
  if (n === 0) {
    return 1;
  }

  let numberOfTrees = 0;

  // Iterate over all possible sizes for the left subtree.
  // For each left subtree size, the right subtree size is determined because the total number of nodes must be n-1 (excluding the root node).
  for (let leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
    let rightTreeSize = n - 1 - leftTreeSize; // Remaining nodes go to the right subtree

    // Recursively calculate the number of possible topologies for left and right subtrees
    let numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize);
    let numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize);

    // Multiply the number of left and right subtree topologies, since each combination of left and right subtrees creates a unique binary tree.
    numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
  }

  // Return the total number of valid binary tree topologies for n nodes.
  return numberOfTrees;
}

// Solution 2:

// recursive solution improving performance by utilizing caching

// O(n^2) time due to caching so that each value of n is calculated only once
// O(n) space due to storing the cache and recursive calls on the call stack

function numberOfBinaryTreeTopologies2(n, cache = { 0: 1 }) {
  // Check if the number of binary tree topologies for n nodes is already cached.
  if (n in cache) {
    return cache[n]; // Return the cached value to avoid recomputation.
  }

  let numberOfTrees = 0;

  // Iterate over all possible left subtree sizes.
  // For each left subtree size, the right subtree size is determined as (n - 1 - leftTreeSize).
  for (let leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
    let rightTreeSize = n - 1 - leftTreeSize;

    // Recursively calculate the number of topologies for left and right subtrees,
    // leveraging the cache to avoid redundant calculations.
    let numberOfLeftTrees = numberOfBinaryTreeTopologies2(leftTreeSize, cache);
    let numberOfRightTrees = numberOfBinaryTreeTopologies2(
      rightTreeSize,
      cache,
    );

    // Multiply the number of possible left and right subtree combinations to get
    // the total number of topologies for this specific combination.
    numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
  }

  // Cache the result for n nodes to avoid recomputing it in future calls.
  cache[n] = numberOfTrees;

  // Return the computed number of binary tree topologies for n nodes.
  return numberOfTrees;
}

// Solution 3:

// iterative solution calculating topologies for 1 to n nodes

// O(n^2) time due to nested for loops
// O(n) space due to cache array, but slightly improved as no recursive call stack storage

function numberOfBinaryTreeTopologies3(n) {
  // Initialize a cache array where cache[m] will store the number of topologies for m nodes.
  // We know there is exactly 1 topology for 0 nodes (the empty tree).
  let cache = [1];

  // Iterate from 1 to n to calculate the number of topologies for each number of nodes.
  for (let m = 1; m < n + 1; m++) {
    let numberOfTrees = 0;

    // For each m, consider all possible sizes of the left subtree.
    for (let leftTreeSize = 0; leftTreeSize < m; leftTreeSize++) {
      // Calculate the size of the right subtree given the left subtree size.
      let rightTreeSize = m - 1 - leftTreeSize;

      // Use cached values to get the number of topologies for left and right subtrees.
      let numberOfLeftTrees = cache[leftTreeSize];
      let numberOfRightTrees = cache[rightTreeSize];

      // Multiply the number of possible left and right subtree combinations
      // and add to the total for m nodes.
      numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
    }

    // Store the calculated number of topologies for m nodes in the cache.
    cache.push(numberOfTrees);
  }

  // Return the result for n nodes, which is now cached.
  return cache[n];
}
