// Write a function which takes in the heads of two Singly Linked Lists which are in sorted order, respectively. The function should merge the lists in place, meaning it should not
// create a brand new list. The function should return the head of the merged list, and the merged list should also be in sorted order.

// Each LinkedList node has an integer value, as well as a next node pointing to the following node in the list, or to None/null if it happens to be the tail of the list.

// For the purposes of the problem, assume that the input Linked Lists will always have at least one node. In other words, the heads will never be None/null.

// Sample Input:

// headOne = 2 -> 6 -> 7 -> 8
// the head node above is value 2

// headTwo = 1 -> 3 -> 4 -> 5 -> 9 -> 10
// the head node above is value 1

// Sample Output:

// 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10
// the head node of the merged list is value 1

// Solution 1:

// iterative solution using three pointers to track positions within lists and check values

// O(nm) time due to checking all values between the two input lists
// O(1) space due to only storing three pointer values and doing constant time operations/checks

// singly LinkedList class, where every node has a value and potentially a next pointer
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// main function, which takes in the heads of the two lists to merge
function mergeLinkedLists(headOne, headTwo) {
  // initialize variable p1, and set equal to the head value passed in on headOne
  let p1 = headOne;
  // also need to track the previous value of headOne, so initialize variable p1Prev and set equal to null at outset, since starting at head
  let p1Prev = null;
  // initialize variable p2, and set equal to the head value passed in on headTwo
  let p2 = headTwo;

  // keep looping so long as still within head and tail bounds of both lists
  while (p1 !== null && p2 !== null) {
    // if the value of p1 is LESS than the value of p2, execute below as need to simply move along in first list
    if (p1.value < p2.value) {
      // move p1Prev pointer by setting it equal to value of p1
      p1Prev = p1;
      // move p1 pointer by setting equal to the p1 next value
      p1 = p1.next;
      // if the value of p1 is GREATER than the value of p2, then execute below
    } else {
      // handle edge case where p1Prev may be null, in which case p1 is still at the headOne value, so move p1Prev pointer by setting p1Prev next value equal to p2
      if (p1Prev !== null) {
        p1Prev.next = p2;
      }

      // move p1Prev pointer by setting it equal to p2 value
      p1Prev = p2;
      // move p2 pointer by setting it equal to p2's nexxt value
      p2 = p2.next;
      // link the p1Prev pointers next value by setting equal to p1
      p1Prev.next = p1;
    }
  }

  // handle edge case where p1 goes out of bounds of list, so set the p1Prev pointer's next value equal to p2 to continue the remainder of list
  if (p1 === null) {
    p1Prev.next = p2;
  }

  // return a ternary value of check to see which list had the smaller head value, and thus should be head for merged list
  return headOne.value < headTwo.value ? headOne : headTwo;
}

// Solution 2:

class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function mergeLinkedLists(headOne, headTwo) {
  recursiveMerge(headOne, headTwo, null);
  return headOne.value < headTwo.value ? headOne : headTwo;
}

function recursiveMerge(p1, p2, p1Prev) {
  if (p1 === null) {
    if (p1Prev !== null) {
      p1Prev.next = p2;
    }
    return;
  }

  if (p2 === null) {
    return;
  }

  if (p1.value < p2.value) {
    recursiveMerge(p1.next, p2, p1);
  } else {
    if (p1Prev !== null) {
      p1Prev.next = p2;
    }
    let newP2 = p2.next;
    p2.next = p1;
    recursiveMerge(p1, newP2, p2);
  }
}
