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

// iterative solution keeping track of max to left and right and using new array to track the maxes

// O(n) time due to iterating for left and right max plus reduce, 3n converges to n
// O(n) space due to using extra maxes array to store max values

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

// Solution 2:

// iterative solution using constant space by employing pointers to track maxes and current indexes, plus surface area

// O(n) time due to making one pass over all inputs, starting from start and end of input and working inward
// O(1) space due to only storing 5 variables rather than array of n inputs from heights

function waterArea(heights) {
  // handle edge case of empty input, in which case should return 0
  if (heights.length === 0) {
    return 0;
  }
  // initialize variables to track the extreme left/right pointers via index, the left/right maxes encountered, and the running surfaceArea total
  let leftIdx = 0;
  let rightIdx = heights.length - 1;
  let leftMax = heights[leftIdx];
  let rightMax = heights[rightIdx];
  let surfaceArea = 0;
  // while the pointers do not overlap, keep looping as still more inputs to check
  while (leftIdx < rightIdx) {
    // if the column at leftIdx in heights is shorter than column at rightIdx in heights, execute block below
    if (heights[leftIdx] < heights[rightIdx]) {
      // increment the leftIdx by 1
      leftIdx++;
      // set the leftMax equal to the maximum value between leftMax and value at leftIdx in heights input
      leftMax = Math.max(leftMax, heights[leftIdx]);
      // find the difference between leftMax and value at leftIdx, and add it to running surfaceArea total
      surfaceArea += leftMax - heights[leftIdx];
      // if the column at rightIdx in heights is shorter than the column at leftIdx in heights, execute block below
    } else {
      // decrement the rightIdx by 1
      rightIdx--;
      // set rightMax equal to the maximum value between rightMax and value at rightIdx in heights input
      rightMax = Math.max(rightMax, heights[rightIdx]);
      // find the difference between the rightMax and value at rightIdx, and add it to the running surfaceArea total
      surfaceArea += rightMax - heights[rightIdx];
    }
  }
  // once the pointers overlap, while loop breaks and can return surfaceArea value since looked at all inputs already
  return surfaceArea;
}
