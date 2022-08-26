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
    if (stack.length === 0) {
        return stack;
    }

    let top = stack.pop();

    sortStack(stack);

    insertInSortedOrder(stack, top);

    return stack;
}

function insertInSortedOrder(stack, value) {
    if (stack.length === 0 || stack[stack.length - 1] <= value) {
        stack.push(value);
        return;
    }

    let top = stack.pop();

    insertInSortedOrder(stack, value);

    stack.push(top);
}