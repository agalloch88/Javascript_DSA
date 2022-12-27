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

// iterative solution employing the sliding window tracking the target characters 
// and how many needed of each to know when to expand and contract window to find smallest substring

// O(b + s) time where b is length of big string and s is length of small string
// O(b + s) space due to using a couple additional JS objects

// main function which takes in the two input strings
function smallestSubstringContaining(bigString, smallString) {
    // call helper function to get counts of unique chars in small string, and store result in
    // variable targetCharCounts
    let targetCharCounts = getCharCounts(smallString);
    // call helper function to get the bounds of substring, and store result in variable substringBounds
    let substringBounds = getSubstringBounds(bigString, targetCharCounts);
    // return the result of helper function call getStringFromBounds, passing in the bigString
    // and the value for substringBounds set above
    return getStringFromBounds(bigString, substringBounds);
}

// helper function which takes in string to count unique characters
function getCharCounts(string) {
    // set up empty JS object and store in variable charCounts
    let charCounts = {};
    // iterate over every character in the string
    for (let char of string) {
        // for every character, call helper function to increase the count of the character,
        // passing in the current char and the charCounts JS object
        increaseCharCount(char, charCounts);
    }
    // once done iterating over the string, return the charCounts JS object
    return charCounts;
}

// helper function which takes in a string and the targetCharCounts JS object with key/value
// pairings of the needed chars and their frequencies
function getSubstringBounds(string, targetCharCounts) {
    // set up pair of indices, set to 0 and Infinity, and store in variable substringBounds
    let substringBounds = [0, Infinity];
    // set up another empty JS object and store in variable substringCharCounts
    let substringCharCounts = {};
    // take a look at all the keys in targetCharCounts JS object, and get the number of them
    // via the length to store in variable numUniqueChars
    let numUniqueChars = Object.keys(targetCharCounts).length;
    // set variable numUniqueCharsDone to 0
    // this will track whether the current sliding window size captures the substring accurately
    let numUniqueCharsDone = 0;
    // initialize the leftIdx and rightIdx variables to start at the first index, and
    // will expand outward from there
    let leftIdx = 0;
    let rightIdx = 0;
    // loop over the bigString while the rightIdx is still in bounds
    // this loop will only expand the rightIdx outward, so will set up another nested
    // while loop to handle contraction of the leftIdx into the smallest substring possible
    while (rightIdx < string.length) {
        // grab the current value at rightIdx in the string and store in variable rightChar
        let rightChar = string[rightIdx];
        // if the rightChar is NOT a character being looked for by nature of inclusion in 
        // targetCharCounts, then increment the rightIdx and continue
        if (!(rightChar in targetCharCounts)) {
            rightIdx++;
            continue;
        }
        // call helper function to increaseCharCount of the character stored in rightChar,
        // passing in the rightChar and the substringCharCounts
        increaseCharCount(rightChar, substringCharCounts);
        // if the current value for rightChar in target and substring charCounts objects
        // is the same, then can call this unique char 'done' and increment the variable
        // numUniqueCharsDone by 1
        if (substringCharCounts[rightChar] === targetCharCounts[rightChar]) {
            numUniqueCharsDone++;
        }
        // set up another while loop which will run so long as numUniqueCharsDone equals
        // the total numUniqueChars AND the leftIdx is less than or equal to the rightIdx
        while (numUniqueCharsDone === numUniqueChars && leftIdx <= rightIdx) {
            // call helper function to determine the correct bounds to use, passing in the
            // left and rightIdx, and the two values current in substringBounds array, storing the
            // result back into variable substringBounds
            substringBounds = getCloserBounds(leftIdx, rightIdx, substringBounds[0], substringBounds[1]);
            // grab the value at leftIdx in the string and store in variable leftChar
            let leftChar = string[leftIdx];
            // if the current value in leftChar is NOT a character being looked for by nature
            // of inclusion in targetCharCounts, then increment leftIdx by 1 to
            // contract the sliding window, and continue
            if (!(leftChar in targetCharCounts)) {
                leftIdx++;
                continue;
            }
            // if, however, the value at left char matches in the substring and targetCharCounts,
            // decrement the numUniqueCharsDone variable by 1 as the window has now neglected
            // a needed character for the final solution
            if (substringCharCounts[leftChar] === targetCharCounts[leftChar]) {
                numUniqueCharsDone--;
            }
            // call helper function decreaseCharCount and pass in the current value of
            // leftChar and the substringCharCounts JS object
            decreaseCharCount(leftChar, substringCharCounts);
            // increment the leftIdx by 1
            leftIdx++;
        }
        // outside the while loop above, increment the rightIdx by 1
        rightIdx++;
    }
    // once the rightIdx reaches the end of the bigString, the main while loop will break so
    // time to return the final values for substringBounds
    return substringBounds;
}

// helper function which takes in four indices to determine the proper values to use for bounds
function getCloserBounds(idx1, idx2, idx3, idx4) {
    // return the result of ternary operator checking whether first or second set of indices is
    // smaller overall, and will return this for use in setting the substringBounds appropriately
    return idx2 - idx1 < idx4 - idx3 ? [idx1, idx2] : [idx3, idx4];
}

// helper function to determine what substring to return based on the string and bounds passed in
function getStringFromBounds(string, bounds) {
    // deconstruct the values for start and end from the passed-in bounds
    let [start, end] = bounds;
    // if end is still equal to infinity, there's no viable substring, so return an empty string
    if (end === Infinity) {
        return '';
    }
    // return a slice of the string, starting at the index for start and slicing to the index
    // for end plus 1, to be sure to capture that last end character
    return string.slice(start, end + 1);
}

// helper function which takes in a character and a JS object counting character frequencies
function increaseCharCount(char, charCounts) {
    // set the value of the current char in charCounts to it's current value plus 1, or if it
    // does not exist yet, initialize it to 0 plus 1
    charCounts[char] = (charCounts[char] || 0) + 1;
}

// helper function which takes in a character and a JS object counting character frequencies
function decreaseCharCount(char, charCounts) {
    // decrement the current character in charCounts by 1
    charCounts[char]--;
}

// Solution 2:

// condensed, iterative solution employing the sliding window to find optimal, smallest substring

// O(b + s) time where b is length of big string and s is length of small string
// O(b + s) space due to using extra JS object

function smallestSubstringContaining(bigString, smallString) {
    // set up empty JS object to hold list of key/value pairs for chars and frequency, store in
    // variable charMap
    let charMap = {};
    // iterate over every char in smallString
    for (let char of smallString) {
        // set value of given char in charMap equal to its current value plus 1, if it already exists,
        // or if it does not, initialize and set to 0 then add 1
        charMap[char] = (charMap[char] || 0) + 1;
    }
    // set up the two pointers, left and right, for the sliding window
    let left = 0;
    let right = -1;
    // count how many unique chars are needed from small string by using the keys method to look
    // at charMap and find length of keys, aka how many there are
    let countCharsNeeded = Object.keys(charMap).length;
    // set res equal to an empty string
    let res = '';
    // iterate over the input so long as the right pointer is still in bounds
    while (right < bigString.length) {
        // check whether the countCharsNeeded is equal to 0,
        // meaning have found the optimal window size, and if so, execute below
        if (countCharsNeeded === 0) {
            // if there's no res, or the length of the res is greater than the difference
            // between the left and right pointers, execute below
            if (!res || res.length > right - left) {
                // if either of the conditions above are true, set res equal to a slice of 
                // bigString from the left pointer to right pointer plus one, to ensure 
                // including the value at right pointer
                res = bigString.slice(left, right + 1);
            }
            // grab the value at left pointer in bigString, and store in variable leftChar
            let leftChar = bigString[left];
            // if the value in leftChar is in the charMap, then execute below
            if (leftChar in charMap) {
                // increment the value of the leftChar by 1
                charMap[leftChar]++;
            }
            // if the value of leftChar in the charMap is 1, execute below
            if (charMap[leftChar] === 1) {
                // increment the countCharsNeeded as found another 
                countCharsNeeded++;
            }
            // increment the left pointer
            left++;
        // if countCharsNeeded is anything other than 0, execute below
        } else {
            // increment right pointer by 1
            right++;
            // grab value of right pointer in bigString and store in variable rightChar
            let rightChar = bigString[right];
            // if this rightChar is a character in the charmap, execute below
            if (rightChar in charMap) {
                // decrement the value of this particular character, as one less is needed since
                // one is found here
                charMap[rightChar]--;
            }
            // if the value of the rightChar in charMap reaches 0, execute below
            if (charMap[rightChar] === 0) {
                // subtract one from the countCharsNeeded as there's one less to find
                countCharsNeeded--;
            }
        }
    }
    // once the while loop breaks, should have the proper res, so return the res
    return res;
}