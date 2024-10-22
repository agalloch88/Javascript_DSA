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