// Write a function which takes in the head of a Singly Linked List, reverses the list in place (meaning, the solution does not create a brand new Linked List)
// and returns the new head of the Linked List.

// Each Linked List node has an integer value, as well as a next node pointing to the next node in the list, or to None/null if it is the tail of the Linked List.

// In the context of the problem, assume that the input Linked List will always have at least one node. In other words, the head will never be None/null.

// Sample Input:
// head = 0 -> 1 -> 2 -> 3 -> 4 -> 5

// Sample Output:
// 5 -> 4 -> 3 -> 2 -> 1 -> 0

// Solution 1:

// iterative solution using three pointers to accomplish reversal cleanly and elegantly

// O(n) time due to traversing entire Linked List input
// O(1) time due to only storing three pointer values, reversing the Linked List in place

// LinkedList class, with every node having integer value and next value for pointing to next value in the LinkedList
class LinkedList {
    constructore(value) {
        this.value = value;
        this.next = null;
    }
}
// main function, which takes in the head value of the LinkedList
function reverseLinkedList(head) {
    // using three adjacent pointers here, with p2CurrentNode in the middle, so at start, p1PreviousNode equal to null since out of bounds
    let p1PreviousNode = null;
    // initialize p2CurrentNode equal to the head value passed in, which is the first value in the LinkedList
    let p2CurrentNode = head;
    // set up while loop to iterate through all the inputs so long as p2CurrentNode value is not equal to null
    // this loop will break once p2CurrentNode reaches the tail of the LinkedList, which points to null
    while (p2CurrentNode !== null) {
        // set up p3NextNode pointer, which is equal to the p2CurrentNode.next value
        // cleaner to initialize p3NextNode value inside of while loop, otherwise have to do some extra checks at the end of the loop
        let p3NextNode = p2CurrentNode.next;
        // since p2CurrentNode.next value was grabbed and stored by p3NextNode, set p2CurrentNode.next equal to p1PreviousNode, effectively reversing the pointer and the list
        p2CurrentNode.next = p1PreviousNode;
        // set p1PreviousNode equal to p2CurrentNode, moving the pointers along the list
        p1PreviousNode = p2CurrentNode;
        // set p2CurrentNode equal to p3NextNode at the end of loop
        p2CurrentNode = p3NextNode;
    }
    // once while loop breaks, means that p2CurrentNode is equal to the LinkedList tail, so reversal is done, so return p1PreviousNode which is now the head of the LinkedList
    return p1PreviousNode;
}