// The problem deals with measuring cups which are missing important measuring labels. Specifically,
// a measuring cup only has two measuring lines: a Low (L) line, and a High (H) line. This means
// the cups cannot precisely measure, and can only guarantee that the substances poured into them will be
// between the L and H line. For example, there may be a measuring cup which has a Low line at
// 400ml, and a high line at 435ml. This means that when using this measuring cup, it can
// only be determined that what is being measured is between 400ml and 435ml.

// The problem presents a list/array of measuring cups containing their low and high lines, as well
// as one `low` integer and one `high` integer, which represent a range for a target measurement.
// Write a function which returns a boolean representing whether the cups may be used to
// accurately measure a volume in the specified `[low, high]` range (the range is inclusive).

// Note that:

// - each measuring cup will be reperesented by a pair of positive inters `[L, H]`, where 0 <= L <= H.
// - there will always be at least one measuring cup provided, and the `low` and `high` input parameters will always satisfy the above constraint.
// - once liquid is measured, it will immediately transfer to a larger bowl which may eventually contain the target measurement.
// - the contents of one measuring cup cannot be poured into another measuring cup.

// Sample Input:

// measuringCups = [
//  [200, 210],
//  [450, 465],
//  [800, 850],
// ]

// low = 2100
// high = 2300

// Sample output:

// true

// the [450, 465] cup may be used to measure four volumes:
// First measurement: Low = 450, High = 465
// Second measurement: Low = 450 = 450 = 900, High = 465 + 465 = 930
// Third measurement: Low = 900 + 450 = 1350, High = 930 + 465 = 1395
// Fourth measurement: Low = 1350 + 450 = 1800, High = 1395 + 465 = 1860

// then, the cup [200, 210] will measure two additional volumes:
// Fifth measurement: Low = 1800 + 200 = 2000, High = 1860 + 210 = 2070
// Sixth measurement: Low = 2000 + 200 = 2200, High = 2070 + 210 = 2280

// the total volume measured is within the range [2200, 2280], which is within the target, so return true

// Solution 1:

// recursive solution utilizing the range to determine the appropriate solution

// O(l * h * n) time due to needing to check low and high for each n value, and using memoization
// O(l * h) space due to recursive calls on the stack and the memoization storage

// Main function to initiate the measurement checking process.
function ambiguousMeasurements(measuringCups, low, high) {
  let memoization = {}; // Initialize a memoization object to store previously computed results.
  return canMeasureInRange(measuringCups, low, high, memoization); // Start the recursive checking function.
}

// Recursive function to check if it's possible to measure within the range [low, high].
function canMeasureInRange(measuringCups, low, high, memoization) {
  let memoizeKey = createHashableKey(low, high); // Create a unique key for the current state.
  if (memoizeKey in memoization) {
    // Check if the result for the current state has already been computed.
    return memoization[memoizeKey]; // Return the cached result.
  }

  if (low <= 0 && high <= 0) {
    // Base case: if both low and high are non-positive, measuring is not possible.
    return false;
  }

  let canMeasure = false; // Initialize the result as false.
  for (let cup of measuringCups) {
    // Iterate through each measuring cup.
    let [cupLow, cupHigh] = cup; // Destructure the range of the current cup.
    if (low <= cupLow && cupHigh <= high) {
      // Check if the current cup can directly satisfy the range.
      canMeasure = true;
      break; // Break the loop as we've found a direct match.
    }

    let newLow = Math.max(0, low - cupLow); // Calculate new low value for the next recursive call.
    let newHigh = Math.max(0, high - cupHigh); // Calculate new high value for the next recursive call.
    canMeasure = canMeasureInRange(measuringCups, newLow, newHigh, memoization); // Recurse with the updated range.
    if (canMeasure) {
      break; // If we can measure with the updated range, break the loop.
    }
  }

  memoization[memoizeKey] = canMeasure; // Store the result in the memoization object.
  return canMeasure; // Return whether it is possible to measure the range.
}

// Helper function to create a unique key for memoization.
function createHashableKey(low, high) {
  return low.toString() + ':' + high.toString(); // Convert the range into a string format to use as a key.
}
