// The problem provides two positive integers, representing the height of a staircase, and the maximum number of steps someone may advance up the staircase at a time, respectively.
// Write a function which returns the number of ways in which someone may climb the staircase.

// For example, given a staircase of height = 3, and maxSteps = 2, someone could climb the staircase in 3 ways. They could take 1 step -> 1 step -> 1 step,
// or 1 step -> 2 steps, or 2 steps -> 1 step.

// Note that, for this problem, maxSteps <= height will always be true.

// Sample Input:
// height = 4
// maxSteps = 2

// Sample Output:
// 5
// The staircase could be climbed in the following ways:
// 1 -> 1 -> 1 -> 1
// 1 -> 1 -> 2
// 1 -> 2 -> 1
// 2 -> 1 -> 1
// 2 -> 2

// Solution 1:

// recursive solution handling base cases of 0 and 1, but requires recursive calls for those cases each time, relatively inefficient

// O(k^n) time due to k number of allowed steps per n height of staircase
// O(n) space due to storing at most n calls on call stack at a time

function staicaseTraversal(height, maxSteps) {
    return numberOfWaysToTop(height, maxSteps);
}

function numberOfWaysToTop(height, maxSteps) {
    if (height <= 1) {
        return 1;
    }

    let numberOfWays = 0;
    for (let step = 1; step < Math.min(maxSteps, height) + 1; step++) {
        numberOfWays += numberOfWaysToTop(height - step, maxSteps);
    }

    return numberOfWays;
}