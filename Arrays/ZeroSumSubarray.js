// The problem presents a list of integers, nums. Write a function which returns a boolean representing whether there exists a zero-sum subarray within nums.

// A zero-sum subarray is any subarray where all of the values add up to zero. A subarray in the context of the problem is any contiguous section of the array. For the
// purposes of the problem, a subarray can be as small as one element, and as long as the entire original array.

// Sample Input:
// nums = [-5, -5, 2, 3, -2]

// Sample Output:
// True
// the subarray [-5, 2, 3] has a sum of 0

// Solution 1:

// iterative solution using JS Set to track all sums and mathematical principle that seeing currentSum more than once means set exists from previously-encountered-index + 1 to current index

// O(n) space due to storing potentially n values from nums in new Set
// O(n) time due to iterating over up to n values from nums looking for zero sum subarray

function zeroSumSubarray(nums) {
    // create new JS set and initialize with 0 in case it is found elsewhere in nums, and store in variable sums
    let sums = new Set([0]);
    // set up variable currentSum to track current subarray total and set to 0
    let currentSum = 0;
    // iterate over every number in nums
    for (let num of nums) {
        // add the current num to the current value of currentSum
        currentSum += num;
        // check whether the current value of currentSum is already in the sums set
        // if current value of currentSum was encountered previously, this means there is mathematical certainty of a zero sum subarray within nums
        if (sums.has(currentSum)) {
            // therefore, since this is established, return true
            return true;
        }
        // add the currentSum value to sums so it's logged in case encountered again
        sums.add(currentSum);
    }
    // if iterate over every number in nums and never return true, there is no zero sum subarray, so return false
    return false;
}