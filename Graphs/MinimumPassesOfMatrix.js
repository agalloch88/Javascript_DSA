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
            let adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
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

function minimumPassesOfMatrix(matrix) {
    let passes = convertNegatives(matrix);
    return !containsNegative(matrix) ? passes - 1 : -1;
}

function convertNegatives(matrix) {
    let stack = getAllPositivePositions(matrix);

    let passes = 0;

    while (stack.length > 0) {
        let currentSize = stack.length;

        while (currentSize > 0) {
            let [currentRow, currentCol] = stack.pop();

            let adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
            for (let position of adjacentPositions) {
                let [row, col] = position;

                let value = matrix[row][col];
                if (value < 0) {
                    matrix[row][col] *= -1;
                    stack.push([row, col]);
                }
            }
            currentSize--;
        }
        passes++;
    }
    return passes;
}

function getAllPositivePositions(matrix) {
    let positivePositions = [];

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            let value = matrix[row][col];
            if (value > 0) {
                positivePositions.push([row, col]);
            }
        }
    }
    return positivePositions;
}

function getAdjacentPositions(row, col, matrix) {
    let adjacentPositions = [];

    if (row > 0) {
        adjacentPositions.push([row - 1, col]); // UP
    }
    if (row < matrix.length - 1) {
        adjacentPositions.push([row + 1, col]); // DOWN
    }
    if (col > 0) {
        adjacentPositions.push([row, col - 1]); // LEFT
    }
    if (col < matrix[row].length - 1) {
        adjacentPositions.push([row, col + 1]); // RIGHT
    }

    return adjacentPositions;
}

function containsNegative(matrix) {
    for (let row of matrix) {
        for (let value of row) {
            if (value < 0) {
                return true;
            }
        }
    }
    return false;
}