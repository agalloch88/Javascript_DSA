// Write a function which takes in an array of at least three integers and, without sorting
// the input array, returns a sorted array of the three larest integers in the input array.

// The function should return duplicate integers, if necessary; for example, it should return
// [10, 10, 12] for an input array of [10, 5, 9, 10, 12].

// Sample Input:
// array = [141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]

// Sample Output:
// [18, 141, 541]

// Solution 1:

// iterative solution finding three largest by continually comparing current num to existing 
// ones and shifting/updating if necessary

// O(n) time due to iterating over n values in input array
// O(1) space due to only storing a few variables and one three-value array

// main function which takes in input array
function findThreeLargestNumbers(array) {
    // initialize holder array for the threeLargest values and fill with null for now
    let threeLargest = [null, null, null];
    // iterate over every num in input array
    for (let num of array) {
        // for every value, call helper function and pass in current threeLargest and the num
        updateLargest(threeLargest, num);
    }
    // once for loop above finishes, return the final threeLargest which will be sorted
    return threeLargest;
}

// helper function taking in threeLargest and current num and updating values as needed
function updateLargest(threeLargest, num) {
    // check whether the current value at index 2 in threeLargest is null and needs to be filled
    // OR whether the current num is greater than value at index 2 in threeLargest, meaning
    // index 2 needs to be shifted and updated
    if (threeLargest[2] === null || num > threeLargest[2]) {
        // if either condition above is true, call helper shiftAndUpdate and pass in current
        // threeLargest, the current num, and index 2
        shiftAndUpdate(threeLargest, num, 2);
    // if neither condition above is true, check whether index 1 in threeLargest is null
    // OR whether the current num is greater than current value at index 1 in threeLargest, meaning
    // index 1 needs to be shifted and updated
    } else if (threeLargest[1] === null || num > threeLargest[1]) {
        // if either condition above is true, call helper shiftAndUpdate and pass in current
        // threeLargest, the current num, and index 1
        shiftAndUpdate(threeLargest, num, 1);
    // if neither of the two above blocks executes, check whether index 0 in threeLargest is null
    // OR whether the current num is greater than current value at index 0 in threeLargest, meaning
    // index 0 needs to be shifted and updated
    } else if (threeLargest[0] === null || num > threeLargest[0]) {
        // if either condition above is true, call helper shiftAndUpdate and pass in current
        // threeLargest, the current num, and index 0
        shiftAndUpdate(threeLargest, num, 0);
    }
}

// another helper taking in an array, which is threeLargest, a current num, and an index to update
function shiftAndUpdate(array, num, idx) {
    // loop over the indexes in threeLargest
    for (let i = 0; i <= idx; i++) {
        // if i matches the index, excecute below
        if (i === idx) {
            // set the value at i in threelargest equal to the current num passed in
            array[i] = num;
        // if i does NOT match the index, execute below
        } else {
            // set the value at i in threeLargest equal to the value of i + 1
            array[i] = array[i + 1];
        }
    }
}