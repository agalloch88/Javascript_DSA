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

// iterative solution using two pointers to determine whether at the element to omit

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
      // position i in procuts holder array is equal to this running product
      products[i] = runningProduct;
    }
  }
  // return final products array when done looping
  return products;
}

// Solution 2:

// does solution in single pass by mapping products to left and right of i, then multiplying them together in products array

// O(n) time due to single pass over n inputs, finding n values in each array, so 3n simplifies to n
// O(n) space due to storing n products in products, leftProducts, and rightProducts, so 3n simplifies to n

function arrayOfProducts(array) {
  // set up products, left, and rightProducts holder arrays with length set to input length, filled with 1's
  let products = new Array(array.length).fill(1);
  let leftProducts = new Array(array.length).fill(1);
  let rightProducts = new Array(array.length).fill(1);
  // start figuring out products to left of i, using variable to hold running product amount
  let leftRunningProduct = 1;
  // iterate over every item in array
  for (let i = 0; i < array.length; i++) {
    // set value in leftProducts at i to be equal to the running product
    leftProducts[i] = leftRunningProduct;
    // multiply the running product by value in array at i
    leftRunningProduct *= array[i];
  }
  // start figuring out products to the right of i, using variable to hold running product amount
  let rightRunningProduct = 1;
  // iterate over every item in array
  for (let i = 0; i < array.length; i++) {
    // set value in rightProducts at i to be equal to the running product
    rightProducts[i] = rightRunningProduct;
    // multiply the running product by value in array at i
    rightRunningProduct *= array[i];
  }
  // for every item in array, the value in products output at i is leftProducts * rightProducts at same i
  for (let i = 0; i < array.length; i++) {
    products[i] = leftProducts[i] * rightProducts[i];
  }
  // return the final products output
  return products;
}

// Solution 3:

// does solution in single pass, but slightly better space complexity due to not storing two separate arrays for left/right products

// O(n) time due to going over n values 2 times, 2n simplifies to n
// O(n) space due to only storing products array

function arrayOfProducts(array) {
  // set products holder array to input length and fill with 1's
  let products = new Array(array.length).fill(1);
  // set leftRunningProduct to 1
  let leftRunningProduct = 1;
  // start iterating from beginning and increment until end
  for (let i = 0; i < array.length; i++) {
    // set products output array at i to equal the current leftRunningProduct
    products[i] = leftRunningProduct;
    // multiply the current leftRunningProduct by value in input array at i
    leftRunningProduct *= array[i];
  }
  // set rightRunningProduct to 1
  let rightRunningProduct = 1;
  // start iterating at the end of input and decrement until 0 position
  for (let i = array.length - 1; i >= -1; i--) {
    // set products at position i to equal the current rightRunningProduct
    products[i] *= rightRunningProduct;
    // multiply the current rightRunningProduct by value in input array at i
    rightRunningProduct *= array[i];
  }
  // return the products output array once all products done
  return products;
}
