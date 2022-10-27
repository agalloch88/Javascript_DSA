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
    let maxes = new Array(heights.length).fill(0);
    let leftMax = 0;

    for (let i = 0; i < heights.length; i++) {
        let height = heights[i];
        maxes[i] = leftMax;
        leftMax = Math.max(leftMax, height);
    }
    let rightMax = 0;

    for (let i = heights.length - 1; i >= 0; i--) {
        let height = heights[i];
        let minHeight = Math.min(rightMax, maxes[i]);

        if (height < minHeight) {
            maxes[i] = minHeight - height;
        } else {
            maxes[i] = 0;
        }
        rightMax = Math.max(rightMax, height);
    }
    return maxes.reduce((a, b) => a + b, 0);
}