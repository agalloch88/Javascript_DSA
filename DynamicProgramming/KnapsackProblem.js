// The problem presents an array of arrays, where each subarray holds two integer values
// which represent an item. The first integer is the item's value, and the second integer is the
// item's weight. Also provided is an integer representing the maximum capacity of a knapsack
// which can hold items.

// The goal is to fit items into the knapsack without havinf the sum of the item's weights execeed
// the knapsack's capacity, all while maximizing the combined value of items stored in the
// knapsack. Note that only one of each item is available.

// Write a function which returns the maximized combined value of the items which should
// be stored in the knapsack, as well as an array of the indices of each selected item.

// If there are multiple combinations of items which maximize the total value inside the 
// knapsack, the function may return any of those combinations.

// Sample Input:

// items = [[1, 2], [4, 3], [5, 6], [6, 7]]
// capacity = 10

// Sample Output:

// [10, [1, 3]], which are items [4, 3] and [6, 7]

// Solution 1:

// iterative solution building 2D array of possible weight combos and building sequence of knapsack contents

// O(nc) time due to iterating over n items with up to c capacity
// O(nc) space due to building 2D array of n items by c capacity

// main function which takes in the items and capacity inputs
function knapsackProblem(items, capacity) {
    // initialize variable knapsackValues to an empty array
    // this is what will hold the 2D array of calculated max value possibilities
    let knapsackValues = [];
    // iterate over items inputs, adding 1 row for empty values, and build the 2D array
    for (let i = 0; i < items.length + 1; i++) {
        // initialize variable row to a new array of capacity plus 1 length (accounting for empty) and fill with 0's to start
        let row = new Array(capacity + 1).fill(0);
        // push this row into knapsack values
        knapsackValues.push(row);
    }
    // starting at row 2/index 1, so skipping the empty row, iterate over the items input again
    for (let i = 1; i < items.length + 1; i++) {
        // initialize variable currentWeight and set equal to the value in items directly above current i position and at index 1, which is the weight per item
        let currentWeight = items[i - 1][1];
        // initialize variable currentValue and set equal to the value in items directly above current i position, and at index 0, which is the value per item
        let currentValue = items[i - 1][0];
        // iterate over the capacity inputs again
        for (let c = 0; c < capacity + 1; c++) {
            // check whether value for currentWeight is greater than current position of c, and if so, execute below
            if (currentWeight > c) {
                // set value at coordinates [i, c] in knapsackValues equal to the value directly above current i position
                // this means the current weight is too heavy/large to fit within the knapsack capacity, so simply take the previous value and move on as this is not a valid combo
                knapsackValues[i][c] = knapsackValues[i - 1][c];
            // otherwise, if currentWeight value is NOT greater than current position of c, execute below
            // entering this block means there is knapsack capacity for this item potentially
            } else {
                // set value at coordinates [i, c] in knapsackValues equal to the maximum between value directly above current position,
                // OR the value directly above current position subrtracting the currentWeight (so, moving backward left to a previous value less currentWeight)
                // and adding the currentValue to the knapsackValues
                knapsackValues[i][c] = Math.max(
                    knapsackValues[i - 1][c],
                    knapsackValues[i - 1][c - currentWeight] + currentValue,
                );
            }
        }
    }
    // return the value in knapsackValues at the bottom right corner (which should contain the largest possible value/weightr combo)
    // and a call to helper to retrieve the actual stored items
    return [knapsackValues[items.length][capacity], getKnapsackItems(knapsackValues, items)];
}

// helper function which will build a sequence of the included items working backward within the 2D matrix, taking in the knapsackValues built 2D array and the items list
function getKnapsackItems(knapsackValues, items) {
    // initialize variable sequence, and set equal to an empty array
    let sequence = [];
    // initialize variable i and set equal to the last value in the last row of knapsackValues
    let i = knapsackValues.length - 1;
    // initialize variable c and set equal to the last item in the first row of knapsackValues
    let c = knapsackValues[0].length - 1;
    // while still in bounds, keep checking
    while (i > 0) {
        // if the value at coordinates [i, c] is the same as in the row above, decrement i by 1 and move up one row
        if (knapsackValues[i][c] === knapsackValues[i - 1][c]) {
            i -= 1;
        // otherwise, if the value at coordinates [i, c] is NOT the same as the value above, execute the below
        } else {
            // unshift the value above current position into the sequence, which will return these included items in order
            sequence.unshift(i - 1);
            // decrement c by value 
            c -= items[i - 1][1];
            // decrement i by 1
            i -= 1;
        }
        // if c is ever equal to 0, break the while loop
        if (c === 0) {
            break;
        }
    }
    // return the sequence
    return sequence;
}