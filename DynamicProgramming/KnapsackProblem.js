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

function knapsackProblem(items, capacity) {
    let knapsackValues = [];

    for (let i = 0; i < items.length + 1; i++) {
        let row = new Array(capacity + 1).fill(0);
        knapsackValues.push(row);
    }

    for (let i = 1; i < items.length + 1; i++) {
        let currentWeight = items[i - 1][1];
        let currentValue = items[i - 1][0];

        for (let c = 0; c < capacity + 1; c++) {
            if (currentWeight > c) {
                knapsackValues[i][c] = knapsackValues[i - 1][c];
            } else {
                knapsackValues[i][c] = Math.max(
                    knapsackValues[i - 1][c],
                    knapsackValues[i - 1][c - currentWeight] + currentValue,
                );
            }
        }
    }
    return [knapsackValues[items.length][capacity], getKnapsackItems(knapsackValues, items)];
}

function getKnapsackItems(knapsackValues, items) {
    let sequence = [];
    let i = knapsackValues.length - 1;
    let c = knapsackValues[0].length - 1;

    while (i > 0) {
        if (knapsackValues[i][c] === knapsackValues[i - 1][c]) {
            i -= 1;
        } else {
            sequence.unshift(i - 1);
            c -= items[i - 1][1];
            i -= 1;
        }

        if (c === 0) {
            break;
        }
    }
    return sequence;
}