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

// iterative solution tracing the edges and working inward

// O(n) time due to traversing n elements in two-dimensional arrays
// O(n) space due to storing n elements in new array

function spiralTraverse(array) {
    let results = [];

    let startRow = 0;
    let endRow = array.length - 1;
    let startCol = 0;
    let endCol = array[0].length - 1;

    while (startRow <= endRow && startCol <= endCol) {

        for (let col = startCol; col <= endCol; col++) {
            results.push(array[startRow][col]);
        }

        for (let row = startRow + 1; row <= endRow; row++) {
            results.push(array[row][endCol]);
        }

        for (let col = endCol - 1; col >= startCol; col--) {
            if (startRow === endRow) {
                break;
            }
            results.push(array[endRow][col]);
        }

        for (let row = endRow -1; row > startRow; row--) {
            if (startCol === endCol) {
                break;
            }
            results.push(array[row][startCol]);
        }

        startRow++;
        endRow--;
        startCol++;
        endCol--;
    }

    return results;
}