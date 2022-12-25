// The problem presents two non-empty strings: a big string, and a small string. Write a function which returns the smallest substring in the big string which
// contains all of the small string's characters.

// Note that:
// * The substring can contain other characters not found in the small string.
// * The characters in the substrinng do not have to be in the same order as they appear in the small string.
// * If the small string has duplicate characters, the substring must contain those duplicate characters (it can also contain more, but not fewer).

// Assume there will be only one relevant smallest substring.

// Sample Input:
// bigString = "abcd$ef$axb$c$"
// smallString = "$$abf"

// Sample Output:
// "f$axb$"

// Solution 1:

function smallestSubstringContaining(bigString, smallString) {
    let targetCharCounts = getCharCounts(smallString);
    let substringBounds = getSubstringBounds(bigString, targetCharCounts);
    return getStringFromBounds(bigString, substringBounds);
}

function getCharCounts(string) {
    let charCounts = {};

    for (let char of string) {
        increaseCharCount(char, charCounts);
    }
    return charCounts;
}

function getSubstringBounds(string, targetCharCounts) {
    let substringBounds = [0, Infinity];
    let substringCharCounts = {};
    let numUniqueChars = Object.keys(targetCharCounts).length;
    let numUniqueCharsDone = 0;
    let leftIdx = 0;
    let rightIdx = 0;

    while (rightIdx < string.length) {
        let rightChar = string[rightIdx];

        if (!(rightChar in targetCharCounts)) {
            rightIdx++;
            continue;
        }
        increaseCharCount(rightChar, substringCharCounts);

        if (substringCharCounts[rightChar] === targetCharCounts[rightChar]) {
            numUniqueCharsDone++;
        }

        while (numUniqueCharsDone === numUniqueChars && leftIdx <= rightIdx) {
            substringBounds = getCloserBounds(leftIdx, rightIdx, substringBounds[0], substringBounds[1]);
            let leftChar = string[leftIdx];

            if (!(leftChar in targetCharCounts)) {
                leftIdx++;
                continue;
            }

            if (substringCharCounts[leftChar] === targetCharCounts[leftChar]) {
                numUniqueCharsDone--;
            }
            decreaseCharCount(leftChar, substringCharCounts);
            leftIdx++;
        }
        rightIdx++;
    }
    return substringBounds;
}

function getCloserBounds(idx1, idx2, idx3, idx4) {
    return idx2 - idx1 < idx4 - idx3 ? [idx1, idx2] : [idx3, idx4];
}

function getStringFromBounds(string, bounds) {
    let [start, end] = bounds;

    if (end === Infinity) {
        return '';
    }
    return string.slice(start, end + 1);
}

function increaseCharCount(char, charCounts) {
    charCounts[char] = (charCounts[char] || 0) + 1;
}

function decreaseCharCount(char, charCounts) {
    charCounts[char]--;
}