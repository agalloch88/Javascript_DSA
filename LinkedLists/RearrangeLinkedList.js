// Write a function which takes in the ehad of a Singly Linked List, and an integer `k`, rearranges the list in place (meaning, does not created a brand new Linked List) around nodes 
// with the value `k`, and returns its new head.

// Rearranging a Linked List around nodes with the value `k` means moving all nodes with a value smaller than `k` before all nodes with the value of `k`, and moving all
// nodes with a value greater than `k` after all nodes with value `k`.

// All moved nodes should maintain their relative ordering, if possible.

// Note that the Linked List should be rearranged even if it does not have any nodes with value `k`.

// Each LinkedList node has an integer `value` as well as a `next` node pointing tot he next node in the list, or to None/null if it is the tail of the list.

// For the purposes of the problem, assume that the input Linked List will always have at least one node. In other words, the head will never be None/null.

// Sample Input:

// head = 3 -> 0 -> 5 -> 2 -> 1 -> 4
// k = 3

// Sample Output:

// 0 -> 2 -> 1 -> 3 -> 5 -> 4

// the new head is node with value 0. Note that all nodes have maintained their relative ordering, even while being ordered around `k` relative to their number values

// Solution 1: