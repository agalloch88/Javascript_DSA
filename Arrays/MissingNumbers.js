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

function missingNumbers(nums) {
    let includedNums = new Set(nums);

    let solution = [];
    for (let num = 1; num < nums.length + 3; num++) {
        if (!includedNums.has(num)) {
            solution.push(num);
        }
    }
    return solution;
}