// The problem presents a two-dimensional array/lisst (also known as a matrix) of potentially-unequal height and width, which contains letters.
// This 2D array/list constitutes a "boggle board". The problem also provides an array/list of words.

// Write a function which returns an array of all the words listed in the words list/array which can be constructed using the letters in the 2D array/list/matrix.

// A word iis constructed in the boggle board by connecting adjacent (meaning horizontally, vertically, or diagonally) letters, without using any
// single letter at a given position more than once. While a word can naturally have repeated letters, those repeated letters must come from a different
// adjacent possition in the boggle board in order for the word to be "contained" in the board. Note that two or more words are allowed to overlap
// and use the ssame letters in the boggle board.

// Sample Input:

// board = [
//     ["t", "h", "i", "s", "i", "s", "a"],
//     ["s", "i", "m", "p", "l", "e", "x"],
//     ["b", "x", "x", "x", "x", "e", "b"],
//     ["x", "o", "g", "g", "l", "x", "o"],
//     ["x", "x", "x", "D", "T", "r", "a"],
//     ["R", "E", "P", "E", "A", "d", "x"],
//     ["x", "x", "x", "x", "x", "x", "x"],
//     ["N", "O", "T", "R", "E", "-", "P"],
//     ["x", "x", "D", "E", "T", "A", "E"],
// ]

// words = ["this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"]

// Sample Output:

// ["this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"]
// note that words may be ordered differently

// Solution 1:
