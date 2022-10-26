// The problem presents a non-empty array of possitive integers, where each integer represents the maximum number of steps one can may make forward in the array.
// For example,  if the element at index 1 is 3, it i spossible to go from index 2, 3, or 4.

// Write a function which returns the minimum number of jumps needed to reach the final index.

// Note that jumping from index i to index i + x always constitutes one jump, no matter how large x is.

// Sample Input:
// array = [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]

// Sample Output:
// 4
// 3 -> (4 or 2) -> (2 or 3) -> 7 -> 3

// Solution 1:

// iterative solution storing number of jumps to indices in separate array

// O(n^2) time due to nested for loops
// O(n) space due to storing n elements in new jumps array

function minNumberOfJumps(array) {
    // set up new array the same length as input, fill with Infinity since do not know size of jump, store in variable jumps
    let jumps = new Array(array.length).fill(Infinity);
    // does not take any jump to reach first value, so override with 0
    jumps[0] = 0;
    // iterate over input array starting from index 1 until the end
    for (let i = 1; i < array.length; i++) {
        // start at index 0 and use another loop to track distance away from i
        for (let j = 0; j < i; j++) {
            // if the value at index j is less than value of i - j, then set the value in jumps array at position i equal to the lesser of jumps at j + 1 or jumps at i
            if (array[j] < i - j) {
                jumps[i] = Math.min(jumps[j] + 1, jumps[i]);
            }
        }
    }
    // as jumps was tracking the minimum number of jumps to all indexes, return the last value in the jumps array
    return jumps[jumps.length - 1];
}

// Solution 2:

function minNumberOfJumps(array) {
    if (array.length === 1) {
        return 0;
    }

    let jumps = 0;
    let maxReach = array[0];
    let steps = array[0];

    for (let i = 1; i < array.length - 1; i++) {
        maxReach = Math.max(maxReach, i + array[i]);
        steps--;

        if (steps === 0) {
            jumps++;
            steps = maxReach - i;
        }
    }
    return jumps + 1;
}