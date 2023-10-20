// Write a function which takes a positive integer, represented as a string called number, and an integer called numDigits. Remove numDigits from the string, so that the number
// represented by the string is as large as possible afterwards.

// Note that the order of the remaining digits cannot be changed. For the purposes of the problem, assume numDigits will always the less than the length of variable number, and
// greater than or equal to 0.

// Sample Input:

// number = "462839"
// numDigits = 2

// Sample Output

// "6839"
// remove the digits 4 and 2

// Solution 1:

// iterative solution utilizing stack to remove smaller numbers, tracking how many digits are left and comparing values as stack is filled

// O(n) time due to checking at most n digits in numbers
// O(n) space due to storing at most n digits in stack/string

function bestDigits(number, numDigits) {
  // initialize an empty stack/array
  let stack = [];
  // iterate over ever digit in the input string
  for (let digit of number) {
    // keep looping so long as there are still digits left to be deleted AND the stack is not empty AND the current digit is greater than the top value on the stack
    while (
      numDigits > 0 &&
      stack.length > 0 &&
      digit > stack[stack.length - 1]
    ) {
      // decrement the numDigits value by 1
      numDigits--;
      // pop the top digit off the stack
      stack.pop();
    }
    // push each digit in the number input onto the stack
    stack.push(digit);
  }
  // if there are still items left to be removed from stack, such as in the case where values are all descending, will be caught here
  while (numDigits > 0) {
    // decrement numDigits by 1
    numDigits--;
    // pop the top digit off the stack
    stack.pop();
  }
  // join the inidivual integers in the stack into a string and return said string
  return stack.join('');
}
