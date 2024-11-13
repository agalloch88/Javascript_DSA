// Given a list of strings, write a function which returns the longest string chain which can be built from those strings.

// A string chain is defined as follows: let string `A` be a string in the initial array. If removing any single character from string `A`
// yields a new string, `B`, which is contained in the origial array of strings, then strings `A` and `B` form a string chain of length 2.
// Similarly, if removing any single character from string `B` yields a new string, `C`, which is contained in the initial array of strings,
// then strings `A`, `B`, and `C` form a string chain of length 3.

// The function should return the string chain in descending order (meaning, from the longest string to the shortest string). Note that string
// chains of length 1 do not exist. If the list of strings does not contain any string chain formed by two or more stringss, the function should return
// an empty array.

// For the purposes of the problem, assume there will be only one longest string chain.

// Sample Input:

// strings = ['abde', 'abc', 'abcde', 'ade', 'ae', '1abde', 'abcdef']

// Sample Output:

// ['abcdef', 'abcde', 'abde', 'ade', 'ae']

// Solution 1:
