// Write a function that takes in an array of integers, and returns a boolean representing whether an array is monotonic or not.

// An array is said to be monotonic if its elements, from left to right, are entirely non-increasing (so, decreasing or equal) or entirely non-decreasing(so, increasing or equal)
// Non-increasing or non-decreasing elements aren't necessarily exclusively increasing or decreasing.

// Note that empty arrays and arrays with a single element are by definition monotonic.

// Sample input:
// array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]

// Sample output:
// true

// Solution 1:

function isMonotonic(array) {
    // for arrays of 0, 1, or 2 elements, it will either be by definition monotonic, or with 2 elements, have either equality or some sort of direction
    if (array.length <= 2) {
        return true;
    }

    // keep track of the initial direction, and check if it changes at any point
    let direction = array[1] - array[0];
    for (let i = 2; i < array.length; i++) {
        // check to see if values are equal, in which case move to next comparison
        if (direction === 0) {
            direction = array[i] - array[i - 1];
            continue;
        }
        // use helper function breaksDirection to determine if direction changes from initial direction, and if so, return false
        if (breaksDirection()) {
            return false;
        }
    }

    return true;

}

function breaksDirection(direction, previousInt, currentInt) {
    // check to see what current difference is, then compare to current direction (positive or negative, increasing or decreasing) and return
    const difference = currentInt - previousInt;
    if (direction > 0) {
        return difference < 0;
    }
    return difference > 0;
}

// Solution 2:

function isMonotonic(array) {
    // set initial values, of which only one can be true
    let isNonDecreasing = true;
    let isNonIncreasing = true;

    // iterate through array and check trend to establish trend
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            isNonDecreasing = false;
        }
        if (array[i] > array[i - 1]) {
            isNonIncreasing = false;
        }
    }
    // return either value, whichever is true
    return isNonDecreasing || isNonIncreasing;
}