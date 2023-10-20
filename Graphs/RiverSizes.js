// The problem presents a two-dimensional array (also known as a matrix), which may potentially be unequal in terms of height and width, and contains only 0's and 1's.
// Each 0 represents land, and each 1 represents a stretch of river. A river consisters of any number of 1's strung consecutively, either horizontally or vertically adjacent,
// but not diagonally adjacent. The number of adjacent 1's forming a river determine the river's size.

// Note that a river can twist. In other words, it does not have to be a straight vertical line, or a straight horizontal line. It can be L-shaped, or T-shaped, for example.

// Write a function which returns an array of the sizes of all rivers represented/found in the input matrix. The sizes do not need to be in any particular order.

// Sample Input:
// matrix = [
//  [1, 0, 0, 1, 0],
//  [1. 0, 1, 0, 0],
//  [0, 0, 1, 0, 1],
//  [1, 0, 1, 0, 1],
//  [1, 0, 1, 1, 0],
// ]

// Sample Output:
// [1, 2, 2, 2, 5], but the numbers may be ordered differently.

// Solution 1:

// O(wh) time due to traversing all nodes, where w is width of matrix and h is height of matrix. can also be simplified to O(n) since w * h = n
// O(wh) space due to iterating and storing all values, where w is width of matrix and h is height of matrix. can also be simplified to O(n) since w * h = n

function riverSizes(matrix) {
  // set up holder array for river results
  let sizes = [];
  // set up separate mapping of matrix to track visited vs unvisited nodes, initialize all as false/unvisited
  let visited = matrix.map((row) => row.map((value) => false));
  // set up loop to keep track of where at in matrix with [i, j] coordinates
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      // if a node is marked as visited, don't do anything but move on
      if (visited[i][j]) {
        continue;
      }
      // if not visited, traverse the node
      traverseNode(i, j, matrix, visited, sizes);
    }
  }
  // return found river sizes at the end
  return sizes;
}
// helper function which abstracts node traversal steps
function traverseNode(i, j, matrix, visited, sizes) {
  // set variable to keep track of current river size, when found
  let currentRiverSize = 0;
  // keep track od nodes surrounding a river (up, down, left, right) which need to be explored
  let nodesToExplore = [[i, j]];
  // while there are nodes to explore, keep going
  while (nodesToExplore.length) {
    // pop off last element to explore
    let currentNode = nodesToExplore.pop();
    i = currentNode[0];
    j = currentNode[1];
    // if visited, do nothing and continue on
    if (visited[i][j]) {
      continue;
    }
    // if not visited, mark node as true/visited in visited copy of matrix
    visited[i][j] = true;
    // if node is 0/land, don't care, so move on
    if (matrix[i][j] === 0) {
      continue;
    }
    // if not a 0/land, must be 1/river, so add to current river size count
    currentRiverSize++;
    // grab any unvisited nodes which are neighbors to present river/1, using helper function getUnvisitedNeighbors
    let unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited);
    for (let neighbor of unvisitedNeighbors) {
      // set these neighbors as nodesToExplore
      nodesToExplore.push(neighbor);
    }
  }
  // if have a river, increment it's size in holder array
  if (currentRiverSize > 0) {
    sizes.push(currentRiverSize);
  }
}
// helper function for determining what, if any and if they exist, neighbors to river/1 need to be explored
function getUnvisitedNeighbors(i, j, matrix, visited) {
  // holder array for unvisited nodes around river/1
  let unvisitedNeighbors = [];
  // if within bounds of a row to the left, and node to left of river not yet visited, set this as an unvisitedNeighbor to explore
  if (i > 0 && !visited[i - 1][j]) {
    unvisitedNeighbors.push([i - 1, j]);
  }
  // if within bounds of a row to the right, and node to right of river not yet visited, set this as an unvisitedNeighbor to explore
  if (i < matrix.length - 1 && !visited[i + 1][j]) {
    unvisitedNeighbors.push([i + 1, j]);
  }
  // if within bounds of a row to the top, and node on top of river not yet visited, set this as an unvisitedNeighbor to explore
  if (j > 0 && !visited[i][j - 1]) {
    unvisitedNeighbors.push([i, j - 1]);
  }
  // if within bounds of a row to the bottom, and node on bottom of river not yet visited, set this as an unvistedNeighbor to explore
  if (j < matrix[0].length - 1 && !visited[i][j + 1]) {
    unvisitedNeighbors.push([i, j + 1]);
  }
  // return these unvisitedNeighbors for use in traverseNode, if any
  return unvisitedNeighbors;
}
