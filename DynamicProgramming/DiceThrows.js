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

function diceThrows(numDice, numSides, target) {
    let storedResults = new Array(numDice + 1).fill(undefined).map(_ => new Array(target + 1).fill(-1));
    return diceThrowsHelper(numDice, numSides, target, storedResults);
}

function diceThrowsHelper(numDice, numSides, target, storedResults) {
    if (numDice === 0) {
        return target === 0 ? 1 : 0;
    }

    if (storedResults[numDice][target] > -1) {
        return storedResults[numDice][target];
    }

    let numWaysToReachTarget = 0;

    for (let currentTarget = Math.max(0, target - numSides); currentTarget < target; currentTarget++) {
        numWaysToReachTarget += diceThrowsHelper(numDice - 1, numSides, currentTarget, storedResults);
    }

    storedResults[numDice][target] = numWaysToReachTarget;
    return numWaysToReachTarget;
}