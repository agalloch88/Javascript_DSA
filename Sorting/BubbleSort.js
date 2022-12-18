// Write a function which takes in an array of integers and returns a sorted version of the
// input array. To accomplish the sort, use the Bubble Sort algorithm.

// Sample Input:
// array = [8, 5, 2, 9, 5, 6, 3]

// Sample Output:
// [2, 3, 5, 5, 6, 8, 9]

// Solution 1:

function bubbleSort(array) {
    let isSorted = false;
    let counter = 0;

    while (!isSorted) {
        isSorted = true;

        for (let i = 0; i < array.length - 1 - counter; i++) {
            if (array[i] > array[i + 1]) {
                swap(i, i + 1, array);
                isSorted = false;
            }
        }
        counter++;
    }
    return array;
}

function swap(i, j, array) {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}