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

// naive, non-optimal solution looking at all blocks, all reqs within each block, then each req to find
// the maximum distance to a req for each block, then selecting the block with the lowest max distance

// O(b^2*r) time, where b is the length of blocks and r is the length of reqs, due to looking twice for each req
// at each block with 3 nested for loops
// O(b) space due to storing maxDistancesAtBlocks for length of blocks input

// main function which takes in the array of block objects, and the array of requirements
function apartmentHunting(blocks, reqs) {
  // initialize variable maxDistanceAtBlocks to hold the max value of distance to any single requirement
  // set this equal to a new array of blocks length, and fill it with -Infinity values so any value will be greater
  let maxDistancesAtBlocks = new Array(blocks.length).fill(-Infinity);

  // iterate over the blocks array of objects
  for (let i = 0; i < blocks.length; i++) {
    // for every block, iterate over the array of requirements
    for (let req of reqs) {
      // initialize variable closestReqDistance and set equal to Infinity, such that any distance will be smaller
      let closestReqDistance = Infinity;

      // for every requirement, iterate over the other blocks
      for (let j = 0; j < blocks.length; j++) {
        // if blocks at position j has the current requirement, execute below
        if (blocks[j][req]) {
          // set the closestReqDistance equal to the minimum between the current value of closestReqDistance, and the return value from a call to helper function distanceBetween, passing
          // in the value of i and j currently
          closestReqDistance = Math.min(
            closestReqDistance,
            distanceBetween(i, j),
          );
        }
      }
      // set maxDistancesAtBlocks at position i equal to the max between the current value at index i and the closestReqDistance
      // this will serve as the greatest distance one must travel to a given requirement if this apartment was selected
      maxDistancesAtBlocks[i] = Math.max(
        maxDistancesAtBlocks[i],
        closestReqDistance,
      );
    }
  }

  // once all for loops finish, return a call to helper getIdxAtMinValue, passing in the completed maxDistancesAtBlocks array
  return getIdxAtMinValue(maxDistancesAtBlocks);
}

// helper function to retrieve the index of the optimal apartment block, passing in the arraya of maxDistancesAtBlocks
function getIdxAtMinValue(array) {
  // initialize variable idxAtMinValue, and set equal to 0 at the outset
  let idxAtMinValue = 0;
  // initialize variable minValue, and set equal to Infinity, such that any value at first pass will be smaller
  let minValue = Infinity;

  //   iterate over the array of maxDistancesAtBlocks
  for (let i = 0; i < array.length; i++) {
    // initialize varaiable currentValue, and set equal to the value at position i in the array
    let currentValue = array[i];

    // if the currentValue is smaller than the minValue, execute below
    if (currentValue < minValue) {
      // found a more ideal apartment block, so set minValue equal to the currentValue
      minValue = currentValue;
      // set the idxAtMinValue equal to the value of i to update the index of the ideal apartment block
      idxAtMinValue = i;
    }
  }

  // once finished looking at all blocks within the maxDistancesAtBlocks array, return the current value for idxAtMinValue for use in the main function, which will be the answer
  return idxAtMinValue;
}

// helper function which takes in two indices to calculate their absolute distance
function distanceBetween(a, b) {
  // simply return the absolute value distance between a minus b
  return Math.abs(a - b);
}

// Solution 2:

function apartmentHunting(blocks, reqs) {
    let minDistancesFromBlocks = reqs.map(req => getMinDistances(blocks, req));
    let maxDistancesAtBlocks = getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks);
    return getIdxAtMinValue(maxDistancesAtBlocks);
}

function getMinDistances(blocks, req) {
    let minDistances = new Array(blocks.length);
    let closestReqIdx = Infinity;

    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i][req]) {
            closestReqIdx = i;
        }
        minDistances[i] = distanceBetween(i, closestReqIdx);
    }
    
    for (let i = blocks.length - 1; i >= 0; i--) {
        if (blocks[i][req]) {
            closestReqIdx = i;
        }
        minDistances[i] = Math.min(minDistances[i], distanceBetween(i, closestReqIdx));
    }

    return minDistances;
}

function getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks) {
    let maxDistancesAtBlocks = new Array(blocks.length);
    
    for (let i = 0; i < blocks.length; i++) {
        let minDistancesAtBlock = minDistancesFromBlocks.map(distances => distances[i]);
        maxDistancesAtBlocks[i] = Math.max(...minDistancesAtBlock);
    }
    
    return maxDistancesAtBlocks;
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