// The problem presents two sorted arrays of integers, called arrayOne and arrayTwo. Write a function which returns the median of these arrays.

// For the purposes of the problem, assume both arrays have at least one value. However, they could be of different lengths. If the median is a decimal value, it should not be rounded,
// beyond the inevitable rounding of floating point math.

// Sample Input:

// arrayOne = [1, 3, 4, 5]
// arrayTwo = [2, 3, 6, 7]

// Sample Output:

// 3.5, where the combined array is [1, 2, 3, 3, {median here} 4, 5, 6, 7]

// Solution 1:

// iterative solution using two pointers and checking whether they are in different arrays, whether cumulative array length is even or odd, and finding the median index

// O(n + m) time, which is really total sum of length of the two arrays, due to potentially traversing the entire array
// O(1) due to only storing a few variables

function medianOfTwoSortedArrays(arrayOne, arrayTwo) {
    // intialize the two index pointers, starting at 0
    let idxOne = 0;
    let idxTwo = 0;
    // find what the middleIdx should be, rounding down
    let middleIdx = Math.floor((arrayOne.length + arrayTwo.length - 1) / 2);
    // keep looping so long as the index values of the two pointers do not exceed the middleIdx value, meaning the median of the combined array inputs
    while (idxOne + idxTwo < middleIdx) {
        // if the value of idxOne is greater than or equal to the length of arrayOne, have gone outside those bounds, so need to increment the idxTwo value by 1
        if (idxOne >= arrayOne.length) {
            idxTwo++;
        // if the value of idxTwo is greater than or equal to the length of arrayTwo, have gone outside those bounds, so need to increment the idxOne value by 1
        } else if (idxTwo >= arrayTwo.length) {
            idxOne++;
        // if the value of the integer at idxOne in arrayOne is less than the value of the integer at idxTwo in arrayTwo, then the idxOne value should be incremented
        } else if (arrayOne[idxOne] < arrayTwo[idxTwo]) {
            idxOne++;
        // otherwise, if the value of the integer at idxTwo in arrayTwo is less than the value of the integer at idxOne in arrayOne, then the idxTwo value should be incremented
        } else {
            idxTwo++;
        }
    }
    // if the combined length of the two arrays is an even number, then execute the below
    if ((arrayOne.length + arrayTwo.length) % 2 === 0) {
        // initialize variable areBothValuesArrayOne to store boolean of whether both values exist in that first array
        let areBothValuesArrayOne = idxTwo >= arrayTwo.length || (idxOne + 1 < arrayOne.length && arrayTwo[idxTwo] > arrayOne[idxOne + 1]);
        // initialize variable areBothValuesArrayTwo to store boolean of whether both values exist in that second array
        let areBothValuesArrayTwo = idxOne >= arrayOne.length || (idxTwo + 1 < arrayTwo.length && arrayOne[idxOne] > arrayTwo[idxTwo + 1]);
        // intialize variable valueOne and set equal to result of ternary checking whether areBothValuesArrayOne, and if so, set equal to value at idxOne plus 1 in arrayOne, or if not, set equal to value at idxTwo
        // in arrayTwo
        let valueOne = areBothValuesArrayOne ? arrayOne[idxOne + 1] : arrayTwo[idxTwo];
        // intialize variable valueTwo and set equal to result of ternary checking whether areBothValuesArrayTwo, and if so, set equal to value at idxTwo plus 1 in arrayTwo, or if not, set equal to value at idxOne
        // in arrayOne
        let valueTwo = areBothValuesArrayTwo ? arrayTwo[idxTwo + 1] : arrayOne[idxOne];
        // return the average between valueOne and valueTwo
        return (valueOne + valueTwo) / 2;
    }
    // if the combined length of the two arrays was an odd number, then do the following checks for valueOne and valueTwo, seeing whether the index is in bounds of its respective array
    // and setting equal to that indexes position in its respective array, or setting equal to Infinity if not
    let valueOne = idxOne < arrayOne.length ? arrayOne[idxOne] : Infinity;
    let valueTwo = idxTwo < arrayTwo.length ? arrayTwo[idxTwo] : Infinity;
    // return the smaller of the two values, which will be the median
    return Math.min (valueOne, valueTwo);
}