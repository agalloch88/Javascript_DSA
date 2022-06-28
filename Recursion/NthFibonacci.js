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

function getNthFib(n, memoize = {1: 0, 2: 1}) {
    if (n in memoize) {
        return memoize[n];
    } else {
        memoize[n] = getNthFib(n - 1, memoize) + getNthFib(n - 2, memoize);
        return memoize[n];
    }
}