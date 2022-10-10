// Write a function which takes in an array of strings and groups anagrams together.

// Anagrams are strings made up of the same letters, where order does not matter. For example,
// "cinema" and "iceman" are anagrams. Similarly, "foo" and "ofo" are anagrams.

// The function should return a list of anagram groups in no particular order.

// Sample Input:
// words = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"]

// Sample Output:
// [["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"], ["foo"]]

// Solution 1:

// iterative solution storing sorted words and matching them to anagrams

// O(w * n * log(n) + n * w * log(w)) time due to sorting and looking at w words at potential max length of n
// O(wn) space due to storing w words of potentially n length each in new arrays

function groupAnagrams(words) {
    // check to see if the words is empty, which is an edge case, and return empty array if so
    if (words.length === 0) {
        return [];
    }
    // set up variable to store words, map over the words to sort then join them again
    let sortedWords = words.map(word => word.split('').sort().join(''));
    // generate the indexes by spreading an array of words.length length and grabbing the keys
    let indices = [...Array(words.length).keys()];
    // sort the indices to determine the order they should go in
    indices.sort((a, b) => {
        if (sortedWords[a] < sortedWords[b]) {
            return -1;
        }
        if (sortedWords[a] > sortedWords[b]) {
            return 1;
        }

        return 0;
    });
    // set up holder arrays for result, currentAnagram group, and the currentAnagram starting at
    // index 0 of the sortedWords
    let result = [];
    let currentAnagramGroup = [];
    let currentAnagram = sortedWords[indices[0]];
    // iterate over the items in indices
    for (let index of indices) {
        // store item in words at current index in variable word
        let word = words[index];
        // grab item in sortedWords at current index and store in variable sortedWord
        let sortedWord = sortedWords[index];
        // if sortedWord and currentAnagram are equal, then push this word into the currentAnagramGroup
        // then continue
        if (sortedWord === currentAnagram) {
            currentAnagramGroup.push(word);
            continue;
        }
        // once done, push the currentAnagramGroup into result
        result.push(currentAnagramGroup);
        // set currentAnagramGroup equal to word
        currentAnagramGroup = [word];
        // set currentAnagram equal to the sortedWord
        currentAnagram = sortedWord;
    }
    // after finished looping, push the currentAnagramGroup to the result
    result.push(currentAnagramGroup);
    // once done, return the full result array
    return result;
}

// Solution 2:

// another iterative solution but using JS object to store key/value pairs of sortedWord and word

// O(w * n * log(n)) time due to still sorting w words and iterating over all inputs of max length n
// O(wn) space due to storing new JS object

function groupAnagrams(words) {
    // set up empty JS object for holding sortedWord and words
    let anagrams = {};
    // iterate over every value in input words
    for (let word of words) {
        // grab the current sortedWord by splitting, sorting, then joing input words, storing in variable
        let sortedWord = words.split('').sort().join('');
        // if the current sortedWord is already in anagrams JS object, push new value into that key
        if (sortedWord in anagrams) {
            anagrams[sortedWord].push(word);
        // if sortedWord not already in anagrams JS object, create new sortedWord value with key of [word]
        } else {
            anagrams[sortedWord] = [word];
        }
    }
    // return anagrams JS object in correct format of 2D array
    return Object.values(anagrams);
}