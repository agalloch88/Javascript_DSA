// Write a function which takes in a non-empty array of distinct integers, and an integer which represents a target sum. The function should find all quadruplets in the array
// which add up to the target sum, and should then return a two-dimensional array of all the found quadruplets in no particular order.

// If no four numbers in the input array sum up to the target sum, the function should return an empty array.

// Sample Input:
// array = [7, 6, 4, -1, 1, 2]
// targetSum = 16

// Sample Output:
//[[7, 6, 4, -1], [7, 6, 1, 2]]

// Solution 1:

function fourNumberSum(array, targetSum) {
    let allPairSums = {};
    let quadruplets = [];

    for (let i = 1; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            let currentSum = array[j] + array[i];
            let difference = targetSum - currentSum;

            if (difference in allPairSums) {
                for (let pair of allPairSums[difference]) {
                    quadruplets.push(pair.concat([array[i], array[j]]));
                }
            }
        }

        for (let k = 0; k < i; k++) {
            let currentSum = array[i] + array[k];

            if (!(currentSum in allPairSums)) {
                allPairSums[currentSum] = [[array[k], array[i]]];
            } else {
                allPairSums[currentSum].push([array[k], array[i]]);
            }
        }
    }

    return quadruplets;
}