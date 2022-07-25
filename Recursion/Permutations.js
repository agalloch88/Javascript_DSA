// Write a function which takes in an array of unique integers, and returns an array of all permutations of those integers in no specified order.

// If the input array is empty, the function should return an empty array.

// Sample Input:
// array = [1, 2, 3]

// Sample Output:
// [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

// Solution 1:

// solution using slicing to grab new permutations

// O(n*n!) time on average due to n! possible permutations and n time to get each, at worst O(n^2*n!)
// O(n*n!) space due to storing n! permutations in new array

function getPermutations(array) {
  // initialize empty holder array for permutations
  let permutations = [];
  // recursively populate permutations array
  getPermutationsHelper(array, [], permutations);
  // return permutations; if input empty, this will be base case of returning empty array
  return permutations;
}

function getPermutationsHelper(array, currentPermutation, permutations) {
  // once reaching end of input numbers and we have a permutation, push it to holder array
  if (!array.length && currentPermutation.length) {
    permutations.push(currentPermutation);
  } else {
    for (let i = 0; i < array.length; i++) {
      let newArray = array.slice(0, i).concat(array.slice(i + 1));
      let newPermutation = currentPermutation.concat([array[i]]);
      getPermutationsHelper(newArray, newPermutation, permutations);
    }
  }
}

// Solution 2:

// better time complexity by generating permutations in place via swap function

// O(n*n!) time due to generating n! permutations and pushing
// O(n*n!) space due to storing n! permutations in new array

function getPermutations(array) {
  // initialize empty holder array for permutations
  let permutations = [];
  // recursively populate permutations array
  getPermutationsHelper(0, array, permutations);
  // return permutations; if input empty, this will be base case of returning empty array
  return permutations;
}

function getPermutationsHelper(i, array, permutations) {
  // iterate until at end of input length, then push new permutation
  if (i === array.length - 1) {
    permutations.push(array.slice());
  } else {
    for (let j = i; j < array.length; j++) {
      // recursively swap and get new permutation
      swap(i, j, array);
      getPermutationsHelper(i + 1, array, permutations);
      swap(i, j, array);
    }
  }
}

function swap(i, j, array) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
