// The problem presents a two-dimensional array (also known as a matrix) of potentially unequal height and width. The 2D array/matrix contains only 0's and 1's. Each 1 represents water, and each 0
// represents part of a land mass. A land mass consists of any number of 0's which are either horizontally or vertically adjacent (but not diagonally adjacent). The number of adjacent 0's forming
// a land mass determines its size.

// Note that a land mass may twist and turn. In other words, it does not have to be a straight vertical or horizontal line. It may, in fact, be L-shaped, or some shape more complex.

// Write a function which returns the largest possible land mass size after changing exactly one 1 (water) to one 0 (land). Note that the given 2D array/matrix will always contain at least one 1, and
// the problem allows for mutation of the input 2D array/matrix.

// Sample Input:

// matrix = [
//  [0, 1, 1],
//  [0, 0, 1],
//  [1, 1, 0]
// ]

// Sample Output:

// 5
// Switching either matrix[1][2] or matrix[2][1] creates a land mass of size 5

// Solution 1:

// breadth/depth-first search solution brute-forcing and checking every node for possible connections to other islands

// O(w^2 * h^2) time due to nested for loops and checking every node twice
// O(w * h) space due to storing new visited matrix and tracking visited

// main function taking in the input matrix
function largestIsland(matrix) {
  // initialize variable maxSize to track largest island created
  let maxSize = 0;

  // iterate over every row and every column in the input matrix
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      // if the value at given row/col pair is 0, do nothing and continue as this is a part of an island, and need to find any 1's/water position
      if (matrix[row][col] === 0) {
        continue;
      }
      // set variable maxSize equal to the max between current value of maxSize and return value from helper function getSizeFromNode, passing in current row, col, and the full matrix
      maxSize = Math.max(maxSize, getSizeFromNode(row, col, matrix));
    }
  }
  // once finished checking all input values from matrix, should have final maxSize value to return as the answer
  return maxSize;
}

// helper function which determines islands size from a given island node
function getSizeFromNode(row, col, matrix) {
  // initialize variable size and set equal to one at outset, since there is a node
  let size = 1;
  // initialize variable visited and set equal to a new mapped copy of the input matrix, where every value is given false since it's yet to be visited
  let visited = matrix.map((row) => row.map((_) => false));
  // initialize variable nodesToExplore and set equal to the return value of another helper function getLandNeighbors to look up, down, left, and right to find potential other land pieces
  let nodesToExplore = getLandNeighbors(row, col, matrix);

  // keep looping so long as there are items in nodesToExplore array
  while (nodesToExplore.length > 0) {
    // initialize variable currentNode, and set equal to the popped value from nodesToExplore
    let currentNode = nodesToExplore.pop();
    // destructure currentNode into currentRow and currentCol variables inside each pair
    let [currentRow, currentCol] = currentNode;

    // check whether this coordinate pair is listed as true in the visited matrix copy, and if so, simply continue
    if (visited[currentRow][currentCol]) {
      continue;
    }

    // set the value at coordinates of currentRow and currentCol in visited equal to true
    visited[currentRow][currentCol] = true;
    // increment the tracked size variable for size of island by 1
    size++;
    // since this is another piece of an island, need to check the neighbors of this position, so push the spread value of getLandNeighbors into nodesToExplore array, passing in currentRow, currentCol, and matrix
    nodesToExplore.push(...getLandNeighbors(currentRow, currentCol, matrix));
  }
  // return the value of size for use in main function max comparison with maxSize
  return size;
}

// helper function to look in given directions in bounds of matrix and determine whether there is another land section there
function getLandNeighbors(row, col, matrix) {
  // initialize variable landNeighbors, and set equal to an empty array to hold coordinate row/col pairs
  let landNeighbors = [];
  // LOOK UP
  // if one row upward at current col position is a 0, push this positional coordinate pair into landNeighbors array
  if (row > 0 && matrix[row - 1][col] !== 1) {
    landNeighbors.push([row - 1, col]);
  }
  // LOOK DOWN
  // if one row downward at current col position is a 0, push this positional coordinate pair into landNeighbors array
  if (row < matrix.length - 1 && matrix[row + 1][col] !== 1) {
    landNeighbors.push([row + 1, col]);
  }
  // LOOK LEFT
  // if one col left at current row position is a 0, push this positional coordinate pair into landNeighbors array
  if (col > 0 && matrix[row][col - 1] !== 1) {
    landNeighbors.push([row, col - 1]);
  }
  // LOOK RIGHT
  // if one col right at current row position is a 0, push this positional coordinate pair into landNeighbors array
  if (col < matrix[0].length - 1 && matrix[row][col + 1] !== 1) {
    landNeighbors.push([row, col + 1]);
  }
  // once all four directions checked, return any findings stored in landNeighbors for use in getSizeFromNode()
  return landNeighbors;
}

// Solution 2:

// iterative solution finding and numbering islands, then determining the biggest island

// O(w * h) time due to iterating over all inputs once
// O(w * h) space due to storing arrays, set of values

// main function which takes in the input matrix
function largestIsland2(matrix) {
  // initialize variable islandSizes and set equal to empty array
  let islandSizes = [];
  // initialize variable to islandNumber, and set equal to 2 at outset
  // this variable will allow islands to be tagged individually, without overwriting whether they are 1 or 0
  let islandNumber = 2;

  // iterate over every row and col in input matrix
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // if the value at the current position is a 0, so land, execute the below
      if (matrix[row][col] === 0) {
        // push the return result of helper function getSizeFromNode into islandSizes, passing in the current row, col, the input matrix, and current value of islandNumber for tagging
        islandSizes.push(getSizeFromNode(row, col, matrix, islandNumber));
        // increment islandNumber by 1 for the next island found
        islandNumber++;
      }
    }
  }
  // initialize variable maxSize, and set equal to 0 at outset
  let maxSize = 0;
  // iterate over every row and col in input matrix looking for established islands
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // if the current row and col position is anything other than water, simply continue
      if (matrix[row][col] !== 1) {
        continue;
      }
      // initialize variable landNeighbors, and set equal to returned result from getLandNeighbors helper, passing in current row and col position plus input matrix
      let landNeighbors = getLandNeighbors(row, col, matrix);
      // initialize variable islands, and set equal to a new Set object
      let islands = new Set();
      // for every resulting neighbor in the landsNeighbors array, execute below
      for (let neighbor of landNeighbors) {
        // add values into the islands Set
        islands.add(matrix[neighbor[0]][neighbor[1]]);
      }
      // set variable size equal to 1
      let size = 1;
      // iterate over every island found in islands Set
      for (let island of islands) {
        // increment size variable by result in islandSizes at island minus 2 to account for initial +2
        size += islandSizes[island - 2];
      }
      // set maxSize variable set to the max between current maxSize value at the size
      maxSize = Math.max(maxSize, size);
    }
  }
  // return final value of maxSize
  return maxSize;
}

// helper function which determines total connected size of an island from one initial node
function getSizeFromNode2(row, col, matrix, islandNumber) {
  // initialize variable size, and set equal to 0 at outset
  let size = 0;
  // initialize variable nodesToExplore, which will contain all the nodes to check left, and set equal to an array populated with the passed in row and col
  let nodesToExplore = [[row, col]];
  // keep looping so long as there are items in nodesToExplore
  while (nodesToExplore.length > 0) {
    // initialize variable currentNode, and set equal to the popped value from nodesToExplore
    let currentNode = nodesToExplore.pop();
    // destructure currentNode into coordinate pair of currentRow and currentCol
    let [currentRow, currentCol] = currentNode;
    // if the value at currentRow and currentCol position is anything other than unexplored land, so 0, simply continue
    if (matrix[currentRow][currentCol] !== 0) {
      continue;
    }
    // set value at the coordinates of currentRow and currentCol equal to current value of islandNumber, as this is a new island
    matrix[currentRow][currentCol] = islandNumber;
    // increment value of size by 1
    size++;
    // push the returned result from helper function getLandNeighbors into nodesToExplore array, spreading the result of function and passing in currentRow, currentCol, and the input matrix
    nodesToExplore.push(...getLandNeighbors(currentRow, currentCol, matrix));
  }
  //   once nodesToExplore is empty, the current island size is set, so return current value of size
  return size;
}

// helper function which finds neighboring land nodes from a specific coordinate pair
function getLandNeighbors2(row, col, matrix) {
  // initialize variable landNeighbors, and set equal to an empty array to hold coordinate row/col pairs
  let landNeighbors = [];
  // LOOK UP
  // if one row upward at current col position is a 0, push this positional coordinate pair into landNeighbors array
  if (row > 0 && matrix[row - 1][col] !== 1) {
    landNeighbors.push([row - 1, col]);
  }
  // LOOK DOWN
  // if one row downward at current col position is a 0, push this positional coordinate pair into landNeighbors array
  if (row < matrix.length - 1 && matrix[row + 1][col] !== 1) {
    landNeighbors.push([row + 1, col]);
  }
  // LOOK LEFT
  // if one col left at current row position is a 0, push this positional coordinate pair into landNeighbors array
  if (col > 0 && matrix[row][col - 1] !== 1) {
    landNeighbors.push([row, col - 1]);
  }
  // LOOK RIGHT
  // if one col right at current row position is a 0, push this positional coordinate pair into landNeighbors array
  if (col < matrix[0].length - 1 && matrix[row][col + 1] !== 1) {
    landNeighbors.push([row, col + 1]);
  }
  // once all four directions checked, return any findings stored in landNeighbors for use in getSizeFromNode()
  return landNeighbors;
}
