// Given a non-empty string, write a function which returns the minimum number of cuts needed to
// perform on a string such that each remaining substring is a palindrome.

// A palindrome is defined as a string which is written the same forward as backward. Note that
// for the purposes of the problem, single-character strings are palindromes.

// Sample Input:

// string = "noonabbad"

// Sample Output:

// 2
// noon | abba | d

// Solution 1:

// iterative solution using 2D array to check different substrings to identify needed cuts

// O(n^3) time due to having n^2 pairs and using helper function adds another n
// O(n^2) space due to storing n^2 values in `palindromes` 2D array, plus another n for `cuts`

function plaindromPartitioningMinCuts(string) {
  // Initialize a 2D array `palindromes` where palindromes[i][j] will be true if the substring from i to j is a palindrome
  let palindromes = new Array(string.length).fill(1).map((row) => []);

  // Populate the `palindromes` array using the helper function `isPalindrome`
  for (let i = 0; i < string.length; i++) {
    for (let j = 0; j < string.length; j++) {
      // Check if the substring from i to j is a palindrome
      palindromes[i][j] = isPalindrome(string.slice(i, j + 1));
    }
  }

  // Initialize `cuts` array where cuts[i] will store the minimum cuts needed for substring(0, i+1)
  let cuts = new Array(string.length);
  cuts.fill(Infinity); // Initially, set all cuts to Infinity

  // Loop through the string to calculate the minimum cuts required
  for (let i = 0; i < string.length; i++) {
    // If the substring from start (0) to i is a palindrome, no cuts are needed
    if (palindromes[0][i]) {
      cuts[i] = 0;
    } else {
      // Start with one more cut than the previous character's cuts
      cuts[i] = cuts[i - 1] + 1;

      // Check for palindromic partitions within the substring
      for (let j = 1; j < i; j++) {
        // If substring from j to i is a palindrome and fewer cuts are needed, update cuts[i]
        if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
          cuts[i] = cuts[j - 1] + 1;
        }
      }
    }
  }
  // Return the minimum cuts needed for the entire string
  return cuts[cuts.length - 1];
}

// Helper function to check if a given string is a palindrome
function isPalindrome(string) {
  let leftIdx = 0;
  let rightIdx = string.length - 1;

  // Check if characters from left to right are the same
  while (leftIdx < rightIdx) {
    if (string[leftIdx] !== string[rightIdx]) {
      return false;
    }
    leftIdx++;
    rightIdx--;
  }
  return true;
}

// Solution 2:

// solution using two arrays, iterating over all portions of string to dynamically find number of cuts

// O(n^2) time due to filling 2D array with nested for loops and calculating minimum cuts
// O(n^2) space due to storing 2D array of string possibilities

function palindromePartitioningMinCuts(string) {
  // Initialize a 2D array `palindromes` where palindromes[i][j] is true if substring(i, j) is a palindrome
  let palindromes = [];

  // Fill the `palindromes` array with `true` for single characters and `false` for the rest
  for (let i = 0; i < string.length; i++) {
    let row = [];
    for (let j = 0; j < string.length; j++) {
      // A single character is always a palindrome
      if (i === j) {
        row.push(true);
      } else {
        row.push(false);
      }
    }
    palindromes.push(row);
  }

  // Fill the `palindromes` array for substrings longer than one character
  for (let length = 2; length <= string.length; length++) {
    for (let i = 0; i < string.length - length + 1; i++) {
      let j = i + length - 1;

      if (length === 2) {
        // Check two-character substrings
        palindromes[i][j] = string[i] === string[j];
      } else {
        // Check longer substrings using previously calculated values
        palindromes[i][j] =
          string[i] === string[j] && palindromes[i + 1][j - 1];
      }
    }
  }

  // Initialize `cuts` array to store the minimum number of cuts for substring(0, i)
  let cuts = new Array(string.length).fill(Infinity);

  // Calculate the minimum cuts needed
  for (let i = 0; i < string.length; i++) {
    // If the substring from the start to `i` is a palindrome, no cuts are needed
    if (palindromes[0][i]) {
      cuts[i] = 0;
    } else {
      // Otherwise, start with one more cut than the previous character's cuts
      cuts[i] = cuts[i - 1] + 1;

      // Iterate over possible partitions to minimize cuts
      for (let j = 1; j < i; j++) {
        if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
          cuts[i] = cuts[j - 1] + 1;
        }
      }
    }
  }

  // Return the minimum cuts needed for the entire string
  return cuts[cuts.length - 1];
}
