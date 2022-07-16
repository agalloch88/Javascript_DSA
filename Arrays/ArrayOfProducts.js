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
