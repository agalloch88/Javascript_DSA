// The problem presents a array of string tokens, representing a mathematical expression using Reverse Polish Notation. Reverse Polish Notation refers to a type of notation where
// operators come after operands, instead of between them. For example, 2 4 + would evauluate to 6.

// Parentheses are always implicit in Reverse Polish Notation, meaning an expression evaluates from left to right. All of the operators for the current problem take two operands,
// which will always be the value values immediately preceding the operator. For example, 18 4 - 7 / evaluates to ((18 - 4) / 7), or 2.

// Write a function which takes this array of tokens, and returns the result. The function should support four operators: "+", "-", "*", and "/", representing addition, subtration,
// multiplication, and division, respectively.

// Division should always be treated as integer division, round down toward zero. For example, 3 / 2 evaluates to 1, and -3 / 2 evaluates to -1. For the purposes of the problem,
// assume the input will always be valid Reverse Polish Notation, and it will always result in a valid number. The function should not edit or mutate the input array of tokens.

// Sample Input:

// tokens = ["50", "3", "17", "+", "2", "-", "/"]

// Sample Output:

// 2
// (50 / ((3 + 17) - 2))

// Solution 1:

// iterative solution using stack to parse and push numbers into stack, and handle each type of operand

// O(n) time due to iterating over n items in tokens
// O(n) space due to storing close to n items, potentially, in the stack at a given time

function reversePolishNotation(tokens) {
    // set up empty stack/array
    let stack = [];
    // iterate over all the tokens in input
    for (let token in tokens) {
        // if the token is addition sign, then push onto stack the result of adding the top two popped values together
        if (token === "+") {
            stack.push(stack.pop() + stack.pop());
        // if the token is subtraction sign, first need to grab the top popped item from stack, then subtract firstNum from the next popped value and push result onto stack
        } else if (token === "-") {
            firstNum = stack.pop();
            stack.push(stack.pop() - firstNum);
        // if the token is multiplication sign, then push onto stack the result of multiplying the top two popped values together
        } else if (token === "*") {
            stack.push(stack.pop() * stack.pop());
        // if the token is division sign, first need to grab the top popped item from stack, then divide top popped item on stack by firstNum, rounding toward zero, then push
        // result onto the stack
        } else if (token === "/") {
            firstNum = stack.pop();
            stack.push(Math.trunc(stack.pop() / firstNum));
        // if the current token is not an operator, then it must be a number, so use parseInt to convert the string to integer, and push the integer onto the stack
        } else {
            stack.push(parseInt(token));
        }
    }
    // once for loop exits, should have the answer in the stack, so pop that value off the stack to return the answer
    return stack.pop();
}