// The problem presents an array of points plotted on a 2D graph (meaning the x/y plane). Write a function which returns the maximum number of points which a single line (or, potentially, multiple lines)
// on the graph passes through.

// The input array/list will contain  points represented by an array/list of two integers [x, y]. The input array/list will never contatin duplicate points, and will always contain at least one plotted point.

// Sample Input:

// points = [
//  [1, 1],
//  [2, 2],
//  [3, 3],
//  [0, 4],
//  [-2, 6],
//  [4, 0],
//  [2, 1],
// ]

// Sample Output:

// 4
// A plotted line will pass through the following points: [-2, 6], [0, 4], [2, 2], [4, 0]

// Solution 1:

function lineThroughPoints(points) {
    let maxNumberOfPointsOnLine = 1;

    for (let idx1 = 0; idx1 < points.length; idx1++) {
        let p1 = points[idx1];
        let slopes = {};

        for (let idx2 = idx1 + 1; idx2 < points.length; idx2++) {
            let p2 = points[idx2];
            let [rise, run] = getSlopeOfLineBeteweenPoints(p1, p2);
            let slopeKey = createHashableKeyForRational(rise, run);

            if (!(slopeKey in slopes)) {
                slopes[slopeKey] = 1;
            }

            slopes[slopeKey]++;
        }

        let currentMaxNumberOfPointsOnLine = Object.values(slopes).reduce((a, b) => Math.max(a, b), 0,);
        maxNumberOfPointsOnLine = Math.max(maxNumberOfPointsOnLine, currentMaxNumberOfPointsOnLine);
    }
    return maxNumberOfPointsOnLine;
}

function getSlopeOfLineBeteweenPoints(p1, p2) {
    let [p1x, p1y] = p1;
    let [p2x, p2y] = p2;
    let slope = [1, 0];

    if (p1x !== p2x) {
        let xDiff = p1x - p2x;
        let yDiff = p1y - p2y;
        let gcd = getGreatestCommonDivisor(Math.abs(xDiff), Math.abs(yDiff));
        xDiff = Math.floor(xDiff / gcd);
        yDiff = Math.floor(yDiff / gcd);

        if (xDiff < 0) {
            xDiff *= -1;
            yDiff *= -1;
        }

        slope = [yDiff, xDiff];
    }

    return slope;
}

function createHashableKeyForRational(numerator, denominator) {
    return numerator.toString() + ':' + denominator.toString();
}

function getGreatestCommonDivisor(num1, num2) {
    let a = num1;
    let b = num2;

    while (true) {
        if (a === 0) {
            return b;
        }

        if (b === 0) {
            return a;
        }

        let tempA = a;
        a = b;
        b = tempA % b;
    }
}