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

// recurisve solution checking for palindrome characteristics

// O(n) time due to visiting each node once during recursive execution
// O(n) space due to storing n values on the call stack

// Definition of the LinkedList node
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Helper class to store the results of the palindrome check
class LinkedListInfo {
  constructor(outerNodesAreEqual, leftNodeToCompare) {
    this.outerNodesAreEqual = outerNodesAreEqual;
    this.leftNodeToCompare = leftNodeToCompare;
  }
}

// Main function to check if the linked list is a palindrome
function linkedListPalindrome(head) {
  // Call the recursive helper function
  let isPalindromeResults = isPalindrome(head, head);
  // Return the final result indicating if the linked list is a palindrome
  return isPalindromeResults.outerNodesAreEqual;
}

// Recursive function to check if the linked list is a palindrome
function isPalindrome(leftNode, rightNode) {
  // Base case: if the right node reaches the end, return true and the left node
  if (rightNode === null) {
    return new LinkedListInfo(true, leftNode);
  }

  // Recursive call to move rightNode to the end of the list
  let recursiveCallResults = isPalindrome(leftNode, rightNode.next);
  // Destructure the results of the recursive call
  let { leftNodeToCompare, outerNodesAreEqual } = recursiveCallResults;
  // Check if the current nodes are equal and previous comparisons were equal
  let recursiveIsEqual =
    outerNodesAreEqual && leftNodeToCompare.value === rightNode.value;
  // Move the left node to the next node for the next comparison
  let nextLeftNodeToCompare = leftNodeToCompare.next;

  // Return the comparison result and the next left node to compare
  return new LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare);
}

// Solution 2:

// O(n) time due to traversing the list to find the middle, then reversing the second half, and comparing the halves
// O(1) space due to only using a couple pointers and variables, and reversing the list in place

// Definition of the LinkedList node
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Function to check if the linked list is a palindrome
function linkedListPalindrome(head) {
  // Initialize two pointers: slowNode and fastNode
  let slowNode = head;
  let fastNode = head;

  // Move slowNode one step and fastNode two steps until fastNode reaches the end
  while (fastNode !== null && fastNode.next != null) {
    slowNode = slowNode.next;
    fastNode = fastNode.next.next;
  }

  // Reverse the second half of the linked list
  let reversedSecondHalfNode = reverseLinkedList(slowNode);
  let firstHalfNode = head;

  // Compare the first half and the reversed second half
  while (reversedSecondHalfNode !== null) {
    if (reversedSecondHalfNode.value !== firstHalfNode.value) {
      return false; // Return false if any values do not match
    }

    // Move both pointers to the next nodes
    reversedSecondHalfNode = reversedSecondHalfNode.next;
    firstHalfNode = firstHalfNode.next;
  }

  return true; // Return true if all values match
}

// Function to reverse a linked list
function reverseLinkedList(head) {
  let previousNode = null;
  let currentNode = head;

  // Iterate through the linked list and reverse the links
  while (currentNode !== null) {
    let nextNode = currentNode.next; // Temporarily store the next node
    currentNode.next = previousNode; // Reverse the current node's link
    previousNode = currentNode; // Move previousNode to the current node
    currentNode = nextNode; // Move currentNode to the next node
  }

  return previousNode; // Return the new head of the reversed list
}
