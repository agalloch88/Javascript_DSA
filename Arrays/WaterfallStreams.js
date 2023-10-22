// The problem presents a two-dimensional array which represents the structure of an indoor waterfall, and a positive integer which represents the column from where
// the waterfall's water source originates. More specifically, the water source starts directly above the structure, and flows downwards.

// Each row in the array contains 0's and 1's, where a 0 represents a free space, and a 1 represents a block which water cannot pass through. Image the law row of the array
// contains buckets which the water eventually flows into; thus, the last row of the array always contains only 0's. Also imagine walls exist on both sides of the structure,
// meaning the water never leaves the structure. The water either remains trapped against a wall, or flows into one of the buckets in the last row.

// As water flows downwards, if it encounters a block, it splits evenly to the left and right-hand sides of said block. In other words, 50% of the water flows left, and
// 50% of the water flows right. If a water stream is unable to flow to the left or the right, because of either a block or a wall, the water stream in question becomes
// trapped and can no longer continue to flow in the current direction. The water is effectively stuck in the structure, and can no longer flow downwards, meaning
// 50% of the previous water stream is forever lost.

// Lastly, the input array will always contain at least two rows and one column, and the space directly below the water source (which exists in the first row of the array)
// will always be empty, which allows the water to begin the downward flow.

// Write a function which returns the percentage of water inside each of the bottom buckets after the water completes its flow through the entire structure.

// Sample Input:
// array =  [
//  [0, 0, 0, 0, 0, 0, 0],
//  [1, 0, 0, 0, 0, 0, 0],
//  [0, 0, 1, 1, 1, 0, 0],
//  [0, 0, 0, 0, 0, 0, 0],
//  [1, 1, 1, 0, 0, 1, 0],
//  [0, 0, 0, 0, 0, 0, 1],
//  [0, 0, 0, 0, 0, 0, 0],
// ]
// source = 3

// Samplt Output:
// [0, 0, 0, 25, 25, 0, 0]
// The water flows as follows:
// [
//  [0, 0, 0, ., 0, 0, 0],
//  [1, ., ., ., ., ., 0],
//  [0, ., 1, 1, 1, ., 0],
//  [., ., ., ., ., ., .],
//  [1, 1, 1, ., ., 1, .],
//  [0, 0, 0, ., ., 0, 1],
//  [0, 0, 0, ., ., 0, 0],
// ]

// Solution 1:

// iterative solution tracking two rows at a time, currentRow and rowAbove, and checking for 0/1 values to determine free space or blocks, splitting the water until reaching end

// O(w^2 * h) time, where w and h are the width and height of the input array
// O(w) space due to storing the currentRow and rowAbove copies, as 2w converges to w

function waterfallStreams(array, source) {
  // spread out value of array at index 0 and store in variable rowAbove
  let rowAbove = [...array[0]];
  // set value of the source, aka the water's origin, to -1 in rowAbove
  // since have 0 and 1 values, will use this -1 to uniquely track position of water
  rowAbove[source] = -1;
  // since found origin in first row, start at second row and start iterating through the rows
  for (let row = 1; row < array.length; row++) {
    // spread out value of array at the current row, and store in variable current row
    let currentRow = [...array[row]];
    // starting at the far left, iterate through the rowAbove
    for (let idx = 0; idx < rowAbove.length; idx++) {
      // grab value in rowAbove at the idx, store in value above
      // this is used to check for whether water is directly above current position
      let valueAbove = rowAbove[idx];
      // if valueAbove is less than 0, meaning it is -1, there is water above, so store this in variable hasWaterAbove
      let hasWaterAbove = valueAbove < 0;
      // most concerned with where the blocks are, so if position idx in currentRow is equal to 1, it would be a block, so store in variable hasBlock
      let hasBlock = currentRow[idx] === 1;
      // if there's no water above, don't really care what's there, so continue
      if (!hasWaterAbove) {
        continue;
      }
      // if not on a block currently, it is free space, so increment currentRow at position idx by the value at valueAbove, which effectively moves the water down, and continue
      if (!hasBlock) {
        currentRow[idx] += valueAbove;
        continue;
      }
      // handle the splitting of water when it does encounter a block, so halve the value at valueAbove and store in variable splitWater
      let splitWater = valueAbove / 2;
      // handle flow of water to the right
      let rightIdx = idx;
      // while water can still move right and be in bounds, keep going
      while (rightIdx + 1 < rowAbove.length) {
        // increment the rightIdx by 1
        rightIdx++;
        // if there is a block in the way, break out
        if (rowAbove[rightIdx] === 1) {
          break;
        }
        // if there is no block below, move the water down by incrementing currentRow at rightIdx by the current amount of water in splitWater, then break
        if (rowAbove[rightIdx] !== 1) {
          currentRow[rightIdx] += splitWater;
          break;
        }
      }
      // handle flow of water to the left
      let leftIdx = idx;
      // while water can still move to the left and be in bounds, keep going
      while (leftIdx - 1 >= 0) {
        // decrement leftIdx by 1
        leftIdx--;
        // if there is a block in the way, break out
        if (rowAbove[leftIdx] === 1) {
          break;
        }
        // if there is no block below, move the water down by incrementing currentRow at leftIdx by the current amount of water in splitWater, then break
        if (rowAbove[leftIdx] !== 1) {
          currentRow[leftIdx] += splitWater;
          break;
        }
      }
    }
    // look at the next row
    rowAbove = currentRow;
  }
  // calculate the final percentages by looking at the row above and mapping over, checking for whether the value is less than 0 since any water is still negative, multiplying by -100 to find whole number percentage
  let finalPercentages = rowAbove.map((num) => (num < 0 ? num * -100 : num));
  // return the final percentages to show any captured water at the bottom
  return finalPercentages;
}
