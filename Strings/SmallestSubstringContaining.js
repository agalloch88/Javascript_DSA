// The problem presents two non-empty strings: a big string, and a small string. Write a function which returns the smallest substring in the big string which
// contains all of the small string's characters.

// Note that:
// * The substring can contain other characters not found in the small string.
// * The characters in the substrinng do not have to be in the same order as they appear in the small string.
// * If the small string has duplicate characters, the substring must contain those duplicate characters (it can also contain more, but not fewer).

// Assume there will be only one relevant smallest substring.

// Sample Input:
// bigString = "abcd$ef$axb$c$"
// smallString = "$$abf"

// Sample Output:
// "f$axb$"

// Solution 1: