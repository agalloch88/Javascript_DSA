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

function longestCommonSubsequence(str1, str2) {
    let lcs = [];

    for (let i = 0; i < str2.length + 1; i++) {
        let row = new Array(str1.length + 1).fill([]);
        lcs.push(row);
    }

    for (let i = 1; i < str2.length + 1; i++) {
        for (let j = 1; j < str1.length + 1; j++) {
            if (str2[i - 1] === str1[j - 1]) {
                lcs[i][j] = lcs[i - 1][j - 1].concat(str2[i - 1]);
            } else {
                lcs[i][j] = lcs[i - 1][j].length > lcs[i][j - 1].length ? lcs[i - 1][j] : lcs[i][j - 1];
            }
        }
    }
    return lcs[str2.length][str1.length];
}