// Write a function which takes in an array of integers and returns the length of the longest peak ih the array.

// A peak is defined as adjacent integers in the array which are STRICTLY increasing until they reach a tip (the highest value in the peak),
// at which point they become STRICTLY decreasing. A peak must be formed by at least three integers, such as [4, 6, 3].

// For example, the integers [1, 4, 10, 2] form a peak, but the integers [4, 0, 10] do not, and neither do the integers [1, 2, 2, 0].
// Similarly, the integers [1, 2, 3] do not form a peak because there are no strictly-decreasing integers after the 3.

// Sample Input:
// array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]

// Sample Output:
// 6 with the numbers [0, 10, 6, 5, -1, -3]

// Solution 1:

// O(n) time due to single pass over input array
// O(1) space due to only storing handful of variables for n inputs

function longestPeak(array) {
    let maxLongestPeak = 0;
    let i = 1;

    while (i < array.length - 1) {
        let isPeak = array[i - 1] < array[i] && array[i + 1] < array[i];
        if (!isPeak) {
            i++;
            continue;
        }

        let leftSlope = i - 2;
        while (leftSlope >=0 && array[leftSlope] < array[leftSlope + 1]) {
            leftSlope--;
        }

        let rightSlope = i + 2;
        while (rightSlope < array.length && array[rightSlope] < array[rightSlope - 1]) {
            rightSlope++;
        }

        let currentPeakLength = rightSlope - leftSlope - 1;
        maxLongestPeak = Math.abs(maxLongestPeak, currentPeakLength);
        i = rightSlope;
    }
    return maxLongestPeak;
}