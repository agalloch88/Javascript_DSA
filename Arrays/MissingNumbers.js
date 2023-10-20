// The problem presents an unordered array of unique integers, nums, in the range of [1, n],
// where n represents the length of nums + 2. This means two numbrers in this range are missing
// from the array.

// Write a function which takes in this array, and returns a new array with the two missing
// numbers, sorted numerically.

// Sample Input:

// nums = [1, 4, 3]

// Sample Output:

// [2, 5]
// n is 5, meaning the completed list should be [1, 2, 3, 4, 5]

// Solution 1:

// iterative solution using Set to check whether given number exists in Set

// O(n) time due to iterating over n items in Set
// O(n) space due to creating new Set with input array and solution array

function missingNumbers(nums) {
  // initialize variable includedNums and set equal to a new Set object created from input array nums
  let includedNums = new Set(nums);
  // initialize variable solution and set equal to empty array
  let solution = [];
  // iterate over includedNums from 1 to nums.length + 3
  for (let num = 1; num < nums.length + 3; num++) {
    // if includedNums set does NOT contain the given num, execute below
    if (!includedNums.has(num)) {
      // push current num into solution array
      solution.push(num);
    }
  }
  // once for loop ends, return the solution array containing the missing numbers
  return solution;
}

// Solution 2:

// iterative solution finding missing numbers based on splitting input into halves

// O(n) time due to iterating over n inputs in nums
// O(1) space due to only storing a few variables

// main function which takes in nums input
function missingNumbers(nums) {
  // initialize variable total, and set equal to the return of two helper functions, sum and arrayFromAToB
  // should now have a numerical "total" from the input values, less the two missing numbers which need to be found
  let total = sum(arrayFromAToB(1, nums.length + 3));
  // for every num in the nums input, subtract this amount from the sum in total variable
  // should now have the "sum" of the two missing numbers in total
  for (let num of nums) {
    total -= num;
  }
  // initialize variable averageMissingValue and set equal to the floored average of total
  let averageMissingValue = Math.floor(total / 2);
  // inititalize variables foundFirstHalf and foundSecondHalf, and set equal to 0 at the outset
  let foundFirstHalf = 0;
  let foundSecondHalf = 0;
  // loop over every num in nums input
  for (let num of nums) {
    // if the current num is less than or equal to the current value of foundFirstHalf, add the value of num to foundFirstHalf
    if (num <= averageMissingValue) {
      foundFirstHalf += num;
      // if the current num is NOT less than or equal to the averageMissingValue, then add the value of current num to foundSecondHalf
    } else {
      foundSecondHalf += num;
    }
  }
  // inititalize variable expectedFirstHalf, and set equal to return of two helpers, the sum of the array of values from 1 to averageMissingValue plus 1
  let expectedFirstHalf = sum(arrayFromAToB(1, averageMissingValue + 1));
  // initialize variable expectedSecondHalf, and set equal to return of two helpers, the sum of the array of values from averageMissingValue plus 1 to the last item in nums plus three
  let expectedSecondHalf = sum(
    arrayFromAToB(averageMissingValue + 1, nums.length + 3),
  );
  // return an array containing the final values, calculated by subtracting foundFirstHalf from expectedFirstHalf, and subtracting foundSecondHalf from expectedSecondHalf
  return [
    expectedFirstHalf - foundFirstHalf,
    expectedSecondHalf - foundSecondHalf,
  ];
}
// helper function which compares two values from arrays
let arrayFromAToB = (a, b) => {
  // initialize variable array to empty array
  let array = [];
  // loop over every num that is less than input b
  // in theory, this should include the two missing nums which need to be found
  for (let num = a; num < b; num++) {
    // push every num into the array
    array.push(num);
  }
  // return the array
  return array;
};
// helper function which sums values, using reduce method to add values a and b together
let sum = (array) => array.reduce((a, b) => a + b);

// Solution 3:

// solution using bitwise operations, where XOR removes duplicates

// O(n) time
// O(1) space

function missingNumbers(nums) {
  // initialize variable solutionXOR equal to 0
  let solutionXOR = 0;
  // iterate through the expected range to cancel out any duplicates
  for (let i = 0; i < nums.length + 3; i++) {
    solutionXOR ^= i;
    // also need to do this XOR process on the nums input
    if (i < nums.length) {
      solutionXOR ^= nums[i];
    }
  }
  // initialize variable solution equal to a two-value array, with placeholder 0's
  let solution = [0, 0];
  // initialize variable setBit and use two's complement to get rightmost XOR
  let setBit = solutionXOR & -solutionXOR;
  // use setBit to iterate over expected range to find other number
  for (let i = 0; i < nums.length + 3; i++) {
    // if i does not have binary setBit 1, then execute below and update leftmost number
    if ((i & setBit) === 0) {
      solution[0] ^= i;
      // if i does have binary setBit 1, then execute below and update rightmost number
    } else {
      solution[1] ^= i;
    }
    // need to do same check on nums input, so if i is less than length of nums, execute below
    if (i < nums.length) {
      // if nums and i do NOT have setBit set, then execute below and set leftmost number in solution equal to XOR at i in nums
      if ((nums[i] & setBit) === 0) {
        solution[0] ^= nums[i];
        // if nums at i DOES have the setBit set, then execute below
      } else {
        solution[1] ^= nums[i];
      }
    }
  }
  // sort and then return the values in solution
  solution.sort((a, b) => a - b);
  return solution;
}
