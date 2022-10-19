// Write a function which takes in the head of a Singly Linked List, and which contains a loop. In other words, the list's tail node points to some node in the list,
// rather than conventionally pointing to a None/null value. The function should return the node (the actual node, not solely the value) from which the loop originates,
// and it should do so in constant space.

// Each LinkedList node has an integer value, as well as a next node pointing to the next node in the list.

// Sample Input:
// head = 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6
//                            ^         |
//                            |         V
//                            9 <- 8 <- 7

// Sample Output:
// The node with the value 4

// Solution 1: