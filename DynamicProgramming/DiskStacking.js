// The problem presents a non-empty array of arrays, where each subarray holds three integers, and which represents a disk. The integers denote each disk's width,
// depth, and height, respectively, and in that order. The goal is to stack up the disks, and to maximize the total height of the stack. To stack, a disk must
// have a strictly smaller width, depth, and height compared to any other disk below itself.

// Write a function which returns an array of the disks in the final stack, starting witht he top disk and ending with the bottom disk. Note that disks may not
// rotate. In other words, the integers in each subarray must represent [width, depth, height] at all times.

// For the context of the problem, assume there will only be one stack solution with the greatest total height.

// Sample Input:
// disks = [[2, 1, 2], [3, 2, 3,], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]]

// Sample Output:
// [[2, 1, 2], [3, 2, 3], [4, 4, 5]]
// 10 (2 + 3 + 5) is the tallest height possible by stacking the disks above following the rules above

// Solution 1:

// iterative solution finding heights, valid dimensions, and building possible sequence

// O(n ^ 2) time due to nested for loops
// O(n) space due to new sequence array of at most n

// main function which takes in the array of disks
function diskStacking(disks) {
    // sort the disks such that the heights are in ascending order in the disks array
    disks.sort((a, b) => a[2] - b[2]);
    // initialize variable heights and set equal to the mapped disks array, mapping on index 2
    // to grab the heights of each disk
    let heights = disks.map(disk => disk[2]);
    // initialize variable sequences and set equal to a new empty array the same length
    // as the disks array
    let sequences = new Array(disks.length);
    // initialize variable maxHeightIdx and set equal to 0 at the outset
    let maxHeightIdx = 0;
    // loop over the disks for i, starting at index 1
    for (let i = 1; i < disks.length; i++) {
        // initialize variable currentDisk and set equal to the value at index i in the disks
        // array
        let currentDisk = disks[i];
        // loop over the disks for j, starting at index 0
        for (let j = 0; j < disks.length; j++) {
            // initialize variable otherDisk, and set equal to the value at j in disks array
            let otherDisk = disks[j];
            // check whether there are valid dimensions between the two disks using helper
            // function and passing in current values for otherDisk and currentDisk
            if (areValidDimensions(otherDisk, currentDisk)) {
                // if height of disk at position i is less than or equal to the height of the
                // currentDisk plus the height of disk at position j, then execute below
                if (heights[i] <= currentDisk[2] + heights[j]) {
                    // entering this block means the disks are stackable, so set value at
                    // position i in heights equal to currentDisk height plus height of disk
                    // at position j
                    heights[i] = currentDisk[2] + heights[j];
                    // set value at position i in sequences equal to value of position j
                    sequences[i] = j;
                }
            }
        }
        // if the value in heights at position i is greater than or equal to the value in heights
        // at the maxHeightIdx, then set maxHeightIdx equal to i
        if (heights[i] >= heights[maxHeightIdx]) {
            maxHeightIdx = i;
        }
    }
    // return a call to helper function buildSequence, passing in disks, sequences, and maxHeightIdx
    return buildSequence(disks, sequences, maxHeightIdx);
}

// helper function to determine valid dimensions of stack, passing in otherDisk and currentDisk
function areValidDimensions(otherDisk, currentDisk) {
    // return the result of comparing whether width, depth, and height of otherdisk is less than currentDisk
    return otherDisk[0] < currentDisk[0] && otherDisk[1] < currentDisk[1] && otherDisk[2] < currentDisk[2];
}

// helper function to build the sequential stack of disks, passing in array, sequences, and currentIdx
function buildSequence(array, sequences, currentIdx) {
    // initialize variable sequence and set equal to empty array
    let sequence = [];
    // while still in bounds and currentIdx is not undefined, keep looping
    while (currentIdx !== undefined) {
        // unshift the value at currentIdx in the array into sequence
        sequence.unshift(array[currentIdx]);
        // set currentIdx equal to the currentIdx in sequences
        currentIdx = sequences[currentIdx];
    }
    // return the completed sequence
    return sequence;
}