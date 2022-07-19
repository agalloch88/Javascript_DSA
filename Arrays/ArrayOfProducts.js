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
  let products = [];

  for (let i = 0; i < array.length; i++) {
    let runningProduct = 1;
    for (let j = 0; j < array.length; j++) {
      if (i !== j) {
        runningProduct *= array[j];
      }
      products[i] = runningProduct;
    }
  }
  return products;
}
