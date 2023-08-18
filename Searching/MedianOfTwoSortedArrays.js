// The problem presents two sorted arrays of integers, called arrayOne and arrayTwo. Write a function which returns the median of these arrays.

// For the purposes of the problem, assume both arrays have at least one value. However, they could be of different lengths. If the median is a decimal value, it should not be rounded,
// beyond the inevitable rounding of floating point math.

// Sample Input:

// arrayOne = [1, 3, 4, 5]
// arrayTwo = [2, 3, 6, 7]

// Sample Output:

// 3.5, where the combined array is [1, 2, 3, 3, {median here} 4, 5, 6, 7]

// Solution 1:

function medianOfTwoSortedArrays(arrayOne, arrayTwo) {
    let idxOne = 0;
    let idxTwo = 0;
    let middleIdx = Math.floor((arrayOne.length + arrayTwo.length - 1) / 2);

    while (idxOne + idxTwo < middleIdx) {
        if (idxOne >= arrayOne.length) {
            idxTwo++;
        } else if (idxTwo >= arrayTwo.length) {
            idxOne++;
        } else if (arrayOne[idxOne] < arrayTwo[idxTwo]) {
            idxOne++;
        } else {
            idxTwo++;
        }
    }

    if ((arrayOne.length + arrayTwo.length) % 2 === 0) {
        let areBothValuesArrayOne = idxTwo >= arrayTwo.length || (idxOne + 1 < arrayOne.length && arrayTwo[idxTwo] > arrayOne[idxOne + 1]);
        let areBothValuesArrayTwo = idxOne >= arrayOne.length || (idxTwo + 1 < arrayTwo.length && arrayOne[idxOne] > arrayTwo[idxTwo + 1]);

        let valueOne = areBothValuesArrayOne ? arrayOne[idxOne + 1] : arrayTwo[idxTwo];
        let valueTwo = areBothValuesArrayTwo ? arrayTwo[idxTwo + 1] : arrayOne[idxOne];
        
        return (valueOne + valueTwo) / 2;
    }

    let valueOne = idxOne < arrayOne.length ? arrayOne[idxOne] : Infinity;
    let valueTwo = idxTwo < arrayTwo.length ? arrayTwo[idxTwo] : Infinity;
    
    return Math.min (valueOne, valueTwo);
}