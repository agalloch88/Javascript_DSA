// The problem presents a Linked List with at least one node. Write a function which returns the middle node of the Linked List. If there are two middle nodes 
// (as in the case with an even-length list) the function should return the second of the two nodes.

// Each LinkedList node has an integer value, as well as a next node pointing to the next node in the list, or to None/null if it is the tail node of the list.

// Sample Input:

// linkedList = 2 -> 7 -> 3 -> 5

// Sample Output:

// 3 -> 5
// The middle could be either 7 or 3, but as problem requires, would return 3 as the second of the two nodes.

// Solution 1:

// iterative solution incrementing count with each node, then utlizing count to find the midpoint and returning midpoint node

// O(n) time due to iterating over nodes 1.5 times
// O(1) space due to only storing a couple variables

// LinkedList class, where each node has a value and next pointer, potentially
class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// main function which takes in the linked list input
function middleNode(linkedList) {
    // initialize variable count to 0
    let count = 0;
    // initialize variable currentNode and set it equal to the linkedList input
    let currentNode = linkedList;
    // continue iterating over the input so long as the currentNode is not null
    // once while loop breaks, should have count of how many nodes are in linkedList input
    while (currentNode !== null) {
        // for every node iterated over, increment variable count by 1
        count++;
        // set currentNode equal to the value pointed to by currentNode.next
        currentNode = currentNode.next;
    }
    // initialize variable middleNode and set equal to the linkedList input
    let middleNode = linkedList;
    // iterate over the input up to the midpoint, calculated by flooring the count divided by 2 value
    for (let i = 0; i < Math.floor(count / 2); i++) {
        // set the middleNode variable equal to middleNode.next
        middleNode = middleNode.next;      
    }
    // should either have the exact middle, or the second middle value, depending on whether odd or even length, so return middleNode
    return middleNode;
}