// Given an array of distinct positive integers representing coin denominations, and a single,
// non-negative integer n representing a target amount of money, write a function which returns
// the number of ways to make change for that target amount using the given coin denominations.

// Note that an unlimited amount of coins is at disposal for this question.

// Sample Input:
// n = 6
// denoms = [1, 5]

// Sample Output:
// 2, being 1 x 1 and 1 x 5, and 6 x 1

// Solution 1:

// O(n * d) time, where d is the number of denoms given as have to iterate over n potential values using d denoms
// O(n) space due to creating new placeholder array to trackt he number of ways

function numberOfWaysToMakeChange(n, denoms) {
  // initialize empty array to hold all values from 0 to n
  let ways = new Array(n + 1).fill(0);
  // only way to get 0 is to do nothing, so initialize it first
  ways[0] = 1;
  // for each denom given, keep going
  for (let denom of denoms) {
    // start the amounts at 1 and keep going
    for (let amount = 1; amount < n + 1; amount++) {
      // if the denom is less than or equal to current amount, possible to make change
      if (denom <= amount) {
        // update the value in the ways array to be the difference between amount and denom, add it to exisitng ways found
        ways[amount] += ways[amount - denom];
      }
    }
  }
  // after looping, should have final number of ways at value for n in ways array, so return it
  return ways[n];
}

// Solution 2:

// recursive solution employing memoization

// O(n * c) time, where c is the number of coins given and have to iterate over n items in amount from 0 to amount
// O(n) space due to new array, plus call stack space, 2n coverges to n

function numberOfWaysToMakeChange2(amount, coins) {
  // top-down approach
  function recursion(index, amount, coins, memo) {
    // base cases
    // set value for zero as a base case
    if (amount === 0) {
      return 1;
    }
    // handle negative values for initialization of array below, or out of bounds
    if (amount < 0 || index < 0) {
      return 0;
    }
    // checks for any -1's
    if (memo[index][amount] !== -1) {
      return memo[index][amount];
    }
    // recursive case
    // if value in coins at given index is greater than amount, recursively call recursion
    if (coins[index] > amount) {
      return recursion(index - 1, amount, coins, memo);
    }
    // update values in memo adding return values from recursive calls to recursion
    memo[index][amount] =
      recursion(index, amount - coins[index], coins, memo) +
      recursion(index - 1, amount, coins, memo);
    // return memo value
    return memo[index][amount];
  }
  // set up memo as new holder array then map over and fill with -1
  let memo = new Array(coins.length)
    .fill([])
    .map((el) => new Array(amount + 1).fill(-1));
  // return value recursive call to recursion
  return recursion(coins.length - 1, amount, coins, memo);
}
