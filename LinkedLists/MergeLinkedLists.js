// The problem presents two Linked Lists of potentially unequal length. These Linked Lists potentially merge at a shared intersection node. Write a function which returns the intersection
// node, or returns None / null if there is no intersection.

// Each LinkedList node has an integer value, as well as a next node pointing to the next node in the list, or to None / null if it is the tail of the list.

// Note: the function should return an existing node. It should not modify either Linked List, and it should not create any new Linked Lists.

// Sample Input:
// linkedListOne = 2 -> 3 -> 1 -> 4
// linkedListTwo = 8 -> 7 -> 1 -> 4

// Sample Output:
// 1 -> 4
// The lists intersect at the node with value 1

// Solution 1:

class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function mergeLinkedLists(linkedListOne, linkedListTwo) {
    let listOneNodes = new Set();
    let currentNodeOne = linkedListOne;

    while (currentNodeOne !== null) {
        listOneNodes.add(currentNodeOne);
        currentNodeOne = currentNodeOne.next;
    }

    let currentNodeTwo = linkedListTwo;

    while (currentNodeTwo !== null) {
        if (listOneNodes.has(currentNodeTwo)) {
            return currentNodeTwo;
        }
        currentNodeTwo = currentNodeTwo.next;
    }

    return null;
}