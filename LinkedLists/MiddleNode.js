// The problem presents a Linked List with at least one node. Write a function which returns the middle node of the Linked List. If there are two middle nodes 
// (as in the case with an even-length list) the function should return the second of the two nodes.

// Each LinkedList node has an integer value, as well as a next node pointing to the next node in the list, or to None/null if it is the tail node of the list.

// Sample Input:

// linkedList = 2 -> 7 -> 3 -> 5

// Sample Output:

// 3 -> 5
// The middle could be either 7 or 3, but as problem requires, would return 3 as the second of the two nodes.

// Solution 1:

class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function middleNode(linkedList) {
    let count = 0;
    let currentNode = linkedList;

    while (currentNode !== null) {
        count++;
        currentNode = currentNode.next;
    }

    let middleNode = linkedList;
    
    for (let i = 0; i < Math.floor(count / 2); i++) {
        middleNode = middleNode.next;      
    }

    return middleNode;
}