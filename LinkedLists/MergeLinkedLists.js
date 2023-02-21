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

// iterative solution using a set to store first linked list nodes, then looking for the convergence node, if any, between the linked lists

// O(n + m) time, where n is the length of list one and m is the length of list two
// O(n) space due to storing list one nodes in set

// base LinkedList class, with every node having a numeric value and next pointer
class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// main function which takes in the two linked lists to compare
function mergeLinkedLists(linkedListOne, linkedListTwo) {
    // create a new Set data structure, and store in variable listOneNodes
    let listOneNodes = new Set();
    // grab head value in linkedListOne and store in variable currentNodeOne
    let currentNodeOne = linkedListOne;
    // continue iterating so long as currentNodeOne doest not equal null, meaning not at the tail
    while (currentNodeOne !== null) {
        // use the add method to append value of currentNodeOne into the listOneNodes Set
        listOneNodes.add(currentNodeOne);
        // set currentNodeOne equal to the value of currentNodeOne.next
        currentNodeOne = currentNodeOne.next;
    }
    // grab head value in linkedListTwo and store in variable currentNodeTwo
    let currentNodeTwo = linkedListTwo;
    // continue iterating so long as currentNodeTwo does not equal null, meaning not at the tail
    while (currentNodeTwo !== null) {
        // use has method to check whether the value of currentNodeTwo exists in linkedListOne via the stored values
        if (listOneNodes.has(currentNodeTwo)) {
            // if it does, return the value of currentNodeTwo as this is the convergence point
            return currentNodeTwo;
        }
        // should the above if block not return, still searching for convergence point, so set currentNodeTwo equal to the next value of currentNodeTwo
        currentNodeTwo = currentNodeTwo.next;
    }
    // if break out of while loop again, reached the tail of linkedListOne without returning an answer, so there must be no convergence point, and should return null
    return null;
}

// Solution 2:

// iterative solution finding the lengths of lists, which is longer, and then finding the intersection point

// O(n + m) time, where n is the length of list one and m is the length of list two
// O(1) space due to only storing a few variables

// base LinkedList class, with every node having a numeric value and next pointer
class LinkedList {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// main function taking in the two linked lists
function mergingLinkedLists(linkedListOne, linkedListTwo) {
    // grab head of linkedListOne and store in variable currentNodeOne
    let currentNodeOne = linkedListOne;
    // set variable countOne equal to 0
    let countOne = 0;
    // continue looping so long as currentNodeOne is not null, meaning still within the linked list bounds
    while (currentNodeOne !== null) {
        // for each value in currentNodeOne, increment the countOne variable by 1
        countOne++;
        // set the value of currentNodeOne to equal the value of the next value in the list
        currentNodeOne = currentNodeOne.next;
    }
    // grab head of linkedListTwo and store in variable currentNodeTwo
    let currentNodeTwo = linkedListTwo;
    // set variable countTwo equal to 0
    let countTwo = 0;
    // continue looping so long as currentNodeTwo is not null, meaning still within the linked list bounds
    while (currentNodeTwo !== null) {
        // for each value in currentNodeTwo, increment the countTwo variable by 1
        countTwo++;
        // set the value of currentNodeTwo to equal the value of the next value in the list
        currentNodeTwo = currentNodeTwo.next;
    }
    // now that each list is counted for length, find the absolute value difference between their lengths, and store in variable difference
    let difference = Math.abs(countTwo - countOne);
    // determine whether linkedListOne or linkedListTwo are longer using ternary operators, and store in respective variables
    let biggerCurrentNode = countOne > countTwo ? linkedListOne : linkedListTwo;
    let smallerCurrentNode = countOne > countTwo ? linkedListTwo : linkedListOne;
    // iterate over the biggerCurrentNode, which should hold the linkedListOne, for as many values as the difference is
    for (let i = 0; i < difference; i++) {
        biggerCurrentNode = biggerCurrentNode.next;  
    }
    // keep looping over the lists so long as the biggerCurrentNode and smallerCurrentNode are not equal; when they are equal, this is the overlap point, so while loop will break
    while (biggerCurrentNode !== smallerCurrentNode) {
        // set each variable equal to the next node value
        biggerCurrentNode = biggerCurrentNode.next;
        smallerCurrentNode = smallerCurrentNode.next;
    }
    // once loop above breaks, should be at the intersection node, so return the value of biggerCurrentNode
    return biggerCurrentNode;
}