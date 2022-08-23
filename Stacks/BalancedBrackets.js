// Write a function whcih takes in a string made up of brackets ( (, ), [, ], {, } ) and other optional characters. The function should return a boolean
// representing whether the string is balanced with regard to the brackets.

// A string is said to be balanced if it has as many opening brackets of a certain type as it has closing brackets of that type, and if no bracket is unmatched.
//  Note that an opening bracket cannot match a corresponding closing bracket which comes before it, and similarly, a closing bracket cannot match a 
// corresponding opening bracket which comes after it. Also, brackets cannot overlap each other, as in the examplke [(]).

// Sample Input:
// string = "([])(){}(())()()"

// Sample Output:
// true, as it is balanced

// Solution 1:

// iterative solution utilizing stack to add starting brackets, then pop them off when encountering closing bracket

// O(n) time due to iterating over n items in input string
// O(n) space due to storing at most n items in stack; balanced solutions will not reach full O(n), but n/2 still converges to O(n)

function balancedBrackets(string) {
    // set up strings for start and end chars to match against
    let startingBrackets = "([{";
    let endingBrackets = ")]}";
    // set up hashmap/JS object of start values and their corresponding end key
    let matchingBrackets = { ')': '(', ']': '[', '}': '{'};
    // initialize empty holder stack
    let stack = [];
    // start iterating over every character in input string
    for (let char of string) {
        // if current character is a starting bracket, add it to the stack via push
        if (startingBrackets.includes(char)) {
            stack.push(char);
        // if not starting bracket, it may be an ending bracket, so if current character is an ending bracket, have to do a few checks
        } else if (endingBrackets.includes(char)) {
            // if there's nothing in the stack currently and there's an ending bracket, no previously-encounter starting bracket to cancel it out, so return false
            if (stack.length === 0) {
                return false;
            }
            // if the last/top item in the stack, which in this case would be a starting bracket, is an exact match for this closing bracket, pop the opening bracket off the stack
            if (stack[stack.length - 1] === matchingBrackets[char]) {
                stack.pop();
            // if not a match, then return false
            } else {
                return false;
            }
        }
    }
    // last boolean check, and if any remaining items in the stack which were not handled above, will return false, otherwise true
    return stack.length === 0;
}

// Solution 2:

function balancedBrackets(string) {
    let matchingBrackets = {
        ')': '(',
        ']': '[',
        '}': '{',
    }

    let openingBrackets = '([{';

    let stack = [];

    for (let char of string) {
        if (openingBrackets.includes[char]) {
            stack.push(char);
        }

        if (char in matchingBrackets) {
            let matchingBracket = stack.pop();

            if (matchingBracket !== matchingBrackets[char]) {
                return false;
            }
        }
    }
    return stack.length === 0;
    
}