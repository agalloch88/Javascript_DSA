// Write a function which takes in an array of integers, and returns the number of invesrions in the array. An inversion occurs if, for any valid indices
// i and j, i < j and array[i] > array[j].

// For example, given array = [3, 4, 1, 2], there are 4 inversions. The following pairs of indices represent these inversions:

// [0, 2], [0, 3], [1, 2], [1, 3]

// Intuitively, the number of inversions is a measure of the level of unsortedness of the array's contents.

// Sample input:

// array = [2, 3, 3, 1, 9, 5, 6]

// Sample Output:

// 5
// These are the pairs of indices representing inversions in this input:
// [0, 3], [1, 3], [2, 3], [4, 5], [4, 6]

// Solution 1:

function countInversions(array) {
    return countSubArrayInversions(array, 0, array.length);
}

function countSubArrayInversions(array, start, end) {
    if (end - start <= 1) {
        return 0;
    }

    let middle = start + Math.floor((end - start) / 2);
    let leftInversions = countSubArrayInversions(array, start, middle);
    let rightInversions = countSubArrayInversions(array, middle, end);
    let mergeInversions = mergeSortAndCountInversions(array, start, middle, end);

    return leftInversions + rightInversions + mergeInversions;
}

function mergeSortAndCountInversions(array, start, middle, end) {
    let sortedArray = [];
    let left = start;
    let right = middle;
    let inversions = 0;

    while (left < middle && right < end) {
        if (array[left] <= array[right]) {
            sortedArray.push(array[left]);
            left++;
        } else {
            inversions += middle - left;
            sortedArray.push(array[right]);
            right++;
        }
    }

    sortedArray.push(...array.slice(left, middle), ...array.slice(right, end));
    for (let idx = 0; idx < sortedArray.length; idx++) {
        const num = sortedArray[idx];
        array[start + idx] = num;
    }

    return inversions;
}