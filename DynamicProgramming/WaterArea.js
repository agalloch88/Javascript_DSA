// The problem presents an array of non-negative integers, where each non-zero integer represents the height of a pillar with a width of 1. In the problem, imagine water
// pours over all of the pillars. Write a function which returns the surface area of the water trapped between the pillars viewed from the front. Note that
// spilled water should be ignored.

// Sample Input:
// heights = [0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3]

// Sample Output:
// 48
// visual representation including 48 dots:
//        |
//        |
//  |.....|
//  |.....|
//  |.....|
//  |..|..|
//  |..|..|
//  |..|..|.....|
//  |..|..|.....|
// _|..|..|..||.|

// Solution 1:

function waterArea(heights) {
    // set up new array the length of input and fill with 0's, store in variable maxes to keep track of the maximum heights in either direction
    let maxes = new Array(heights.length).fill(0);
    // set up variable leftMax to store the largest value on the left
    let leftMax = 0;
    // start iterating over the input from left to right to update the leftMax
    for (let i = 0; i < heights.length; i++) {
        // grab position i in heights input and store in variable height
        let height = heights[i];
        // set position i in the maxes array equal to current value of leftMax, which on first pass will be 0
        maxes[i] = leftMax;
        // set the leftMax variable equal to the maximum value between the current value for leftMax or the height
        leftMax = Math.max(leftMax, height);
    }
    // set up variable rightMax to store the largest value on the right
    let rightMax = 0;
    // start iterating over the input from right to left to update the rightMax
    for (let i = heights.length - 1; i >= 0; i--) {
        // grab position i in heights and store in variable height
        let height = heights[i];
        // find the minimum height between the rightMax and position i in maxes array, store this value in variable minHeight
        let minHeight = Math.min(rightMax, maxes[i]);
        // if the current height is less than the min height, execute block below
        if (height < minHeight) {
            // set maxes at position i equal to the minHeight minus the current height
            maxes[i] = minHeight - height;
        // if height is equal to or greater than the minHeight value, execute block below
        } else {
            // set maxes at position i equal to 0
            maxes[i] = 0;
        }
        // set rightMax equal to the maximum value between rightMax and the height
        rightMax = Math.max(rightMax, height);
    }
    // return the reduced maxes array
    return maxes.reduce((a, b) => a + b, 0);
}