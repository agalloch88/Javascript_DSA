// Write a function which takes in a string made up of parentheses, so ( these two ). The function should return an integer representing the length of the longest balanced
// substring with regards to parentheses.

// A string is said to be balanced if it has as many opening parentheses as it has closing parentheses, and if no parenthesis is unmatched. Note that an opening parenthesis
// cannot match a closing parenthesis which comes before it, and similarly, a closing parenthesis cannot match an opening parenthesis which comes afert it.

// Sample Input:
// string = "(()))("

// Sample Output:
// 4
// The longest balanced substring is (())

// Solution 1:

// iterative solution using a stack to track the parens, pushing and popping as needed, then finding the length

// O(n ^ 3) time due to nested for loops and addition for loop in helper function called within other for loops
// O(n) space due to at most n items stored in stack at a given moment

function longestBalancedSubstring(string) {
    let maxLength = 0;

    for (let i = 0; i < string.length; i++) {
        for (let j = i + 2; j < string.length + 1; j += 2) {
            if (isBalanced(string.slice(i, j))) {
                let currentLength = j - i;
                maxLength = Math.max(currentLength, maxLength);
            }
        }
    }
    return maxLength;
}

function isBalanced(string) {
    let openParenStack = [];

    for (let char of string) {
        if (char === '(') {
            openParenStack.push('(');
        } else if (openParenStack.length > 0) {
            openParenStack.pop();
        } else {
            return false;
        }
    }
    return openParenStack.length === 0;
}