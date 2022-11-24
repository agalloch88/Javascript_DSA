// Write a function that takes in a non-empty string and returns its run-length encoding.
// Run-length encoding is a form of lossless data compression in which runs of data are stored as a single
// data value and count, rather than as the original run. For this problem, a run of data is any
// sequence of consecutive, identical characters. So, the run "AAA" would be run-length-encoded as "3A".

// To make things more complicated, however, the input string may contain all sorts of special characters,
// including numbers. And since encoded data must be decodable, this means we cannot naively run-length-encode
// long runs. For example, the run "AAAAAAAAAAAA" (12 A's) cannot naively be encoded as "12A", since this string
// can be decoded as either "AAAAAAAAAAAA" or "1AA". Thus, long runs (10 or more characters) should be encoded
// in a split fashion; the aforementioned run should be encoded as "9A3A".

// Sample input:
// string = "AAAAAAAAAAAAABBCCCCDD"

// Sample Output:
// "9A4A2B4C2D"

// Solution 1:

// iterative solution tracking current and previous characters, plus the current run length

// O(n) time due to iterating over n values from input string
// O(n) space due to storing the n encoded characters

function runLengthEncoding(string) {
    // set up empty array to hold the encoded characters
    const encodedCharacters = [];
    // since string is non-empty, current run will always be at least 1 at start
    let currentRunLength = 1;
    // iterate over the input string, starting at index 1
    for (let i = 1; i < string.length; i++) {
        // grab position i in input string and store in variable currentCharacter
        const currentCharacter = string[i];
        // grab position directly to the left of i in input string, and store in variable previousCharacter
        const previousCharacter = string[i - 1];
        // check whether currentCharacter differs from previousCharacter OR if the currentRunLength is maxed out at 9
        if (currentCharacter !== previousCharacter || currentRunLength === 9) {
            // convert currentRunLength to string and push this number to encodedCharacters holder array
            encodedCharacters.push(currentRunLength.toString());
            // since character may be different to enter this block, or maxed out run length, push the previousCharacter into encodedCharacters holder array
            encodedCharacters.push(previousCharacter);
            // reset currentRunLength to 0 for next encoding
            currentRunLength = 0;
        }
        // increment currentRunLength by 1
        currentRunLength++;
    }

    // need to handle last potential character, as that if condition will not catch it
    // push whatever the currentRunLength is, converted to string, into the encodedCharacters holder array
    encodedCharacters.push(currentRunLength.toString());
    // push the last character in the input string into encodedCharacters
    encodedCharacters.push(string[string.length - 1]);
    // join the values in the encodedCharacters array and return this encoded string
    return encodedCharacters.join('');
}