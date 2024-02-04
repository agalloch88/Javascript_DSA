// The problem presents an array/lisst of points/coordinates plotted on a 2D graph (meaning, the x/y plane). Write a function which returns the minimum area of any rectangle which can be formed
// using any 4 of these points/coordinates such that the rectangle's sides are parallel to the x and y axes (meaning, only rectangles with horizontal and vertical sides should be considered, and no
//  shapes with diagonal sides are considered). If no rectangle can be formed adhering to these requirements, the function should return 0.

// The input array/list will contain points/coordinated represented by arrays/lists of two integers [x, y]. The input array/list will never contain duplicate points/coordinates.

// Sample Input:

// points = [
//  [1, 5],
//  [5, 1],
//  [4, 2],
//  [2, 4],
//  [2, 2],
//  [1, 2],
//  [4, 5],
//  [2, 5],
//  [-1, -2],
// ]

// Sample Output:

// 3
// The rectangle with corners [1, 5], [2, 5], [1, 2], and [2, 2] has the minimum area of 3

// Solution 1:

// brute force, unoptimal solution using 4 nested for loops to find rectangle coordinates

// O(n^4) time due to nested for loops
// O(n^2) due to dynamically allocated space for checking distances between pairs of points

// main function whixh takes in the array of points/coordinate pairs
function minimumAreaRectangle(points) {
    // initialize variable minArea to Infinity such that any found area is smaller
  let minArea = Infinity;

// begin looping over the points input, starting at position 0 and the next 3 adjacent points
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      for (let k = j + 1; k < points.length; k++) {
        for (let l = k + 1; l < points.length; l++) {
            // grab the current values at positions i, j, k and l in points, and store values
            // in variables point1-4
          let point1 = points[i];
          let point2 = points[j];
          let point3 = points[k];
          let point4 = points[l];

        // check whether collection of these 4 points is a rectangle via isRecntagle() helper function
        // if so, execute below
          if (isRectangle(point1, point2, point3, point4)) {
            // initialize variable area, and store return value from calculateArea helper, passing
            // in 4 points of rectangle
            let area = calculateArea(point1, point2, point3, point4);
            // set minArea equal to the minimum area between current minArea value, and the current
            // value of area
            minArea = Math.min(minArea, area);
          }
        }
      }
    }
  }
// return a ternary check of whether minArea is still Infinity, in which case should return 0,
// otherwise can return the value of minArea
  return minArea === Infinity ? 0 : minArea;
}

// helper function to determine whether 4 passed-in points are a rectangle
// a rectangle is formed if opposite sides are equal and parallel to the x/y axes
function isRectangle(p1, p2, p3, p4) {
    // initialize variable points, and store the passed-in point values as an array
  let points = [p1, p2, p3, p4];
// initialize variable distances, and set equal to an empty array which will hold the distances found
  let distances = [];
    // iterate 4 times
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
        // push into the distances array a JS object with two keys: distance, and pair
      distances.push({
        // the distance key is the distance between two points
        distance: Math.sqrt(
          Math.pow(points[i][0] - points[j][0], 2) +
            Math.pow(points[i][1] - points[j][1], 2),
        ),
        // pair is the coordinate pair of i and j
        pair: [i, j],
      });
    }
  }
// once all distances are populated, sort the distances array in ascending order
  distances.sort((a, b) => a.distance - b.distance);

// check for the rectangle property: two equal shorter sides and two equal longer sides, not not
// the diagonal
  return (
    distances[0].distance === distances[1].distance &&
    distances[2].distance === distances[3].distance &&
    distances[4].distance === distances[5].distance
  );
}

// helper function to calculate the area of a given set of rectangle points
function calculateArea(p1, p2, p3, p4) {
    // initialize variables xCoords and yCoords, and set equal to the respective point pair item,
    // then sort each array of values
  let xCoords = [p1[0], p2[0], p3[0], p4[0]].sort((a, b) => a - b);
  let yCoords = [p1[1], p2[1], p3[1], p4[1]].sort((a, b) => a - b);

  // Area is calculated by the product of the difference between the largest and smallest x-coordinates
  // and the difference between the largest and smallest y-coordinates
  return (xCoords[3] - xCoords[0]) * (yCoords[3] - yCoords[0]);
}
