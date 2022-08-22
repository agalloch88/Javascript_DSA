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
    let startingBrackets = "([{";
    let endingBrackets = ")]}";
    let matchingBrackets = { ')': '(', ']': '[', '}': '{'};
    let stack = [];

    for (let char of string) {
        if (startingBrackets.includes(char)) {
            stack.push(char);
        } else if (endingBrackets.includes(char)) {
            if (stack.length === 0) {
                return false;
            }

            if (stack[stack.length - 1] === matchingBrackets[char]) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
}