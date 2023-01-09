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

// main function taking in the string of parens
function longestBalancedSubstring(string) {
    // set up variable to hold the maximum length found, initialize to zero and store as maxLength
    let maxLength = 0;
    // iterate over every value in the string
    for (let i = 0; i < string.length; i++) {
        // set up a second loop to be two values ahead of i, moving this pointer by 2 values each time
        for (let j = i + 2; j < string.length + 1; j += 2) {
            // check whether return value of isBalanced (which takes in a slice of the string from position i up to position j) is true, and if so, execute the block below
            if (isBalanced(string.slice(i, j))) {
                // subtract i from j and store this value in variable currentLength
                let currentLength = j - i;
                // set maxLength equal to the maximum value between currentLength and current value in maxLength
                maxLength = Math.max(currentLength, maxLength);
            }
        }
    }
    // return the current value stored in maxLength
    return maxLength;
}

// helper function to determine whether the input string is balanced, which takes in a string of parens
function isBalanced(string) {
    // set up empty stack and store in variable openParenStack
    let openParenStack = [];
    // iterate over every char in the input string
    for (let char of string) {
        // if the current char is an open paren, (, execute the below
        if (char === '(') {
            // push this open paren onto the openParenStack stack
            openParenStack.push('(');
        // otherwise, if the current char is not an open paren, if the stack's length is greater than 0, so the stack is not empty, execute the below
        } else if (openParenStack.length > 0) {
            // pop the top item off the top of the stack
            openParenStack.pop();
        // otherwise, if the current char is not ( and the stack is empty, execute the below
        } else {
            // return false since there is no way to balance the string
            return false;
        }
    }
    // return the value of the check as to whether the stack's length is equal to 0, so essentially whether the stack is empty or not
    return openParenStack.length === 0;
}

// Solution 2:

function longestBalancedSubstring(string) {
    let maxLength = 0;
    let idxStack = [];
    idxStack.push(-1);

    for (let i = 0; i < string.length; i++) {
        if (string[i] === '(') {
            idxStack.push(i);
        } else {
            idxStack.pop();

            if (idxStack.length === 0) {
                idxStack.push(i);
            } else {
                let balancedSubstringStartIdx = idxStack[idxStack.length - 1];
                let currentLength = i - balancedSubstringStartIdx;
                maxLength = Math.max(maxLength, currentLength);
            }
        }
        
    }
    return maxLength;
}