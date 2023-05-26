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

// mathematical solution finding midpoint of square between two vertices, and calculating other points based on that distance

// O(n ^ 2) time due to nested for loop operations and finding each square potentially multiple times
// O(n) space due to storing points as new point Set and a few variables

// main function which takes in an array of nested array point pairs
function countSquares(points) {
    // initialize variable pointsSet and set equal to a new Set object
    let pointsSet = new Set();
    // iterate over every individual pair of coordinates in the points input
    for (let point of points) {
        // add every stringified point pair to the pointsSet Set object, utilizing helper function to stringify point
        pointsSet.add(pointToString(point));
    }
    // initialize variable count to track total number of squares, and set equal to 0 at the outset
    let count = 0;
    // take one point pair from points input and loop over points
    for (let pointA of points) {
        // take another point pair from points input and loop over points again
        for (let pointB of points) {
            // if the two values are equal to each other, simply continue
            if (pointA === pointB) {
                continue;
            }
            // initialize variable midpoint, and set equal to a set of coordinates calculated by the two point pair values currently stored in pointA and pointB
            // this will generate the midpoint coordinates between pointA and pointB, which can be used to find the coordinate values which would make a square of
            // pointA and pointB, if these values were plotted on a graph
            let midpoint = [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2];
            // initialize variable xDistanceFromMid and find the x value of distance a squareable-value would have to be from midpoint, utilizing the
            // zero-index value in the pointA coordinate pair minus the zero-index value in the midpoint coordinate pair
            let xDistanceFromMid = pointA[0] - midpoint[0];
            // initialize variable yDistanceFromMid and find the y value of distance a squareable-value would have to be from midpoint, utilizing the
            // one-index value in the pointA coordinate pair minus the one-index value in the midpoint coordinate pair
            let yDistanceFromMid = pointA[1] - midpoint[1];
            // initialize variable pointC and set equal to a coordinate pair constructed by adding zero-index value of midpoint plus the yDistanceFromMid value
            // and the one-index value of midpoint minus the xDistanceFromMid
            let pointC = [midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid];
            // initialize variable pointD and set equal to a coordinate pair constructed by subtracting zero-index value of midpoint by the yDistanceFromMid value
            // and the one-index value of midpoint plus the xDistanceFromMid
            let pointD = [midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid];
            // loop through the pointsSet object to check whether it has the stringified pointC value AND the stringified pointD value
            // if the pointsSet object DOES have those two values, another square is found, so increment count variable by 1
            if (pointsSet.has(pointToString(pointC)) && pointsSet.has(pointToString(pointD))) {
                count++;
            }
        }
    }
    // since each square will potentially be found 4 times, return the value of count divided by 4 for the correct number of squares
    return count / 4;
}

// helper function which takes in a single point pair of coordinates
function pointToString(point) {
    // return the point, stringified with a comma between values
    return point.join(',');
}