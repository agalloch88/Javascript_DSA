// Write a function that takes in a sorted array of integers as well as a target integer. The function should
// use the Binary Search algorithm to determine if the target integer is contained in the array, and should return
// its index if it found, otherwise it should return -1.

// Sample input:
// array = [0, 1, 21, 33, 45, 45, 61, 71, 72, 73]
// target = 33

// Sample output:
// 3


// Solution 1:

// O(log(n)) time due to efficient binary search method
// O(log(n)) space due to recursive calls on call stack

function binarySearch(array, target) {
    // use helper function to abstract logic
    return binarySearchHelper(array, target, 0, array.length - 1);
}

function binarySearchHelper(array, target, left, right) {
    // if left overlaps with right, we've not found the target, so return base case of -1
    if (left > right) {
        return -1;
    }
    // establish the middle of the array, so we can look at two halves of values
    const middle = Match.floor((left + right) / 2);
    // grab our middle to compare
    const potentialMatch = array[middle];
    // if middle is the target, we're done and found the value
    if (target === potentialMatch) {
        return middle;
    // if target is smaller than our middle, we can discard all values greater than middle
    } else if (target < potentialMatch) {
        return binarySearchHelper(array, target, left, middle - 1);
    // if target is greater than our middle, we can discard all values smaller than middle
    } else {
        return binarySearchHelper(array, target, middle + 1, right);
    }
}

// Solution 2:

// O(log(n)) time due to efficient binary search method
// O(1) space due to iterative reassigning of right/left rather than recursive

function binarySearch(array, target) {
    // use helper function to abstract logic
    return binarySearchHelper(array, target, 0, array.length -1);
}

function binarySearchHelper(array, target, left, right) {
    // continue searching until left and right overlap, then return base case of -1
    while (left <= right) {
        // grab our array middle
        const middle = Math.floor((left + right) / 2);
        // assign our potential match to the array middle
        const potentialMatch = array[middle];
        // if our middle is the target, we are done
        if (target === potentialMatch) {
            return middle;
        // if target is smaller than middle, discard all values larger than middle and move right inside current middle range
        } else if (target < potentialMatch) {
            right = middle - 1;
        // if target is larger than middle, discard all values smaller than middle and move left inside current middle range
        } else {
            left = middle + 1;
        }
    }
    return -1;
}