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

class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function sumOfLinkedLists(linkedListOne, linkedListTwo) {
    let newLinkedListHeadPointer = new LinkedList(0);
    let currentNode = newLinkedListHeadPointer;
    let carry = 0;

    let nodeOne = linkedListOne;
    let nodeTwo = linkedListTwo;

    while (nodeOne !== null || nodeTwo !== null || carry !== 0) {
        let valueOne = nodeOne !== null ? nodeOne.value : 0;
        let valueTwo = nodeTwo !== null ? nodeTwo.value : 0;
        let sumOfValues = valueOne + valueTwo + carry;

        let newValue = sumOfValues % 10;
        let newNode = new LinkedList(value);
        currentNode.next = newNode;
        currentNode = newNode;

        carry = Math.floor(sumOfValues / 10);
        nodeOne = nodeOne !== null ? nodeOne.next : null;
        nodeTwo = nodeTwo !== null ? nodeTwo.next : null;
    }
    return newLinkedListHeadPointer.next;
}