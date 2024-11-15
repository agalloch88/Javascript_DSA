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

function longestStringChain(strings) {
   let stringChains = {};
   
   for (let string of strings) {
    stringChains[string] = {nextString: '', maxChainLength: 1};
   }

   let sortedStrings = strings.sort((a, b) => a.length - b.length);

   for (let string of sortedStrings) {
    findLongestStringChain(string, stringChains);
   }

   return buildLongestStringChain(strings, stringChains);
}

function findLongestStringChain(string, stringChains) {
    for (let i = 0; i < string.length; i++) {
        let smallerString = getSmallerString(string, i);
        
        if (!(smallerString in stringChains)) {
            continue;
        }

        tryUpdateLongestStringChain(string, smallerString, stringChains);
    }
}

function getSmallerString(string, index) {
    return string.slice(0, index) + string.slice(index + 1);
}

function tryUpdateLongestStringChain(currentString, smallerString, stringChains) {
    let smallerStringChainLength = stringChains[smallerString].maxChainLength;
    let currentStringChainLength = stringChains[currentString].maxChainLength;

    if (smallerStringChainLength + 1 > currentStringChainLength) {
        stringChains[currentString].maxChainLength = smallerStringChainLength + 1;
        stringChains[currentString].nextString = smallerString;
    }
}

function buildLongestStringChain(strings, stringChains) {
    let maxChainLength = 0;
    let chainStartingString = '';

    for (let string of strings) {
        if (stringChains[string].maxChainLength > maxChainLength) {
            maxChainLength = stringChains[string].maxChainLength;
            chainStartingString = string;
        }
    }

    let ourLongestStringChain = [];
    let currentString = chainStartingString;
    
    while (currentString !== '') {
        ourLongestStringChain.push(currentString);
        currentString = stringChains[currentString].nextString;
    }

    return ourLongestStringChain.length === 1 ? [] : ourLongestStringChain;
}
