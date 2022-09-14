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

function numberOfWaysToTraverseGraph(width, height) {
    let numberOfWays = [];
    for (let i = 0; i < height + 1; i ++) {
        numberOfWays.push([]);
        for (let j = 0; j < width + 1; j ++) {
            numberOfWays[i].push(0);
        }
    }

    for (let widthIdx = 1; widthIdx < width + 1; widthIdx++) {
        for (let heightIdx = 1; heightIdx < height + 1; heightIdx++) {
            if (widthIdx === 1 || heightIdx === 1) {
                numberOfWays[heightIdx][widthIdx] = 1;
            } else {
                let waysLeft = numberOfWays[heightIdx][widthIdx - 1];
                let waysUp = numberOfWays[heightIdx - 1][widthIdx];
                numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp;
            }
        }
    }
    return numberOfWays[height][width];
}