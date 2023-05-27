// Write a function which takes in two strings, and returns the longest common subsequence shared between the two input strings.

// A subsequence of a string is defined as a set of characters which are not necessarily adjacent in the string, but which are in the same order as they appear in the string.
// For instance, the characters ["a", "c", "d"] form a subsequence of the string "abcd", and so do the characters ["b", "d"]. Note that a single character in a string, as well
// as the string itself, are both valid subsequences of the string.

// For the context of the problem, assume that there will be only one longest common subsequence.

// Sample Input:

// str1 = "ZXVVYZW"
// str2 = "XKYKZPW"

// Sample Output:

// ["X", "Y", "Z", "W"]

// Soultion 1:

// 2D array solution comparing length of subsequences, then returning final bottom-right position value

// O(NM * min(N, M)) time due to iterating over N and M values in str1 and str2 respectively, and
// comparing to potentially N or M values, depending on what is smaller
// O(NM * min(N, M)) space due to storing 2D array of N * M values, and comparing to potentially
// N or M values, depending on what is smaller

function longestCommonSubsequence(str1, str2) {
    // initialize variable lcs to an empty array
    let lcs = [];
    // iterate over all values in str2 plus 1, to allow for "empty string" value at the beginning
    for (let i = 0; i < str2.length + 1; i++) {
        // initialize variable row and set up as a new array of str1 length plus 1, tro allow for
        // "empty string" value at the beginning, and fill with empty array
        let row = new Array(str1.length + 1).fill([]);
        // push the new empty array-filled "row" into lcs empty array, and 2D array is now complete
        lcs.push(row);
    }
    // iterate over all values in str2, starting at position 1, as this will align empty string to empty string
    for (let i = 1; i < str2.length + 1; i++) {
        // iterate over all values in st1, starting at position 1, as this will align empty string to empty string
        for (let j = 1; j < str1.length + 1; j++) {
            // if the value one position behind i in str2 is the same as value one position behind j in str1, execute below
            if (str2[i - 1] === str1[j - 1]) {
                // set value at current coordinates of i,j in lcs equal to values diagonally to upper left
                // in lcs, and concat the value from str2 at one position behind i to that value
                // in this instance, found another matching value to the subsequence, so adding it to the mix
                lcs[i][j] = lcs[i - 1][j - 1].concat(str2[i - 1]);
            // otherwise, if values do NOT match, execute below
            } else {
                // set value at coordiantes of i,j in lcs equal to ternary value, checking whether value at i minus 1 and j is GREATER than value at i and j minus 1
                // if so, set value at coordinates i,j in lcs equal to value at i minus 1 and j in lcs
                // if not, set value at coordinates i,j in lcs equal to value at i and j minus 1 in lcs
                lcs[i][j] = lcs[i - 1][j].length > lcs[i][j - 1].length ? lcs[i - 1][j] : lcs[i][j - 1];
            }
        }
    }
    // return the bottom-rightmost value in the 2D array, which is the final longest common subsequence of the two strings
    return lcs[str2.length][str1.length];
}

// Solution 2:

// similar solution, finding out which is the small/big strings and whether the lcs is even or odd

// O(NM * min(N, M)) time due to iterating over N and M values in str1 and str2 respectively, and
// comparing to potentially N or M values, depending on what is smaller
// O((min(N, M)) ^2) space due to storing additional arrays

function longestCommonSubsequence(str1, str2) {
    // initialize variable small and set equal to ternary result of whether str1 is smaller than str2
    let small = str1.length < str2.length ? str1 : str2;
    // initialize variable big and set equal to ternary result of whether str1 is greater than or equal to str2
    let big = str1.length >= str2.length ? str1 : str2;
    // initialize variable evenLcs and set equal to a new array one index longer than length of small, and fill with empty arrays for that length
    let evenLcs = new Array(small.length + 1).fill([]);
    // initialize variable oddLcs and set equal to a new array one index longer than length of small, and fill with empty arrays for that length
    let oddLcs = new Array(small.length + 1).fill([]);
    // iterate over all values in the big string, starting at index 1
    for (let i = 1; i < big.length + 1; i++) {
        // initialize variables currentLcs and previousLcs to track the status of the lcs
        let currentLcs, previousLcs;
        // divide the current value of i by 2 to determine whether even or odd, and set currentLcs and previousLcs to be oddLcs and evenLcs, respectively
        if (i % 2 === 1) {
            currentLcs = oddLcs;
            previousLcs = evenLcs;
        } else {
            currentLcs = evenLcs;
            previousLcs = oddLcs;
        }
        // iterate over all values in the small string, starting at index 1
        for (let j = 1; j < small.length + 1; j++) {
            // if the value in big and small are equal, execute below
            if (big[i - 1] === small[j - 1]) {
                // set value at index j in currentLcs equal to the value at j minus 1 in previousLcs and concatenate the value from i minus 1 in big string,
                // which updates the running lcs value with another match
                currentLcs[j] = previousLcs[j - 1].concat(big[i - 1]);
            // if the value in big and small is NOT equal, execute below
            } else {
                // set value of j in currentLcs equal to ternary result of checking whether previousLcs at index j is  larger than currentLcs at index j minus 1,
                // which should then resolve to value at index j in previousLcs if true, or value at index j minus 1 in currentLcs if false
                currentLcs[j] = previousLcs[j].length > currentLcs[j - 1].length ? previousLcs[j] : currentLcs[j - 1];
            }
        }
    }
    // once the for loops break, return then value of whether the big string is even or odd, and return evenLcs or oddLcs values at last index in small string, respectively
    return big.length % 2 === 0 ? evenLcs[small.length] : oddLcs[small.length];
}

// Solution 3:

// unique solution using a 4-index array to track either null or a value to store, the current length of the lcs, and then pointers for the row and column of the last matching character

// O(NM) time due to only going over the two strings
// O(NM) space due to reducing storage to lcs, row, and the entry array

function longestCommonSubsequence(str1, str2) {
    // initialize variable lcs and set equal to empty array
    let lcs = [];
    // iterate over str2 values plus 1 for empty string
    // when this for loop exits, will have built the needed 2D array
    for (let i = 0; i < str2.length + 1; i++) {
        // for every value, initialize variable row and set equal to another empty array
        let row = [];
        // iterate over str1 values plus 1 for empty string
        for (let j = 0; j < str1.length + 1; j++) {
            // initialize variable entry, and set equal to a new array with length of 4
            let entry = new Array(4);
            // set the value at index 1 equal to 0, which represents that the current lcs is currently 0 items long
            entry[1] = 0;
            // push the entry array into the current row
            row.push(entry);
        }
        // push the current row into the lcs array
        lcs.push(row);
    }
    // iterate over str2, starting at index 1
    for (let i = 1; i < str2.length + 1; i++) {
        // iterate over str1, starting at index 1
        for (let j = 1; j < str1.length + 1; j++) {
            // check whether the values at i muns 1 and j minus 1 in str2 and str1, respectively, are equal, and if so, execute the below
            if (str2[i - 1] === str1[j - 1]) {
                // set the values for entries at position i,j in lcs equal to the value at i minus 1 in str2, previous lcs length value plus 1, and then current i and j coordinates
                lcs[i][j] = [str2[i - 1], lcs[i - 1][j - 1][1] + 1, i - 1, j - 1];
            // if the values are NOT equal, not adding this value to the lcs, so execute the below
            } else {
                // if length of lcs immediately above is greater than lcs immediately to the left, then take the length above
                if (lcs[i - 1][j][1] > lcs[i][j - 1][1]) {
                    lcs[i][j] = [null, lcs[i - 1][j][1], i - 1, j];
                // otherwise, if length to the left is greater, take the length to the left
                } else {
                    lcs[i][j] = [null, lcs[i][j - 1][1], i, j - 1];
                }
            }
        }
    }
    // return call to helper function which builds the lcs sequence backwards using unshift method
    return buildSequence(lcs);
}

// helper function which takes in the lcs which needs to be built, working backwards from bottom-right of 2D array to build the final lcs sequence
function buildSequence(lcs) {
    // initialize variable sequence and set equal to empty array
    let sequence = [];
    // initialize variable i, and set equal to last value in lcs
    let i = lcs.length - 1;
    // initialize variable j, and set equal to last value in lcs at index 0
    let j = lcs[0].length - 1;
    // keep looping so long as not finished with all actual values, meaning not back at the empty string intersection
    while (i !== 0 && j !== 0) {
        // initialize variable current entry, and set equal to the coordinates of i,j in lcs
        let currentEntry = lcs[i][j];
        // if there is a value at index 0 of the entry array at these coordinates, meaning it is not null and there is a value to add to the lcs, then execute the below
        if (currentEntry[0]) {
            // unshift the value at index 0 of currentEntry into the sequence
            sequence.unshift(currentEntry[0]);
        }
        // set the value of i equal to the value at index 2 of currentEntry
        i = currentEntry[2];
        // set the value of j equal to the value at index 3 of currentEntry
        j = currentEntry[3];
    }
    // once finished, return the completed sequence
    return sequence;
}

// Solution 4:

// iterative solution tracking the numerical length at each spot in 2D array, pushing some additional
// logic into helper as well

// O(nm) time due to checking n * m values in str 1 and str2, respectively
// O(nm) space due to spot a 2D array for n * m values

// main function which takes in str1 and str2 as inputs
function longestCommonSubsequence(str1, str2) {
    // initialize variable lengths and set equal to empty array
    let lengths = [];
    // iterate over values in str2 plus 1
    for (let i = 0; i < str2.length + 1; i++) {
        // for every value in st2, push a new array into lengths holder array for every value in str1 plus 1, and fill with a 0
        // this value will track the length of the lcs at every step, simplifying to one value from 4 or lcs-length value
        lengths.push(new Array(str1.length + 1).fill(0));
    }
    // iterate over every value in str2 plus 1 again
    for (let i = 1; i < str2.length + 1; i++) {
        // iterate over every value in str1 plus 1 again
        for (let j = 1; j < str1.length + 1; j++) {
            // if the values at i - 1 in str2 and j - 1 in str1 ARE equal, found another value in a lcs, so increment the value at the place of i,j in lengths by the previous value plus 1
            if (str2[i - 1] === str1[j - 1]) {
                lengths[i][j] = lengths[i - 1][j - 1] + 1;
            // if the values at i - 1 in str2 and j - 1 in str1 are NOT equal, set the value at i,j in lengths equal to the max value between value to left or above current position
            } else {
                lengths[i][j] = Math.max(lengths[i - 1][j], lengths[i][j - 1]);
            }
        }
    }
    // return the result from a call to helper function build sequence, passing in the lengths array and str1 values
    return buildSequence(lengths, str1);
}

// helper function which takes in the lengths array, and another string
function buildSequence(lengths, string) {
    // initialize variable sequence, and set equal to an empty array
    let sequence = [];
    // initialize variable i, and set equal to the last value in lengths array
    let i = lengths.length - 1;
    // initialize variable j, and set equal to the last value in lengths array at index 0
    let j = lengths[0].length - 1;
    // keep looping so long as neither i nor j equal 0
    while (i !== 0 && j !== 0) {
        // if current position value is equal to the position to the left, decrenment i by 1
        if (lengths[i][j] === lengths[i - 1][j]) {
            i--;
        // if current position value is equal to the position above, decrement j by 1
        } else if (lengths[i][j] === lengths[i][j - 1]) {
            j--;
        // otherwise, push value at j - 1 in string into sequence via unshift, then decrement both i and j by 1
        } else {
            sequence.unshift(string[j - 1]);
            i--;
            j--;
        }
    }
    // return the sequence
    return sequence;
}