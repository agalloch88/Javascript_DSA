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

// Solution 2:

// O(n) time due to single for loop pass over input array
// O(n) space due to creating new holder array for n values

function sortedSquaredArray(array) {
    // create holder array filled with zeroes for length of input array
    const sortedSquares = new Array(array.length).fill(0);
    // initialize two pointers at beginning and end of input array
    let smallerValueIdx = 0;
    let largerValueIdx = array.length - 1;
    // will fill the squared values from the end of the array forward, such that it
    // is sorted without needing to call .sort()
    for (let idx = array.length - 1; idx >= 0; idx--) {
        // initialize variables to compare theoretically smaller & larger variables at
        // either end of array. since input array is sorted, extreme values will be
        // at opposite ends, so we work our way inward.
        const smallerValue = array[smallerValueIdx];
        const largerValue = array[largerValueIdx];
        // compare the absolute values of these integers to determine which will be
        // the larger squared value, then move that index inward toward center
        if (Math.abs(smallerValue) > Math.abs(largerValue)) {
            sortedSquares[idx] = smallerValue * smallerValue;
            smallerValueIdx++;
        } else {
            sortedSquares[idx] = largerValue * largerValue;
            largerValueIdx--;
        }
    }

    return sortedSquares;
}