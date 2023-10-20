// The problem presents two Linked Lists of potentially unequal length. Each Linked List represents a non-negative integer, where each node in the Linked List is a digit
// of that integer, and the first node in each Linked Listt always represents the least significant digit of the integer. Write a function which returns the head of a
// new Linked List whcih represents the sum of the integers represented by the two input Linked Lists.

// Each Linked List node has an integer value, as well as a next node pointing to the next node in the list or to None/null if it is the tail of the Linked List.
// The value of each Linked List node is always in the range of 0-9.

// Note: the function must create and return a new Linked List, and cannot modify either of the input Linked Lists.

// Sample Input:
// linkedListOne = 2 -> 4 -> 7 -> 1
// linkedListTwo = 9 -> 4 -> 5

// Sample Output:
// 1 -> 9 -> 2 -> 2
// linkedListOne represents the integer 1742
// linkedListTwo represents the integer 549
// 1742 + 549 = 2291

// Solution 1:

// O(max(n, m)) time where n is length of linkedListOne and m is length of linkedListTwo
// O(max(n, m)) space where n is length of linkedListOne and m is length of linkedListTwo

// base LinkedList class, where every item in Linked List has a value and next pointer
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
// main function which takes in two input LinkedLists
function sumOfLinkedLists(linkedListOne, linkedListTwo) {
  // set pointer of the head to first position in new LinkedList
  let newLinkedListHeadPointer = new LinkedList(0);
  // grab pointer and store in currentNode variable
  let currentNode = newLinkedListHeadPointer;
  // keep track of exponent to carry to next addition operation
  let carry = 0;
  // store LinkedLists in variables nodeOne and nodeTwo
  let nodeOne = linkedListOne;
  let nodeTwo = linkedListTwo;
  // set up while loop to run while values for nodeOne, nodeTwo, and carry are correct
  while (nodeOne !== null || nodeTwo !== null || carry !== 0) {
    // store valueOne variable as result of ternary checking while nodeOne has a value or is null
    let valueOne = nodeOne !== null ? nodeOne.value : 0;
    // store valueTwo variable as result of ternary checking while nodeTwo has a value or is null
    let valueTwo = nodeTwo !== null ? nodeTwo.value : 0;
    // store addition of values and carry exponenets in sumOfValues
    let sumOfValues = valueOne + valueTwo + carry;
    // grab any remainder from sumOfValues and store in variable newValue
    let newValue = sumOfValues % 10;
    // create new LinkedList node via newValue, store in newNode variable
    let newNode = new LinkedList(newValue);
    // set next pointer of currentNode to equal newNode
    currentNode.next = newNode;
    // set currentNode equal to the newNode value
    currentNode = newNode;
    // assign carry variable to the floored result
    carry = Math.floor(sumOfValues / 10);
    // assign nodeOne and nodeTwo to ternary results
    nodeOne = nodeOne !== null ? nodeOne.next : null;
    nodeTwo = nodeTwo !== null ? nodeTwo.next : null;
  }
  // once while loop exits, move on to next value
  return newLinkedListHeadPointer.next;
}
