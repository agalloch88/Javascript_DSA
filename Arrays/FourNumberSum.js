// Write a function which takes in a non-empty array of distinct integers, and an integer which represents a target sum. The function should find all quadruplets in the array
// which add up to the target sum, and should then return a two-dimensional array of all the found quadruplets in no particular order.

// If no four numbers in the input array sum up to the target sum, the function should return an empty array.

// Sample Input:
// array = [7, 6, 4, -1, 1, 2]
// targetSum = 16

// Sample Output:
//[[7, 6, 4, -1], [7, 6, 1, 2]]

// Solution 1:

// iterative solution looking at pairs to reduce complexity to TwoNumberSum-style problem

// O(n^2) time on average due to nested for loops, O(n^3) in worst case
// O(n^2) space on average due to storing potentially n^2 pairs and quadruplets, O(n^2) in worst case

function fourNumberSum(array, targetSum) {
    // set up JS object to keep track of all pairs which add up to this specific sum
    let allPairSums = {};
    // set up array to hold found quadruplets, which will return at the end, or be empty if none are found
    let quadruplets = [];
    // main for loop iterating over the input array
    for (let i = 1; i < array.length - 1; i++) {
        // two inner for loops which will allow adding of pairs to JS object or array
        for (let j = i + 1; j < array.length; j++) {
            // set variable for current sum equal to position of i and j in input array
            let currentSum = array[j] + array[i];
            // find the difference, or what other pair of numbers will add up to targetSum
            let difference = targetSum - currentSum;
            // check for difference in the JS object to see if encountered yet
            if (difference in allPairSums) {
                // for every pair of values at that key of difference, concatenate the specific pair and add into the quadruplets holder array
                for (let pair of allPairSums[difference]) {
                    quadruplets.push(pair.concat([array[i], array[j]]));
                }
            }
        }
        // to ensure no duplicates are added, use second for loop to trail behind position of i to add pairs into allPairSums JS object
        for (let k = 0; k < i; k++) {
            let currentSum = array[i] + array[k];
            // if the currentSum result is not in allPairSums, need to add it
            if (!(currentSum in allPairSums)) {
                // inserts key/value in allPairSums for the currentValue and k/i values from array
                allPairSums[currentSum] = [[array[k], array[i]]];
            // if currentSum already in allPairSums, push k/i values from array into the values for currentSum key
            } else {
                allPairSums[currentSum].push([array[k], array[i]]);
            }
        }
    }
    // return whatever was found via quadruplets, which will be empty if no results found
    return quadruplets;
}