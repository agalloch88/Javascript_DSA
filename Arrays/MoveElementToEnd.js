// You're given an array of integers, and an integer. Write a function which moves all intances
// of the specified integer contained in the array to the end of the array, and return the array.

// The function should perform this in place (so, it should not mutate the input array), and does not
// need to maintain the order of the other integers in the array.

// Sample Input:
// array = [2, 1, 2, 2, 2, 3, 4, 2]
// toMove = 2

// Sample Output:
// [1, 3, 4, 2, 2, 2, 2, 2]

// Solution 1:

// O(n) time due to two pointers and one loop over every array element
// O(1) space due to only two variables stored

function moveElementToEnd(array, toMove) {
    // set up variable i to 0, aka the first index
    let i = 0;
    // set up variable j to be the last index
    let j = array.length - 1;
    // while these variables do not overlap in position in the input array, keep looping
    while (i < j) {
        // while variables do not overlap and while position j is equal to the toMove value, decrement j by 1
        while (i < j && array[j] === toMove) {
            j--;
        }
        // if position i in input array is equal to toMove value, perform the swap and move that value to the end
        if (array[i] === toMove) {
            swap(i, j, array);
        }
        // increment i by 1 regardless of whether the if block above is triggered
        i++;
    }
    // return the input array, which should now have all toMove values at the end
    return array;
}
// helper function which performs in-place swaps, necessary in JS
function swap(i, j, array) {
    // set up temp variable to equal input array at position j
    const temp = array[j];
    // set position j in input array to equal value at position i in input array
    array[j] = array[i];
    // set position i in input array to equal the temp variable, which is equal to value at position j
    array[i] = temp;
}

// Solution 2:

function moveElementToEnd(array, toMove) {
    let left = 0;
    let right = array.length - 1;

    while (left < right) {
        if (array[right] !== toMove) {
            if (array[left] === toMove) {
                swap(left, right, array);
            }
            left++;
        } else {
            right--;
        }
    }
    return array;
}

function swap(left, right, array) {
    let temp = array[left];
    array[left] = array[right];
    array[right] = temp;
}