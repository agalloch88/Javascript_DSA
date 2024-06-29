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
  let {leftNodeToCompare, outerNodesAreEqual} = recursiveCallResults;
  // Check if the current nodes are equal and previous comparisons were equal
  let recursiveIsEqual = outerNodesAreEqual && leftNodeToCompare.value === rightNode.value;
  // Move the left node to the next node for the next comparison
  let nextLeftNodeToCompare = leftNodeToCompare.next;
  
  // Return the comparison result and the next left node to compare
  return new LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare);
}