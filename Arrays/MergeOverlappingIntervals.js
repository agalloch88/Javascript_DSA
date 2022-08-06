// Write a function which takes in a non-empty array of arbitrary intervals, merges any
// overlapping intervals, and returns the new intervals in no specific order.

// Each interval interval is an array of two integers, with interval[0] as the start of the
// interval, and interval[1] as the end of the interval.

// Note that back-to-back intervals are not considered to be overlapping. For example,
// [1, 5] and [6, 7] are not overlapping. However, [1, 6] and [6, 7] are indeed overlapping.

// Also note that the start of any particular interval will always be less than or equal to the
// end of that interval.

// Sample Input:
// intervals = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]

// Sample Output:
// [[1, 2], [3, 8], [9, 10]]
// intervals [3, 5], [4, 7], [6, 8] were merged

// Solution 1:

// iterative solution checking for overlaps in ending and start values of each interval

// O(nlog(n)) time due to sorting intervals and iterating over n intervals
// O(n) space due to storing merged intervals in new array

function mergeOverlappingIntervals(intervals) {
    // problem does not specify that intervals will be given in sorted order, so must sort
    let sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
    // set up holder array for merged intervals
    let mergedIntervals = [];
    // establish the current interval being looked at
    let currentInterval = sortedIntervals[0];
    // push first interval into mergedIntervals as first mergedInterval
    mergedIntervals.push(currentInterval);
    // start iterating over the remaining values in sortedIntervals
    for (let nextInterval of sortedIntervals) {
        // set up comparisons for current and nextInterval values
        let [_, currentIntervalEnd] = currentInterval;
        let [nextIntervalStart, nextIntervalEnd] = nextInterval;
        // if end of currentInterval is greater than or equal to start of nextInterval:
        // set currentInterval end to max of end of currentInterval or nextInterval
        if (currentIntervalEnd >= nextIntervalStart) {
            currentInterval[1] = Math.max(currentIntervalEnd, nextIntervalEnd);
        // if not previous case, there's not an overlap needing a merge
        } else {
            currentInterval = nextInterval;
            // push currentInterval to mergedIntervals
            mergedIntervals.push(currentInterval);
        }
    }
    // return the final array of mergedIntervals
    return mergedIntervals;
}