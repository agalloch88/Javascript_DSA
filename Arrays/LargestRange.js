// Write a function which takes in an array of integers, and returns an array of length 2 which represemts the largest range of integers contained in that array. 
// The range, for example [0, 5], should represent the continuity of integers found in the input array. For the example [0, 5], this means the digits 0, 1, 2, 3, 4, and 5
// are all contained somewhere within the input array.

// The first number in the output array should be the first number in the range, and the second number should be the final number in the range.

// A range of numbers is defined as a set of numbners which come right after each other in the set of real integers. For instance, the output array [2, 6] represents
// the range {2, 3, 4, 5, 6}, which is a range of length 5. Note that numbers need not be sorted or adjacent in the input array to constitute or form a range of numbers.

// For the context of the problem, assume that there will only be one largest range within the input array. There may be several different ranges, but only one which is largest.

// Sample Input:
// array = [1, 11, 2, 0, 15, 5, 2, 4, 10, 7, 12, 6]

// Sample Output:
// [0, 7]

// Solution 1:

// iterative solution using JS object to store all nums and mark as false once counted in a range

// O(n) time due to a couple for & while loops
// O(n) space due to storing all inputs in JS object

function largestRange(array) {
    // set up holder array for final range to return
    let bestRange = [];
    // initialize longestLength variable to track the longest range encountered and update accordingly
    let longestLength = 0;
    // set up holder JS object for all values in input
    let nums = {};
    // iterate over every item in the input array to record into JS object
    for (let num of array) {
        // initialize the value of every num in input to true, as none are part of a range yet
        nums[num] = true;
    }
    // iterate over every item in input array again
    for (let num of array) {
        // if any items are false, meaning they are part of a range and have already been counted, do nothing and continue
        if (!nums[num]) {
            continue;
        }
        // set current num on to false, meaning it is counted as part of a range consisiting of itself, for now
        nums[num] = false;
        // set the currentLength to 1, consisting of the current num on
        let currentLength = 1;
        // grab the values to the left and right of current num in the input, and store them in variables
        let left = num - 1;
        let right = num + 1;
        // set up while loop to check items to the left of current num in potential range (so if num = 5, check for 4), so long as it's in the range of possible values and not out of bounds
        while (left in nums) {
            // if it's there, set value to false
            nums[left] = false;
            // found one more digit in a range, so increment the currentLength of the range by 1
            currentLength++;
            // decrement the value of left by 1 and do these checks again
            left--;
        }
        // set up while looop to check items to the right of current num in potential range (so if num = 5, check for 6), so long as it's in the range of possible values and not out of bounds
        while (right in nums) {
            // if it's there, set value to false
            nums[right] = false;
            // found one more digit in a range, so increment the currentLength of the range by 1
            currentLength++;
            // increment the value of right by 1 and do these checks again
            right++;
        }
        // once both while loops above break, check if currentLength is greater than longestLength encountered thus far, and if it is, do stuff
        if (currentLength > longestLength) {
            // set longest length equal to this fvalue of currentLength
            longestLength = currentLength;
            // update bestRange to be last fully-cycled left and right values, as while loops would have broken on values which would be incorrect
            bestRange = [left + 1, right - 1];
        }
    }
    // once all input values are checked for being parts of ranges, return the bestRange found
    return bestRange;
}