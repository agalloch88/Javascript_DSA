// Write a function which takes in a non-empty array of integers and returns and array of the same length, where each element in the output array is equal to 
// the product of all the numbers in the input array except for the element at the current index.

// In other words, the value at output[i] is the product of all the numbers in the input array except for the number at input[i].

// Note that the solution cannot use division for the purposes of this problem.

// Sample Input:
// array = [5, 1, 4, 2]

// Sample Output:
// [8, 40, 10, 20]
// 8 is equal to 1 x 4 x 2
// 40 is equal 50 5 x 4 x 2
// 10 is equal to 5 x 1 x 2
// 20 is equal to 5 x 1 x 4

// Solution 1:

// O(n^2) time due ot nested for loops
// O(n) space due to new products array

function arrayOfProducts(array) {
    // set up holder array for results
  let products = [];
    // loop through array, setting currently excluded element to i
  for (let i = 0; i < array.length; i++) {
    // base case for first element needing to multiply is itself, so j * 1
    let runningProduct = 1;
    // loop through a second time, checking to see if we are at the excluded element or not.
    for (let j = 0; j < array.length; j++) {
        // if not at excluded element, multiply runningProduct by current element and continue to next element
      if (i !== j) {
        runningProduct *= array[j];
      }
      products[i] = runningProduct;
    }
  }
  return products;
}

// Solution 2:

// does solution in single pass by mapping products to left and right of i, then multiplying them together in products array

// O(n) time due to single pass over n inputs, finding n values in each array, so 3n simplifies to n
// O(n) space due to storing n products in products, leftProducts, and rightProducts, so 3n simplifies to n

function arrayOfProducts(array) {
    let products = new Array(array.length).fill(1);
    let leftProducts = new Array(array.length).fill(1);
    let rightProducts = new Array(array.length).fill(1);

    let leftRunningProduct = 1;
    for (let i = 0; i < array.length; i++) {
        leftProducts[i] = leftRunningProduct;
        leftRunningProduct *= array[i];
    }

    let rightRunningProduct = 1;
    for (let i = 0; i < array.length; i++) {
        rightProducts[i] = rightRunningProduct;
        rightRunningProduct *= array[i];
    }

    for (let i = 0; i < array.length; i++) {
        products[i] = leftProducts[i] * rightProducts[i];
    }

    return products;
}