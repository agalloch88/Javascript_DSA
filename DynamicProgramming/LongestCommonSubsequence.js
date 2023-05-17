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