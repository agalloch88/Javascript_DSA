// Write a function which takes in an array of non-negative integers, and which returns a sorted version of the array. Use the Radix Sort algorithm to sort the array.

// Sample Input:

// arrary = [8762, 654, 3008, 345, 87, 65, 234, 12, 2]

// Sample Output:

// [2, 12, 65, 87, 234, 345, 654, 3008, 8762]

// Solution 1:

function radixSort(array) {
    if (array.length === 0) {
        return array;
    }

    let maxNumber = Math.max(...array);

    let digit = 0;
    while (maxNumber / 10 ** digit > 0) {
        countingSort(array, digit);
        digit++;
    }

    return array;
}

function countingSort(array, digit) {
    let sortedArray = new Array(array.length).fill(0);
    let countArray = new Array(10).fill(0);

    let digitColumn = 10 ** digit;
    for (let num of array) {
        let countIndex = Math.floor(num / digitColumn) % 10;
        countArray[countIndex]++;
    }

    for (let idx = 1; idx < 10; idx++) {
        countArray[idx] += countArray[idx - 1];
    }

    for (let idx = array.length - 1; idx > -1; idx--) {
        let countIndex = Math.floor(array[idx] / digitColumn) % 10;
        countArray[countIndex]--;
        let sortedIndex = countArray[countIndex];
        sortedArray[sortedIndex] = array[idx];
    }

    for (let idx = 0; idx < array.length; idx++) {
        array[idx] = sortedArray[idx];
    }
}