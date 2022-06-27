// Given an array of positive integers representing the values of coins in your possession, write a function which returns the minimum amount of change
// (ie, the minimum sum of money) which cannotr be created. The given coins may have any positive integer value, and are not necessarily unique. So,
// there may be multiple coins of the same value.

// For example, if given coins = [1, 2, 5], the minimum amount of change which cannot be created is 4. If given no coins, the minimum amount
// of change which cannot  be created is 1.

// Sample input:
// coins = [5, 7, 1, 1, 2, 3, 22]

// Sample Output:
// 20

// Solution 1:

// O(nlog(n)) time due to sorting coins array
// O(1) space due to only storing one variable regardless of contents of coins array

function nonConstructibleChange(coins) {
    // sort the input array so coins can be interated over efficiently
    coins.sort((a, b) => a - b);
    // set variable for amount currently creatable
    let currentChangeCreated = 0;
    // iterate over every coin in coins array
    for (const coin of coins) {
        // cannot create any more change than current total + 1 
        if (coin > currentChangeCreated + 1) {
            return currentChangeCreated + 1;
        }
        currentChangeCreated += coin;
    }

    return currentChangeCreated + 1;
}