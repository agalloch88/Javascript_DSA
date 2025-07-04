// Write a function which takes in a list of unique strings, and returns a list of semordlinap pairs.

// A semordnilap pair is defined as a set of different strings where the reverse of one word is the same as the forward version of the other. For example, the words 'diaper'
// and 'repaid' are a semordnilap pair, as are the words 'palindromes' and 'semordnilap'.

// The order of the returned pairs, and the order of the strings within each pair, does not matter in the context of the problem.

// Sample Input:
// words = ['diaper', 'abc', 'test', 'cba', 'repaid']

// Sample Output:
// [['diaper', 'repaid'], ['abc', 'cba']]

// Solution 1:

// iterative solution using JS set for O(1) lookup time, reversing given word and checking for match

// O(n * m) space due to storing wordSet of n items, with longest item of m length
// O(n * m) time due to checking for n items with a max length of m characters

function saemordlinap(words) {
  // create a new JS Set from the words input, and store in variable wordSet
  // Sets have O(1) lookup time, so this is the best data structure to use for these comparisons
  let wordSet = new Set(words);
  // initialize empty array to hold any found pairs, and store in variable semordlinapPairs
  let semordlinapPairs = [];
  // iterate over every individual word string in the words input array
  for (let word of words) {
    // take the current word, split off the '', reverse the string, then join it back with '' for comparison, and store this reversed string in variable reverse
    let reverse = word.split('').reverse().join('');
    // check whether the value stored in reverse exists in wordSet using the Set .has() method, AND that the reversed string is not a palindrome of the current word
    if (wordSet.has(reverse) && reverse !== word) {
      // if both conditions above are true, push an array pair of the value for word and reverse into semordlinapPairs array
      semordlinapPairs.push([word, reverse]);
      // remove the value stored in reverse from the wordSet using the Set .delete() method, so it is not duplicated by accident
      wordSet.delete(reverse);
      // remove the current word from the wordSet using the Set .delete() method, so it is not duplicated by accident
      wordSet.delete(word);
    }
  }
  // once every input word is checked, return all the found semordlinapPairs
  return semordlinapPairs;
}

// Solution 2:
/**
 * Finds all pairs of words that form semordnilaps (words that are the reverse of each other).
 *
 * Time Complexity: O(n * k) where n = number of words, k = average length of each word
 *   - Reversing each word takes O(k)
 *   - Set lookup and insertion are O(1) average
 *   - Overall: O(n * k)
 *
 * Space Complexity: O(n * k)
 *   - The Set stores up to n words of length k: O(n * k)
 *   - The output array `pairs` in worst case could store up to n/2 pairs, each of size O(k): O(n * k)
 */
function semordnilap(words) {
  // Use a Set for O(1) lookups of previously seen words
  let wordSet = new Set();
  // Array to collect all matching semordnilap pairs
  let pairs = [];

  // Iterate through each word in the input list
  for (let word of words) {
    // Compute the reversed string of the current word in O(k) time
    let reversed = word.split('').reverse().join('');

    // If we've already seen the reversed form, we've found a pair
    if (wordSet.has(reversed)) {
      // Add the current word and its reverse as a semordnilap pair
      pairs.push([word, reversed]);
    } else {
      // Otherwise, remember this word for future reverse-lookups
      wordSet.add(word);
    }
  }

  // Return all found semordnilap pairs
  return pairs;
}
