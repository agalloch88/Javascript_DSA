// The problem presents a scenario of moving into a new apartment on a specific street. It also
// presents a list/array of contiguous blocks on that street, where each block contains an apartment
// which could theoretically be moved into.

// There is also a list/array of requirements: a list of buildings with personal importance. For instance,
// there might be a valued school or gym near the apartment. The list of blocks presented
// contains information at every block about all of the buildings which are present and absent
// on the block in question. For instance, for every block, it may be known whether a school,
// pool, office, and gym are present.

// In order to optimize life, it's optimal to pick an apartment block such that the farthest
// distance required to reach any of the aforementioned ammenities is minimized.

// Write a function which takes in a list/array of contiguous blocks on a specific street, along with
// a list/array of required buildings, and which returns the location (index) of the block which
// is most optimal.

// If there are multiple most optimal blocks, the function may return the index of any of them.

// Sample Input:

// blocks = [
//  {
//      "gym": false,
//      "school": true,
//      "store": false,
//  },
//  {
//      "gym": true,
//      "school": false,
//      "store": false,
//  },
//  {
//      "gym": true,
//      "school": true,
//      "store": false,
//  },
//  {
//      "gym": false,
//      "school": true,
//      "store": false,
//  },
//  {
//      "gym": false,
//      "school": true,
//      "store": true,
//  },
// ]

// reqs = ["gym", "school", "store"]

// Sample Output:

// 3
// at the block held by index 3, the farthest walk to reach a gym, school, or store is 1 block
// the school is on that block, the gym is at the block held by index 2, and the store is at
// the block held by index 4

// Solution 1:

function apartmentHunting(blocks, reqs) {
    let maxDistancesAtBlocks = new Array(blocks.length).fill(-Infinity);
    for (let i = 0; i < blocks.length; i++) {
        for (let req of reqs) {
            let closestReqDistance = Infinity;
            
            for (let j = 0; j < blocks.length; j++) {

                if (blocks[j][req]) {
                    closestReqDistance = Math.min(closestReqDistance, distanceBetween(i, j));
                }
            }
            maxDistancesAtBlocks[i] = Math.max(maxDistancesAtBlocks[i], closestReqDistance);
        }
    }
    return getIdxAtMinValue(maxDistancesAtBlocks);
}

function getIdxAtMinValue(array) {
    let idxAtMinValue = 0;
    let minValue = Infinity;

    for (let i = 0; i < array.length; i++) {
        let currentValue = array[i];
        
        if (currentValue < minValue) {
            minValue = currentValue;
            idxAtMinValue = i;
        }
    }
    return idxAtMinValue;
}

function distanceBetween(a, b) {
    return Math.abs(a - b);
}