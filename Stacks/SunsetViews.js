// Given an array of buildings and a direction which all the buildings face, return an array of the indices of the buildings which can see the sunset.

// A building can see the sunset if it's strictly taller than all the buildings which come after the given building in the direction which it faces.

// The input array named buildings contains positive, non-zero integers representing the heights of the buildings. A building at index i thus has a height 
// denoted by buildings[i]. All of the buildings face the same direction, and this direction is either east or west, denoted by the input string named direction,
// which will always be equal to 'EAST' or 'WEST'. In relation to the input array, the direction may be interpreted as right for east, and left for west.

// Important note: the indices in the output array should be sorted in ascending order.

// Sample Input 1:
// buildings = [3, 5, 4, 4, 3, 1, 3, 2]
// direction = 'EAST'

// Sample Output 1:
// [1, 2, 6, 7]

// Sample Input 2:
// buildings = [3, 5, 4, 4, 3, 1, 3, 2]
// direction = 'WEST'

// Sample Output 2:
// [0, 1]
// Same input as Sample 1, but the direction is reversed

// Solution 1:

// iterative solution with a single pass over input

// O(n) time due to single pass over buildings input
// O(n) space due to storing at max n items from input in new array

function sunsetViews(buildings, direction) {
    // create holder array for buildings to return
    let buildingsWithSunsetViews = [];
    // determine where to start iterating depending on direction provided, and how iterating will proceed
    let startIdx = direction === 'WEST' ? 0 : buildings.length - 1;
    let step = direction === 'WEST' ? 1 : -1;
    // set idx to the startIdx determined by direction
    let idx = startIdx;
    // keep track of current tallest building to check if buildings' views may be blocked
    let runningMaxHeight = 0;
    // start iterating from startIdx determined by direction, and continue doing so while in the confines of the input values
    while (idx >= 0 && idx < buildings.length) {
        // grab current building height
        let buildingHeight = buildings[idx];
        // check to see if current building is taller than any others thus far, indicating it will have a view
        if (buildingHeight > runningMaxHeight) {
            // if taller, push into holder array
            buildingsWithSunsetViews.push(idx);
        }
        // after check, set the max height to the max value between current building and current max height
        runningMaxHeight = Math.max(buildingHeight, runningMaxHeight);
        // move on to next building
        idx = idx + step;
    }
    // if direction was EAST, started from the end, so have to reverse the values in holder array, which is fine as it's O(n) operation
    if (direction === 'EAST') {
        buildingsWithSunsetViews.reverse();
    }
    // return final array of results
    return buildingsWithSunsetViews;
}