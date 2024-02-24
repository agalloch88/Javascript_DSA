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

// iterative solution going through the points to find the line which passes through the most points

// O(n^2) time due to nested for loop operations
// O(n) space due to storing at most n coordinate pairs

// Function to find the maximum number of points that lie on a straight line from a given set of points.
function lineThroughPoints(points) {
  // Initialize the maximum number of points found on a line so far.
  let maxNumberOfPointsOnLine = 1;

  // Iterate through each point to use it as a starting point.
  for (let idx1 = 0; idx1 < points.length; idx1++) {
    let p1 = points[idx1];
    // Object to keep track of slopes encountered and their counts.
    let slopes = {};

    // Iterate through other points to form lines and calculate slopes.
    for (let idx2 = idx1 + 1; idx2 < points.length; idx2++) {
      let p2 = points[idx2];
      // Calculate the rise and run (slope components) between two points.
      let [rise, run] = getSlopeOfLineBeteweenPoints(p1, p2);
      // Create a unique string representation for the slope.
      let slopeKey = createHashableKeyForRational(rise, run);

      // Initialize or increment the count for this slope.
      if (!(slopeKey in slopes)) {
        slopes[slopeKey] = 1;
      }
      slopes[slopeKey]++;
    }

    // Find the maximum number of points on a line through the current point.
    let currentMaxNumberOfPointsOnLine = Object.values(slopes).reduce(
      (a, b) => Math.max(a, b),
      0,
    );
    // Update the overall maximum if the current is greater.
    maxNumberOfPointsOnLine = Math.max(
      maxNumberOfPointsOnLine,
      currentMaxNumberOfPointsOnLine,
    );
  }
  return maxNumberOfPointsOnLine;
}

// Function to calculate the slope between two points as a ratio of integers.
function getSlopeOfLineBeteweenPoints(p1, p2) {
  let [p1x, p1y] = p1;
  let [p2x, p2y] = p2;
  // Default slope for vertical lines.
  let slope = [1, 0];

  // Calculate the slope if the line is not vertical.
  if (p1x !== p2x) {
    let xDiff = p1x - p2x;
    let yDiff = p1y - p2y;
    // Simplify the slope to its smallest integer ratio.
    let gcd = getGreatestCommonDivisor(Math.abs(xDiff), Math.abs(yDiff));
    xDiff = Math.floor(xDiff / gcd);
    yDiff = Math.floor(yDiff / gcd);

    // Ensure the slope is represented in a consistent direction.
    if (xDiff < 0) {
      xDiff *= -1;
      yDiff *= -1;
    }

    slope = [yDiff, xDiff];
  }

  return slope;
}

// Function to create a string key from two numbers, ensuring consistent hash keys for slopes.
function createHashableKeyForRational(numerator, denominator) {
  return numerator.toString() + ':' + denominator.toString();
}

// Function to calculate the greatest common divisor (GCD) of two numbers, using the Euclidean algorithm.
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
