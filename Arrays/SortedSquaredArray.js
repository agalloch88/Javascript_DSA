// Write a function that takes in a non-empty array of integers which are sorted in ascending order,
// and returns a new array of the same length with the squares of the original integers also sorted in
// ascending order.

// Sample input:
// array = [1, 2, 3, 5, 6, 8, 9]

// Sample output:
// [1, 4, 9, 25, 36, 64, 81]

// Solution 1:

// O(n log(n)) time due to for loop, sorting array
// O(n) space due to creating new holder array for n values

function sortedSquaredArray(array) {
    // create holder array filled with zeroes for length of input array 
    const sortedSquares = new Array(array.length).fill(0);

    for (let idx = 0; idx < array.length; i++) {
        // grab current value for whatever index we are currently at, get squared value
        const value = array[idx];
        sortedSquares[idx] = value * value;
    }
    // use built-in JS sort to account for potential negative values
    sortedSquares.sort((a, b) => a - b);
    return sortedSquares;
}