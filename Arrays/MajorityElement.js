// Write a function which takes in a non-empty, unordered array of positive integers, and
// which returns the array's majority element without sorting the array, and also without
// using more than constant space.

// An array's majority element is an element of the array which appears in over half of the array's
// indices. Note that the most common element of an array (meaning the element which appears
// the most times in the array) is NOT necessarily the array's majority element. For example,
// the arrays [3, 2, 2, 1] and [3, 4, 2, 2, 1] both have 2 as their most common element, yet
// neither array has a majority element, because neither 2 nor any other element appears in
// more than half of the respective arrays' indices.

// For the context of the problem, assume that the input array will always have a majority
// element.

// Sample Input:

// array = [1, 2, 3, 2, 2, 1, 2]

// Sample Output:

// 2, as 2 occurs in 4 of 7 indices, making it the majority element

// Solution 1:

// iterative solution making one pass over the array and tracking count plus answer

// O(n) time due to checking every value in input array
// O(1) space due to only storing two variables, as a constraint of the problem

function majorityElement(array) {
  // initialize variable count and set equal to 0
  let count = 0;
  // initialize variable answer and set equal to null, as currently no answer
  let answer = null;
  // iterate over every value in the input array
  for (let value of array) {
    // if the count is equal to 0, set the answer equal to whatever the current value is
    // this may be at the start of the for loop, or whenever count decreases back to 0
    if (count === 0) {
      answer = value;
    }
    // if value and answer are equal, this is another possible majority element, so increment count by 1
    if (value === answer) {
      count++;
      // otherwise, this is not indicative of an answer, so decrement count by 1
    } else {
      count--;
    }
  }
  // once at the end of the input array, should have the answer stored in this variable, so return answer
  return answer;
}

// Solution 2:

// iterative solution utilizing bit manipulation

// O(n) time due to checking n values in input array
// O(1) space to comply with requirement of problem, only storing a couple variables

function majorityElement2(array) {
  let answer = 0;

  for (let currentBit = 0; currentBit < 32; currentBit++) {
    let currentBitValue = 1 << currentBit;
    let onesCount = 0;

    for (let num of array) {
      if ((num & currentBitValue) !== 0) {
        onesCount++;
      }
    }

    if (onesCount > array.length / 2) {
      answer += currentBitValue;
    }
  }
  return answer;
}
