// Given a list of strings, write a function which returns the longest string chain which can be built from those strings.

// A string chain is defined as follows: let string `A` be a string in the initial array. If removing any single character from string `A`
// yields a new string, `B`, which is contained in the origial array of strings, then strings `A` and `B` form a string chain of length 2.
// Similarly, if removing any single character from string `B` yields a new string, `C`, which is contained in the initial array of strings,
// then strings `A`, `B`, and `C` form a string chain of length 3.

// The function should return the string chain in descending order (meaning, from the longest string to the shortest string). Note that string
// chains of length 1 do not exist. If the list of strings does not contain any string chain formed by two or more strings, the function should return
// an empty array.

// For the purposes of the problem, assume there will be only one longest string chain.

// Sample Input:

// strings = ['abde', 'abc', 'abcde', 'ade', 'ae', '1abde', 'abcdef']

// Sample Output:

// ['abcdef', 'abcde', 'abde', 'ade', 'ae']

// Solution 1:

// dynamic programming approach using hash map which sorts strings by length, builds the chains, then reconstructs the longest string chain as the answer

// O(n * m^2 + nlog(n)) time due to sorting the strings by length in nlog(n) time plus other operations, plus processing longest string m
// O(nm) space due to strong stringChains hash map

function longestStringChain(strings) {
  // Initialize a dictionary to store string chains
  let stringChains = {};

  // Assign each string an initial chain structure
  for (let string of strings) {
    stringChains[string] = { nextString: '', maxChainLength: 1 };
  }

  // Sort strings by their lengths to process smaller strings first
  let sortedStrings = strings.sort((a, b) => a.length - b.length);

  // Iterate through the sorted strings to build chains
  for (let string of sortedStrings) {
    findLongestStringChain(string, stringChains);
  }

  // Reconstruct and return the longest string chain
  return buildLongestStringChain(strings, stringChains);
}

function findLongestStringChain(string, stringChains) {
  // Try to build a chain by removing each character from the string
  for (let i = 0; i < string.length; i++) {
    let smallerString = getSmallerString(string, i);

    // Skip if the smaller string is not in the dictionary
    if (!(smallerString in stringChains)) {
      continue;
    }

    // Update the chain if including the smaller string extends it
    tryUpdateLongestStringChain(string, smallerString, stringChains);
  }
}

function getSmallerString(string, index) {
  // Generate a smaller string by removing the character at the given index
  return string.slice(0, index) + string.slice(index + 1);
}

function tryUpdateLongestStringChain(
  currentString,
  smallerString,
  stringChains,
) {
  // Get the chain length of the smaller string
  let smallerStringChainLength = stringChains[smallerString].maxChainLength;

  // Get the current chain length of the current string
  let currentStringChainLength = stringChains[currentString].maxChainLength;

  // Update if including the smaller string forms a longer chain
  if (smallerStringChainLength + 1 > currentStringChainLength) {
    stringChains[currentString].maxChainLength = smallerStringChainLength + 1;
    stringChains[currentString].nextString = smallerString;
  }
}

function buildLongestStringChain(strings, stringChains) {
  let maxChainLength = 0;
  let chainStartingString = '';

  // Find the string with the longest chain
  for (let string of strings) {
    if (stringChains[string].maxChainLength > maxChainLength) {
      maxChainLength = stringChains[string].maxChainLength;
      chainStartingString = string;
    }
  }

  // Reconstruct the chain starting from the string with the longest chain
  let ourLongestStringChain = [];
  let currentString = chainStartingString;

  while (currentString !== '') {
    ourLongestStringChain.push(currentString);
    currentString = stringChains[currentString].nextString;
  }

  // If the longest chain contains only one string, return an empty array
  return ourLongestStringChain.length === 1 ? [] : ourLongestStringChain;
}

// Solution 2:

// dynamic programming approach using a Set for fast lookups, finding the max chain length, the rebuilding and outputting the longest chain

// O(n * m^2) time due to checking n words for m characters, then rebuilding the longest chain
// O(n + m) space accounting for the memoization of n words and set of n strings, plus recursive calls

function longestStringChain2(strings) {
  // Memoization map to store the maximum chain length for each string
  let memo = {};
  let stringSet = new Set(strings); // Use a set for O(1) lookups
  let longestChain = []; // To store the final chain

  // Helper function to find the maximum chain length starting from a word
  function findLongestStringChain2(word) {
    if (memo[word]) return memo[word]; // Return memoized result if available

    let maxLength = 1; // Minimum chain length is 1 (the word itself)
    for (let i = 0; i < word.length; i++) {
      // Remove the i-th character to form a smaller string
      let smallerString = word.slice(0, i) + word.slice(i + 1);

      // Check if the smaller string is part of the input strings
      if (stringSet.has(smallerString)) {
        // Recursively find the chain length for the smaller string
        let currentLength = 1 + findLongestStringChain(smallerString);
        maxLength = Math.max(maxLength, currentLength); // Update the max length
      }
    }

    memo[word] = maxLength; // Store the result in memo
    return maxLength;
  }

  // Find the longest chain for each word
  let globalMax = 0;
  let chainStart = null;

  for (let word of strings) {
    let chainLength = findLongestStringChain2(word); // Find chain length for the word
    if (chainLength > globalMax) {
      globalMax = chainLength; // Update global maximum chain length
      chainStart = word; // Update starting word for the longest chain
    }
  }

  // Rebuild the longest chain
  function buildChain(startWord) {
    let chain = [];
    while (startWord) {
      chain.push(startWord); // Add the current word to the chain
      let nextWord = null;
      for (let i = 0; i < startWord.length; i++) {
        // Form the next smaller string by removing one character
        let smallerString = startWord.slice(0, i) + startWord.slice(i + 1);
        // Check if the smaller string has the correct chain length
        if (memo[smallerString] === memo[startWord] - 1) {
          nextWord = smallerString;
          break;
        }
      }
      startWord = nextWord; // Move to the next word in the chain
    }
    return chain;
  }

  if (chainStart) longestChain = buildChain(chainStart);

  // Return the chain if it has more than one word, otherwise return an empty array
  return longestChain.length > 1 ? longestChain : [];
}
