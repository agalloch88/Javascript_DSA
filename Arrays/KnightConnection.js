// The problem presents the position of two knight pieces on an infinite chess board. Write a function which returns the minimum number of turns required before one of the knights is able to capture the other knight,
// assuming the knights are working together to achieve this goal.

// The position of each knight is given as a list of two values, those being the x and y coordinates on the board. A knight can make 1 of 8 possible moves during any given turn. Each of these moves
// involves moving in an "L" shape. This means a knight can either move 2 squares horizontally and 1 square vertically, or 2 squares vertically and 1 square horizontally. For example, if a knight
// is currently at position [0, 0], then it can move to any of the following 8 locations during it's next move:

// [[-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1]]

// A knight is able to capture the other knight when it is able to move onto the square currently occupied by the other knight.

// Each turn allows each knight to move up to  one time. For example, if both knights moved toward each other once, and then knightA captures knightB on its next move, two turns would therefore be used,
// even though knightB never made a second move.

// Sample Input:

// knightA = [0, 0]
// knightB = [4, 2]

// Sample Output:

// 1
// knightA moves to [2, 1], and then knightB captures knightA on [2, 1]

// Solution 1:

// iterative solution finding path from one knight to another and converting to number of turns

// O(n * m) time, where n is horizontal difference between knights and m is the vertical distance between knights, as since board is infinite these are the two main bounds on potential moves
// O(n * m) space, as queue will grow in potential moves depending on these distances

// main function taking in the positions of knightA and knightB
function knightConnection(knightA, knightB) {
  // set up array of possible move coordinates, meaning from current position a knight can have these possible increments or decrements to coordinates
  let possibleMoves = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];
  // initialize variable queue, which will be an array of values about the position of knightA as possibilities are checked
  // each entry in the queue will have three values: horizontal position, vertical position, and running count of number of moves
  let queue = [[knightA[0], knightA[1], 0]];
  // initialize variable visited, and set equal to a new Set object, which starts out with a string-converted position of knightA
  let visited = new Set(positionToString(knightA));
  // keep looping until there's a return
  while (true) {
    // initialize variable currentPosition, and set equal to the first value in the queue, which is grabbed via shift()
    let currentPosition = queue.shift();
    // if the current position coordinates match the knightB coordinates, the two knights overlap and have "connection", so execute below
    if (
      currentPosition[0] === knightB[0] &&
      currentPosition[1] === knightB[1]
    ) {
      // return a rounded-up value for the count of moves at index 2 in currentPosition divided by 2, which will be how many total turns the process took
      return Math.ceil(currentPosition[2] / 2);
    }
    // look at all the possibleMove options in possibleMoves
    for (let possibleMove of possibleMoves) {
      // initialize variable position and calculate new coordinates based on the current possibleMove
      let position = [
        currentPosition[0] + possibleMove[0],
        currentPosition[1] + possibleMove[1],
      ];
      // initialize variable positionString and set equal to the return of call to helper, passing in the position above
      let positionString = positionToString(position);
      // if the position string is NOT in the visited Set, then execute the below
      // if already visited these coordinates, no need to do so again
      if (!visited.has(positionString)) {
        // update the running move count on currentPosition, incrementing by 1
        position.push(currentPosition[2] + 1);
        // push the current position into the queue for checking
        queue.push(position);
        // add the current positionString to the visited Set
        visited.add(positionString);
      }
    }
  }
}

// helper function which takes in position coordinates of a knight
function positionToString(position) {
  // return the joined values from position input
  return position.join(',');
}
