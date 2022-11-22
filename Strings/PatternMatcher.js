// The problem presents two non-empty strings. The first string is a pattern consisting of only x's and/or y's. The other string is a normal string of alphanumeric characters. Write a
// function which checks whether the normal string matches the pattern in the xy string.

// A string S0 is said to match a pattern if replacing all x's in the pattern with some non-empty substring S1 of S0, and replacing all y's in the pattern with some non-empty 
// substring S2 of S0 yields the same string S0.

// If the input string does not match the input pattern, the function should return an empty array. Otherwise, it should return an array holding the strings S1 and S2 which represent
// x and y in the normal string, in that order. If the pattern does not contain any x's or y's, the respective letter should be represented by an empty string in the final array returned.

// In the context of the problem, assume that there will never be more than on pair of strings S1 and S2 which appropriately represent x and y in the normal string.

// Sample Input:
// pattern = "xxyxxy"
// string = "gogopowerrangergogopowerranger"

// Sample Output:
// ["go", "powerranger"]

// Solution 1: