// Write a function which takes in an array of integers and returns a new array containing, at each index, the next element in the input array which is greater
// than the element at that index in the input array.

// In other words, the function should return a new array where outputArray[i] is the next element in the input array which is greater than inputArray[i].
// If there is no such next greater element for a particular index, the value at that index in the output array should be -1. For example, given the array = [1, 2],
// the function should return [2, -1].

// Additionally, the function should treat the array as a circular array. A circular array wraps around itself as if it were connected end-to-end. So, the next index after the
// last index in a circular array is the first index. This means that, for the given problem, if the input array = [0, 0, 5, 0, 0, 3, 0, 0], the next greater element after
// 3 is 5, since the array is circular.

// Sample Input:
// array = [2, 5, -3, -4, 6, 7, 2]

// Sample Output:
// [5, 6, 6, 6, 7, -1, 5]

// Solution 1:

// iterative solution using a stack and looping through the input on two passes, starting from left/beginning of array in this solution

// O(n) time due to looping over n items twice with additional n checks, so 3n converges to n
// O(n) space due to storing n additional items in new result array and new stack, so 2n converges to n

function nextGreaterElement(array) {
    // initialize new array of input length, fill with -1's to start
    let result = new Array(array.length).fill(-1);
    // will keep track of largest value and values which need to be replaced with said value via a stack
    let stack = [];
    // iterate through the array twice to ensure everything is correct after second pass, account for largest element
    for (let idx = 0; idx < 2 * array.length; idx++) {
        // to allow circular traversal, use modulo operator to provide a circularIdx value
        let circularIdx = idx % array.length;
        // while there are items in the stack and the value on top of the stack is less than the current value at the circularIdx, do stuff
        while (stack.length > 0 && array[stack[stack.length - 1]] < array[circularIdx]) {
            // keep track of top value and pop it off
            let top = stack.pop();
            // every item in result with the value of top will not be set to current item in array at the circularIdx
            result[top] = array[circularIdx];
        }
        // push item on to the stack and keep doing this until passing through the array twice
        stack.push(circularIdx);
    }
    // return the final result array
    return result;
}

// Solution 2:

// another iterative solution, still using stack, but starting from right/end of the array and moving left

// O(n) time due to looping over n items twice with additional n checks, so 3n converges to n
// O(n) space due to storing n additional items in new result array and new stack, so 2n converges to n

function nextGreaterElement(array) {
    let result = new Array(array.length).fill(-1);
    let stack = [];

    for (let idx = 2*array.length -1; idx > -1; idx--) {
        let circularIdx = idx % array.length;

        while (stack.length > 0) {
            if (stack[stack.length - 1] <= array[circularIdx]) {
                stack.pop();
            } else {
                result[circularIdx] = stack[stack.length - 1];
                break;
            }
        }
        stack.push(array[circularIdx]);
    }
    return result;
}