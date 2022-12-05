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

// recursive solution using helper function, checking whether the potential match is in left or right half accounting for the shifted values

// O(log(n)) time due to modified use of Binary Search
// O(log(n)) space due to call staack usage by recursive calls

// main function which takes in array and the target
function shiftedBinarySearch(array, target) {
    // return a call to helper function, passing in starting values for left and right values at beginning and end of input array
    return shiftedBinarySearchHelper(array, target, 0, array.length - 1);
}

// helper function which takes in array, target, left pointer, and right pointer
function shiftedBinarySearchHelper(array, target, left, right) {
    // base case
    // if left is greater than right, would have checked all values without returning answer, so return -1 as value is not in array
    if (left > right) {
        return -1;
    }
    // find the middle value of the array
    let middle = Math.floor((left + right) / 2);
    // grab middle value in array and store in variable potentialMatch
    let potentialMatch = array[middle];
    // grab left pointer value in array and store in variable leftNum
    let leftNum = array[left];
    // grab right pointer value in array and store in variable rightNum
    let rightNum = array[right];
    // check whether target value beinbg searched for is equal to the current potential match
    if (target === potentialMatch) {
        // if so, return the value of middle as answer is found
        return middle;
    // if target !== potentialMatch, then if the leftNum is smaller or equal to the potentialMatch, execute below
    } else if (leftNum <= potentialMatch) {
        // if target is smaller than potentialMatch and target is greater than or equal to the leftNum, need to explore the left
        if (target < potentialMatch && target >= leftNum) {
            // return a call to the helper, updating the right pointer to be one value left of current middle, effectively eliminating values to the right from consideration
            return shiftedBinarySearchHelper(array, target, left, middle - 1);
        // otherwise, need to explore the right
        } else {
            // return a call to the helper, updating the left pointer to be one value to the right of current middle, effectively eliminating values to the left from consideration
            return shiftedBinarySearchHelper(array, target, middle + 1, right);
        }
    // if target !== potentialMatch, if leftNum is greater than potentialMatch, execute below
    } else {
        // if the target is greater than potentialMatch and target is less than or equal to the rightNum, need to explore the right
        if (target > potentialMatch && target <= rightNum) {
            // return a call to the helper updating left pointer to be one value to the right of current middle, effectively eliminating values to the left from consideration
            return shiftedBinarySearchHelper(array, target, middle + 1, right);
        // otherwise, need to explore the left
        } else {
            // return a call to the helper, updating the right pointer to be one value to the left of current middle, effectively eliminating values to the right from consideration
            return shiftedBinarySearchHelper(array, target, left, middle - 1);
        }
    }
}