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