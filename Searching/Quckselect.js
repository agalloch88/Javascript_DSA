// Write a function which takes in an array of distinct integers, as well as an integer k, and which returns the kth smallest integer in the input array.

// The function should complete the search in linear time, on average.

// Sample Input:
// array = [8, 5, 2, 9, 7, 6, 3]
// k = 3

// Sample Output:
// 5

// Solution 1:

function quickselect(array, k) {
    let position = k - 1;
    return quickselectHelper(array, 0, array.length - 1, position);
}

function quickselectHelper(array, startIdx, endIdx, position) {
    while (true) {
        if (startIdx > endIdx) {
            throw new Error("The algorithm should never arrive here!");
        }

        let pivotIdx = startIdx;
        let leftIdx = startIdx + 1;
        let rightIdx = array.length - 1;

        while (leftIdx <= rightIdx) {
            if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
                swap(leftIdx, rightIdx, array);
            }

            if (array[leftIdx] <= array[pivotIdx]) {
                leftIdx++;
            }

            if (array[rightIdx] >= array[pivotIdx]) {
                rightIdx--;
            }
        }
        swap(pivotIdx, rightIdx, array);

        if (rightIdx === position) {
            return array[rightIdx];
        } else if (rightIdx < position) {
            startIdx = rightIdx + 1;
        } else {
            endIdx = rightIdx - 1;
        }
    }
}

function swap(i, j, array) {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}