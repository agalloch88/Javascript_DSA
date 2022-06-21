// Write a function that takes in a non-empty array of distinct integers, and an integer representing a target sum. The function
// should find all triplets in the array which sum up to the target sum, and return a two-dimensional array of all these triplets.
// The numbers in each triplet should be ordered in ascending order, and the triplets themselves should be ordered in ascending
// order with respect to the numbers they hold.

// If no three numbers add up to the target sum, the function should return an empty array.

// Sample output:
// array = [12, 3, 1, 2, -6, 5, -8, 6]
// targetSum = 0

// Sample output:
// [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]

// Solution 1:

// O(n^2) time due to sorting, plus iterating over array values
// O(n) space due to storing triplets in new array

function threeNumberSum(array, targetSum) {
    // since values randomized, need to sort input array to optimally solve
    array.sort((a, b) => a - b);
    // initialize holder array, return this array at the end as it will either be empty or hold triplets
    const triplets = [];
    // loop over the array
    for (let i = 0; i < array.length - 2; i++) {
        // initialize two pointer values, one right next to i, and one at the end of sorted input array
        let left = i + 1;
        let right = array.length - 1;
        // while the pointers do not overlap, keep checking vales
        while (left < right) {
            // declare current sum variable, adding all potential triple values together
            const currentSum = array[i] + array[left] + array[right];
            // triplet value found, so push array containing these values to triplets. since we sorted, can confidently push values so
            // output is in ascending order, too.
            if (currentSum === targetSum) {
                triplets.push([array[i], array[left], array[right]]);
            // if currentSum is too small, we need larger value from left side and must decrement right
            } else if (currentSum < targetSum) {
                left++;
                right--;
            // if currentSum is too large, must decrement right to get closer to targetSum
            } else if (currentSum > targetSum) {
                right--;
            }
        }
    }
    return triplets;
}