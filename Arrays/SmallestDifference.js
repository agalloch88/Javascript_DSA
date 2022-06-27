// Write a function which takes in two non-empty arrays of integers, finds the pair of numbers (one from each input array) whose absolute difference is closest to
// zero, and returns an array containing these two numbers, with the number from the first array in the first position.

// Note that the absolute difference of two integers is the sitance between them on the real number line. For example, the absolute difference of
// -5 and 5 is 10, and the absolute difference of -5 and -4 is 1.

// For this queston, there will only be one pair of numbers with the smallest difference.

// Sample Input:
// arrayOne = [-1, 5, 10, 20, 28, 3]
// arrayTwo = [26, 134, 135, 15, 17]

// Sample Output:
// [28, 26]

// Solution 1:

// O(nlog(n) + mlog(m)) time due to looping over n values in arrayOne and m values in arrayTwo
// O(1) space due to only storing 6 variables and a two-value array, regardless of n or m input array values

function smallestDifference(arrayOne, arrayTwo) {
    // since arrays are random, need to sort to iterate efficiently
    arrayOne.sort((a, b) => a - b);
    arrayTwo.sort((a, b) => a - b);
    // initialize two pointers, one at start of each array
    let idxOne = 0;
    let idxTwo = 0;
    // set values of smallest difference and current difference to Infinity; whatever difference actually is, it will be smaller than that
    let smallest = Infinity;
    let current = Infinity;
    // initialize empty array to return for smallestPair
    let smallestPair = [];
    // loop over the values until we hit the end of one of the arrays; once finished with one array, no point exploring any remaining values in other
    while (idxOne < arrayOne.length && idxTwo < arrayTwo.length) {
        // grab where pointers are in each array
        let firstNum = arrayOne[idxOne];
        let secondNum = arrayTwo[idxTwo];
        // if arrayOne value is smaller, we need to increment that pointer
        if (firstNum < secondNum) {
            // set current difference value and move arrayOne pointer up one value
            current = secondNum - firstNum;
            idxOne++;
            // if arrayTwo value is smaller, need to increment that value
        } else if (secondNum < firstNum) {
            // set current difference value and move arrayTwo pointer up one value
            current = firstNum - secondNum;
            idxTwo++;
            // if the values are equal, we have found are smallest difference, as 0 is the smallest possible value
        } else {
            return [firstNum, secondNum];
        }
        // set the smallest difference equal to the current difference at first pass, then check whether that is still our smallest difference, update smallestPair accordingly
        if (smallest > current) {
            smallest = current;
            smallestPair = [firstNum, secondNum];
        }
    }

    return smallestPair;
}