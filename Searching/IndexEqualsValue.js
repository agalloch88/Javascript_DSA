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

function indexEqualsValue(array) {
    return indexEqualsValueHelper(array, 0, array.length - 1)
}

function indexEqualsValueHelper(array, leftIndex, rightIndex) {
    if (leftIndex > rightIndex) {
        return -1;
    }

    let middleIndex = leftIndex + Math.floor((leftIndex + rightIndex) / 2);
    let middleValue = array[middleIndex];

    if (middleValue < middleIndex) {
        return indexEqualsValueHelper(array, middleIndex + 1, rightIndex);
    } else if (middleValue === middleIndex && middleIndex === 0) {
        return middleIndex;
    } else if (middleValue === middleIndex && array[middleIndex - 1] < middleIndex - 1) {
        return middleIndex;
    } else {
        return indexEqualsValueHelper(array, leftIndex, middleIndex - 1);
    }
}