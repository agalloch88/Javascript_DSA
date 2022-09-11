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
    let passes = convertNegatives(matrix);
    return !containsNegative(matrix) ? passes - 1 : -1;
}

function convertNegatives(matrix) {
    let nextPassStack = getAllPositivePositions(matrix);

    let passes = 0;

    while (nextPassStack.length > 0) {
        let currentPassStack = nextPassStack;
        nextPassStack = [];

        while (currentPassStack.length > 0) {
            let [currentRow, currentCol] = currentPassStack.pop();

            let adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
            for (let position of adjacentPositions) {
                let [row, col] = position;

                let value = matrix[row][col];
                if (value < 0) {
                    matrix[row][col] *= -1;
                    nextPassStack.push([row, col]);
                }
            }
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
        adjacentPositions.push([row - 1, col]);
    }
    if (row < matrix.length - 1) {
        adjacentPositions.push([row + 1, col]);
    }
    if (col > 0) {
        adjacentPositions.push([row, col - 1]);
    }
    if (col < matrix[row].length - 1) {
        adjacentPositions.push([row, col + 1]);
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