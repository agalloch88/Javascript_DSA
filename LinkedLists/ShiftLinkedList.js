// Write a function which takes in the head of a Singly Linked List, and an integer, k. The function should shift the list in place (i.e., does not create a brand new list) by k positions,
// and return the new head of the list.

// Shifting a Linked List means moving its nodes forward or backward, and wrapping them around the list where appropriate. For example, shifting a Linked List forward by one
// position would make its tail become the new head of the Linked List.

// Whether nodes are moved forward or backward is determined by whether the integer k is positive or negative.

// Each LinkedList node hasa an integer value, as well as a next node pointing to the next node in the list, or to None/null if the it is the tail of the list.

// For the purposes of the problem, assume that the input Linked List will always have at least one node. In other words, the head will never be None/null.

// Sample Input:

// head = 0 -> 1 -> 2 -> 3 -> 4 -> 5
// the head node here has a value of 0

// k = 2

// Sample Output:

// 4 -> 5 -> 0 -> 1 -> 2 -> 3
// the new head, after shifting 2 positions, is node with value of 4

// Solution 1:

// iterative solution performing a few distinct operations: finding end of list, findind what should be new tail based on k, and changing next pointers for new tail, old head, and old tail

// O(n) time due to iterating through the list once to find tail, again to find new tail, so 2n converges to n
// O(1) space due to only storing a few new variables

// LinkedList class for singly linked lists, where every node has a value and potentially a next pointer (except for tail)
class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// main function which takes in the head of the linked list, and value of k to shift the list by
function shiftLinkedList(head, k) {
    // initialize variable listLength, and set equal to 1 since there will always be at least a head node
    let listLength = 1;
    // initialize variable listTail, and set it equal to the value of head
    // since there will be a shift of some sort, unless in specific edge case of k = 0, want to grab this value so it is not lost
    let listTail = head;

    // iterate over the linked list until the tail of the list is found
    while (listTail.next !== null) {
        // move from current listTail, which is initially the head, to the node pointed to in next
        listTail = listTail.next;
        // increment the value of listLength each time
        listLength++;
    }

    // initialize variable offset, which is used to work backward and find new tail
    // need to get the absolute value of k, as it may be positive or negative
    // in the cases of very large k values, such as 30 or -45, want to get the remainder value of k / listLength, as that will be the effective offset after successive loops if k > listLength
    let offset = Math.abs(k) % listLength;
    // in the edge case where k equals 0, there is no shift to perform, so simply return the value of head as the answer
    if (offset === 0) {
        return head;
    }

    // initialize variable newTailPosition to hold the value of the new tail
    // this is where an absolute value of the offset comes in useful, as can subtract the offset from listLength to find the new tail when k is positive, and simply use the offset value if k is negative
    // to obtain the number of positions forward from the head
    let newTailPosition = k > 0 ? listLength - offset : offset;
    // set newTail equal to the current head
    let newTail = head;

    // iterate over all nodes in the linked list until reaching the newTailPosition node
    for (let i = 1; i < newTailPosition; i++) {
        // move along in linked list by accessing next pointer
        newTail = newTail.next;
    }

    // order of operations is very important here to not lose any of the values
    // already have original head, newTail, so need newHead and to remove next pointer from newTail
    // once for loop finishing, initialize variable newHead and set equal to the next value of newTail, as the successive node from newTail will be the revised shifted head of the list
    let newHead = newTail.next;
    // remove the next pointer by setting newTail's next to null
    newTail.next = null;
    // set listTail's next pointer to equal the head
    listTail.next = head;
    // return newHead as the solution to the problem
    return newHead;
}