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

// iterative solution using histogram method and a stack to find the largest possible rectangle area

// O(w * h) time as will have to check all items in the dimensions of land input
// O(w) space due to storing histogram for row by row

// main function which takes in the land area input
function largestPark(land) {
    // initialize variable heights, which will track the histogram heights, and set equal to a new array the same length as zero index row and fill with 0's at outset
    let heights = new Array(land[0].length).fill(0);
    // initialize variable maxArea to track the largest rectangle found, and set equal to 0 at outset
    let maxArea = 0;

    // iterate over every row in the land input
    for (let row of land) {
        // for every columnIndex in the row, execute the following
        for (let columnIndex = 0; columnIndex < land[0].length; columnIndex++) {
            // set the value at the current columnIndex in the heights array equal to the result of a ternary
            // check whether the given columnIndex value in the row is false, and if so, increment the value at columnIndex in heights by one, or if not, set equal to 0
            heights[columnIndex] = row[columnIndex] === false ? heights[columnIndex] + 1 : 0;
        }
        // once done with all the items in the row, set maxArea equal to the max between the current value of maxArea and the returned value from helper
        maxArea = Math.max(maxArea, largestRectangleHistogram(heights));
    }
    // once done checking all rows in land input, should know the largest park possible, so return the maxArea
    return maxArea;
}

// helper function which will find the largest rectangle via visualizing the rectangles as a histogram, which takes in the heights array
function largestRectangleHistogram(heights) {
    // initialize the stack and set equal to an empty array
    let stack = [];
    // initialize variable maxArea to track the largest rectangle found, and set equal to 0 at outset
    let maxArea = 0;

    // iterate over every columnIndex in the heights array
    for (let columnIndex = 0; columnIndex < heights.length; columnIndex++) {
        // keep looping so long as the stack has items in it, and the value at columnIndex in heights array is less than the top value in the stack in heights
        while (stack.length > 0 && heights[columnIndex] < heights[stack[stack.length - 1]]) {
            // initialize variable height and set equal to the value of the top item on the stack, which is popped off the top
            let height = heights[stack.pop()];
            // initialize variable width and set equal to result of a ternary
            // if the stack is empty, set the value of width equal to the value of columnIndex, and if stack has items inside still, set width equal to columnIndex minus the value of top item on stack minus 1
            let width = stack.length === 0 ? columnIndex : columnIndex - stack[stack.length - 1] - 1;
            // set maxArea equal to the max between current maxArea value, and the value of width times height
            maxArea = Math.max(maxArea, width * height);
        }
        // push the current columnIndex onto the stack
        stack.push(columnIndex);
    }
    // in edge cases, the stack may not be empty once the for loop above completes, so handle that edge case below to keep looping so long as the stack is not empty
    while (stack.length > 0) {
        // initialize variable height and set equal to the value of the top item on the stack, which is popped off the top
        let height = heights[stack.pop()];
        // initialize variable width and set equal to result of a ternary
        // if the stack is empty, set width equal to the length of heights, and if not, set width equal to the value of heights length minus the top value on stack minus 1
        let width = stack.length === 0 ? heights.length : heights.length - stack[stack.length - 1] - 1;
        // set maxArea equal to the max between current maxArea value, and width times height
        maxArea = Math.max(maxArea, width * height);
    }
    // return the maxArea for use in main function
    return maxArea;
}