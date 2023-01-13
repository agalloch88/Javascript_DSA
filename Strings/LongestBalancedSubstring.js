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

// iterative solution using a stack and making single pass over input via for loop

// O(n) time due to checking n inputs
// O(n) space due to storing at most n inputs in stack

function longestBalancedSubstring(string) {
    // initialize maxLength variable to hold maximum length found and set to 0
    let maxLength = 0;
    // set up empty stack and store in variable idxStack
    let idxStack = [];
    // push -1 onto the stack so that, should we ever empty all other values out of the stack, we know nothing precedes this point in the string
    idxStack.push(-1);
    // iterate over all values in the input string
    for (let i = 0; i < string.length; i++) {
        // check whether the value at i in the string is an opening paren (, and if so, execute below
        if (string[i] === '(') {
            // push the value at i onto the stack, which in this case should be an index
            idxStack.push(i);
        // otherwise, if the value at i is anything else (in this case, a closing paren, ) ), execute the below
        } else {
            // pop the value off the top of the stack
            idxStack.pop();
            // if the stack's length is 0, meaning it is empty, push the value at i onto the stack, which is an index
            // this is an edge case to account for
            if (idxStack.length === 0) {
                idxStack.push(i);
            // otherwise, if there is anything on the stack, including the -1 pushed at the beginning, execute the below
            } else {
                // grab the top value in the idxStack, and store in variable balancedSubstringStartIdx
                let balancedSubstringStartIdx = idxStack[idxStack.length - 1];
                // subtract the current index, i, by the value stored in balancedSubstringStartIdx, which should be the top index on the stack
                let currentLength = i - balancedSubstringStartIdx;
                // set maxLength equal to the maximum value between the current value of maxLength and the value of currentLength
                maxLength = Math.max(maxLength, currentLength);
            }
        }
    }
    // return the value in maxLength
    return maxLength;
}

// Solution 3:

// iterative solution first checking counts of opening/closing parens from left to right, then right to left

// O(n) time due to two passes through input, 2n converges to n
// O(1) space due to only storing a few variables

function longestBalancedSubstring(string) {
    // set up variable maxLength to hold longest substring found, and initialize to 0
    let maxLength = 0;
    // set up variable openingCount to track number of opening parens found, initialize to 0
    let openingCount = 0;
    // set up variable closingCount to track number of closing parens found, initialize to 0
    let closingCount = 0;
    // iterate over ever char in the input string from left to right
    for (let char of string) {
        // if the char is the opening paren, (, then increment the openingCount by 1
        if (char === '(') {
            openingCount++;
        // otherwise, the char must be a closing paren, so increment the closingCount by 1
        } else {
            closingCount++;
        }
        // check whether openingCount and closingCount are equal, meaning there is a match for every character
        if (openingCount === closingCount) {
            // if the statement above is true, then set maxLength equal to the maximum value between the current value of maxLength and the closingCount squared
            maxLength = Math.max(maxLength, closingCount * 2)
        // otherwise, if the closingCount is higher than the openingCount, reset openingCount and closingCount to 0, since this cannot be a balanced substring
        } else if (closingCount > openingCount) {
            openingCount = 0;
            closingCount = 0;
        }
    }
    // reset the openingCount and closingCount variables to 0 prior to next pass over the input
    openingCount = 0;
    closingCount = 0;
    // iterate over every character in the input from right to left
    for (let i = string.length - 1; i >= 0; i--) {
        // grab the value at i in the input string, and store in variable char
        let char = string[i];
        // if the char is the opening paren, (, then increment the openingCount by 1
        if (char === '(') {
            openingCount++;
            // otherwise, the char must be a closing paren, so increment the closingCount by 1
        } else {
            closingCount++;
        }
        // check whether openingCount and closingCount are equal, meaning there is a match for every character
        if (openingCount === closingCount) {
            // if the statement above is true, then set maxLength equal to the maximum value between the current value of maxLength and the openingCount squared
            maxLength = Math.max(maxLength, openingCount * 2);
        // otherwise, if the openingCount is greater than the closingCount, reset openingCount and closingCount to 0, since this cannot be a balanced substring
        } else if (openingCount > closingCount) {
            openingCount = 0;
            closingCount = 0;
        }
    }
    // return the final value of maxLength
    return maxLength;
}

// Solution 4:

// optimized version of solution 3, abstracting repeating code to ternaries, and using helper function

// O(n) time due to two passes over input, first left to right then right to left, 2n converges to n
// O(1) space due to only storing a few variables

// main function which takes in the input string
function longestBalancedSubstring(string) {
    // return the maximum between the return values of helper function looking left to right or return values of helper function looking right to left
    return Math.max(getLongestBalancedInDirection(string, true), getLongestBalancedInDirection(string, false));
}
// helper function which takes in the input string and boolean value determining direction, either left to right (true) or right to left (false)
function getLongestBalancedInDirection(string, leftToRight) {
    // the function will make two passes through the input, one from left to right and one from right to left, and directionality is controlled by the
    // leftToRight variable value, either true or false. the three below variables will be set depending on this variable using the ternary operator.
    // check whether leftToRight is true, and if so set openingParens variable equal to (, otherwise set it to )
    let openingParens = leftToRight ? '(' : ')';
    // check whether leftToRight is true, and if so, set the startIdx variable equal to 0, otherwise set it to the last index in the input string
    let startIdx = leftToRight ? 0 : string.length - 1;
    // check whether leftTToRight is true, and if so, set the variable step equal to 1, otherwise set it to -1
    let step = leftToRight ? 1 : -1;
    // set the maxLength, openingCount, and closingCount variables equal to 0 to start
    let maxLength = 0;
    let openingCount = 0;
    let closingCount = 0;
    // set the current idx equal to the value in startIdx
    let idx = startIdx;
    // keep iterating so long as idx is in bounds from the start and end of the input string
    while (idx >= 0 && idx < string.length) {
        // grab the value at idx in string, and store in variable char
        let char = string[idx];
        // if the current char is equal to the current definition of openingParens, and if so, increment openingCount by 1
        if (char === openingParens) {
            openingCount++;
        // otherwise, increment closingCount by 1
        } else {
            closingCount++;
        }
        // if openingCount and closingCount are equal, then set maxLength equal to the maximum between current value of maxLength and the closingCount squared
        if (openingCount === closingCount) {
            maxLength = Math.max(maxLength, closingCount * 2);
        // otherwise, if closingCount is greater than openingCount, this is not a balanced substring, so reset the openingCount and closingCount variables to 0
        } else if (closingCount > openingCount) {
            openingCount = 0;
            closingCount = 0;
        }
        // increment the idx variable by the current value of step variable
        idx += step;
    }
    // return the current value of maxLength
    return maxLength;
}