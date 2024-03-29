// The problem presents an array/list of integers, prices, of length n, and displays the retail prices of various quantities of juice. Each index in the array/list corresponds
// to the price of that amount of juice. For example, prices[2] would be the retail price of 2 units of juice.

// To start, the user has n - 1 total units of juice. For example, if the length of prices is 5, then this would mean the user has 4 total units of juice. Write a function
// to determine the optimal way to bottle the juice such that it maximizes revenue. This function should return an array/list of all the juice quantities required in ascending order.

// Note that the first value in the prices input will always be 0, because there is no value when having 0 juice. All other values will be positive integer values.
// Additionally, a larger quantity of juice will not always be more expensive than a smaller quantity. For simplicity, any test cases for this problem would only have one possible solution.

// Sample Input:

// prices = [0, 1, 3, 2]

// Sample Output:

// [1, 2]
// There are 3 total units of juice, because the length of prices is 4. To maximize revenue, we split the juice into quantities of 1 and 2, giving a revenue of 1 + 3 = 4

// Solution 1:

// suboptimal solution looking at all combinations to determine optimal bottling

// O(n^3) time due to nested for loops and additional n concat operation inside
// O(n^2) space due to two additional arrays of n length

function juiceBottling(prices) {
  // initialize variable numSizes to set how many possible
  // sizes there may be, and set equal to the length of the prices input
  let numSizes = prices.length;
  // initialize variable maxProfit and set equal to a new array of numSizes length, filled with 0's
  let maxProfit = new Array(numSizes).fill(0);
  // initialize variable solutions, and set equal to a new array of numSizes length,
  // filled with undefined values, and mapping every _ value to an empty array which will
  // hold the found solutions
  let solutions = new Array(numSizes).fill(undefined).map((_) => []);

  // iterate over every size in the range of numSizes, starting at 0 bottles of juice
  for (let size = 0; size < numSizes; size++) {
    // iterate over every dividing point so long as within the range of the current size
    for (let dividingPoint = 0; dividingPoint < size + 1; dividingPoint++) {
      // initialize variable possibleProfit, and set equal to the value at the index of current size minus
      // the current dividing point in the maxProfit array PLUS the value at the dividingPoint index
      // in the prices input
      let possibleProfit =
        maxProfit[size - dividingPoint] + prices[dividingPoint];

      // if the value at the current possibleProfit amount is GREATER than the value at the index of
      // current size in maxProfit, then execute below
      if (possibleProfit > maxProfit[size]) {
        // set the value at current size in maxProfit equal to the value of possibleProfit
        maxProfit[size] = possibleProfit;
        // set the value at size in the solutions array equal to the value at the current
        // dividingPoint, concatenating the value at current size minus the dividingPoint in solutions array
        solutions[size] = [dividingPoint].concat(
          solutions[size - dividingPoint],
        );
      }
    }
  }
  // once all possibilities are looked at, return the value at  numSizes minus 1 index in solutions array
  // as this will be the most profitable option
  return solutions[numSizes - 1];
}

// Solution 2:

// optimized solution which relies on the dividingPoints rather than building out the whole solutions array
// and concatenating at every iteration of internal for loop

function juiceBottling(prices) {
  // initialize variable numSizes to set how many possible
  // sizes there may be, and set equal to the length of the prices input
  let numSizes = prices.length;
  // initialize variable maxProfit and set equal to a new array of numSizes length, filled with 0's
  let maxProfit = new Array(numSizes).fill(0);
  // initialize variable dividingPoints, and set equal to a new array of numSizes length, filled with 0's
  let dividingPoints = new Array(numSizes).fill(0);

  // iterate over every size in numSizes
  for (let size = 0; size < numSizes; size++) {
    // for every size, iterate over every dividing point smaller than curent size plus 1
    for (let dividingPoint = 0; dividingPoint < size + 1; dividingPoint++) {
      // initialize variable possibleProfit, and set equal to the position in maxProfit representing the value of current size minus
      // the current dividingPoint value PLUS the value at dividingPoint in the prices input
      let possibleProfit =
        maxProfit[size - dividingPoint] + prices[dividingPoint];

      // check whether the current value of possibleProfit is greater than the value in maxProfit array
      // at the current size, and if so, execute below
      if (possibleProfit > maxProfit[size]) {
        // set the value at current size in maxProfit array equal to the current value of possibleProfit
        maxProfit[size] = possibleProfit;
        // set the value at current size in dividingPoint equal to the current value of dividingPoint
        dividingPoints[size] = dividingPoint;
      }
    }
  }

  // initialize variable solution and set equal to an empty array/list
  let solution = [];
  // initialize variable currentDividingPoint, and set equal to numSizes minus 1
  let currentDividingPoint = numSizes - 1;

  // so long as currentDividingPoint is greater than 0, continue looping
  while (currentDividingPoint > 0) {
    // push the value at the currentDividingPoint index in dividingPoints array into the solution array
    solution.push(dividingPoints[currentDividingPoint]);
    // subtract the value at the index of currentDividingPoint in dividing points from the currentDividingPoint
    currentDividingPoint -= dividingPoints[currentDividingPoint];
  }

  // once currentDividingPoint is less than or equal to zero, the while loop above will break and the
  // solution array should be complete, so return the solution array
  return solution;
}
