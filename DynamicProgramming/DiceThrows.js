// The problem presents a set of numDice dice, each with numSides sides, and a target integer,
// which represents a target sum to obtain when rolling all the dice and summing the rolled
// values. Write a function which returns the total number of dice-roll permutations which
// sum up to exactly the target integer value.

// All three input values will always be positive integers. Each of the dice has an equal probability
// of landing on any number from 1 to numSides. Identical total dice rolls obtained from different
// individual dice rolls (for example, [2, 3] and [3, 2]) count as different dice roll permutations.
// If there are no possible dice roll combinations which sum up to the target given the
// input dice options, the function should return 0.

// Sample Input:

// numDice = 2
// numSides = 6
// target = 7

// Sample Output:

// 6
// [1, 6], [2, 5], [4, 3], [3, 4], [5, 2], [6, 1]

// Solution 1:

// recursive solution building out a possibility tree

// O(d * s * t) time, as must consider every die, plus the sides per die, plus the target
// O(d * t) space, due to storing die times target possibilities

// main function, which takes in the numDice, numSides, and target inputs
function diceThrows(numDice, numSides, target) {
  // initialize variable storedResults, which will be a 2D array. and set equal to a new array of numDice + 1 length, filled with undefined
  // , then mapped for every undefined value to a new array of target + 1 length and filled with -1's
  let storedResults = new Array(numDice + 1)
    .fill(undefined)
    .map((_) => new Array(target + 1).fill(-1));
  // return a call to helper function diceThrowsHelper, passing in the three main inputs plus the storedResults 2D array
  return diceThrowsHelper(numDice, numSides, target, storedResults);
}

// helper function to abstract the recursive logic, taking in additional input of storedResults 2D array
function diceThrowsHelper(numDice, numSides, target, storedResults) {
  // base cases
  // check for edge case where numDice is 0
  if (numDice === 0) {
    // if so, return a ternary check of whether target is also 0, in which case return 1 as the answer, otherwise return 0
    return target === 0 ? 1 : 0;
  }

  // check whether the result at target value for numDice in the stored results is greater than -1, and if so, execute below
  if (storedResults[numDice][target] > -1) {
    // return the value at target for numDice in storedResults
    return storedResults[numDice][target];
  }

  // recursive case
  // initialize variable numWaysToReachTarget, and set to 0
  // for every value of remaining dice and integer needed to reach target, will calculate the possible number of ways to reach it and store in this var
  let numWaysToReachTarget = 0;

  // for every currentTarget, execute the following
  for (
    let currentTarget = Math.max(0, target - numSides);
    currentTarget < target;
    currentTarget++
  ) {
    // increment numWaysToReachTarget by the recursive return value from call to diceThrowsHelper
    // decrement numDice by 1 to account for current throw, and pass in numSides, the currentTarget, and the storedResults
    numWaysToReachTarget += diceThrowsHelper(
      numDice - 1,
      numSides,
      currentTarget,
      storedResults,
    );
  }

  //   set the value of target at numDice in storedResults equal to the numWaysToReachTarget, then return this value
  storedResults[numDice][target] = numWaysToReachTarget;
  return numWaysToReachTarget;
}

// Solution 2:
// Space Complexity: O(numDice * target)
// We use a 2D array `storedResults` with dimensions (numDice + 1) x (target + 1).
// Hence, the space complexity is O(numDice * target).

// Time Complexity: O(numDice * target * numSides)
// We iterate over the number of dice (numDice), the possible target sums (target),
// and for each combination, we iterate over the number of sides on the dice (numSides).
// Thus, the time complexity is O(numDice * target * numSides).

function diceThrows(numDice, numSides, target) {
  // Create a 2D array to store the results of subproblems
  // storedResults[d][t] will be the number of ways to achieve target 't' using 'd' dice
  let storedResults = new Array(numDice + 1)
    .fill(undefined)
    .map((_) => new Array(target + 1).fill(0));
  
  // Base case: There is 1 way to achieve a target sum of 0 with 0 dice
  storedResults[0][0] = 1;

  // Iterate over the number of dice from 1 to numDice
  for (let currentNumDice = 1; currentNumDice < numDice + 1; currentNumDice++) {
    // Iterate over all possible target sums from 0 to the desired target
    for (let currentTarget = 0; currentTarget < target + 1; currentTarget++) {
      let numWaysToReachTarget = 0;

      // Consider each face of the dice and add the ways to reach the current target
      // from the previous number of dice and the current face value
      for (
        let currentNumSides = 1;
        currentNumSides < Math.min(currentTarget, numSides) + 1;
        currentNumSides++
      ) {
        numWaysToReachTarget +=
          storedResults[currentNumDice - 1][currentTarget - currentNumSides];
      }
      // Store the number of ways to achieve the current target with the current number of dice
      storedResults[currentNumDice][currentTarget] = numWaysToReachTarget;
    }
  }
  // Return the number of ways to achieve the target sum with the given number of dice
  return storedResults[numDice][target];
}

// Solution 3
// Space Complexity: O(target)
// We use two arrays of size (target + 1) to store the results of subproblems.
// Hence, the space complexity is O(target).

// Time Complexity: O(numDice * target * numSides)
// We iterate over the number of dice (numDice), the possible target sums (target),
// and for each combination, we iterate over the number of sides on the dice (numSides).
// Thus, the time complexity is O(numDice * target * numSides).

function diceThrows(numDice, numSides, target) {
  // Initialize two arrays to store the results of subproblems for two consecutive numbers of dice
  // Each array has dimensions (target + 1)
  let storedResults = [new Array(target + 1).fill(0), new Array(target + 1).fill(0)];
  // Base case: There is 1 way to achieve a target sum of 0 with 0 dice
  storedResults[0][0] = 1;

  // Indices to keep track of the previous and current dice results arrays
  let previousNumDiceIndex = 0;
  let newNumDiceIndex = 1;

  // Iterate over the number of dice from 0 to numDice - 1
  for (let i = 0; i < numDice; i++) {
    // Iterate over all possible target sums from 0 to the desired target
    for (let currentTarget = 0; currentTarget < target + 1; currentTarget++) {
      let numWaysToReachTarget = 0;

      // Consider each face of the dice and add the ways to reach the current target
      // from the previous number of dice and the current face value
      for (let currentNumSides = 1; currentNumSides < Math.min(currentTarget, numSides) + 1; currentNumSides++) {
        numWaysToReachTarget += storedResults[previousNumDiceIndex][currentTarget - currentNumSides];
      }
      // Store the number of ways to achieve the current target with the current number of dice
      storedResults[newNumDiceIndex][currentTarget] = numWaysToReachTarget;
    }
    // Swap the indices for the next iteration
    let temp = previousNumDiceIndex;
    previousNumDiceIndex = newNumDiceIndex;
    newNumDiceIndex = temp;
  }
  // Return the number of ways to achieve the target sum with the given number of dice
  return storedResults[previousNumDiceIndex][target];
}