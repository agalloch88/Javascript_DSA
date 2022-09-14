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

function numberOfWaysToTraverseGraph(width, height) {
    if (width === 1 || height === 1) {
        return 1;
    }

    return numberOfWaysToTraverseGraph(width - 1, height) + numberOfWaysToTraverseGraph(width, height - 1);
}