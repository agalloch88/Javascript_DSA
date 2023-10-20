// Write a function which takes in a two-dimensional array of dimensions N x M (which may be square-shaped if N === M), and which returns a one-dimensional array of all
// the input, two-dimensional array's elements in zagzag order.

// Zigzag order starts at the top left corner of the two-dimensional array, goes down by one element, and proceeds in a zigzag pattern all the way tot he bottom right corner.

// Sample Input:
// array = [
//  [1, 3, 4, 10],
//  [2, 5, 9, 11],
//  [6, 8, 12, 15],
//  [7, 13, 14, 16],
// ]

// Sample Output:
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

// Solution 1:

// iterative solution tracking height/width and respective rows/columns, plus whether the current direction should be gong up or down

// O(n) time due to only passing over the inputs one time
// O(n) space due to storing a new result array of length n

function zigzagTraverse(array) {
  // get total number of rows in height the 2D array stands, and store it in variable height
  // in sample  input, the input array is 4 items long, and thus 4 items in height
  let height = array.length - 1;
  // get total number of columns in width the 2D array stands, and store it in the variable width
  // in sample input, the first item/row of the input array has 4 values, and thus 4 values in width
  let width = array[0].length - 1;
  // initialize empty array to hold the result of the zigzag traverse
  let result = [];
  // initialize variables for row and col to keep track of what item the iteration is on in the 2D array
  let row = 0;
  let col = 0;
  // set variable goingDown to true, as to start zig-zagging, must first go down
  let goingDown = true;
  // set up while loop to keep going while still in bounds, depending on return value from helper isOutOfBounds
  while (!isOutOfBounds(row, col, height, width)) {
    // push current item, which on first pass is upper left value, into result array
    result.push(array[row][col]);
    // execute block below while the zigzag traverse should be going down
    if (goingDown) {
      // if in the first, leftmost column, or the last, bottommost row, execute the block below
      if (col === 0 || row === height) {
        // should not be going down any further, so will skip to outer else block on next pass
        goingDown = false;
        // if in the last, bottommost row, move right to the next column
        if (row === height) {
          col++;
          // if NOT in the last, bottommost row, move down to the next row
        } else {
          row++;
        }
        // if NOT in first, leftmost column, or the last, bottommost row, execute the block below
      } else {
        // move down one row and left one column, effectively moving diagonally to the bottom left corner
        row++;
        col--;
      }
      // execute block below while the zigzag traverse should be going up
    } else {
      // if in the first, topmost row, or the last, rightmost column, execute the block below
      if (row === 0 || col === width) {
        // should not be going up any further, so will enter outer if block on next pass
        goingDown = true;
        // if in the last, rightmost column, move down to the next row
        if (col === width) {
          row++;
          // if NOT in the last, rightmost column, move right to the next column
        } else {
          col++;
        }
        // if NOT in the first, topmost row, or the last, rightmost column, execute the block below
      } else {
        // move up one row and right one column, effectively moving diagonally to the top right corner
        row--;
        col++;
      }
    }
  }
  // after zigzag traversing the wholew 2D array, return the result array
  return result;
}
// helper function to determine whether out of bounds
function isOutOfBounds(row, col, height, width) {
  // return statement to check 4 different or conditions to determine whether in or out of bounds
  return row < 0 || row > height || col < 0 || col > width;
}
