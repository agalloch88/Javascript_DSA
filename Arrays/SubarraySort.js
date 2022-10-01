// Write a function which takes in an array of at least two integers, and which returns an array containing the starting and ending indices of the smallest subarray contained
// inside the input array which needs to be sorted in place in order for the entire input array to be sorted (in ascending order).

// If the input array is already sorted, the function should return [-1, -1].

// Sample Input:
// array = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]

// Sample Output:
// [3, 9]

// Solution 1:

// iterative solution making a singly pass, finding the largest and smallest values out of order, then traversing the array to find which positions those two values
// should be in, and returns these indices

// O(n) time, where n is the number of values in the input array, due to one for loop and two while loops, where 3n converges to n time
// O(1) space due to only storing a few values and returning a two-value array

function subarraySort(array) {
    // initialize variable to track the smallest value out of order, setting it to Infinity such that any value encountered on first check will be smaller
    let minOutOfOrder = Infinity;
    // initialize variable to track the largest value out of order, setting it to -Infinity such that any value encountered on first check will be larger
    let maxOutOfOrder = -Infinity;
    // iterate over every value in the input array
    for (let i = 0; i < array.length; i++) {
        // grab value at position i in input array, and store in variable num
        let num = array[i];
        // check whether current num is out of order via return value from helper function, and set the min and max out of order values
        if (isOutOfOrder(i, num, array)) {
            // set minOutOfOrder to the minimum value between variable and the current num
            minOutOfOrder = Math.min(minOutOfOrder, num);
            // set maxOutOfOrder to the maximum value between variable and the current num
            maxOutOfOrder = Math.max(maxOutOfOrder, num);
        }
    }
    // edge case
    // if the input array is already sorted, will never set minOutOfOrder value via if block above, so once done iterating over input array,
    // if this check is still true, return the base case of [-1, -1]
    if (minOutOfOrder === Infinity) {
        return [-1. -1];
    }
    // currently have the largest and smallest out of order values, so now must determine which positions those values should be at in a final sorted array
    // start at far left for start of subarray which needs sorting
    let subarrayLeftIdx = 0;
    // while the smallest out of order value is larger or equal to value in input array at the subarrayLeftIdx, increment this index to check next value
    while (minOutOfOrder >= array[subarrayLeftIdx]) {
        subarrayLeftIdx++;
    }
    // start at far right for the end of subarray which needs sorting
    let subarrayRightIdx = array.length - 1;
    // while the largest out of order value is smaller or equal to the value in the inpout array at the subarrayRightIdx, decrement this index to check the next value
    while (maxOutOfOrder <= array[subarrayRightIdx]) {
        subarrayRightIdx--;
    }
    // once while loops above break, should have the final answer, so return the array with two index values for the smallest subarray which needs sorting in the input array
    return [subarrayLeftIdx, subarrayRightIdx];
}
// helper function which checks whether a given number is out of order in the input array
function isOutOfOrder(i, num, array) {
    // if i is at the beginning, return the result of whether the num is greater than the value in input array to the right of i
    if (i === 0) {
        return num > array[i + 1];
    }
    // if i is at the end, return the result of whether the num is less than the value in the input array to the left of i
    if (i === array.length - 1) {
        return num < array[i - 1];
    }
    // otherwise, if not at the beginning or end of array, return result of whether num is greater than value to the right, or smaller than value to the left
    // this check will return true or false, and therefore allow the if block in main function to run or not
    return num > array[i + 1] || num < array[i - 1];
}