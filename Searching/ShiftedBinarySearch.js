// Write a function which takes in a sorted array of distinct integers, as well as a target integer. The caveat for the problem at hand is that the integers in the array
// are shifted by some amount. In other words, the integers are moved to the left or to the right by one or more positions. For example, [1, 2, 3, 4] might turn into [3, 4, 1, 2].

// The function should use a variation of the Binary Search algorithm to determine if the target interger exists in the array, and should return its index if so. Otherwise,
// the function should return -1.

// Sample Input:
// array = [45, 61, 71, 72, 73, 0, 1, 21, 33, 37]
// target = 33

// Sample Output:
// 8

// Solution 1:

function shiftedBinarySearch(array, target) {
    return shiftedBinarySearchHelper(array, target, 0, array.length - 1);
}

function shiftedBinarySearchHelper(array, target, left, right) {
    if (left > right) {
        return -1;
    }

    let middle = Math.floor((left + right) / 2);
    let potentialMatch = array[middle];
    let leftNum = array[left];
    let rightNum = array[right];

    if (target === potentialMatch) {
        return middle;
    } else if (leftNum <= potentialMatch) {
        if (target < potentialMatch && target >= leftNum) {
            return shiftedBinarySearchHelper(array, target, left, middle - 1);
        } else {
            return shiftedBinarySearchHelper(array, target, middle + 1, right);
        }
    } else {
        if (target > potentialMatch && target <= rightNum) {
            return shiftedBinarySearchHelper(array, target, middle + 1, right);
        } else {
            return shiftedBinarySearchHelper(array, target, left, middle - 1);
        }
    }
}