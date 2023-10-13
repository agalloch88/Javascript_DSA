// Write a function which takes in the head of a Singly Linked List, and an integer, k. The function should shift the list in place (i.e., does not create a brand new list) by k positions,
// and return the new head of the list.

// Shifting a Linked List means moving its nodes forward or backward, and wrapping them around the list where appropriate. For example, shifting a Linked List forward by one
// position would make its tail become the new head of the Linked List.

// Whether nodes are moved forward or backward is determined by whether the integer k is positive or negative.

// Each LinkedList node hasa an integer value, as well as a next node pointing to the next node in the list, or to None/null if the it is the tail of the list.

// For the purposes of the problem, assume that the input Linked List will always have at least one node. In other words, the head will never be None/null.

// Sample Input:

// head = 0 -> 1 -> 2 -> 3 -> 4 -> 5
// the head node here has a value of 0

// k = 2

// Sample Output:

// 4 -> 5 -> 0 -> 1 -> 2 -> 3
// the new head, after shifting 2 positions, is node with value of 4

// Solution 1: