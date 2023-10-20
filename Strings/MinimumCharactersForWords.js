// Write a function which takes in an array of words, and which returns the smallest array of characters needs to form all of the words. The characters do not
// need to be in any particular order.

// For example, the characters ["y", "r", "o", "u"] are needed to form the words ["your", "you", "or", "yo"].

// Note: the input words will not contain any spaces. However, they may contain punctuation and/or special characters.

// Sample Input:
// words = ["this", "that", "did", "deed", "them!", "a"]

// Sample Output:
// ["t", "t", "h", "i", "s", "a", "d", "d", "e", "e", "m", "!"]

// Solution 1:

// iterative soltuion storing characters and their frequncies in a JS object, then using helper function to update values and build array

// O(n * l) time, where n is number of words, and l is the length of the longest word
// O(c) space, where c is the number of unique characters across all words which need to be stored in JS objects, 3c converges to c

function minimumCharactersForWords(words) {
  // set up holder JS object for the max frequencies found
  let maximumCharacterFrequencies = {};
  // iterate over every word in the words input array
  for (let word of words) {
    // use helper function to count the frequencies of characters inside every word passed to it, store result in variable characterFrequencies
    let characterFrequencies = countCharacterFrequencies(word);
    // based on characterFrequencies, use another helper function to update the maximum frequencies of any characters, if needed
    updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies);
  }
  // use a final helper function to construct the array to return, using the maximumCharacterFrequencies nJS object above
  return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies);
}
// helper function which counts characters of string it is passed
function countCharacterFrequencies(string) {
  // set up holder JS object for the characterFrequencies
  let characterFrequencies = {};
  // iterate over every character in the passed-in string
  for (let character of string) {
    // if the current character encountered does not already exist in the characterFrequencies JS object, create it and set count to 0
    if (!(character in characterFrequencies)) {
      characterFrequencies[character] = 0;
    }
    // increment the count for this specific character by 1, then move on to the next character
    characterFrequencies[character] += 1;
  }
  // once all items in the passed-in string are counted, return the characterFrequencies JS object, which is used in main function above
  return characterFrequencies;
}
// helper function which checks and updates, if necessary, the freqeuncies in master JS object in main function above
function updateMaximumFrequencies(frequencies, maximumFrequencies) {
  // for every caracter in the frequencies passed in (which is characterFrequencies from main function), check the current frequency is correct
  // this should ensure that words requiring 2 or 3 of the same letter are updated accordingly
  for (let character in frequencies) {
    // grab the current character from frequencies, and store inside variable frequency
    let frequency = frequencies[character];
    // if the character already exists in the maximumFrequencies object passed in (which is master maximumCharacterFrequencies), then proceed in this block
    if (character in maximumFrequencies) {
      // for the current character in master JS object, set the frequency to the maximum value between the current frequency held
      // in the master JS object or the frequency found for the current word in main function and stored in characterFrequencies
      maximumFrequencies[character] = Math.max(
        frequency,
        maximumFrequencies[character],
      );
      // if the character does NOT exist in the maximumFrequencies object passed in, then set the frequency to this character in that master object
    } else {
      maximumFrequencies[character] = frequency;
    }
  }
}
// helper function which constructs an array from the master JS object at the end of the main function's runtime
function makeArrayFromCharacterFrequencies(characterFrequencies) {
  // set up empty array to return at the end once filled, and store in variable characters
  let characters = [];
  // for every character in the master JS object passed in as characterFrequencies, do stuff
  for (let character in characterFrequencies) {
    // grab the current character key in JS object, and store in variable frequency
    let frequency = characterFrequencies[character];
    // iterate over this character
    for (let idx = 0; idx < frequency; idx++) {
      // for the value, from 0 to the frequency of this character, push an instance of this character into the holder array to return
      characters.push(character);
    }
  }
  // return filled array for use in main function above
  return characters;
}

// Solution 2:

// iterative solution using temporary storage array for results, removal via splice

// O(n * l * c) time due to n words, l possible longest length of words, and c unique characters across words
// O(c * l) space due to c unique characters to store and temporary array holding up to l characters from longest word

function minimumCharactersForWords(words) {
  // initialize empty array to hold results and store inside variable minimumCharacters
  let minimumCharacters = [];
  // for every word in word inputs, do stuff
  for (let word of words) {
    // use spread operator on variable minimumCharacters array, store inside variable storage
    // will be empty on first pass, but populated on successive passes
    let storage = [...minimumCharacters];
    // for every letter of the given word, do the following checks
    for (let letter of word) {
      // if the current letter does not existing in the temporary storage array, push the letter to minimumCharacters results array
      if (!storage.includes(letter)) {
        minimumCharacters.push(letter);
        // if the character does exist in storage array, remove the letter using splice via the indexOf method to remove the first occurence encountered in storage
      } else {
        storage.splice(storage.indexOf(letter), 1);
      }
    }
  }
  // once finished with every word from input array, return the result array minimumCharacters
  return minimumCharacters;
}
