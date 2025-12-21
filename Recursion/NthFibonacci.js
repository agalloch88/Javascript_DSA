// The Fibonacci sequence is defined as follows: the first number of the sequence is 0, the seconf number is 1, and the nth number is the sum of the (n - 1)th
// and (n - 2)th numbers. Write a function which takes in an integer n, and returns the nth Fibonacci number.

// Important note: the Fibonacci sequence is often defined with its first two numbers as F0 = - and F1 = 1. For the purpose of this question,
// the first Fibonacci nuymber is F0; therefore, getNthFib(1) is equal to F0, getNthFib(2) is equal to F1, etc.

// Sample Input:
// n = 2

// Sample Output:
// 1
// found by adding 0 + 1

// Solution 1:

// naive solution checking for base cases

// O(2^n) time due to 2 operations per n value
// O(n) space due to storing n values on the call stack

function getNthFib(n) {
  if (n === 2) {
    return 1;
  } else if (n === 1) {
    return 0;
  } else {
    return getNthFib(n - 1) + getNthFib(n - 2);
  }
}

// Solution 2:

// memoized/cached solution using JS object store

// O(n) time due to n recursive calls
// O(n) space due to storing n memoized values in cache

function getNthFib2(n, memoize = { 1: 0, 2: 1 }) {
  if (n in memoize) {
    return memoize[n];
  } else {
    memoize[n] = getNthFib2(n - 1, memoize) + getNthFib2(n - 2, memoize);
    return memoize[n];
  }
}

// Solution 3:

// optimal solution using tuple for fib sequence

// O(n) time due to checking n values
// O(1) space due to only storing three variables

function getNthFib3(n) {
  // we know what the first two values are, and can use a tuple to replace and track position in Fibonacci sequence
  const lastTwo = [0, 1];
  // already know first two values, about to calculate value # 3
  let counter = 3;
  while (counter <= n) {
    // the next Fib sequence value is sum of the lastTwo values
    const nextFib = lastTwo[0] + lastTwo[1];
    // replacing smallest value in tuple
    lastTwo[0] = lastTwo[1];
    // cycling in newest value in tuple
    lastTwo[1] = nextFib;
    // incrementing counter until hitting n for last calculation
    counter++;
  }
  // checking base case to ensure not given 1 as n, and if so, return 0
  return n > 1 ? lastTwo[1] : lastTwo[0];
}
