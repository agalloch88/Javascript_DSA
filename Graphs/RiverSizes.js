// The problem presents a two-dimensional array (also known as a matrix), which may potentially be unequal in terms of height and width, and contains only 0's and 1's.
// Each 0 represents land, and each 1 represents a stretch of river. A river consisters of any number of 1's strung consecutively, either horizontally or vertically adjacent, 
// but not diagonally adjacent. The number of adjacent 1's forming a river determine the river's size.

// Note that a river can twist. In other words, it does not have to be a straight vertical line, or a straight horizontal line. It can be L-shaped, or T-shaped, for example.

// Write a function which returns an array of the sizes of all rivers represented/found in the input matrix. The sizes do not need to be in any particular order.

// Sample Input:
// matrix = [
//  [1, 0, 0, 1, 0],
//  [1. 0, 1, 0, 0],
//  [0, 0, 1, 0, 1],
//  [1, 0, 1, 0, 1],
//  [1, 0, 1, 1, 0],   
// ]

// Sample Output:
// [1, 2, 2, 2, 5], but the numbers may be ordered differently.

// Solution 1:

// O(wh) time due to traversing all nodes, where w is width of matrix and h is height of matrix. can also be simplified to O(n) since w * h = n
// O(wh) space due to iterating and storing all values, where w is width of matrix and h is height of matrix. can also be simplified to O(n) since w * h = n

function riverSizes(matrix) {
    let sizes = [];
    let visited = matrix.map(row => row.map(value => false));

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (visited[i][j]) {
                continue;
            }
            traverseNode(i, j, matrix, visited, sizes);
        }
    }
    return sizes;
}

function traverseNode(i, j, matrix, visited, sizes) {
    let currentRiverSize = 0;
    let nodesToExplore = [[i, j]];

    while (nodesToExplore.length) {
        let currentNode = nodesToExplore.pop();
        i = currentNode[0];
        j = currentNode[1];

        if (visited[i][j]) {
            continue;
        }

        visited[i][j] = true;

        if (matrix[i][j] === 0) {
            continue;
        }

        currentRiverSize++;

        let unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited);
        for (let neighbor of unvisitedNeighbors) {
            nodesToExplore.push(neighbor);
        }
    }

    if (currentRiverSize > 0) {
        sizes.push(currentRiverSize);
    }
}

function getUnvisitedNeighbors(i, j, matrix, visited) {
    let unvisitedNeighbors = [];

    if (i > 0 && !visited[i - 1][j]) {
        unvisitedNeighbors.push([i - 1, j]);
    }

    if (i < matrix.length - 1 && !visited[i + 1][j]) {
        unvisitedNeighbors.push([i + 1, j]);
    }

    if (j > 0 && !visited[i][j - 1]) {
        unvisitedNeighbors.push([i, j - 1]);
    }

    if (j < matrix[0].length - 1 && !visited[i][j + 1]) {
        unvisitedNeighbors.push([i, j + 1]);
    }

    return unvisitedNeighbors;
}