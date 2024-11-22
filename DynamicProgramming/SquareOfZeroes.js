// Write a function which takes in a square-shaped `n x ` two-dimensional array of only 1's and 0's, and which returns a boolean representing whether the input matrix contains a square
// whose borders are made up of only 0's.

// Note that a `1 x 1` square does not count as a valid square for the purposes of the question. In other words, a singular `0` in the input matrix does not constitute
// a square whose borders are made up of only 0's. A square of 0's has to be at least `2 x 2`.

// Sample Input:

// matrix = [
//    [1, 1, 1, 0, 1, 0],
//    [0, 0, 0, 0, 0, 1],
//    [0, 1, 1, 1, 0, 1],
//    [0, 0, 0, 1, 0, 1],
//    [0, 1, 1, 1, 0, 1],
//    [0, 0, 0, 0, 0, 1],
// ]

// Sample Output:
// true

// [
    //    [, , , , ,      ],
    //    [0, 0, 0, 0, 0, ],
    //    [0,    , , , 0, ],
    //    [0, ,   , ,  0, ],
    //    [0, , , ,    0, ],
    //    [0, 0, 0, 0, 0, ],
    // ]

// Solution 1:

function squareOfZeroes(matrix) {
    let lastIdx = matrix.length - 1;
    return hasSquareOfZeroes(matrix, 0,  0, lastIdx, lastIdx, {});
}

function hasSquareOfZeroes(matrix, r1, c1, r2, c2, cache) {
    if (r1 >= r2 || c1 >= c2) {
        return false;
    }

    let key = r1.toString() + '-' + c1.toString() + '-' + r2.toString() + '-' + c2.toString();
    if (key in cache) {
        return cache[key];
    }

    cache[key] = isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
        hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
        hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache) ||
        hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache) ||
        hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache) ||
        hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache);

    return cache[key];
}

function isSquareOfZeroes(matrix, r1, c1, r2, c2) {
    for (let row = r1; row < r2 + 1; row++) {
        if (matrix[row][c1] !== 0 || matrix[row][c2] !== 0) {
            return false;
        }
    }

    for (let col = c1; col < c2 + 1; col++) {
        if (matrix[r1][col] !== 0 || matrix[r2][col] !== 0) {
            return false;
        }
    }

    return true;
}