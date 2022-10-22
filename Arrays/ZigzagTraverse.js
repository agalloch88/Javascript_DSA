// Write a function which takes in a two-dimensional array of dimensions N x M (which make be square-shaped if N === M), and which returns a one-dimensional array of all
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

function zigzagTraverse(array) {
    let height = array.length - 1;
    let width = array[0].length - 1;
    let result = [];

    let row = 0;
    let col = 0;
    let goingDown = true;

    while (!isOutOfBounds(row, col, height, width)) {
        result.push(array[row][col]);
        if (goingDown) {
            if (col === 0 || row === height) {
                goingDown = false;

                if (row === height) {
                    col++;
                } else {
                    row++;
                }
            } else {
                row++;
                col--;
            }
        } else {
            if (row === 0 || col === width) {
                goingDown = true;
                if (col === width) {
                    row++;
                } else {
                    col++;
                }
            } else {
                row--;
                col++;
            }
        }
    }
    return result;
}

function isOutOfBounds(row, col, height, width) {
    return row < 0 || row > height || col < 0 || col > width;
}