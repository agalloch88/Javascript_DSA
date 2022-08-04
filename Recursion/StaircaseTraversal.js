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
    // pass off to better-named start function
    return numberOfWaysToTop(height, maxSteps);
}

function numberOfWaysToTop(height, maxSteps) {
    // base case
    // if encountering 0 or 1, return 1 for both
    if (height <= 1) {
        return 1;
    }
    // set up variable to track different combos
    let numberOfWays = 0;
    // recursive case
    // start at 1, where the step is less than maxSteps or the height, whichever is lower, and increment accordingly
    for (let step = 1; step < Math.min(maxSteps, height) + 1; step++) {
        // add to variable
        numberOfWays += numberOfWaysToTop(height - step, maxSteps);
    }
    // return number of ways found
    return numberOfWays;
}

// Solution 2:

// recursive solution using memoize to reduce computations for base cases of 0 and 1, plus adding additional values as recursion progresses.
// takes advantage of mathematical calculation to implicitly know how many possibilities there are

// O(n * k) time due to traversing n steps with k max steps
// O(n) space due to at most n calls on call stack due to recursion

function staicaseTraversal(height, maxSteps) {
    // pass off to better-named start function, initialize memoize values to base cases of 0 and 1 to start
    return numberOfWaysToTop(height, maxSteps, {0: 1, 1: 1});
}

function numberOfWaysToTop(height, maxSteps, memoize) {
    // base case
    // if encountering 0 or 1, return 1 for both using memoized values
    if (height in memoize) {
        return memoize[height];
    }
    // set up variable to track different combos
    let numberOfWays = 0;
    // recursive case
    // start at 1, where the step is less than maxSteps or the height, whichever is lower, and increment accordingly
    for (let step = 1; step < Math.min(maxSteps, height) + 1; step++) {
        // add to variable
        numberOfWays += numberOfWaysToTop(height - step, maxSteps, memoize);
    }
    // update memoize with current value
    memoize[height] = numberOfWays
    // return number of ways found
    return numberOfWays;
}

// Solution 3:

// iterative solution keeping track of height, and calculating possibilities based on previous results

// O(n * k) time due to traversing n steps with k max steps
// O(n) space due to storing n waysToTop in new holder array

function staircaseTraversal(height, maxSteps) {
    // set up holder array for tracking # of ways to get to top, initially filled with zero
    let waysToTop = new Array(height + 1).fill(0);
    // take care of base cases, initialize them to 1
    waysToTop[0] = 1;
    waysToTop[1] = 1;
    // starting at height 2, loop through options, populate # of possible waysToTop, and increment accordingly
    for (let currentHeight = 2; currentHeight < height + 1; currentHeight++) {
        let step = 1;
        // given potential step amounts between 1 and maxSteps, populate potential values
        while (step <= maxSteps && step <= currentHeight) {
            // for the currentHeight, calculate the possiblities for current step size, then increment step
            waysToTop[currentHeight] = waysToTop[currentHeight] + waysToTop[currentHeight - step];
            step++;
        }
    }
    // once done with calculating currentHeight, return value for height provided
    return waysToTop[height];
}