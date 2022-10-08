// Write a function which takes in an array of strings and groups anagrams together.

// Anagrams are strings made up of the same letters, where order does not matter. For example,
// "cinema" and "iceman" are anagrams. Similarly, "foo" and "ofo" are anagrams.

// The function should return a list of anagram groups in no particular order.

// Sample Input:
// words = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"]

// Sample Output:
// [["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"], ["foo"]]

// Solution 1:

function groupAnagrams(words) {
    if (words.length === 0) {
        return [];
    }

    let sortedWords = words.map(word => word.split('').sort().join(''));
    let indices = [...Array(words.length).keys()];

    indices.sort((a, b) => {
        if (sortedWords[a] < sortedWords[b]) {
            return -1;
        }
        if (sortedWords[a] > sortedWords[b]) {
            return 1;
        }

        return 0;
    });

    let result = [];
    let currentAnagramGroup = [];
    let currentAnagram = sortedWords[indices[0]];

    for (let index of indices) {
        let word = words[index];
        let sortedWord = sortedWords[index];

        if (sortedWord === currentAnagram) {
            currentAnagramGroup.push(word);
            continue;
        }

        result.push(currentAnagramGroup);
        currentAnagramGroup = [word];
        currentAnagram = sortedWord;
    }

    result.push(currentAnagramGroup);

    return result;
}