// The problem presents a two-dimensional array (aka a matrix) of potentially unequal height and width, which contains only 0s and 1's. The matrix represents a two-toned image,
// where each 1 represents black and each 0 represents white. An island is defined as any number of 1's which are horizontally or vertically adjacent (but not diagonally adjacent)
// and which don't touch the border of the image. In other words, a gorup of horizontally or vertically adjacent 1's is not considered an island if any of those 1's
// are in the first row, last row, first column, or last column of the input matrix.

// Note that an island can twist. In other words, it does not have to be a straight vertical line or straight horizontal line. It can be L or T-shaped, for example.

// Islands may be conceptualized as patches of black which do not touch the border of the two-toned image.

// For this problem, write a function which returns a modified version of the input matrix, in which all of the islands present in the initial input are removed. Islands
// may be removed by replacing the 1's with 0's.

// Given this requirement, naturally, the input matrix is mutable and may be modified.

// Sample Input:
// matrix = 
// [
//  [1, 0, 0, 0, 0, 0],
//  [0, 1, 0, 1, 1, 1],
//  [0, 0, 1, 0, 1, 0],
//  [1, 1, 0, 0, 1, 0],
//  [1, 0, 1, 1, 0, 0],
//  [1, 0, 0, 0, 0, 1],
// ]

// Sample Output:
// matrix = 
// [
//  [1, 0, 0, 0, 0, 0],
//  [0, 0, 0, 1, 1, 1],
//  [0, 0, 0, 0, 1, 0],
//  [1, 1, 0, 0, 1, 0],
//  [1, 0, 0, 0, 0, 0],
//  [1, 0, 0, 0, 0, 1],
// ]

// Solution 1:

function removeIslands(matrix) {
    let onesConnectedToBorder = [];

    for (let row = 0; row < matrix.length; row++) {
        onesConnectedToBorder.push([]);
        for (let col = 0; col < matrix[0].length; col++) {
            onesConnectedToBorder[row].push(false);
        }
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            let rowIsBorder = row === 0 || row === matrix.length - 1;
            let colIsBorder = col === 0 || col === matrix[row].length - 1;
            let isBorder = rowIsBorder || colIsBorder;

            if (!isBorder) {
                continue;
            }

            if (matrix[row][col] !== 1) {
                continue;
            }

            findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder);
        }
    }

    for (let row = 1; row < matrix.length - 1; row++) {
        for (let col = 1; col < matrix[row].length - 1; col++) {
            if (onesConnectedToBorder[row][col]) {
                continue;
            }
            matrix[row][col] = 0;
        }
    }
    return matrix;
}

function findOnesConnectedToBorder(matrix, startRow, startCol, onesConnectedToBorder) {
    let stack = [[startRow, startCol]];

    while (stack.length > 0) {
        let currentPosition = stack.pop();
        let [currentRow, currentCol] = currentPosition;

        let alreadyVisited = onesConnectedToBorder[currentRow][currentCol];
        if (alreadyVisited) {
            continue;
        }

        onesConnectedToBorder[currentRow][currentCol] = true;

        let neighbors = getNeighbors(matrix, currentRow, currentCol);
        for (let neighbor of neighbors) {
            let [row, col] = neighbor;

            if (matrix[row][col] !== 1) {
                continue;
            }

            stack.push(neighbor);
        }
    }
}

function getNeighbors(matrix, row, col) {
    let neighbors = [];

    let numRows = matrix.length;
    let numCols = matrix[row].length;

    if (row - 1 >= 0) {
        neighbors.push([row - 1, col]);
    }
    if (row + 1 < numRows) {
        neighbors.push([row + 1, col]);
    }
    if (col - 1 >= 0) {
        neighbors.push([row, col - 1]);
    }
    if (col + 1 < numCols) {
        neighbors.push([row, col + 1]);
    }

    return neighbors;
}