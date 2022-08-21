// Write a DoublyLinkedList class which has a head and a tail, both of which point to
// either a linked list Node, or None/null. The class should support:

// - Setting the head and tail of the linked list
// - Inserting nodes before and after other nodes, as well as at a given position
//  (the position of the head node is 1)
// - Removing given nodes and removing nodes with given values
// - Searching for nodes with given values

// Note that the setHead, setTail, insertBefore, insertAfter, insertAtPosition, and
// remove methods all take in actual Nodes as input parameters - not integers
// (except for insertAtPosition, which also take in an integer representing the position).
// This means no new Nodes need to be created in these methods. The input nodes can be either
// stand-alone nodes or nodes that are already in the linked list. If they're nodes that are
// already int he linked list, the methods will effectively be moving the nodes  within the
// linked list. Input nodes will not be called out as already existing in the linked list
// or not, so the solution must defensively handle this scenario.

// Doing this problem in an untyped language like python or JS may benefit from looking at
// the various function signatures whiche exist in a typed language like java or TS. This may
// allow more clarity around what each input parameter is.

// Each node has an integer value, as well as a prev node and a next node, both of which
//can point to either another node, or None/null.

// Sample Usage:

// Assume the following linked list already exists:
// 1 <-> 2 <-> 3 <-> 4 <-> 5
// Assume there are also the following stand-alone nodes:
// 3, 3, 6
// setHead(4): 4 <-> 1 <-> 2 <-> 3 <-> 5
// sets the existing node with value 4 as the head of the linked list
// setTail(6): 4 <-> 1 <-> 2 <-> 3 <-> 5 <-> 6
// sets the stand-alone node with value of 6 as the tail of the linked list
// insertBefore(6, 3): 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6
// move the existing node with value three before existing node with value 6
// insertAfter(6, 3): 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6 <-> 3
// insert stand-alone node with value 3 after existing node with value 6
// insertAtPosition(1, 3): 3 <-> 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6 <-> 3
// insert a stand-alone node with the value 3 at position 1
// removeNodesWithValue(3): 4 <-> 1 <-> 2 <-> 5 <-> 6
// remove all nodes with value 3
// remove(2): 4 <-> 1 <-> 5 <-> 6
// remove existing node with value 2
// containsNodeWithValue(5): true
// return boolean for whether existing nodes contain specific value

// Solution 1:

class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    setHead(node) {

    }

    setTail(node) {

    }

    insertBefore(node, nodeToInsert) {

    }

    insertAfter(node, nodeToInsert) {

    }

    insertAtPosition(position, nodeToInsert) {

    }

    removeNodesWithValue(value) {

    }

    remove(node) {

    }

    containsNodeWithValue(value) {

    }

    removeNodeBindings(node) {
        
    }
}