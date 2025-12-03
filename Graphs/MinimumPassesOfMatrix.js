// Write a function which takes in an integer matrix of potentially unequal height and width
// and returns the minimum number of passes required to convert all negative integers
// in the matrix to positive integers.

// A negative integer in the matrix can only be converted to a positive integer if one
// or more of its adjacent elements is positive. An adjacent element is an element
// that is to the left, to the right, above, or below the current element in the matrix.
// Converting a negative to a positive simply involves multiplying it by -1.

// Note that the 0 value is neighter positive nor negative, meaning that a 0 cannot
// convert an adjacent negative to a positive.

// A single pass through the matrix involves converting all the negative intergers
// which CAN be concerted at a particular point in time. For example, consider the following input:

// [
//  [0, -2, -1],
//  [-5, 2, 0],
//  [-6, -2, 0],
// ]

// After a first pass, only three values may be converted to positives:

// [
//  [0, 2, -1],
//  [5, 2, 0],
//  [-6, 2, 0],
// ]

// After a second pass, the remaining negatives call all be converted to positives:

// [
//  [0, 2, 1],
//  [5, 2, 0],
//  [6, 2, 0],
// ]

// Note that the input matrix will always contain at least one element. If the negative
// integers in the input matrix cannot all be converted to positives, regardless of
// how many passes are run, the function should return -1.

// Sample Input:

// matrix = [
//  [0, -1, -3, 2, 0],
//  [1, -2, -5, -1, -3],
//  [3, 0, 0, -4, -1],
// ]

// Sample Output:
// 3

// Pass One:
// matrix = [
//  [0, -1, 3, 2, 0],
//  [1, 2, -5, 1, -3],
//  [3, 0, 0, -4, -1],
// ]

// Pass Two:
// matrix = [
//  [0, 1, 3, 2, 0],
//  [1, 2, 5, 1, 3],
//  [3, 0, 0, 4, -1],
// ]

// Pass Three:
// matrix = [
//  [0, 1, 3, 2, 0],
//  [1, 2, 5, 1, 3],
//  [3, 0, 0, 4, 1],
// ]

// Solution 1:

// recursive solution finding negatives, converting them, and tracking number of passes

// O(w * h) time complexity where w is width and h is height of matrix, converges to O(n)
// O(w * h) space complexity due to using a couple stacks, additional arrays etc

function minimumPassesOfMatrix(matrix) {
  // set variable to result of passes of helper function, which converts negatives at each pass
  let passes = convertNegatives(matrix);
  // return result of check to see if any negatives remain
  return !containsNegative(matrix) ? passes - 1 : -1;
}

function convertNegatives(matrix) {
  // set variable to result of helper function which finds all positive positions, this will be the next set of nodes to work through
  let nextPassStack = getAllPositivePositions(matrix);
  // create variable for how many passes/iterations through matrix occur
  let passes = 0;
  // while there are results still to check, do stuff
  while (nextPassStack.length > 0) {
    // move results from next to currentPassStack
    let currentPassStack = nextPassStack;
    // reset nextPassStack to empty
    nextPassStack = [];
    // while items still in current pass, do stuff
    while (currentPassStack.length > 0) {
      // pop top item from stack and deconstruct into row/col position
      let [currentRow, currentCol] = currentPassStack.pop();
      // grab adjacent positions for current item using helper function
      let adjacentPositions = getAdjacentPositions(
        currentRow,
        currentCol,
        matrix,
      );
      // for every item in adjacentPositions, need to do checks
      for (let position of adjacentPositions) {
        // grab row/col coordinates for this position
        let [row, col] = position;
        // store the numeric value contained at those coordinates in variable
        let value = matrix[row][col];
        // if less than zero, this is a negative, so should turn positive
        if (value < 0) {
          // multiply item at these coordinates by -1 to turn positive
          matrix[row][col] *= -1;
          // push this item's coordinates into nextPassStack to consider during next pass
          nextPassStack.push([row, col]);
        }
      }
    }
    // completed a pass, so increment passes by 1
    passes++;
  }
  // return total number of passes done
  return passes;
}

function getAllPositivePositions(matrix) {
  // set up holder array to find all positive integer positions
  let positivePositions = [];
  // for every item in the matrix, will check to see if positive
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // store the numeric value contained at coordinates in a variable
      let value = matrix[row][col];
      // if this item is greater than 0, positive integer found, so push to array
      if (value > 0) {
        positivePositions.push([row, col]);
      }
    }
  }
  // return array of all positive positions found
  return positivePositions;
}

function getAdjacentPositions(row, col, matrix) {
  // create holder array for valid adjacent items
  let adjacentPositions = [];
  // check for valid adjacent position above current item, and if there, push to array
  if (row > 0) {
    adjacentPositions.push([row - 1, col]); // UP
  }
  // check for valid adjacent position below current item, and if there, push to array
  if (row < matrix.length - 1) {
    adjacentPositions.push([row + 1, col]); // DOWN
  }
  // check for valid adjacent position left of current item, and if there, push to array
  if (col > 0) {
    adjacentPositions.push([row, col - 1]); // LEFT
  }
  // check for valid adjacent position right of current item, and if there, push to array
  if (col < matrix[row].length - 1) {
    adjacentPositions.push([row, col + 1]); // RIGHT
  }
  // return results of these check
  return adjacentPositions;
}

function containsNegative(matrix) {
  // in every row of matrix, check every value
  for (let row of matrix) {
    for (let value of row) {
      // if value of an item less than 0, still have a negative, so return true
      if (value < 0) {
        return true;
      }
    }
  }
  // if no hits, all negatives were handled, so return false as no negatives
  return false;
}

// Solution 2:

// recursive solution using queue rather than stack, tracking passes and number of items in the queue to determine when done

// O(w * h) time complexity where w is width and h is height of matrix, plus O(n) shift operations, where 2n converges to O(n)
// O(w * h) space due to using queue, etc

function minimumPassesOfMatrix2(matrix) {
  // set variable to result of passes of helper function, which converts negatives at each pass
  let passes = convertNegatives2(matrix);
  // return result of check to see if any negatives remain
  return !containsNegative2(matrix) ? passes - 1 : -1;
}

function convertNegatives2(matrix) {
  // create queue for results of all positive positions
  let queue = getAllPositivePositions2(matrix);
  // create variable for how many passes/iterations through matrix occur
  let passes = 0;
  // while there are items in the queue, do stuff
  while (queue.length > 0) {
    // create currentSize variable to track how many items left to process in the queue
    let currentSize = stack.length;
    // when no more items to process, while loop will break
    while (currentSize > 0) {
      // shift front item out of queue and deconstruct to grab row/col position
      let [currentRow, currentCol] = queue.shift();
      // store adjacent positions in variable coming back from helper
      let adjacentPositions = getAdjacentPositions2(
        currentRow,
        currentCol,
        matrix,
      );
      for (let position of adjacentPositions) {
        // for current position, deconstruct the row/col
        let [row, col] = position;
        // set variable value equal to current number at row/col coordinates in matrix
        let value = matrix[row][col];
        // if value is less than zero, dealing with a negative, so turn it positive
        if (value < 0) {
          matrix[row][col] *= -1;
          // push this new value into the queue to then look at its neighbors
          queue.push([row, col]);
        }
      }
      // dealt with one item in queue, so decrement currentSize variable
      currentSize--;
    }
    // completed one pass, so increment passes variable
    passes++;
  }
  // when done with entire queue, while loop exits so return passes variable
  return passes;
}

function getAllPositivePositions2(matrix) {
  // set up holder array to find all positive integer positions
  let positivePositions = [];
  // for every item in the matrix, will check to see if positive
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // store the numeric value contained at coordinates in a variable
      let value = matrix[row][col];
      // if this item is greater than 0, positive integer found, so push to array
      if (value > 0) {
        positivePositions.push([row, col]);
      }
    }
  }
  // return array of all positive positions found
  return positivePositions;
}

function getAdjacentPositions2(row, col, matrix) {
  // create holder array for valid adjacent items
  let adjacentPositions = [];
  // check for valid adjacent position above current item, and if there, push to array
  if (row > 0) {
    adjacentPositions.push([row - 1, col]); // UP
  }
  // check for valid adjacent position below current item, and if there, push to array
  if (row < matrix.length - 1) {
    adjacentPositions.push([row + 1, col]); // DOWN
  }
  // check for valid adjacent position left of current item, and if there, push to array
  if (col > 0) {
    adjacentPositions.push([row, col - 1]); // LEFT
  }
  // check for valid adjacent position right of current item, and if there, push to array
  if (col < matrix[row].length - 1) {
    adjacentPositions.push([row, col + 1]); // RIGHT
  }
  // return results of these check
  return adjacentPositions;
}

function containsNegative2(matrix) {
  // in every row of matrix, check every value
  for (let row of matrix) {
    for (let value of row) {
      // if value of an item less than 0, still have a negative, so return true
      if (value < 0) {
        return true;
      }
    }
  }
  // if no hits, all negatives were handled, so return false as no negatives
  return false;
}
