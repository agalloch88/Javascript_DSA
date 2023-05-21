// Write a function which takes in a list of Cartesian Coordinates (meaning (x, y) coordinates), and which returns the number of squares which can be formed by these coordinates.

// A square must have its four corners amongst the coordinates provided in order to be counted. A single coordinate can be use as a corner for multiple different squares.

// For the context of the problem, assume that no coordinate will be farther than 100 units from the origin.

// Sample Input:

// points = [
//  [1, 1],
//  [0, 0],
//  [-4, 2],
//  [-2, -1],
//  [0, 1],
//  [1, 0],
//  [-1, 4]
// ]

// Sample Output:

// 2
// [1, 1], [0, 0], [0, 1], and [1, 0] make a square
// [1, 1], [-4, 2], [-2, -1], and [-1, 4] make a square

// Solution 1:

function countSquares(points) {
    let pointsSet = new Set();

    for (let point of points) {
        pointsSet.add(pointToString(point));
    }

    let count = 0;

    for (let pointA of points) {
        for (let pointB of points) {
            if (pointA === pointB) {
                continue;
            }

            let midpoint = [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2];
            let xDistanceFromMid = pointA[0] - midpoint[0];
            let yDistanceFromMid = pointA[1] - midpoint[1];

            let pointC = [midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid];
            let pointD = [midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid];

            if (pointsSet.has(pointToString(pointC)) && pointsSet.has(pointToString(pointD))) {
                count++;
            }
        }
    }
    return count / 4;
}

function pointToString(point) {
    return point.join(',');
}