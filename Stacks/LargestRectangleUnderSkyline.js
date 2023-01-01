// Write a function which takes in an array of positive integers representing the heights of
// adjacent buildings, and which returns the area of the largest rectangle which can be created
// by any number of adjacent buildings, including just one building. Note that all buildings
// have the same width of 1 unit.

// For example, given buildings = [2, 1, 2], the area of the largest rectangle which can be
// created is 3, using all three buildings. Since the minimum height of the three buildings is 1,
// a rectangle can be made witha  height of 1 and a width of 3. A rectangle can also be created with
// rectangles of area 2 by using only the first building of the last building, but these clearly
// would not be the largest rectangles. Similarly, rectangles of area 2 can be made by using the 
// first and second building, or the second and third building.

// To clarify, the width of a created rectangle is the number of buildings used to create the 
// rectangle, and its height is the height of the smallest building used to create the rectangle.

// Note that if no rectangles can be created, the function should return 0.

// Sample Input:
// buildings = [1, 3, 3, 2, 4, 1, 5, 3, 2]

// Sample Output:
// 9

// Solution 1:

// iterative solution finding current height then checking furthest left and right same height can expand

// O(n ^ 2) time due to potentially traversing entire array for each building
// O(1) space due to only storing a few variables

function largestRectangleUnderSkyline(buildings) {
    // set up variable to hold largest area found, initialize to 0 and store as maxArea
    let maxArea = 0;
    // iterate over every pillar/building in the input buildings array
    for (let pillarIdx = 0; pillarIdx < buildings.length; pillarIdx++) {
        // grab the value at the pillarIdx in the buildings array, and store in variable currentHeight
        let currentHeight = buildings[pillarIdx];
        // set variable furthestLeft equal to current pillarIdx
        let furthestLeft = pillarIdx;
        // so long as furthestLeft is in bounds and the pillar to the left of current position is equal to or taller
        // than the currentHeight, keep looping
        while (furthestLeft > 0 && buildings[furthestLeft - 1] >= currentHeight) {
            // if this while loop condition is true, keep expanding left by decrementing the furthestLeft variable
            furthestLeft--;
        }
        // set the variable furthestRight equal to the current pillarIdx
        let furthestRight = pillarIdx;
        // so long as furthestRight is in bounds and the pillar to the rught of current position is equal to or taller
        // than the currentHeight, keep looping
        while (furthestRight < buildings.length - 1 && buildings[furthestRight + 1] >= currentHeight) {
            // if this while loop condition is true, keep expanding right by incrementing the furthestRight variable
            furthestRight++;
        }
        // find the area of the current rectangle by subtracting furthestRight by furthestLeft, adding 1 to account for zero index,
        // and multiplying by the currentHeight, and store in variable areaWithCurrentBuilding
        let areaWithCurrentBuilding = (furthestRight - furthestLeft + 1) * currentHeight;
        // set maxArea equal to the greater between areaWithCurrentBuilding and current value of maxArea
        maxArea = Math.max(areaWithCurrentBuilding, maxArea);
    }
    // once loop is finished, return the current value of maxArea
    return maxArea;
}