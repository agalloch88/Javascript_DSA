// Write a function which takes in three strings, and returns a boolean representing whether the third string can be formed by interweaving the first two strings together.

// To interweave strings means to merge them by alternating their letters without any specific pattern. For instance, the strings "abc" and "123" can be interwoven
// as "a1b2c3", as "abc123", and as "ab1c23". These three examples are not an exhaustive list of posibilities, simply a demonstration of the variability allowed in the context
// of the problem.

// However, letters within a string must maintain their relative ordering in the interwoven string.

// Sample Input:

// one = "algoexpert"
// two = "your-dream-job"
// three = "your-algodream-expertjob"

// Sample Output:

// true

// Solution 1:

// recursive solution checking every combination of n + m to determine if possible to interweave

// O(2^(n + m)) time due to not caching and thus doing many repeat calculations
// O(n + m) space due to potentially n + m calls on the call stack at a given time

// main function, taking in the first and second strings, along with interwoven possible answer
function interweavingStrings(one, two, three) {
    // edge case check
    // if for whatever reason the length of string three is longer or shorter than the sum of strings one and two, this is obviously not an interwoven answer, so return false
    if (three.length !== one.length + two.length) {
        return false;
    }
    // return a call to helper function areInterwoven, which takes in the three strings plus 0's as initial indices    
    return areInterwoven(one, two, three, 0, 0);
}

// helper function which determines whether strings can interweave, taking in all three strings plus two index values
function areInterwoven(one, two, three, i, j) {
    // can calculate needed position in three from positions of one and two, so set k equal to combined positions of i and j
    let k = i + j;
    
    // base case
    // if k is all the way at the end of three, must mean made it through the entire string, so return true
    if (k === three.length) {
        return true;
    }

    // recursive case
    // if pointer i is less than one's length, so still in bounds, and the value at position i in one is equal to the value at k in three, then execute below
    if (i < one.length && one[i] === three[k]) {
        // if the recursive call to areInterwoven for i + 1 is true, then return true
        if (areInterwoven(one, two, three, i + 1, j)) {
            return true;
        }
    }

    // if pointer j is less than two's length, so still in bounds, and the value at position j in two is equal to the value at k in three, then execute below
    if (j < two.length && two[j] === three[k]) {
        // return the recursive call to areInterwoven for j + 1
        return areInterwoven(one, two, three, i, j + 1);
    }

    // if neither of the three options above are true, then return false as cannot interweave the strings
    return false;
}