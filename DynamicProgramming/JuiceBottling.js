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

function juiceBottling(prices) {
  let numSizes = prices.length;
  let maxProfit = new Array(numSizes).fill(0);
  let solutions = new Array(numSizes).fill(undefined).map((_) => []);

  for (let size = 0; size < numSizes; size++) {
    for (let dividingPoint = 0; dividingPoint < size + 1; dividingPoint++) {
      let possibleProfit =
        maxProfit[size - dividingPoint] + prices[dividingPoint];

      if (possibleProfit > maxProfit[size]) {
        maxProfit[size] = possibleProfit;
        solutions[size] = [dividingPoint].concat(
          solutions[size - dividingPoint],
        );
      }
    }
  }
  return solutions[numSizes - 1];
}
