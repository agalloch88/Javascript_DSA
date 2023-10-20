// Write a function which takes in a string, and returns its longest substring without duplicate characters.

// For the context of this problem, there will only be one longest substring without duplication.

// Sample Input:
// string = "clementisacap"

// Sample Output:
// "mentisac"

// Solution 1:

// iterative solution keeping track of characters seen, indexes for non-duplicative substring, and startIdx

// O(n) time due to going over n values in input string once
// O(min(n, a)) space, where n is values in input string and a is total amount of unique alphabet characters in that string which may possibly be in lastSeen at end

function longestSubstringWithoutDuplication(string) {
  // set up empty JS object to store characters found
  let lastSeen = {};
  // set up longest tuple to store indexes for the current longest substring found
  let longest = [0, 1];
  // set up variable for index where substring begins
  let startIdx = 0;

  for (let i = 0; i < string.length; i++) {
    // start iterating over string, and grab character at index of i
    let char = string[i];
    // if current character was already seen, reset startIdx to either startIdx or position of this character + 1, whichever is greater
    if (char in lastSeen) {
      startIdx = Math.max(startIdx, lastSeen[char] + 1);
    }
    // if current longest substring found is less than current i position + 1 less the current startIdx, there's a new longest substring and must update
    if (longest[1] - longest[0] < i + 1 - startIdx) {
      longest = [startIdx, i + 1];
    }
    // if current character not in lastSeen record, update lastSeen and provide current index for reference. if already present, update index of most recent occurence
    lastSeen[char] = i;
  }
  // return longest substring by slicing from string using longest tuple values
  return string.slice(longest[0], longest[1]);
}
