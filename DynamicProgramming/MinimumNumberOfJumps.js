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

function minNumberOfJumps(array) {
    let jumps = new Array(array.length).fill(Infinity);
    jumps[0] = 0;

    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < i; j++) {
            if (array[j] < i - j) {
                jumps[i] = Math.min(jumps[j] + 1, jumps[i]);
            }
        }
    }
    return jumps[jumps.length - 1];
}