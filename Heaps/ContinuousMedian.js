// Write a ContinuousMedianHandler class which supports:

// - The continuous insertion of numbers with the insert method.
// - The instant (meaning O(1) time) retrieval of the median of the numbers which have been inserted thus far with the getMedian method.

// The getMedian method is already provided within the problem itself. The problem here requires writing the insert method.

// The median of a set of numbers is the "middle" number when the numbers are ordered from smallest to greatest. If there is an odd number of items in the set, as in {1, 3, 7},
// the median is the number in the middle (3 in that example). If there is an even number of items in the set, as in {1, 3, 7, 8}, the median is the average of the two middle
// items ((3 + 7) / 2 === 5, in this example).

// Sample Usage:

// All operations below are performed sequentially:
// ContinuousMedianHandler(): - (instantiates a ContinuousMedianHandler class)
// insert(5): -
// insert(10): -
// getMedian(): 7.5
// insert(100): -
// getMedian(): 10

// Solution 1: