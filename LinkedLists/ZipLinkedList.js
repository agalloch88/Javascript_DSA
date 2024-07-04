// The problem presents the head of a Singly Linked List with an arbitrary length, `k`. Write
// a function which zips the Linked List in place (meaning, which does not create a 
// brand new Linked List) and returns its head.

// A Linked List is zipped if its nodes are in the following order, where `k` is the length
// of the Linked List:

// 1st node -> kth node -> 2nd node -> (k - 1)th node -> 3rd node -> (k - 2)th node -> ...

// Each LinkedList node has an integer `value` as well as a `next` node pointing to the
// next node in the list, or to None/null if it is the tail of the list.

// For the purposes of the problem, assume that the input Linked List will always have at least
// one node. In other words, the head of the Linked List will never be None/null.

// Sample Input:

// linkedList = 1 -> 2 -> 3 -> 4 -> 5 -> 6

// Sample Output:

// 1 -> 6 -> 2 -> 5 -> 3 -> 4

// Solution 1: