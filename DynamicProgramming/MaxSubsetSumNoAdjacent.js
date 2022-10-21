// Write a function which takes in an array of positive integers and returns the maximum sum of non-adjacent elements in the array.

// If the input array is empty, the function should return 0.

// Sample Input:
// array = [75, 105, 120, 75, 90, 135]

// Sample Output:
// 330
// 75 + 120 + 135

// Solution 1:

// iterative solution comparing max values to determine

// O(n) time due to single pass over the array
// O(n) space due to storing slice copy of the input array to build maxSums

function maxSubsetSumNoAdjacent(array) {
    // handle edge case of an empty input array, which instructions say should result in return of 0
    if (!array.length) {
        return 0;
    }
    // handle edge case of a one-value input array, in which case can simply return the value stored at index 0
    if (array.length === 1) {
        return array[0];
    }
    // slice array to generate a copy of the input, and store this inside variable maxSums
    let maxSums = array.slice();
    // set the second value in input at index 1 to be the maximum value between the first two values
    maxSums[1] = Math.max(array[0], array[1]);
    // start iterating over the rest of the values, starting at index 2 since already handled first two values in input
    for (let i = 2; i < array.length; i++) {
        // for current position in maxSums, set this value equal to the max between the value directly to left versus the value two to the left plus current value
        maxSums[i] = Math.max(maxSums[i - 1], maxSums[i - 2] + array[i]);
    }
    // return the value at last position in maxSums array, which should contain the maximum sum of non-adjacent integers in the input array
    return maxSums[maxSums.length - 1];
}

// Solution 2:

function maxSubsetSumNoAdjacent(array) {
    if (!array.length) {
        return 0;
    }

    if (array.length === 1) {
        return array[0];
    }

    let second = array[0];
    let first = Math.max(array[0], array[1]);
    
    for (let i = 2; i < array.length; i++) {
        let current = Math.max(first, second + array[i]);
        second = first;
        first = current;
    }
    return first;
}