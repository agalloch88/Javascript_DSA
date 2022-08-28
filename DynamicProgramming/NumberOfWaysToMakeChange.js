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

function numberOfWaysToMakeChange(n, denoms) {
    let ways = new Array(n + 1).fill(0);
    ways[0] = 1;

    for (let denom of denoms) {
        for (let amount = 1; amount < n + 1; amount++) {
            if (denom <= amount) {
                ways[amount] += ways[amount - denom];
            }
        }
    }
    return ways[n];
}