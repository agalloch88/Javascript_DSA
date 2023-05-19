// Write a function which takes in two strings, and returns the longest common subsequence shared between the two input strings.

// A subsequence of a string is defined as a set of characters which are not necessarily adjacent in the string, but which are in the same order as they appear in the string.
// For instance, the characters ["a", "c", "d"] form a subsequence of the string "abcd", and so do the characters ["b", "d"]. Note that a single character in a string, as well
// as the string itself, are both valid subsequences of the string.

// For the context of the problem, assume that there will be only one longest common subsequence.

// Sample Input:

// str1 = "ZXVVYZW"
// str2 = "XKYKZPW"

// Sample Output:

// ["X", "Y", "Z", "W"]

// Soultion 1:

// 2D array solution comparing length of subsequences, then returning final bottom-right position value

// O(NM * min(N, M)) time due to iterating over N and M values in str1 and str2 respectively, and
// comparing to potentially N or M values, depending on what is smaller
// O(NM * min(N, M)) space due to storing 2D array of N * M values, and comparing to potentially
// N or M values, depending on what is smaller

function longestCommonSubsequence(str1, str2) {
    // initialize variable lcs to an empty array
    let lcs = [];
    // iterate over all values in str2 plus 1, to allow for "empty string" value at the beginning
    for (let i = 0; i < str2.length + 1; i++) {
        // initialize variable row and set up as a new array of str1 length plus 1, tro allow for
        // "empty string" value at the beginning, and fill with empty array
        let row = new Array(str1.length + 1).fill([]);
        // push the new empty array-filled "row" into lcs empty array, and 2D array is now complete
        lcs.push(row);
    }
    // iterate over all values in str2, starting at position 1, as this will align empty string to empty string
    for (let i = 1; i < str2.length + 1; i++) {
        // iterate over all values in st1, starting at position 1, as this will align empty string to empty string
        for (let j = 1; j < str1.length + 1; j++) {
            // if the value one position behind i in str2 is the same as value one position behind j in str1, execute below
            if (str2[i - 1] === str1[j - 1]) {
                // set value at current coordinates of i,j in lcs equal to values diagonally to upper left
                // in lcs, and concat the value from str2 at one position behind i to that value
                // in this instance, found another matching value to the subsequence, so adding it to the mix
                lcs[i][j] = lcs[i - 1][j - 1].concat(str2[i - 1]);
            // otherwise, if values do NOT match, execute below
            } else {
                // set value at coordiantes of i,j in lcs equal to ternary value, checking whether value at i minus 1 and j is GREATER than value at i and j minus 1
                // if so, set value at coordinates i,j in lcs equal to value at i minus 1 and j in lcs
                // if not, set value at coordinates i,j in lcs equal to value at i and j minus 1 in lcs
                lcs[i][j] = lcs[i - 1][j].length > lcs[i][j - 1].length ? lcs[i - 1][j] : lcs[i][j - 1];
            }
        }
    }
    // return the bottom-rightmost value in the 2D array, which is the final longest common subsequence of the two strings
    return lcs[str2.length][str1.length];
}

// Solution 2:

// similar solution, finding out which is the small/big strings and whether the lcs is even or odd

// O(NM * min(N, M)) time due to iterating over N and M values in str1 and str2 respectively, and
// comparing to potentially N or M values, depending on what is smaller
// O((min(N, M)) ^2) space due to storing additional arrays

function longestCommonSubsequence(str1, str2) {
    // initialize variable small and set equal to ternary result of whether str1 is smaller than str2
    let small = str1.length < str2.length ? str1 : str2;
    // initialize variable big and set equal to ternary result of whether str1 is greater than or equal to str2
    let big = str1.length >= str2.length ? str1 : str2;
    // initialize variable evenLcs and set equal to a new array one index longer than length of small, and fill with empty arrays for that length
    let evenLcs = new Array(small.length + 1).fill([]);
    // initialize variable oddLcs and set equal to a new array one index longer than length of small, and fill with empty arrays for that length
    let oddLcs = new Array(small.length + 1).fill([]);
    // iterate over all values in the big string, starting at index 1
    for (let i = 1; i < big.length + 1; i++) {
        // initialize variables currentLcs and previousLcs to track the status of the lcs
        let currentLcs, previousLcs;
        // divide the current value of i by 2 to determine whether even or odd, and set currentLcs and previousLcs to be oddLcs and evenLcs, respectively
        if (i % 2 === 1) {
            currentLcs = oddLcs;
            previousLcs = evenLcs;
        } else {
            currentLcs = evenLcs;
            previousLcs = oddLcs;
        }
        // iterate over all values in the small string, starting at index 1
        for (let j = 1; j < small.length + 1; j++) {
            // if the value in big and small are equal, execute below
            if (big[i - 1] === small[j - 1]) {
                // set value at index j in currentLcs equal to the value at j minus 1 in previousLcs and concatenate the value from i minus 1 in big string,
                // which updates the running lcs value with another match
                currentLcs[j] = previousLcs[j - 1].concat(big[i - 1]);
            // if the value in big and small is NOT equal, execute below
            } else {
                // set value of j in currentLcs equal to ternary result of checking whether previousLcs at index j is  larger than currentLcs at index j minus 1,
                // which should then resolve to value at index j in previousLcs if true, or value at index j minus 1 in currentLcs if false
                currentLcs[j] = previousLcs[j].length > currentLcs[j - 1].length ? previousLcs[j] : currentLcs[j - 1];
            }
        }
    }
    // once the for loops break, return then value of whether the big string is even or odd, and return evenLcs or oddLcs values at last index in small string, respectively
    return big.length % 2 === 0 ? evenLcs[small.length] : oddLcs[small.length];
}

// Solution 3:

function longestCommonSubsequence(str1, str2) {
    let lcs = [];

    for (let i = 0; i < str2.length + 1; i++) {
        let row = [];
        
        for (let j = 0; j < str1.length + 1; j++) {
            let entry = new Array(4);
            entry[1] = 0;
            row.push(entry);
        }
        lcs.push(row);
    }

    for (let i = 0; i < str2.length + 1; i++) {
        for (let j = 0; j < str1.length + 1; j++) {
            if (str2[i - 1] === str1[j - 1]) {
                lcs[i][j] = [str2[i - 1], lcs[i - 1][j - 1][1] + 1, i - 1, j - 1];
            } else {
                if (lcs[i - 1][j][1] > lcs[i][j - 1][1]) {
                    lcs[i][j] = [null, lcs[i - 1][j][1], i - 1, j];
                } else {
                    lcs[i][j] = [null, lcs[i][j - 1][1], i, j - 1];
                }
            }
        }
    }
    return buildSequence(lcs);
}

function buildSequence(lcs) {
    let sequence = [];
    let i = lcs.length - 1;
    let j = lcs[0].length - 1;

    while (i !== 0 && j !== 0) {
        let currentEntry = lcs[i][j];

        if (currentEntry[0]) {
            sequence.unshift(currentEntry[0]);
        }

        i = currentEntry[2];
        k = currentEntry[3];
    }
    return sequence;
}