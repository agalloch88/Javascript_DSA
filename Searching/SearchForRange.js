// Write a function which takes in a sorted array of integers, as well as a target integer. The function should use a variation of the Binary Search algorithm to find a range of 
// indices in between which the target number is contained in the array, and should this range in the form of an array.

// The first number in the output array should represent the first index at which the target number is located, while the second number should represent the last index at
// which the target number is located. The function should return [-1, -1] if the integer is not contained at all in the array.

// Sample Input:
// array = [0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73]
// target = 45

// Sample Output:
// [4, 9]

// Solution 1:

function searchForRange(array, target) {
    let finalRange = [-1, -1];
    alteredBinarySearch(array, target, 0, array.length - 1, finalRange, true);
    alteredBinarySearch(array,target, 0, array.length - 1, finalRange, false);
    return finalRange;
}

function alteredBinarySearch(array, target, left, right, finalRange, goLeft) {
    if (left > right) {
        return;
    }

    let mid = Math.floor((left + right) / 2);

    if (array[mid] < target) {
        alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
    } else if (array[mid] > target) {
        alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
    } else {
        if (goLeft) {
            if (mid === 0 || array[mid - 1] !== target) {
                finalRange[0] = mid;
            } else {
                alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
            }
        } else {
            if (mid === array.length - 1 || array[mid + 1] !== target) {
                finalRange[1] = mid;
            } else {
                alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
            }
        }
    }
}