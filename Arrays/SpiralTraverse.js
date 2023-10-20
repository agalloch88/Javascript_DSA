// Write a function which takes in an N x M two-dimensional array (which may be square-shaped when N = M) and returns a one-dimensional array of all the input array's elements in spiral order.

// Spiral order starts at the top left corner of the two-dimensional array, goes to the right, and proceeds in a spiral pattern all the way until every element has been visited.

// Sample Input:
// array = [
//    [1,   2, 3,  4],
//    [12, 13, 14, 5],
//    [11, 16, 15, 6],
//    [10,  9, 8,  7],
//  ]

// Sample Output:
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

// Solution 1:

// iterative solution tracing the edges going clockwise and working inward

// O(n) time due to traversing n elements in two-dimensional arrays
// O(n) space due to storing n elements in new array

function spiralTraverse(array) {
  // create empty results array
  let results = [];
  // establish variables for startRow, endRow, startCol, endCol
  let startRow = 0;
  let endRow = array.length - 1;
  let startCol = 0;
  let endCol = array[0].length - 1;
  // while these values are less than eachother or overlap, keep traversing
  while (startRow <= endRow && startCol <= endCol) {
    // set current column to start col, and start traversing col values in startRow
    for (let col = startCol; col <= endCol; col++) {
      // push these values into results array
      results.push(array[startRow][col]);
    }
    // set current row to startRow + 1, since already looked at the first item in endCol
    for (let row = startRow + 1; row <= endRow; row++) {
      // push the values row each row in endCol to results array
      results.push(array[row][endCol]);
    }
    // set current column to endCol - 1, since alreacy looked at endCol value
    for (let col = endCol - 1; col >= startCol; col--) {
      // once overlapping with endRow after successive iterations, break out of loop
      if (startRow === endRow) {
        break;
      }
      // push col results in row for each column to results array
      results.push(array[endRow][col]);
    }
    // set current row to endRow - 1, since already looked at value here
    for (let row = endRow - 1; row > startRow; row--) {
      // once overlapping with endCol after successive iterations, break out of loop
      if (startCol === endCol) {
        break;
      }
      // push row results in col for each row to results array
      results.push(array[row][startCol]);
    }
    // increment start row and startCol, decrement endRow and endCol
    // this completes one clockwise pass, so now looking at next interior clockwise values
    startRow++;
    endRow--;
    startCol++;
    endCol--;
  }
  // once while loop breaks, should be done, so return results array
  return results;
}

// Solution 2:

// recursive solution functioning in much the same way by tracing the outer edges

// O(n) time due to traversing n elements in two-dimensional arrays
// O(n) space due to storing n elements in new array

function spiralTraverse(array) {
  // create empty results array
  const results = [];
  // call helper, passining input array, startRow position, endRow position, startCol position,
  // endCol position, and the results array to hold the traversed values
  spiralFill(array, 0, array.length - 1, 0, array[0].length - 1, results);
  // return the filled-out results array with spiral traversal
  return results;
}

function spiralFill(array, startRow, endRow, startCol, endCol, results) {
  // base case
  // it outside the bounds of the row or column, return
  if (startRow > endRow || startCol > endCol) {
    return;
  }
  // starting at top left, push in the values of the startCol, so horizontally to the right
  for (let col = startCol; col <= endCol; col++) {
    results.push(array[startRow][col]);
  }
  // starting at value directly below the top right value, push in values of the endCol, so vertically downward
  for (let row = startRow + 1; row <= endRow; row++) {
    results.push(array[row][endCol]);
  }
  // starting at value directly to the left of bottom right value, push in values of the endRow, so horizontally
  // to the left
  for (let col = endCol - 1; col >= startCol; col--) {
    // once reaching the end, where startRow and endRow are the same, break out
    if (startRow === endRow) {
      break;
    }
    results.push(array[endRow][col]);
  }
  // starting at value directly above the bottom left, push in the values of the start col, not repeating the values,
  // so vertically toward the top
  for (let row = endRow - 1; row >= startRow + 1; row--) {
    // once reaching the end, where startCol and endCol are the same, break out
    if (startCol === endCol) {
      break;
    }
    results.push(array[row][startCol]);
  }
  // completed one entire spiral of the outermost edge, so now move inward by one value
  // and recursively keep doing so until the break positions trigger, and base case returns
  spiralFill(
    array,
    startRow + 1,
    endRow - 1,
    startCol + 1,
    endCol - 1,
    results,
  );
}
