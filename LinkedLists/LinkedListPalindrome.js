// Write a function which takes in the head of a Singly Linked List, and which returns a boolean
// representing whether the Linked List's nodes form a palindrome. The function should not make
// use of any auxiliary data structure.

// A palindrome is usually defined as a string which is written the same forward and backward.
// For a Linked List's nodes to form a palindrome, their values must be the same when read from
// left to right, and from right to left. Note that single-character strings are palindromes, 
// which means that single-node Linked Lists form palindromes.

// Each LinkedList node has an integer `value` as well as a `next` node pointing to the next node
// in the list, or to None/null if it is the tail of the list.

// For the purposes of the problem, assume that the input Linked List will always have at least
// one node. In other words, the head will never be None/null.

// Sample Input:

// head = 0 -> 1 -> 2 -> 2 -> 1 -> 0

// Sample Output:

// true

// Solution 1: