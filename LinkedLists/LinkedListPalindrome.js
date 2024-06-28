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

// iterative solution rearranging a linked list by using other smaller linked lists, growing them, then connecting

// O(n) time due to iterating through the entire structure, and processing each node in constant time
// O(n) space due to storing n values in separate linked lists then joining them

class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function rearrangeLinkedList(head, k) {
  // Initialize the heads and tails for three separate lists
  let smallerListHead = null;
  let smallerListTail = null;
  let equalListHead = null;
  let equalListTail = null;
  let greaterListHead = null;
  let greaterListTail = null;

  // Traverse the original linked list
  let node = head;

  while (node !== null) {
    let nextNode = node.next; // Store the next node
    node.next = null; // Detach the current node from the original list

    // Append the current node to the appropriate list based on its value
    if (node.value < k) {
      [smallerListHead, smallerListTail] = growLinkedList(
        smallerListHead,
        smallerListTail,
        node,
      );
    } else if (node.value > k) {
      [greaterListHead, greaterListTail] = growLinkedList(
        greaterListHead,
        greaterListTail,
        node,
      );
    } else {
      [equalListHead, equalListTail] = growLinkedList(
        equalListHead,
        equalListTail,
        node,
      );
    }

    node = nextNode; // Move to the next node
  }

  // Connect the smaller and equal lists
  let [firstHead, firstTail] = connectLinkedLists(
    smallerListHead,
    smallerListTail,
    equalListHead,
    equalListTail,
  );
  // Connect the resulting list with the greater list
  let [finalHead, _] = connectLinkedLists(
    firstHead,
    firstTail,
    greaterListHead,
    greaterListTail,
  );

  return finalHead; // Return the head of the rearranged list
}

// Function to add a node to the end of a linked list
function growLinkedList(head, tail, node) {
  let newHead = head;
  let newTail = node; // Set the new tail to the current node

  if (newHead === null) {
    newHead = node; // If the list is empty, set the head to the new node
  } else {
    tail.next = node; // Link the current tail to the new node
  }

  return [newHead, newTail]; // Return the new head and tail of the list
}

// Function to connect two linked lists
function connectLinkedLists(headOne, tailOne, headTwo, tailTwo) {
  let newHead = headOne === null ? headTwo : headOne; // Determine the new head
  let newTail = headTwo === null ? tailOne : tailTwo; // Determine the new tail

  if (tailOne !== null) {
    tailOne.next = headTwo; // Connect the tail of the first list to the head of the second list
  }

  return [newHead, newTail]; // Return the new head and tail of the connected lists
}
