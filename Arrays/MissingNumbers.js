// The problem presents an unordered array of unique integers, nums, in the range of [1, n],
// where n represents the length of nums + 2. This means two numbrers in this range are missing
// from the array.

// Write a function which takes in this array, and returns a new array with the two missing
// numbers, sorted numerically.

// Sample Input:

// nums = [1, 4, 3]

// Sample Output:

// [2, 5]
// n is 5, meaning the completed list should be [1, 2, 3, 4, 5]

// Solution 1:

// iterative solution using Set to check whether given number exists in Set

// O(n) time due to iterating over n items in Set
// O(n) space due to creating new Set with input array and solution array

function missingNumbers(nums) {
    // initialize variable includedNums and set equal to a new Set object created from input array nums
    let includedNums = new Set(nums);
    // initialize variable solution and set equal to empty array
    let solution = [];
    // iterate over includedNums from 1 to nums.length + 3
    for (let num = 1; num < nums.length + 3; num++) {
        // if includedNums set does NOT contain the given num, execute below
        if (!includedNums.has(num)) {
            // push current num into solution array
            solution.push(num);
        }
    }
    // once for loop ends, return the solution array containing the missing numbers
    return solution;
}

// Solution 2:

function missingNumbers(nums) {
    let total = sum(arrayFromAToB(1, nums.length + 3));

    for (let num of nums) {
        total -= num;
    }

    let averageMissingValue = Math.floor(total / 2);
    let foundFirstHalf = 0;
    let foundSecondHalf = 0;
    for (let num of nums) {
        if (num <= averageMissingValue) {
            foundFirstHalf += num;
        } else {
            foundSecondHalf += num;
        }
    }

    let expectedFirstHalf = sum(arrayFromAToB(1, averageMissingValue + 1));
    let expectedSecondHalf = sum(arrayFromAToB(averageMissingValue + 1, nums.length + 3));

    return [expectedFirstHalf - foundFirstHalf, expectedSecondHalf - foundSecondHalf];
}

let arrayFromAToB = (a, b) => {
    let array = [];
    for (let num = a; num < b; num++) {
        array.push(num);
    }
    return array;
}

let sum = array => array.reduce((a, b) => a + b);