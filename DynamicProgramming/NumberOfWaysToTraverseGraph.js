// The problem presents two positive integers representing the width and heioght of a grid-shaped, rectangular graph. Write a function which returns the number of ways to
// reach the bottom right corner of the graph when starting at the top left corner. Each move made must either go down or to the right. In other words, moving up or left
// in the graph will never occur.

// For example, given the graph shown below, with width = 2 and height = 3, there are three ways to reach the bottom right corner when starting at the top left corner:

//  _ _
// |_|_|
// |_|_|
// |_|_|

// 1. down, down, right
// 2. right, down, down
// 3. down, right, down

// Note: it can be assumed that widfth * height >= 2. In other words, the graph will never be a 1x1 grid.

// Sample Input:
// width = 4
// height = 3

// Sample Output:
// 10

// Solution 1:

// recursive solution but has a poor time complexity

// O(2^(w + h)) time due to looking at 2 options for every node in graph, where w is the width and h is the height of the graph
// O(w + h) space due to potentially w + h total recursive calls on stack

function numberOfWaysToTraverseGraph(width, height) {
    // base case
    // on an edge in either case, so return 1
    if (width === 1 || height === 1) {
        return 1;
    }
    // recursive case
    // for every position, return the sum to the left and above current position
    return numberOfWaysToTraverseGraph(width - 1, height) + numberOfWaysToTraverseGraph(width, height - 1);
}

// Solution 2:

// Solution utilizing dynamic programming

// O(w * h) time due to looking at every node, where w is the width and h is the height of the graph
// O(w * h) space due to constructing new 2D array with numberOfWays

function numberOfWaysToTraverseGraph(width, height) {
    // create new 2D array, fill with 0's initially
    let numberOfWays = [];
    for (let i = 0; i < height + 1; i ++) {
        numberOfWays.push([]);
        for (let j = 0; j < width + 1; j ++) {
            numberOfWays[i].push(0);
        }
    }
    // start iterating through to calculate numberOfWays
    for (let widthIdx = 1; widthIdx < width + 1; widthIdx++) {
        for (let heightIdx = 1; heightIdx < height + 1; heightIdx++) {
            // if on the horizontal or vertical edge, only 1 way to get there, so push that value into these slots
            if (widthIdx === 1 || heightIdx === 1) {
                numberOfWays[heightIdx][widthIdx] = 1;
            } else {
                // since only allowed to go down or right, we want to look at how many ways there are to the left and above a given position to determine numberOfWays
                let waysLeft = numberOfWays[heightIdx][widthIdx - 1];
                let waysUp = numberOfWays[heightIdx - 1][widthIdx];
                // the numberOfWays for a given position is set to the value of left + up
                numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp;
            }
        }
    }
    // after filling out entire 2D array, we are ending at bottom right position, so return the numberOfWays at this position
    return numberOfWays[height][width];
}

// Solution 3:

// Mathematical solution utitlizing factorial and permutation knowledge, (x + y) ! / x! * y!

// O(w + h) time due to calculating value for bottom right corner
// O(1) space due to only calculating, storing a few variables

function numberOfWaysToTraverseGraph(width, height) {
    // find the x and y for bottom right corner
    let xDistanceToCorner = width - 1;
    let yDistanceToCorner = height - 1;
    // handle the top portion of the equation using helper function for factorial operations
    let numerator = factorial(xDistanceToCorner + yDistanceToCorner);
    // handle the bottom portion of the equation using helper function for factorial operations
    let denominator = factorial(xDistanceToCorner) * factorial(yDistanceToCorner);
    // may end up with decimals depending on input, so floor this value and return result of the function
    return Math.floor(numerator / denominator);
}

function factorial(num) {
    // start with value of 1
    let result = 1;
    // perform factorial operation up to n
    for (let n = 2; n < num + 1; n++) {
        result *= n;
    }
    // return the result for this num
    return result;
}

// Solution 4:

// Simple graph traversal using DFS

function numberOfWaysToTraverseGraph(width, height, x = 0, y = 0) {
    let stack = [];

    stack.push({x, y});

    let count = 0;

    while (stack.length > 0) {
        let currentPosition = stack.pop();

        if (currentPosition.x === width - 1 && currentPosition.y === height - 1) {
            count++;
        }

        if (currentPosition.x < width - 1) {
            stack.push({x: currentPosition.x + 1, y: currentPosition.y});
        }

        if (currentPosition.y < height - 1) {
            stack.push({x: currentPosition.x, y: currentPosition.y + 1});
        }
    }

    return count;
}