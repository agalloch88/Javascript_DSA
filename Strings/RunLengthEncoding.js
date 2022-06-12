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

function runLengthEncoding(string) {
    // since string is non-empty, current run will always be at least 1 at start
    const encodedCharacters = [];
    let currentRunLength = 1;

    for (let i = 1; i < string.length; i++) {
        const currentCharacter = string[i];
        const previousCharacter = string[i - 1];

        if (currentCharacter !== previousCharacter || currentRunLength === 9) {
            encodedCharacters.push(currentRunLength.toString());
            encodedCharacters.push(previousCharacter);
            currentRunLength = 0;
        }
        currentRunLength++;
    }

    // need to handle last potential character, as that if condition will not catch it
    encodedCharacters.push(currentRunLength.toString());
    encodedCharacters.push(string[string.length - 1]);

    return encodedCharacters.join('');
}