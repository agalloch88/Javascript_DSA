// The problem presents two Linked Lists of potentially unequal length. Each Linked List represents a non-negative integer, where each node in the Linked List is a digit
// of that integer, and the first node in each Linked Listt always represents the least significant digit of the integer. Write a function which returns the head of a
// new Linked List whcih represents the sum of the integers represented by the two input Linked Lists.

// Each Linked List node has an integer value, as well as a next node pointing to the next node in the list or to None/null if it is the tail of the Linked List.
// The value of each Linked List node is always in the range of 0-9.

// Note: the function must create and return a new Linked List, and cannot modify either of the input Linked Lists.

// Sample Input:
// linkedListOne = 2 -> 4 -> 7 -> 1
// linkedListTwo = 9 -> 4 -> 5

// Sample Output:
// 1 -> 9 -> 2 -> 2
// linkedListOne represents the integer 1742
// linkedListTwo represents the integer 549
// 1742 + 549 = 2291

// Solution 1: