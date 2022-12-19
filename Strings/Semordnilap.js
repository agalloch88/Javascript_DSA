// Write a function which takes in a list of unique strings, and returns a list of semordlinap pairs.

// A semordnilap pair is defined as a set of different strings where the reverse of one word is the same as the forward version of the other. For example, the words 'diaper'
// and 'repaid' are a semordnilap pair, as are the words 'palindromes' and 'semordnilap'.

// The order of the returned pairs, and the order of the strings within each pair, does not matter in the context of the problem.

// Sample Input:
// words = ['diaper', 'abc', 'test', 'cba', 'repaid']

// Sample Output:
// [['diaper', 'repaid'], ['abc', 'cba']]

// Solution 1:

function saemordlinap(words) {
    let wordSet = new Set(words);
    let semordlinapPairs = [];

    for (let word of words) {
        let reverse = word.split('').reverse().join('');

        if (wordSet.has(reverse) && reverse !== word) {
            semordlinapPairs.push([word, reverse]);
            wordSet.delete(reverse);
            wordSet.delete(word);
        }
    }
    return semordlinapPairs;
}