// Write a function which takes in a sorted array of distinct, ascending integers, and which
// returns the first index in the array which is equal to the value at that index. In other words,
// the function should return the minimum index where index === array[index].

// If there is no such index, the function should return -1.

// Sample Input:
// array = [-5, -3, 0, 3, 4, 5, 9]

// Sample Output:
// 3
// 3 === array[3]

// Solution 1:

// iterative solution checking every index to see if it equals the value

// O(n) time due to iterating over n inputs in array
// O(1) space due to onkly storing two variables

function indexEqualsValue(array) {
    // iterate over every idx in input array
    for (let idx = 0; idx < array.length; idx++) {
        // grab the current value of idx in array and store in variable value
        let value = array[idx];
        // if the idx equals the variable value, found the answer, so return -1
        if (idx === value) {
            return idx;
        }
    }
    // if for loop ends with no return, no correct answer so return -1
    return -1;
}

// Solution 2:

// recursive solution using helper function to check for middleIndex and middleValue equality

// O(log(n)) time due to Binary Search-style approach to checking, eliminating half of remaining possibilities at each check
// O(log(n)) space due to recursive calls on the call stack

// main function which takes in array of distinct integers
function indexEqualsValue(array) {
    // return a call to the helper function, passing in the input array, a value for leftIndex, and a value for rightIndex
    return indexEqualsValueHelper(array, 0, array.length - 1)
}

// helper function which takes in the input array, and values for leftIndex and rightIndex
function indexEqualsValueHelper(array, leftIndex, rightIndex) {
    // base case
    // when leftIndex is greater than rightIndex, all possible options were checked with no correct solution, so return -1
    if (leftIndex > rightIndex) {
        return -1;
    }
    // add current value of leftIndex to the floored middle index of the inputs, and store in variable middleIndex
    let middleIndex = leftIndex + Math.floor((leftIndex + rightIndex) / 2);
    // grab the value at the middleIndex in the input array and store in variable middleValue
    let middleValue = array[middleIndex];
    // start checking here, first looking to see if the middleValue is smaller than the middleIndex
    if (middleValue < middleIndex) {
        // if yes, return a recursive call of the helper, updating the leftIndex to the one index to the right of current middleIndex
        return indexEqualsValueHelper(array, middleIndex + 1, rightIndex);
    // if the condition above is false, check whether middleValue is equal to the middleIndex AND middleIndex is 0
    } else if (middleValue === middleIndex && middleIndex === 0) {
        // if both conditions above are true, then return the middleIndex
        return middleIndex;
    // if the two coniditions above are false, check whether middleValue equals middleIndex AND the
    // element directly left of middleIndex in the input array is smaller than the value of middleIndex
    // minus 1
    } else if (middleValue === middleIndex && array[middleIndex - 1] < middleIndex - 1) {
        // if both conditions above are true, then return the middleIndex
        return middleIndex;
    // if none of the three above checks are true, then execute the final else block below
    } else {
        // need to look left, so return a recursive call of the helper, updating the rightIndex to be one index to the left of current middleIndex
        return indexEqualsValueHelper(array, leftIndex, middleIndex - 1);
    }
}