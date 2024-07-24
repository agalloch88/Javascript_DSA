// Write a function which takes in the head of a Singly Linked List, swaps every pair of adjacent nodes in place (meaning, the function does not create a new Linked List)
// and which returns the new head of the Singly Linked List.

// If the input Linked List has an odd number of nodes, the final node should remain the same.

// Each `LinkedList` has an integer `value`, as well as a `next` node pointing to the next node in the list, or to None/null if it is the tail of the list.

// For the purposes of the problem, assume the input Linked List will always have at least one node. In other words, the head will never be None/null.

// Sample Input:

// head = 0 -> 1 -> 2 -> 3 -> 4 -> 5

// Sample Output:

// 1 -> 0 -> 3 -> 2 -> 5 -> 4

// Solution 1:

// recursive solution performing a swap on a node, then recursing back up from end of the list with the actual values

// O(n) time due to checking and swapping n nodes
// O(n) space due to storing up to n calls on the recusive call stack

// main LinkedList class, where every node has a value and potentially a next pointer
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// main nodeSwap function which takes in the head of a LinkedList
function nodeSwap(head) {
  // base case
  // check whether the head is null, or if the next pointer of the head is null, in which case no swaps must be done
  if (head === null || head.next === null) {
    // since no swaps needed, simply return the existing head as the answer
    return head;
  }

  // initialize variable nextNode and set equal to the node pointed to by head.next
  let nextNode = head.next;
  // set the value of head.next equal to the return value of recursive call to nodeSwap, passing in the head.next.next value
  head.next = nodeSwap(head.next.next);
  // complete the swap by setting the nextNode.next value equal to head
  nextNode.next = head;
  // return the answer by returning the value of nextNode as the new head of LinkedList
  return nextNode;
}
