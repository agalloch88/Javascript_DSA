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

function bestSeat(seats) {
    let bestSeat = -1;
    let maxSpace = 0;
    let left = 0;

    while (left < seats.length) {
        let right = left + 1;

        while (right < seats.length && seats[right] === 0) {
            right++;
        }

        let availableSpace = right - left - 1;
        if (availableSpace > maxSpace) {
            bestSeat = Math.floor((left + right) / 2);
            maxSpace = availableSpace;
        }
        left = right;
    }
    return bestSeat;
}