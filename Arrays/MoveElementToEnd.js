// You're given an array of integers, and an integer. Write a function which moves all isntances
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
    let i = 0;
    let j = array.length - 1;

    while (i < j) {
        while (i < j && array[j] === toMove) {
            j--;
        }
        if (array[i] === toMove) {
            swap(i, j, array);
        }
        i++;
    }
    return array;
}

function swap(i, j, array) {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
} 