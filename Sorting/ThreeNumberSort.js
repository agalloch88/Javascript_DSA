// You're given an array of integers, and another array of three distinct integers. The
// first array is guaranteed to contain only integers found in the second array, and the
// second array represents a desired order for integers in the first array.

// For example, the second array of [x, y, z] represents a desired order of
// [x, x, ..., x, y, y, ..., y, z, z, ..., z] in the first array.

// Write a function which sorts the first array according to the desired order in the second
// array. The function should perform this in place (so, should not mututate the input array)
// and it shouldn't use any auxiliary space (so, solution should run in O(1) space).

// Note that the desired order won't necessarily be ascending or descending, and that the first
// array won't necessarily contain all three integers found in the second array. It may
// only contain one or two of the given integers.

// Sample input:
// array = [1, 0, 0, -1, -1, 0, 1, 1]
// order = [0, 1, -1]

// Sample output:
// [0, 0, 0, 1, 1, 1, -1, -1]

// Solution 1:
// this solution takes a bucket approach, essentially counting how many values are present in the array for
// each value in the order.

function threeNumberSort(array, order) {
    const valueCounts = [0, 0, 0];

    for (const element of array) {
        const orderIdx = order.indexOf(element);
        valueCounts[orderIdx]++;
    }

    for (let idx = 0; idx < 3; idx++) {
        const value = order[idx];
        const count = valueCounts[idx];

        const numElementsBefore = valueCounts.slice(0, idx).reduce((a, b) => a + b, 0);
        for (let n = 0; n < count; n++) {
            const currentIdx = numElementsBefore + n;
            array[currentIdx] = value;
        }
    }
    return array;
}