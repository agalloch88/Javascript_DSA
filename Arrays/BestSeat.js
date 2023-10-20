// The problem supposes walking into a theatre where a show is about to take place. The user within the theatre directs guests to their specific rows, and mentions
// the theatre allows ticketholders to sit anywhere within the given row. Naturally, guests wish to sit in the seat which provides the most space. Guests also prefer this space to
// be evenly distributed on either side of themselves (for example, if there are three empty seats in a row, guests would likely choose the middle of those three seats).

// Given the theatre row, which is represented as an integer array, return the seat index of where a guest should sit. Ones in the array represent occupied seats, and zeroes
// represent empty seats.

// For the purposes of the problem, assume that someone is always sitting in the first and last seats of the row. Wheneber there are two equally good seats, a guest should sit in the
// seat with the lower index. If there is no seat to sit in within the given row, return -1. The given array will always have a length of at least one, and will only contain ones and zeroes.

// Sample Input:

// seats = [1, 0, 1, 0, 0, 0, 1]

// Sample Output:

// 4

// Solution 1:

// iterative, two-pointer solution to find the largest gap of unoccupied space, then determin midpoint

// O(n) time due to iterating over n inputs in seats
// O(1) space due to only storing a few variables

function bestSeat(seats) {
  // initialize variable bestSeat to equal -1, and in case no suitable seat is found, can
  // return this value
  let bestSeat = -1;
  // initialize variable maxSpace and set equal to 0
  let maxSpace = 0;
  // initialize variable left for left pointer, and start at index 0
  let left = 0;
  // keep looping while left pointer remains in bounds of seats array
  while (left < seats.length) {
    // initialize variable right for right pointer, and place one position to the right
    // of the left pointer
    let right = left + 1;
    // keep moving right pointer so long as right is in bounds of seats array,
    // and only while the value right pointer is at is an empty seat, so 0
    while (right < seats.length && seats[right] === 0) {
      // increment right pointer  by 1
      right++;
    }
    // initialize variable availableSpace to calculate how much room is between left
    // and right pointers, accounting for space of bestSeat
    let availableSpace = right - left - 1;
    // if the availableSpace is greater than current value stored in maxSpace, execute below
    if (availableSpace > maxSpace) {
      // set bestSeat equal to the floored value of midpoint between left and right
      bestSeat = Math.floor((left + right) / 2);
      // set maxSpace equal to the current value of availableSpace
      maxSpace = availableSpace;
    }
    // regroup the pointers by setting left equal to right
    left = right;
  }
  // return the current value stored in bestSeat once left reaches end of array
  return bestSeat;
}
