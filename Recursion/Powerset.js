// Write a function which takes in an array of unique integers and returns its powerset.

// The powerset P(X) of a set X is the set of all subsets of X. For example, the powerset of [1, 2] is [[], [1], [2], [1, 2]].

// Note that the sets in a powerset do not need to be in a particular order.

// Sample Input:
// array = [1, 2, 3]

// Sample Output:
// [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]

// Solution 1:

// iterative solution which is pretty simple

// O(n * 2^n) due to iterating over n items and mathematical 2^n possibilities for subsets of n
// O(n * 2^n) space due to storing all 2^n subsets inside new array

function powerset(array) {
    let subsets = [[]];
    
    for (let element of array) {
        let length = subsets.length;

        for (let i = 0; i < length; i++) {
            let currentSubset = subsets[i];
            subsets.push(currentSubset.concat(element));
        }
    }

    return subsets;
}