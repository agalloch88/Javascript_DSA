// A city wants to build a new public park, and the problem requires finding the largest park the city can build without disturbing existing infrastructure.

// Write a function which takes in a two-dimensional array (also known as a matrix), called land, which represents the total land of the city from a top-down perspective. Each value in the land
// input is a boolean. False values are pieces of land not currently in use, while true values are pieces of land currently in use by other infrastructure. The function should return
// the area of the largest possible park.

// The largest possible park will be placed exclusively on unused land, meaning only on false value plots. Moreover, the city requires the park to be a perfect rectangle. If there is
// no available land meeting this requirement, the function should return 0.

// Sample Input:

// land = [
//  [false, true, true, true, false],
//  [false, false, false, true, false],
//  [false, false, false, false, false],
//  [false, true, true, true, true],
// ]

// Sample Output:
// 6
// The park would go from row 1 to row 2, in columns 0 to 3, giving a total area of 6

// Solution 1:

function largestPark(land) {
    let heights = new Array(land[0].length).fill(0);
    let maxArea = 0;

    for (let row of land) {
        for (let columnIndex = 0; columnIndex < land[0].length; columnIndex++) {
            heights[columnIndex] = row[columnIndex] === false ? heights[columnIndex] + 1 : 0;
            
        }
        maxArea = Math.max(maxArea, largestRectangleHistogram(heights));
    }
    return maxArea;
}

function largestRectangleHistogram(heights) {
    let stack = [];
    let maxArea = 0;

    for (let columnIndex = 0; columnIndex < heights.length; columnIndex++) {
        while (stack.length > 0 && heights[columnIndex] < heights[stack[stack.length - 1]]) {
            let height = heights[stack.pop()];
            let width = stack.length === 0 ? columnIndex : columnIndex - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, width * height);
        }
        stack.push(columnIndex);
    }

    while (stack.length > 0) {
        let height = heights[stack.pop()];
        let width = stack.length === 0 ? heights.length : heights.length - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, width * height);
    }

    return maxArea;
}