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

function minimumAreaRectangle(points) {
  let minArea = Infinity;

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      for (let k = j + 1; k < points.length; k++) {
        for (let l = k + 1; l < points.length; l++) {
          let point1 = points[i];
          let point2 = points[j];
          let point3 = points[k];
          let point4 = points[l];

          if (isRectangle(point1, point2, point3, point4)) {
            let area = calculateArea(point1, point2, point3, point4);
            minArea = Math.min(minArea, area);
          }
        }
      }
    }
  }
  return minArea === Infinity ? 0 : minArea;
}

function isRectangle(p1, p2, p3, p4) {
  let points = [p1, p2, p3, p4];
  let distances = [];

  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      distances.push({
        distance: Math.sqrt(
          Math.pow(points[i][0] - points[j][0], 2) +
            Math.pow(points[i][1] - points[j][1], 2),
        ),
        pair: [i, j],
      });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  return (
    distances[0].distance === distances[1].distance &&
    distances[2].distance === distances[3].distance &&
    distances[4].distance === distances[5].distance
  );
}

function calculateArea(p1, p2, p3, p4) {
  let xCoords = [p1[0], p2[0], p3[0], p4[0]].sort((a, b) => a - b);
  let yCoords = [p1[1], p2[1], p3[1], p4[1]].sort((a, b) => a - b);

  return (xCoords[3] - xCoords[0]) * (yCoords[3] - yCoords[0]);
}
