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

// Solution 2:

// improved solution looking for values along same parallel y plane

// O(n^2) time due to a series of nlogn and n operations which reduce to n^2
// O(n) space due to storing a subset of pointsa couple different times

// main function which takes in the array of point/coordinate pairs
function minimumAreaRectangle2(points) {
  // initialize variable columns and set equal to the return value of helper function initializeColumns, which will build out the columns using the passed-in points array
  let columns = initializeColumns2(points);
  // initialize variable minimumAreaFound to store the answer, and set equal to Infinity at the outset such that any value is smaller
  let minimumAreaFound = Infinity;
  // initialize variable edgesParallelToYAxis, and set equal to an empty JS object
  let edgesParallelToYAxis = {};

  // initialize variable sortedColumns with the keys of the columns object parsed as integers, then sorted in ascending numerical order
  let sortedColumns = Object.keys(columns)
    .map((col) => parseInt(col))
    .sort((a, b) => a - b);

  // for every x value in the sortedColumns, execute below
  for (let x of sortedColumns) {
    // initialize variable yValuesInCurrentColumn, and set equal to a sorted ascending array of y values for every x match
    let yValuesInCurrentColumn = columns[x].sort((a, b) => a - b);

    // iterate over every currentIdx in yValuesInCurrentColumn
    for (
      let currentIdx = 0;
      currentIdx < yValuesInCurrentColumn.length;
      currentIdx++
    ) {
      // initialize variable y2, and set equal to the value at the currentIdx in yValuesInCurrentColumn
      let y2 = yValuesInCurrentColumn[currentIdx];

      // iterate over every previousIdx that came before the currentIdx
      for (let previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
        // initialize variable y1 and set equal to the value at previousIdx in the yValuesInCurrentColumn
        let y1 = yValuesInCurrentColumn[previousIdx];
        // initialize variable pointString, and set equal to a stringified version of the y1 : y2
        let pointString = y1.toString() + ':' + y2.toString();

        // check for whether this pointString exists in the edgesParallelToYAxis object, and if so, execute below
        if (pointString in edgesParallelToYAxis) {
          // initialize variable currentArea, and set equal to the calculated area of the x value minus the pointString value in edgesParallelToYAxis multiplied by the difference between y2 minus y1
          let currentArea = (x - edgesParallelToYAxis[pointString]) * (y2 - y1);
          // set minimumAreaFound equal to the minimum between current value of this variable and the currentArea
          minimumAreaFound = Math.min(minimumAreaFound, currentArea);
        }
        // set the value of the pointString in edgesParallelToYAxis equal to x
        edgesParallelToYAxis[pointString] = x;
      }
    }
  }
  // return the value of a ternary check for whether minimumAreaFound is still Infinity, and if not, return that value, otherwise return 0
  return minimumAreaFound !== Infinity ? minimumAreaFound : 0;
}

// helper function to create columns/x values from the points input
function initializeColumns2(points) {
  // initialize variable columns and set equal to an empty JS object
  let columns = {};

  // iterate over every point in the points input
  for (let point of points) {
    // destructure a given point out into it's x and y coordinates, leaving them as a pair
    let [x, y] = point;

    // if there is no value in the columns object for x, insert a column at x
    if (!columns[x]) {
      columns[x] = [];
    }

    // into every x column, push the value of y
    columns[x].push(y);
  }

  // return the completed columns object
  return columns;
}

// Solution 3:

// improved solution using the diagonal principle to find points and a set for storing points

// O(n^2) time due to nested for loops
// O(n) space due to storing subsets of points

// main function which takes in the array of points/coordinate pairs
function minimumAreaRectangle3(points) {
  // initialize variable pointSet and set equal to return value of createPointSet helper function which takes in the point array and adds them to a set
  let pointSet = createPointSet(points);
  // intialize variable minimumAreaFound to hold solution, and set equal to Infinity such that any value is lower on first comparison
  let minimumAreaFound = Infinity;

  // iterate over the points input for every currentIdx
  for (let currentIdx = 0; currentIdx < points.length; currentIdx++) {
    // destructure the coordinate pair at currentIdx in points into p2x and p2y values
    let [p2x, p2y] = points[currentIdx];

    // for every currentIdx point above, also iterate over every previousIdx value
    for (let previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
      // destructure the coordinate pair at previousIdx in points into p1x and p1y values
      let [p1x, p1y] = points[previousIdx];
      // initialize variable pointsShareValues, and check whether the values for p1x and p2x are equal OR whether the values of p1y and p2y are equal, storing this boolean
      let pointsShareValue = p1x === p2x || p1y === p2y;

      // if pointsShareValue is true, simply continue
      if (pointsShareValue) {
        continue;
      }

      // initialize variables to determine whether opposite diagonals exist, using the point set and a check of diagonal coordinates between the two current points
      let point1OnOppositeDiagonalExists = pointSet.has(
        convertPointToString(p1x, p2y),
      );
      let point2OnOppositeDiagonalExists = pointSet.has(
        convertPointToString(p2x, p1y),
      );
      // initialize variable oppositeDiagonalExists and set equal to a check of whether two .has() checks are true
      let oppositeDiagonalExists =
        point1OnOppositeDiagonalExists && point2OnOppositeDiagonalExists;

      // if the is an opposite diagonal, then execute the below
      if (oppositeDiagonalExists) {
        // initialize variable currentArea, and set equal to absolute difference between x values multiplied by absolute difference between y values
        let currentArea = Math.abs(p2x - p1x) * Math.abs(p2y - p1y);
        // update variable minimumAreaFound to be the minimum between current value for that variable and the currentArea
        minimumAreaFound = Math.min(minimumAreaFound, currentArea);
      }
    }
  }

  // return a ternary check of whether minimumAreaFound is still Infinity, and if not, return current value, otherwise return 0
  return minimumAreaFound !== Infinity ? minimumAreaFound : 0;
}

// helper function which turns the points input array into a set object
function createPointSet(points) {
  // initialize variable pointSet and equate to an empty set object
  let pointSet = new Set();

  // for every point in the points array, execute the below
  for (let point of points) {
    // destructure the given point into it's x and y values
    let [x, y] = point;
    // initialize variable pointString and set equal to return value of convertPointToString helper function, passing in x and y values
    let pointString = convertPointToString(x, y);
    // add this pointString into the pointSet
    pointSet.add(pointString);
  }

  // once complete, return the full pointSet
  return pointSet;
}

// helper function which converts two values, which are x and y coordinates, into a string
function convertPointToString(x, y) {
  // return the stringified x value joined to a ':' along with the stringified y value
  return x.toString() + ':' + y.toString();
}
