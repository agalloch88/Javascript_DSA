// Write a function which takes in the heads of two Singly Linked Lists which are in sorted order, respectively. The function should merge the lists in place, meaning it should not
// create a brand new list. The function should return the head of the merged list, and the merged list should also be in sorted order.

// Each LinkedList node has an integer value, as well as a next node pointing to the following node in the list, or to None/null if it happens to be the tail of the list.

// For the purposes of the problem, assume that the input Linked Lists will always have at least one node. In other words, the heads will never be None/null.

// Sample Input:

// headOne = 2 -> 6 -> 7 -> 8
// the head node above is value 2

// headTwo = 1 -> 3 -> 4 -> 5 -> 9 -> 10
// the head node above is value 1

// Sample Output:

// 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10
// the head node of the merged list is value 1

// Solution 1: