// Write a function which takes in an array of words, and which returns the smallest array of characters needs to form all of the words. The characters do not
// need to be in any particular order.

// For example, the characters ["y", "r", "o", "u"] are needed to form the words ["your", "you", "or", "yo"].

// Note: the input words will not contain any spaces. However, they may contain punctuation and/or special characters.

// Sample Input:
// words = ["this", "that", "did", "deed", "them!", "a"]

// Sample Output:
// ["t", "t", "h", "i", "s", "a", "d", "d", "e", "e", "m", "!"]

// Solution 1:

function minimumCharactersForWords(words) {
    let maximumCharacterFrequencies = {};

    for (let word of words) {
        let characterFrequencies = countCharacterFrequencies(word);
        updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies);
    }

    return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies);
}

function countCharacterFrequencies(string) {
    let characterFrequencies = {};

    for (let character of string) {
        if (!(character in characterFrequencies)) {
            characterFrequencies[character] = 0;
        }
        characterFrequencies[character] += 1;
    }
    return characterFrequencies;
}

function updateMaximumFrequencies(frequencies, maximumFrequencies) {
    for (let character in frequencies) {
        let frequency = frequencies[character];

        if (character in maximumFrequencies) {
            maximumFrequencies[character] = Math.max(frequency, maximumFrequencies[character]);
        } else {
            maximumFrequencies[character] = frequency;
        }
    }
}

function makeArrayFromCharacterFrequencies(characterFrequencies) {
    let characters = [];

    for (let character in characterFrequencies) {
        let frequency = characterFrequencies[character];

        for (let idx = 0; idx < frequency; idx++) {
            characters.push(character);
        }
    }

    return characters;
}