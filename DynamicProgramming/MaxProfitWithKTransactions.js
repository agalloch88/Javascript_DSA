// The problem presents an array of positive integers representing the prices of a single stock
// on various days (each index in the array represnts a different day). The problem also presents
// an integer, `k`, which represents the number of transactions allowed to be made. One transaction
// consists of buying the stock on a given day then selling it on another, later day.

// Write a function which returns the maximum profit obtainable by buying and selling the stock,
// given the constraint of `k` transactions.

// Note that, for the purposes of the problem, only one share of the stock may be held at a time.
// In other words, one share is the maximum amount which may be bought on a given day, and if
// a share is currently held, another may not be bought. Also, not all `k` transactions
// must be used.

// Sample Input:

// prices = [5, 11, 3, 50, 60, 90]
// k = 2

// Sample Output:

// 93
// buy at 5, sell at 11, buy at 3, sell at 90.

// Solution 1:

// iterative solution using 2D array to store max profit on given day with given transaction total

// O(nk) time due to looping over transactions k times, and for n length of prices array
// O(nk) space due to storing 2D array of possible profit totals

function maxProfitWithKTransactions(prices, k) {
  // If there are no prices, we can't make any profit
  if (!prices.length) {
    return 0;
  }

  // Initialize a 2D array `profits` where profits[t][d] will store
  // the maximum profit possible with at most `t` transactions up to day `d`.
  let profits = [];

  // Fill the profits array with zeroes initially.
  // There will be `k + 1` rows (for 0 to k transactions) and `prices.length` columns.
  for (let t = 0; t < k + 1; t++) {
    let row = new Array(prices.length).fill(0);
    profits.push(row);
  }

  // Loop through the number of transactions.
  for (let t = 1; t < k + 1; t++) {
    // Initialize `maxThusFar` to track the maximum difference (profit) up to day `d`
    // from previous transaction results minus the price at that day.
    let maxThusFar = -Infinity;

    // Loop through each day, calculating the maximum profit possible with `t` transactions up to day `d`.
    for (let d = 1; d < prices.length; d++) {
      // Update `maxThusFar` to store the maximum profit from the previous transaction
      // up to the previous day, minus the stock price on that previous day.
      maxThusFar = Math.max(maxThusFar, profits[t - 1][d - 1] - prices[d - 1]);

      // The profit at profits[t][d] is the max of:
      // 1. Not selling on day `d`, which keeps the profit the same as the previous day.
      // 2. Selling on day `d`, which is calculated as maxThusFar plus the price on day `d`.
      profits[t][d] = Math.max(profits[t][d - 1], maxThusFar + prices[d]);
    }
  }

  // The maximum profit achievable with at most `k` transactions on the last day.
  return profits[k][prices.length - 1];
}
