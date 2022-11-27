// Write a function which takes in a non-empty array of distinct integers, and an integer representing
// a target sum. If any two numbers in the input array sum up to the target sum, the function should
// return them in an array, in sorted order. If no two numbers sum up to the target sum, the function
// should return an empty array.

// Note that the target sum must be obtained by summing two different integers in the array; you can't
// add a single integer to itself in order to obtain the target sum.

// You can assume that there will be at most one pair of numbers summing up to the target sum.

// Sample input: 
// array = [3, 5, -4, 8, 11, 1, -1, 6]
// targetSum = 10
// Sample output: [-1, 11]

// Solution 1:

// iterative solution using two pointers in for loops to compare values to targetSum

// O(n^2) time complexity due to nested for loops
// O(1) space complexity due to no additional data structures

function twoNumberSum(array, targetSum) {
    // start looping over array input, starting at index 0 for i
    for (let i = 0; i < array.length - 1; i++) {
        // grab value at i in input array and store in variable int1
        const int1 = array[i];
        // start second loop over input array, starting at index i plus 1
        for (let j = i + 1; j < array.length; j++) {
            // grab value at j in input array and store in variable int2
            const int2 = array[j];
            // check whether the sum of int1 plus int2 is equal to targetSum, and if so, execut below
            if (int1 + int2 === targetSum) {
                // return array containing int1 and int2
                return [int1, int2];
            }
        }
    }
    // should if block above never triggers, return an empty array
    return [];
}

// Solution 2:

// O(n) time due to single pass over input array
// O(n) space due to creating hashmap/JS object to store nums

function twoNumberSum(array, targetSum) {
    const nums = {};
    for (const num of array) {
        const potentialMatch = targetSum - num;
        if (potentialMatch in nums) {
            return [potentialMatch, num];
        } else {
            nums[num] = true;
        }
    } 
    return [];
}

// Solution 3:

// O(n log(n)) time due to using sort on input array
// O(1) space due to only storing pointer values and currentSum

function twoNumberSum(array, targetSum) {
    array.sort((a, b) => a - b);
    const left = 0;
    const right = array.length - 1;
    while (left < right) {
        const currentSum = array[left] = array[right];
        if (currentSum === targetSum) {
            return [array[left], array[right]];
        } else if (currentSum < targetSum) {
            left++;
        } else if (currentSum > targetSum) {
            right--;
        }
    }
    return [];
}
