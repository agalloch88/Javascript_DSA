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

function diskStacking(disks) {
    disks.sort((a, b) => a[2] - b[2]);
    let heights = disks.map(disk => disk[2]);
    let sequences = new Array(disks.length);
    let maxHeightIdx = 0;

    for (let i = 1; i < disks.length; i++) {
        let currentDisk = disks[i];

        for (let j = 0; j < disks.length; j++) {
            let otherDisk = disks[j];

            if (areValidDimensions(otherDisk, currentDisk)) {
                if (heights[i] <= currentDisk[2] + heights[j]) {
                    heights[i] = currentDisk[2] + heights[j];
                    sequences[i] = j;
                }
            }
        }

        if (heights[i] >= heights[maxHeightIdx]) {
            maxHeightIdx = i;
        }
    }
    return buildSequence(disks, sequences, maxHeightIdx);
}

function areValidDimensions(otherDisk, currentDisk) {
    return otherDisk[0] < currentDisk[0] && otherDisk[1] < currentDisk[1] && otherDisk[2] < currentDisk[2];
}

function buildSequence(disks, sequences, currentIdx) {
    let sequence = [];

    while (currentIdx !== undefined) {
        sequence.unshift(array[currentIdx]);
        currentIdx = sequences[currentIdx];
    }
    return sequence;
}