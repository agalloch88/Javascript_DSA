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

function largestRectangleUnderSkyline(buildings) {
    let maxArea = 0;

    for (let pillarIdx = 0; pillarIdx < buildings.length; pillarIdx++) {
        let currentHeight = buildings[pillarIdx];

        let furthestLeft = pillarIdx;

        while (furthestLeft > 0 && buildings[furthestLeft - 1] >= currentHeight) {
            furthestLeft--;
        }

        let furthestRight = pillarIdx;

        while (furthestRight < buildings.length - 1 && buildings[furthestRight + 1] >= currentHeight) {
            furthestRight++;
        }

        let areaWithCurrentBuilding = (furthestRight - furthestLeft + 1) * currentHeight;
        maxArea = Math.max(areaWithCurrentBuilding, maxArea);
    }
    return maxArea;
}