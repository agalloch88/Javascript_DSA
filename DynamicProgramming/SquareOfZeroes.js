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