// Write a function which takes in a non-empty array of non-empty strings, and which returns an array of characters common to all strings in the array, ignoring multiplicity.

// Note that the strings are not guaranteed to only contain alphanumeric characters. The array returned by the function can be in any order.

// Sample Input:

// strings = ["abc", "bcd", "cbaccd"]

// Sample Output:

// ["b", "c"]

// Solution 1:

function commonCharacters(strings) {
    let characterCounts = {};

    for (let string of strings) {
        let uniqueStringCharacters = new Set(string);

        for (let character of uniqueStringCharacters) {
            if (!(character in characterCounts)) {
                characterCounts[character] = 0;
            }
            characterCounts[character]++;
        }
    }

    let finalCharacters = [];

    for (let [character, count] of Object.entries(characterCounts)) {
        if (count === strings.length) {
            finalCharacters.push(character);
        }
    }

    return finalCharacters;
}