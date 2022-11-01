// Write a function which takes in an array of integers and returns the largest possible value for the expression array[a] - array[b] + array[c] - array[d],
// where a, b, c, and d are indices of the array, and a < b < c < d, meaning they must occur in order when traversing from left to right and may not
// be the same indexes.

// If the input array contains fewer than 4 elements, the function should return 0.

// Sample Input:
// array = [3, 6, 1, -3, 2, 7]

// Sample Output:
// 4
// choose the following indexes: a = 1, b = 3, c = 4, d = 5
// 6 - (-3) + 2 - 7 = 4

// Solution 1:

// iterative solution which checks all possible values based on previous item (a, b, or c) and evaluates expression update max variable

// O(n^4) time due to 4 nested for loops
// O(1) space due to only storing a few variables

function maximizeExpression(array) {
    // check for edge case of input less than the required 4 indexes, so return 0 if so
    if (array.length < 4) {
        return 0;
    }
    // set maximumValueFound variable to -Infinity, so any max value should update the variable on first check
    let maximumValueFound = -Infinity;
    // start iterating over the input looking at index a, which can start as early as first item in input
    for (let a = 0; a < array.length; a++) {
        // grab index a in input and store in variable aValue
        let aValue = array[a];
        // iterate over input to look for index b value, which can start right next to index a in input
        for (let b = a + 1; b < array.length; b++) {
            // grab index b in input and store in variable bValue
            let bValue = array[b];
            // iterate over input to look for index c value, which can start right next to index b in input
            for (let c = b + 1; c < array.length; c++) {
                // grab index c in input and store in variable cValue
                let cValue = array[c];
                // iterate over input to look for index d value, which can start right next to index c in input
                for (let d = c + 1; d < array.length; d++) {
                    // grab index d in input and store in variable dValue
                    let dValue = array[d];
                    // run helper function to evaluate the expression and store return value in expressionValue variable
                    let expressionValue = evaluateExpression(aValue, bValue, cValue, dValue);
                    // set maximumValueFound variable to the max between itself and the current expression value
                    maximumValueFound = Math.max(expressionValue, maximumValueFound);
                }
            }
        }
    }
    // once done iteratig over inputs, return the maximumValueFound variable which should hold the max value from the expression
    return maximumValueFound;
}
// helper function to calculate the result of the expression
// takes in the a/b/c/d values from main function above and returns result for comparison
function evaluateExpression(a, b, c, d) {
    return a - b + c - d;
}