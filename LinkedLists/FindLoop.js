// Write a function which takes in the head of a Singly Linked List, and which contains a loop. In other words, the list's tail node points to some node in the list,
// rather than conventionally pointing to a None/null value. The function should return the node (the actual node, not solely the value) from which the loop originates,
// and it should do so in constant space.

// Each LinkedList node has an integer value, as well as a next node pointing to the next node in the list.

// Sample Input:
// head = 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6
//                            ^         |
//                            |         V
//                            9 <- 8 <- 7

// Sample Output:
// The node with the value 4

// Solution 1:

// iterative solution using two pointers and algebraic principles to determine where pointers will overlap as start of the loop

// O(n) time due to iterating over all values in Linked List, 2n converges to n
// O(1) space due to only storing two variables, no auxillary data structures per requirement of constant space

// main LinkedList class, showing properties of value and next on each node
class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
// main function, which takes in a parameter labeled head which is the start of the Linked list
function findLoop(head) {
    // set up first pointer, and set equal to head.next
    let first = head.next;
    // set up second pointer, and set it next to first pointer so while condition below will not immediately exit
    let second = head.next.next;
    // start iterating so long as the pointers do not overlap
    while (first !== second) {
        // keep incrementing the first pointer by one value
        first = first.next;
        // increment the second pointer by 2x that of the first, such that the second pointer will eventually lap the first and the while loop will break
        second = second.next.next;
    }
    // when the while loop above breaks, set the first pointer back to the head, now will increment to find where they overlap again and should be the loop start point
    first = head;
    // start another while loop which will exit when the pointers once again overlap. the second pointer is within the loop at this point
    while (first !== second) {
        // keep incrementing the first pointer by one
        first = first.next;
        // this time, increment the second pointer by one, too, so they are moving at the same place the overlap/converge at the loop start
        second = second.next;
    }
    // when the loop above exits, return wherever the first pointer is
    return first;
}

// Solution 2:

class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function findLoop(head) {
    let node = head;

    while (node) {
        if (node.seen) {
            return node;
        } else {
            node.seen = true;
        }
        node = node.next;
    }
}