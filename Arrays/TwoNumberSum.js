// Write a function which takes in a non-empty array of distinct integers, and an integer representing
// a target sum. If any two numbers in the input array sum up to the target sum, the function should
// return them in an array, in sorted order. If no two numbers sum up to the target sum, the function
// should return an empty array.

// Note that the target sum must be obtained by summing two different integers in the array; you can't
// add a single integer to itself in order to obtain the target sum.

// You can assume that there will be at most one pair of numbers summing up to the target sum.

// Sample input:
// array = [3, 5, -4, 8, 11, 1, -1, 6]
// targetSum = 10
// Sample output: [-1, 11]

// Solution 1:

// iterative solution using two pointers in for loops to compare values to targetSum

// O(n^2) time complexity due to nested for loops
// O(1) space complexity due to no additional data structures

function twoNumberSum(array, targetSum) {
  // start looping over array input, starting at index 0 for i
  for (let i = 0; i < array.length - 1; i++) {
    // grab value at i in input array and store in variable int1
    const int1 = array[i];
    // start second loop over input array, starting at index i plus 1
    for (let j = i + 1; j < array.length; j++) {
      // grab value at j in input array and store in variable int2
      const int2 = array[j];
      // check whether the sum of int1 plus int2 is equal to targetSum, and if so, execut below
      if (int1 + int2 === targetSum) {
        // return array containing int1 and int2
        return [int1, int2];
      }
    }
  }
  // should if block above never triggers, return an empty array
  return [];
}

// Solution 2:

// iterative solution keeping track of seen numbers and using algebraic equation to find potentialMatch value

// O(n) time due to single pass over input array
// O(n) space due to creating hashmap/JS object to store nums

function twoNumberSum2(array, targetSum) {
  // set up empty JS object and store in variable nums
  const nums = {};
  // iterate over every num in array
  for (const num of array) {
    // calculate the potentialMatch value by substracting targetSum by the current num
    const potentialMatch = targetSum - num;
    // if potentialMatch is in the nums JS object, there's a valid answer for two number sum problem
    if (potentialMatch in nums) {
      // if found, return the array of potentialMatch and the current num
      return [potentialMatch, num];
      // if potentialMatch is NOT in nums, add it in there and set value equal to true
    } else {
      nums[num] = true;
    }
  }
  // if no correct answer for problem, return empty array
  return [];
}

// Solution 3:

// iterative solution first sorting the input array and using binary search-style logic to find targetSum

// O(n log(n)) time due to using sort on input array
// O(1) space due to only storing pointer values and currentSum

function twoNumberSum3(array, targetSum) {
  // use in-built JS sort method on array, so best possible time complexity is automatically n log(n)
  array.sort((a, b) => a - b);
  // set left pointer equal to index 0
  const left = 0;
  // set right pointer equal to last item in sorted array
  const right = array.length - 1;
  // while the pointers do not overlap, keep looping
  while (left < right) {
    // take value at pointers left and right and add them together, store sum in variable currentSum
    const currentSum = array[left] + array[right];
    // if currentSum is equal to targetSum, then return array of left and right pointers, found the answer
    if (currentSum === targetSum) {
      return [array[left], array[right]];
      // if currentSum is smaller than targetSum, increment the left pointer as this will result in a larger sum since array is sorted from smallest to largest
    } else if (currentSum < targetSum) {
      left++;
      // if currentSum is larger than targetSum, decrement the right pointer as this will result in a smaller sum since array is sorted from smallest to largest
    } else if (currentSum > targetSum) {
      right--;
    }
  }
  // if pointers overlap, while loop will break, which means no matches for targetSum, so return empty array
  return [];
}

// Solution 4:

// iterative solution using set to keep track of seen numbers

// O(n) time due to iterating over n items in Set
// O(n) space due to creating new Set with input array

function twoNumberSum4(array, targetSum) {
  // create new Set and store in variable seen
  let seen = new Set();

  // iterate over every num in array
  for (let num of array) {
    let complement = targetSum - num;

    // if complement is in seen Set, return array of num and complement
    if (seen.has(complement)) {
      return [num, complement];
    }

    // if complement not in seen Set, add num to seen
    seen.add(num);
  }

  // if no correct answer for problem, return empty array
  return [];
}
