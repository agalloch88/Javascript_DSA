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

// iterative solution creating a separate matrix to keep track of nodes visited, whether node is a valid connected 1 or not, and using a stack to check all the neighbors

// O(w * h) time due to going over w columns and h rows of values, which essentially converges to n total nodes (technically 3n which converges to n)
// O(w * h) space due to storing entirely separate w columns * h rows copy of matrix for true/false values, plus stack and neighbors

function removeIslands(matrix) {
    // initialize empty array to hold copy of matrix, will keep track of islands and items visited here
    let onesConnectedToBorder = [];
    // create array for every row in input matrix
    for (let row = 0; row < matrix.length; row++) {
        // now a 2D array/matrix, still empty
        onesConnectedToBorder.push([]);
        // set up column to match for every column in input matrix
        for (let col = 0; col < matrix[0].length; col++) {
            // initialize every value to false at outset
            onesConnectedToBorder[row].push(false);
        }
    }
    // will now check every value on the border of matrix
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            // determine if the current row is a border, either first or last row will be border
            let rowIsBorder = row === 0 || row === matrix.length - 1;
            // determine if the current column is a border, either first or last column will be border
            let colIsBorder = col === 0 || col === matrix[row].length - 1;
            // set variable to determine if a border, it will either be border row or border column if so
            let isBorder = rowIsBorder || colIsBorder;
            // if not dealing with a border, do nothing and continue
            if (!isBorder) {
                continue;
            }
            // if the current position on the border is not a 1, do nothing and continue
            if (matrix[row][col] !== 1) {
                continue;
            }
            // call helper function to find all the 1's on the border, as these will be valid islands which should not be removed
            findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder);
        }
    }
    // since already determined the borders, now need to look to interior of matrix, so can skip value 0 on both row and column here
    for (let row = 1; row < matrix.length - 1; row++) {
        for (let col = 1; col < matrix[row].length - 1; col++) {
            // if the current item is true, it's a 1 connected to the border, so continue
            if (onesConnectedToBorder[row][col]) {
                continue;
            }
            // otherwise, this 1 is not connected, so set it to a 0 instead and effectively remove this island from matrix
            matrix[row][col] = 0;
        }
    }
    // return the final matrix with islands removed
    return matrix;
}
// helper function to find 1's on the border, and thus, valid islands
function findOnesConnectedToBorder(matrix, startRow, startCol, onesConnectedToBorder) {
    // initialize stack to hold the starting row and column from which will check for 1's and find branches out from border via DFS
    let stack = [[startRow, startCol]];
    // while items are in the stack to check, continue
    while (stack.length > 0) {
        // grab current position by popping top item off the stack
        let currentPosition = stack.pop();
        // deconstruct the tuple and grab the current row and column of currentPosition
        let [currentRow, currentCol] = currentPosition;
        // check to see if already visited this item, and if so, do nothing and continue
        let alreadyVisited = onesConnectedToBorder[currentRow][currentCol];
        if (alreadyVisited) {
            continue;
        }
        // if item was not visited and still shows as false, set it to true
        onesConnectedToBorder[currentRow][currentCol] = true;
        // find the neighbors for the current item, may be up, down, left, or right, by calling another helper function getNeighbors
        let neighbors = getNeighbors(matrix, currentRow, currentCol);
        // for every neighbor returned, check to see if it's a 1 or 0
        for (let neighbor of neighbors) {
            // deconstruct neighbor to grab row and column value
            let [row, col] = neighbor;
            // if this position in the matrix is a 0, do nothing and continue
            if (matrix[row][col] !== 1) {
                continue;
            }
            // if a 1, push this neighbor onto the stack to check it's neighbors for 1 or 0, as well
            stack.push(neighbor);
        }
    }
}
// helper function to determine valid neighbors for a given item
function getNeighbors(matrix, row, col) {
    // initialize holder array for the neighbors of a given item
    let neighbors = [];
    // set variables to determine number of rows and columns in matrix, so can determine valid direction of neighbors
    let numRows = matrix.length;
    let numCols = matrix[row].length;
    // if direction up is greater than or equal to zero, grab this item and push it to neighbors
    if (row - 1 >= 0) {
        neighbors.push([row - 1, col]); // UP
    }
    // if direction down is less than the value of numRows, grab this item and push it to neighbors
    if (row + 1 < numRows) {
        neighbors.push([row + 1, col]); // DOWN
    }
    // if direction left is greater than or equal to zero, grab this item and push it to neighbors
    if (col - 1 >= 0) {
        neighbors.push([row, col - 1]); // LEFT
    }
    // if direction right is less than the value of numCols, grab this item and push it to neighbors
    if (col + 1 < numCols) {
        neighbors.push([row, col + 1]); // RIGHT
    }
    // return all the valid neighbors for this item
    return neighbors;
}