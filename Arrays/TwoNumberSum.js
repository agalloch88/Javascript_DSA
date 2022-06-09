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

// O(n^2) time complexity due to nested for loops
// O(1) space complexity due to no additional data structures

function twoNumberSum(array, targetSum) {
    for (let i = 0; i < array.length - 1; i++) {
        const int1 = array[i];
        for (let j = i + 1; j < array.length; j++) {
            const int2 = array[j];
            if (int1 + int2 === targetSum) {
                return [int1, int2];
            }
        }
    }
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
