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
//[
//  [0, 0, 0, ., 0, 0, 0],
//  [1, ., ., ., ., ., 0],
//  [0, ., 1, 1, 1, ., 0],
//  [., ., ., ., ., ., .],
//  [1, 1, 1, ., ., 1, .],
//  [0, 0, 0, ., ., 0, 1],
//  [0, 0, 0, ., ., 0, 0],   
// ]

// Solution 1:

function waterfallStreams(array, source) {
    let rowAbove = [...array[0]];
    rowAbove[source] = -1;

    for (let row = 1; row < array.length; row++) {
        let currentRow = [...array[row]];

        for (let idx = 0; idx < rowAbove.length; idx++) {
            let valueAbove = rowAbove[idx];

            let hasWaterAbove = valueAbove < 0;
            let hasBlock = currentRow[idx] === 1;

            if (!hasWaterAbove) {
                continue;
            }

            if (!hasBlock) {
                currentRow[idx] += valueAbove;
                continue;
            }

            let splitWater = valueAbove / 2;

            let rightIdx = idx;
            while (rightIdx + 1 < rowAbove.length) {
                rightIdx++;

                if (rowAbove[rightIdx] === 1) {
                    break;
                }

                if (rowAbove[rightIdx] !== 1) {
                    currentRow[rightIdx] += splitWater;
                    break;
                }
            }

            let leftIdx = idx;
            while (leftIdx - 1 >= 0) {
                leftIdx--;

                if (rowAbove[leftIdx] === 1) {
                    break;
                }

                if (rowAbove[leftIdx] !== 1) {
                    currentRow[leftIdx] += splitWater;
                    break;
                }
            }
        }
        rowAbove = currentRow;
    }
    let finalPercentages = rowAbove.map(num => (num < 0 ? num * -100 : num));
    return finalPercentages;
}