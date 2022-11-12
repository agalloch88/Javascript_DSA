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
// can point to either another node, or None/null.

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

// solution employing class for Node and DoublyLinkedList, with methods specific to creating, removing, inserting, and setting nodes

// Node class for DoublyLinkedList nodes, with each having a value, prev pointer, and next pointer
class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

// class for constructing the DoublyLinkedList, containing all methods required, where each DoublyLinkedList has a head and tail property
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    setHead(node) {
        if (this.head === null) {
            this.head = node;
            this.tail = node;
            return;
        }
        this.insertBefore(this.head, node);
    }

    setTail(node) {
        if (this.tail === null) {
            this.setHead(node);
            return;
        }
        this.insertAfter(this.tail, node);
    }

    // in creating a DoublyLinkedList, this is the fifth operation (makes use of the remove method)
    // O(1) time
    // O(1) space
    insertBefore(node, nodeToInsert) {
        // check nodeToInsert passed in to see if dealing with head or tail, and if so, return, as there are specific functions used to insert these nodes
        if (nodeToInsert === this.head && nodeToInsert === this.tail) {
            return;
        }
        // if the checks above not triggered, call remove method on nodeToInsert
        this.remove(nodeToInsert);
        // grab node.prev from passed in node and set nodeToInsert.prev equal to this value
        nodeToInsert.prev = node.prev;
        // grab node passed in and set equal to nodeToInsert.next
        nodeToInsert.next = node;
        // if the value for node.prev is null, dealing with the head of the LinkedList, so set the head value equal to nodeToInsert
        if (node.prev === null) {
            this.head = nodeToInsert;
        // if not dealing with the head, set the next pointer of the node.prev equal to nodeToInsert
        } else {
            node.prev.next = nodeToInsert;
        }
        // finally, set node.prev value equal to the nodeToInsert
        node.prev = nodeToInsert;
    }

    insertAfter(node, nodeToInsert) {
        if (nodeToInsert === this.head && nodeToInsert === this.tail) {
            return;
        }
        this.remove(nodeToInsert);
        nodeToInsert.prev = node;
        nodeToInsert.next = node.next;

        if (node.next === null) {
            this.tail = nodeToInsert;
        } else {
            node.next.prev = nodeToInsert;
        }
        node.next = nodeToInsert;
    }

    insertAtPosition(position, nodeToInsert) {
        if (position === 1) {
            this.setHead(nodeToInsert);
            return;
        }
        let node = this.head;
        let currentPosition = 1;

        while (node !== null && currentPosition++ !== position) {
            node = node.next;
        }
        if (node !== null) {
            this.insertBefore(node, nodeToInsert);
        } else {
            this.setTail(nodeToInsert);
        }
    }

    // in creating a DoublyLinkedList, this is the fourth operation (makes use of the remov method to remove a node with specific value)
    // O(n) time
    // O(1) space
    removeNodesWithValue(value) {
        // grab value for head of the DoublyLinkedList and store in variable node
        let node = this.head;
        // while not at the tail, keep iterating
        while (node !== null) {
            // take current node and store in variable nodeToRemove
            let nodeToRemove = node;
            // take value of node.next and store in variable node
            node = node.next;
            // if the value of the nodeToRemove, aka current node, is equal to the value being looked for, call the remove method and pass in the nodeToRemove
            if (nodeToRemove.value === value) {
                this.remove(nodeToRemove);
            }
        }
    }

    // in creating a DoublyLinkedList, this is the third operation (must remove the node bindings first, and this makes use of that method)
    // O(1) time
    // O(1) space
    remove(node) {
        // 
        if (node === this.head) {
            this.head = this.head.next;
        }
        if (node === this.tail) {
            this.tail = this.tail.prev;
        }
        this.removeNodeBindings(node);
    }

    // in creating a DoublyLinkedList, this is the first operation
    // O(n) time
    // O(1) space
    containsNodeWithValue(value) {
        // grab the head of the list, store in variable node
        let node = this.head;
        // loop over inputs while the node is not null, and while have not found the value passed in which looking for in list
        while (node !== null && node.value !== value) {
            // if not found, still inside this loop, so set the node.next value equal to node and move to next check
            node = node.next;
        }
        // if outside while loop, either hit node === null or found the value, so return true or false depending on return statement
        return node !== null;
    }

    // in creating a DoublyLinkedList, this is the second operation
    // O(1) time
    // O(1) space
    removeNodeBindings(node) {
        // check whether the prev value of node passed in is equal to null, in which case this would be the head
        if (node.prev !== null) {
            // set the next value of the node's prev equal to the current node.next
            node.prev.next = node.next;
        }
        // check whether the next value of the node passed in is equal to null, in which case this would be the tail
        if (node.next !== null) {
            // set the prev value of the node's next equal to the current node.prev
            node.next.prev = node.prev;
        }
        // since grabbed the prev and next values already, set current node.prev and node.next equal to null, effectively removing the node from the DoublyLinkedList
        node.prev = null;
        node.next = null;
    }
}