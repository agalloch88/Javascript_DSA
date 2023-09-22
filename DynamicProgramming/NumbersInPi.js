// Given a string representation of the first n digits of Pi, and a list of positive integers (all in string format), write a function which returns the smallest
// number of spaces which can be added to the n digits of Pi, such that all resulting numbers are found in the list of positive integers.

// Note that a single number may appear multiple times in the resulting numbers. For example, if Pi is "3141" and the numbers are ["1", "3", "4"], the number "1"
// is allowed to appear twice in the list of resulting numbers after three spaces are added: "3 | 1 | 4 | 1".

// If no number of spaces to be added exists, such that all resulting numbers are found in the list of integers, the function should return -1.

// Sample Input:

// pi = "3141592653589793238462643383279"
// numbers = ["314159265358979323846", "26433", "8", "3279", "314159265", "358979323884626433832", "79"]

// Sample Output:

// 2
// "314159265 | 35897932384626433832 | 79"

// Solution 1:

// solution using recursion to get the minimum spaces and calculate placement based on position

// O(n^3 + m) time due to multiple calculations and checks
// O(n + m) space due to storing the JS object cache etc

// main function taking in the striung of Pi digits and the array of number strings
function numbersInPi(pi, numbers) {
    // initialize variable numbersTable and set equal to empty JS object
    // this will store and allow instant lookup of the various numbers
    let numbersTable = {};

    // iterate over every number string in numbers input
    for (let number of numbers) {
        // for every number value in numbersTable, set equal to true
        numbersTable[number] = true;
    }

    // initialize variable minSpaces and set equal to return value from helper function getMinSpaces, passing in the pi input string, the numbersTable JS object, empty object for the cache, and idx of 0
    let minSpaces = getMinSpaces(pi, numbersTable, {}, 0);
    return minSpaces === Infinity ? -1 : minSpaces;
}

// helper function to get the minimum number of spaces, takingin in the pi input string, the numbersTable JS object, the cache for lookups, and an idx value
function getMinSpaces(pi, numbersTable, cache, idx) {
    // base case
    // check whether the current value of idx is equal to the length of the pi input, and if so, return -1, as at the end of the road
    if (idx === pi.length) {
        return -1;
    }

    // recursive case
    // check whether the current idx exists in the cache yet, and if so, return the value at the idx in the cache
    if (idx in cache) {
        return cache[idx];
    }

    // initialize variable minSpaces and set equal to Infinity
    let minSpaces = Infinity;

    // iterate over the length of pi input string, starting at the position of the passed-in idx value
    for (let i = idx; i < pi.length; i++) {\
        // initialize variable prefix, and set equal to a slice of the the pi input from the position of idx to the i plus 1 value
        let prefix = pi.slice(idx, i + 1);
        // check whether this prefix exists in the numbersTable JS object, and if so, execute below
        if (prefix in numbersTable) {
            // initialize variable minSpacesInSuffix, and set equal to return value from recursive call to getMinSpaces, passing in i + 1
            let minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
            // set minSpaces equal to the smaller value between current value of minSpaces and minSpacesInSuffic plus 1
            minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
        }
    }
    // set the value at idx in the cache equal to current value of minSpaces
    cache[idx] = minSpaces;
    // return the value at idx in cache for use in main function
    return cache[idx];
}