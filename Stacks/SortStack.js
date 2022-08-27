// Write a function which takes in an array of integers representing a stack, recursively sorts the stack in place (meaning, it does not create a brand new array),
// and returns the given array in sorted order.

// The array must be treated as a stack, with the ends of the array as the top of the stack. Therefore, the problem only allows manipulation as follows:

//  - Popping elements from the top of the stack by removing elements from the end of the array using the built-in .pop() method in choice of language
//  - Pushing elements to the top of the stack by appending elements to the end of the array using the built-in .push() method in language of choice
//  - Peeking at the element on top of the stack by accessing the last element in the array

// The problem does not allow for performing any other operations on the input array, including accessing elements (except for the last element), moving elements, etc.
// The problem also does not allow for use of any other data structures, and the solution must be recursive.

// Sample Input:
// stack = [-5, 2, -2, 4, 3, 1]

// Sample Output:
// [-5, -2, 1, 2, 3, 4]

// Solution 1:

// recursive solution utilizing helper function to insert in sorted order, keep track of top value when popped with each recursive call

// O(n^2) time due to potentially performing operations on n values n times
// O(n) space due to potentially having at most n calls on call stack at a given time

function sortStack(stack) {
    // base case
    // if nothing in stack, return stack
    if (stack.length === 0) {
        return stack;
    }
    // recursive case
    // grab the value on top, and pop it off
    let top = stack.pop();
    // recursively call this sortStack function
    sortStack(stack);
    // reassemble stack by calling insertInSortedOrder helper and passing in value for top
    insertInSortedOrder(stack, top);
    // return the stack for next recursive call
    return stack;
}
// recursive helper responsible for recursively sorting items into stack
function insertInSortedOrder(stack, value) {
    // base case
    // if nothing in stack or the top item is less than/equal to the current value, the current value can be the new top
    if (stack.length === 0 || stack[stack.length - 1] <= value) {
        stack.push(value);
        return;
    }
    // grab value on top of stack and pop it off
    let top = stack.pop();
    // recursively call helper to continue performing checks
    insertInSortedOrder(stack, value);
    // push the top onto the stack
    stack.push(top);
}