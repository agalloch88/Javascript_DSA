// Given two non-empty arrays of integers, write a function that determines whether the second array is a subsequence of the first.

// A subsequence of an array is a set of numbers that aren't necessarily adhacent in the array, but that are in the same order as
// they appear in the array. For instance, the numbers [1, 3, 4] form a subsequence of the array [1, 2, 3, 4], and so do the 
// numbers [2, 4]. Note that a single number in an array, and the array itself, are both valid subsequences of the array.

// Sample input:
// array = [5, 1, 22, 25, 6, -1, 8, 10]
// sequence = [1, 6, -1, 10]

// Sample output:
// true

// Solution 1:

// O(n) time due to single pass over array & sequence
// O(1) space as only storing index values, regardless of array/sequence size

function isValidSubsequence(array, sequence) {
    let arrIdx = 0;
    let seqIdx = 0;
    while (arrIdx < array.length && seqIdx < sequence.length) {
        if (array[arrIdx] === sequence[seqIdx]) {
            seqIdx++;
        }
        arrIdx++;
    }
    return seqIdx === sequence.length;
}

// Solution 2:

// O(n) time due to single pass over input array
// O(1) space due to storing single value for sequence position

function isValidSubsequence(array, sequence) {
    let seqIdx = 0;
    for (const value of array) {
        if (seqIdx === sequence.length) {
            break;
        }
        if (sequence[seqIdx] === value) {
            seqIdx++;
        }
    }
    return seqIdx === sequence.length;
}