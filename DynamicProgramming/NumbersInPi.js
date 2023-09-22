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

function numbersInPi(pi, numbers) {
    let numbersTable = {};

    for (let number of numbers) {
        numbersTable[number] = true;
    }

    let minSpaces = getMinSpaces(pi, numbersTable, {}, 0);
    return minSpaces === Infinity ? -1 : minSpaces;
}

function getMinSpaces(pi, numbersTable, cache, idx) {
    if (idx === pi.length) {
        return -1;
    }

    if (idx in cache) {
        return cache[idx];
    }

    let minSpaces = Infinity;

    for (let i = idx; i < pi.length; i++) {
        let prefix = pi.slice(idx, i + 1);
        
        if (prefix in numbersTable) {
            let minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
            minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
        }
    }

    cache[idx] = minSpaces;
    return cache[idx];
}