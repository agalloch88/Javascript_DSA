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

// iterative approach splitting the list into two halves, reversing the second half, and interweaving the two halves to "zip" the list

// O(n) time complexity due to iterating over the full list of n values twice, so 2n converges to n
// O(1) space complexity since only using a few variables, and performing the zip in place so not using extra data structures

// Definition for singly-linked list
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Main function to zip the linked list
function zipLinkedList(linkedList) {
  // Base case: if the list has less than 3 nodes, no zipping is needed
  if (linkedList.next === null || linkedList.next.next === null) {
    return linkedList;
  }

  // Step 1: Split the list into two halves
  let firstHalfHead = linkedList;
  let secondHalfHead = splitLinkedList(linkedList);

  // Step 2: Reverse the second half of the list
  let reversedSecondHalfHead = reverseLinkedList(secondHalfHead);

  // Step 3: Interweave the two halves
  return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead);
}

// Function to split the linked list into two halves
function splitLinkedList(linkedList) {
  let slowIterator = linkedList;
  let fastIterator = linkedList;

  // Use slow and fast pointers to find the middle of the list
  while (fastIterator !== null && fastIterator.next !== null) {
    slowIterator = slowIterator.next;
    fastIterator = fastIterator.next.next;
  }

  // Split the list into two halves
  let secondHalfHead = slowIterator.next;
  slowIterator.next = null; // Break the list into two parts
  return secondHalfHead;
}

// Function to interweave two linked lists
function interweaveLinkedLists(linkedList1, linkedList2) {
  let linkedList1Interator = linkedList1;
  let linkedList2Iterator = linkedList2;

  // Interweave nodes from the two lists
  while (linkedList1Interator !== null && linkedList2Iterator !== null) {
    let linkedList1InteratorNext = linkedList1Interator.next;
    let linkedList2IteratorNext = linkedList2Iterator.next;

    linkedList1Interator.next = linkedList2Iterator;
    linkedList2Iterator.next = linkedList1InteratorNext;

    linkedList1Interator = linkedList1InteratorNext;
    linkedList2Iterator = linkedList2IteratorNext;
  }

  return linkedList1;
}

// Function to reverse a linked list
function reverseLinkedList(head) {
  let previousNode = null;
  let currentNode = head;

  // Reverse the list by changing the next pointers
  while (currentNode !== null) {
    let nextNode = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }

  return previousNode; // Return new head of the reversed list
}
