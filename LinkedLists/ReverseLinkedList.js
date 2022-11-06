// Write a function which takes in the head of a Singly Linked List, reverses the list in place (meaning, the solution does not create a brand new Linked List)
// and returns the new head of the Linked List.

// Each Linked List node has an integer value, as well as a next node pointing to the next node in the list, or to None/null if it is the tail of the Linked List.

// In the context of the problem, assume that the input Linked List will always have at least one node. In other words, the head will never be None/null.

// Sample Input:
// head = 0 -> 1 -> 2 -> 3 -> 4 -> 5

// Sample Output:
// 5 -> 4 -> 3 -> 2 -> 1 -> 0

// Solution 1:

class LinkedList {
    constructore(value) {
        this.value = value;
        this.next = null;
    }
}

function reverseLinkedList(head) {
    let p1PreviousNode = null;
    let p2CurrentNode = head;

    while (p2CurrentNode !== null) {
        let p3NextNode = p2CurrentNode.next;
        p2CurrentNode.next = p1PreviousNode;
        p1PreviousNode = p2CurrentNode;
        p2CurrentNode = p3NextNode;
    }
    return p1PreviousNode;
}