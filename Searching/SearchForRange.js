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

// recursive solution implementing modified binary search on sorted input to find leftmost and rightmost instances of target value

// O(log(n)) time due to modified binary search efficiency
// O(log(n)) space due to recursive calls

function searchForRange(array, target) {
    // set up holder array for final values, initialize to contain -1's right now in case no instances of target exist in input array
    let finalRange = [-1, -1];
    // recursive call for helper function with goLeft set to true to indicate looking left in input array
    alteredBinarySearch(array, target, 0, array.length - 1, finalRange, true);
    // recursive call for helper function with goLeft set to false to indicate looking right in input array
    alteredBinarySearch(array,target, 0, array.length - 1, finalRange, false);
    // once both recursive calls return, should have the finalRange to return, if target exists in input array, otherwise same initialized values satisfy requirements
    return finalRange;
}
// helper function taking in input array, target value, values for left and right points to calculate mid from, the finalRange holder array, and value for goLeft to determine direction
function alteredBinarySearch(array, target, left, right, finalRange, goLeft) {
    // base case
    // if left pointer greater than right, looked at all values so return
    if (left > right) {
        return;
    }
    // floor the result of left plus right divided by 2 to find middle point of range, set equal to variable mid
    let mid = Math.floor((left + right) / 2);
    // if the mid value in input array is smaller than the target value, can discard the left half of the values as would be even smaller
    if (array[mid] < target) {
        // call helper again with left pointer shifted one to right of mid value
        alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
    // if the mid value in the input array is greater than the target value, can discard the right half of the values as would be even larger
    } else if (array[mid] > target) {
        // call helper again with right pointer shifted one to left of mid value
        alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
    // if mid is not larger or smaller than target, must be equal, so have found at least one instance of the target, so execute block below
    } else {
        // if looking to the left for additional target values, execute block below
        if (goLeft) {
            // if all the way at start of the input array, of if current mid's neighbor to left is not equal to the target value, set the first value in finalRange equal to current mid index
            if (mid === 0 || array[mid - 1] !== target) {
                // this index represents the first occurence in the range of target values within the input array
                finalRange[0] = mid;
            // if neither at the start of array or off the target value, call helper function again to continue looking for leftmost index, updating right pointer to one left of current mid
            } else {
                alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
            }
        // if not looking left, must be looking for additional target values to the right, so execute block below
        } else {
            // if all the way at the end of the input array, or if current mid's neighbor to the right is not equal to the target value, set the second value in finalRange equal to current mid index
            if (mid === array.length - 1 || array[mid + 1] !== target) {
                // this index represents the first occurence in the range of target values within the input array
                finalRange[1] = mid;
            // if neither at the end of array or off the target value, call helper function again to continue looking for rightmost index, updating left pointer to one right of current mid
            } else {
                alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
            }
        }
    }
}

// Solution 2:

function searchForRange(array, target) {
    let finalRange = [-1, -1];
    alteredBinarySearch(array, target, 0, array.length - 1, finalRange, true);
    alteredBinarySearch(array, target, 0, array.length - 1, finalRange, false);
    return finalRange;
}

function alteredBinarySearch(array, target, left, right, finalRange, goLeft) {
    while (left <= right) {
        let mid = Math.max((left + right) / 2);

        if (array[mid] < target) {
            left = mid + 1;
        } else if (array[mid] > target) {
            right = mid - 1;
        } else {
            if (goLeft) {
                if (mid === 0 || array[mid - 1] !== target) {
                    finalRange[0] = mid;
                    return;
                } else {
                    right = mid - 1;
                }
            } else {
                if (mid === array.length - 1 || array[mid + 1] !== target) {
                    finalRange[1] = mid;
                    return;
                } else {
                    left = mid + 1;
                }

            }
        }
    }
}