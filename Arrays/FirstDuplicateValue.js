// Given an array of integers between 1 and n, inclusive, where n is the length of the array, write a function which returns the first integer which appears
// more than once when reading the array from left to right.

// In other words, out of all the integers which might occur more than once in the input array, the function should return the one whose first duplicate value has the minimum index.

// If no integer appears more than once, the function should return -1.

// Manipulating the input array is allowed in the context of this problem.

// Sample Input #1:
// array = [2, 1, 5, 2, 3, 3, 4]

// Sample Output #1:
// 2, as 2 is the first number to appear more than once

// Sample Input #2:
// array = [2, 1, 5, 3, 3, 2, 4]

// Sample Output #2:
// 3, as 3 is the first integer to appear more than once

// Solution 1:

// interative solution using two for loops to compare values

// O(n^2) time due to nested for loops and iterating over every value in array
// O(1) space due to only storing a couple variables

function firstDuplicateValue(array) {
    // set min index all the way to end to check base case for no duplicates, and to then return -1
    let minimumSecondIndex = array.length;
    // start iterating over input array, grabbing value for position in array at i
    for (let i = 0; i < array.length; i++) {
        let value = array[i];
        // set up comparison variable and iterate over array
        for (let j = i + 1; j < array.length; j++) {
            let valueToCompare = array[j];
            // if variables match, there is a duplicate, so update min index to be the lesser of min index or j
            if (value === valueToCompare) {
                minimumSecondIndex = Math.min(minimumSecondIndex, j);
            }
        }
    }
    // if iterated over entire input and min index still is array.length, there were no matches, so return -1
    if (minimumSecondIndex === array.length) {
        return -1;
    }

    return minimumSecondIndex;
}
