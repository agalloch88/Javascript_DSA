// Write a function which takes in the ehad of a Singly Linked List, and an integer `k`, rearranges the list in place (meaning, does not created a brand new Linked List) around nodes
// with the value `k`, and returns its new head.

// Rearranging a Linked List around nodes with the value `k` means moving all nodes with a value smaller than `k` before all nodes with the value of `k`, and moving all
// nodes with a value greater than `k` after all nodes with value `k`.

// All moved nodes should maintain their relative ordering, if possible.

// Note that the Linked List should be rearranged even if it does not have any nodes with value `k`.

// Each LinkedList node has an integer `value` as well as a `next` node pointing tot he next node in the list, or to None/null if it is the tail of the list.

// For the purposes of the problem, assume that the input Linked List will always have at least one node. In other words, the head will never be None/null.

// Sample Input:

// head = 3 -> 0 -> 5 -> 2 -> 1 -> 4
// k = 3

// Sample Output:

// 0 -> 2 -> 1 -> 3 -> 5 -> 4

// the new head is node with value 0. Note that all nodes have maintained their relative ordering, even while being ordered around `k` relative to their number values

// Solution 1:

// iterative solution using three separate linked lists to contain the nodes smaller, larger, and equal
// to `k`, with helper functions to grow a given list by a node and another to connect the lists together

// O(n) time, where n is the number of nodes in the linked list, as each node is processed in constant time
// O(1) space due to rearranging the nodes in place

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
        node.next = null;  // Detach the current node from the original list

        // Append the current node to the appropriate list based on its value
        if (node.value < k) {
            [smallerListHead, smallerListTail] = growLinkedList(smallerListHead, smallerListTail, node);
        } else if (node.value > k) {
            [greaterListHead, greaterListTail] = growLinkedList(greaterListHead, greaterListTail, node);
        } else {
            [equalListHead, equalListTail] = growLinkedList(equalListHead, equalListTail, node);
        }

        node = nextNode; // Move to the next node
    }

    // Connect the smaller and equal lists
    let [firstHead, firstTail] = connectLinkedLists(smallerListHead, smallerListTail, equalListHead, equalListTail);
    // Connect the resulting list with the greater list
    let [finalHead, _] = connectLinkedLists(firstHead, firstTail, greaterListHead, greaterListTail);

    return finalHead; // Return the head of the rearranged list
}

// Function to add a node to the end of a linked list
function growLinkedList(head, tail, node) {
    let newHead = head;
    let newTail = node;  // Set the new tail to the current node

    if (newHead === null) {
        newHead = node; // If the list is empty, set the head to the new node
    } else {
        tail.next = node;  // Link the current tail to the new node
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
