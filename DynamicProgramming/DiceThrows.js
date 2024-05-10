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

// solution 2:

function diceThrows(numDice, numSides, target) {
  let storedResults = new Array(numDice + 1)
    .fill(undefined)
    .map((_) => new Array(target + 1).fill(0));
  storedResults[0][0] = 1;

  for (let currentNumDice = 1; currentNumDice < numDice + 1; currentNumDice++) {
    for (let currentTarget = 0; currentTarget < target + 1; currentTarget++) {
      let numWaysToReachTarget = 0;

      for (
        let currentNumSides = 1;
        currentNumSides < Math.min(currentTarget, numSides) + 1;
        currentNumSides++
      ) {
        numWaysToReachTarget +=
          storedResults[currentNumDice - 1][currentTarget - currentNumSides];
      }
      storedResults[currentNumDice][currentTarget] = numWaysToReachTarget;
    }
  }
  return storedResults[numDice][target];
}
