// Given a string representation of the first n digits of Pi, and a list of positive integers (all in string format), write a function which returns the smallest
// number of spaces which can be added to the n digits of Pi, such that all resulting numbers are found in the list of positive integers.

// Note that a single number may appear multiple times in the resulting numbers. For example, if Pi is "3141" and the numbers are ["1", "3", "4"], the number "1"
// is allowed to appear twice in the list of resulting numbers after three spaces are added: "3 | 1 | 4 | 1".

// If no number of spaces to be added exists, such that all resulting numbers are found in the list of integers, the function should return -1.

// Sample Input:

// pi = "3141592653589793238462643383279"
// numbers = ["314159265358979323846", "26433", "8", "3279", "314159265", "358979323884626433832", "79"]

// Sample Output:

// 2
// "314159265 | 35897932384626433832 | 79"

// Solution 1:

// solution using recursion to get the minimum spaces and calculate placement based on position, starting at the beginning

// O(n^3 + m) time due to multiple calculations and checks
// O(n + m) space due to storing the JS object cache etc

// main function taking in the striung of Pi digits and the array of number strings
function numbersInPi(pi, numbers) {
  // initialize variable numbersTable and set equal to empty JS object
  // this will store and allow instant lookup of the various numbers
  let numbersTable = {};

  // iterate over every number string in numbers input
  for (let number of numbers) {
    // for every number value in numbersTable, set equal to true
    numbersTable[number] = true;
  }

  // initialize variable minSpaces and set equal to return value from helper function getMinSpaces, passing in the pi input string, the numbersTable JS object, empty object for the cache, and idx of 0
  let minSpaces = getMinSpaces(pi, numbersTable, {}, 0);
  return minSpaces === Infinity ? -1 : minSpaces;
}

// helper function to get the minimum number of spaces, takingin in the pi input string, the numbersTable JS object, the cache for lookups, and an idx value
function getMinSpaces(pi, numbersTable, cache, idx) {
  // base case
  // check whether the current value of idx is equal to the length of the pi input, and if so, return -1, as at the end of the road
  if (idx === pi.length) {
    return -1;
  }

  // recursive case
  // check whether the current idx exists in the cache yet, and if so, return the value at the idx in the cache
  if (idx in cache) {
    return cache[idx];
  }

  // initialize variable minSpaces and set equal to Infinity
  let minSpaces = Infinity;

  // iterate over the length of pi input string, starting at the position of the passed-in idx value
  for (let i = idx; i < pi.length; i++) {
    // initialize variable prefix, and set equal to a slice of the the pi input from the position of idx to the i plus 1 value
    let prefix = pi.slice(idx, i + 1);
    // check whether this prefix exists in the numbersTable JS object, and if so, execute below
    if (prefix in numbersTable) {
      // initialize variable minSpacesInSuffix, and set equal to return value from recursive call to getMinSpaces, passing in i + 1
      let minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
      // set minSpaces equal to the smaller value between current value of minSpaces and minSpacesInSuffic plus 1
      minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
    }
  }
  // set the value at idx in the cache equal to current value of minSpaces
  cache[idx] = minSpaces;
  // return the value at idx in cache for use in main function
  return cache[idx];
}

// Solution 2:

// solution using recursion to get the minimum spaces and calculate placement based on position, starting at the end

// O(n^3 + m) time due to multiple calculations and checks
// O(n + m) space due to storing the JS object cache etc

// main function, taking in the input string pi and array of number strings
function numbersInPi2(pi, numbers) {
  // initialize variable numbersTable and set equal to an empty JS object
  let numbersTable = {};

  // iterate over every number string in the numbers array
  for (let number of numbers) {
    // ata the value for number in the numbersTable object, set it equal to true
    numbersTable[number] = true;
  }

  // initialize variable cache, and set equal to an empty JS object
  let cache = {};

  // start iterative over pi string, starting at the end and working toward the start
  for (let i = pi.length - 1; i >= 0; i--) {
    // at every iteration, call getMinStapces helper function, passing in the pi input, the current numbersTable JS object, the cache, and the current value for i
    getMinSpaces2(pi, numbersTable, cache, i);
  }
  // return the result of a ternary checking whether the value at index 0 in the cache is Infinity, which should return -1 if so, and otherwise returning the value at index 0 in cache as the answer
  return cache[0] === Infinity ? -1 : cache[0];
}

// helper function to find the minimum spaces, taking in the pi input string, numbersTable JS object, the cache JS object, and a given idx value
function getMinSpaces2(pi, numbersTable, cache, idx) {
  // base case
  // check whether the current value for idx is equal to the length of pi, which would indicate done checking, and if so, return -1
  if (idx === pi.length) {
    return -1;
  }

  // recursive case
  // check whether the current value for idx already exists in the cache JS object, and if so, simply return the value
  if (idx in cache) {
    return cache[idx];
  }

  // initialize variable minSpaces, and set equal to Infinity
  let minSpaces = Infinity;

  // iterate over the pi input
  for (let i = idx; i < pi.length; i++) {
    // initialize variable prefix, and set equal to a slice of the pi input from the current idx up to position i plus 1
    let prefix = pi.slice(idx, i + 1);

    // check whether the current prefix exists in the numbersTable as one of the "favorite numbers" to isolate, and if so, execute below
    if (prefix in numbersTable) {
      // intialize variable minSpacesInSuffix and set equal to recursive return value from getMinSpaces helper
      let minSpacesInSuffix = getMinSpaces2(pi, numbersTable, cache, i + 1);
      // set minSpaces equal to the minimum between existing value of minSpaces, OR minSpacesInSuffix plus 1
      minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
    }
  }
  // set value at idx in cache JS object equal to the current value of minSpaces
  cache[idx] = minSpaces;
  // return the value at idx in the cache for use above and in main function
  return cache[idx];
}

// Solution 3:

// memoized solution reducing time and space complexity

// O(n^2 * m) time due to running n x m loops, plus the startsWith() method which is at worst O(n), so simplifies to n^2 * m
// O(n) space due to storing result array

function numbersInPi3(pi, numbers) {
  // initialize variable result, and set equal to a new Array object the same length as the pi input plus one, to account for segmenting the entire string, and filled will null values at each position
  let result = new Array(pi.length + 1).fill(null);

  // iterate over the result array
  for (let i = 0; i < result.length; i++) {
    // initialize variable value, and set equal to the value at i in the result array
    let value = result[i];

    // if i is NOT equal to 0, and the value is still equal to null, simply continue
    if (i !== 0 && value === null) {
      continue;
    }

    // initialize variable subString, and set equal to a slice of the pi input, starting at the position of i
    let subString = pi.slice(i);

    // iterate over the input numbers
    for (let j = 0; j < numbers.length; j++) {
      // initialize variable number, and set equal to the value at position j in the numbers input
      let number = numbers[j];
      // initialize variable targetI, and set equal to the result of combining value of i plus the length of numbers input
      let targetI = i + number.length;
      // initialize variable targetV, and set equal to the value at targetI in the result array
      let targetV = result[targetI];

      // if the subString slice starts with the value stored in number AND the value at targetV is null, OR the targetV is greater than the value plus 1, execute below
      if (
        subString.startsWith(number) &&
        (targetV === null || targetV > value + 1)
      ) {
        // set the value at targetI in result equal to the current value plus 1, indicating an extra space
        result[targetI] = value + 1;
      }
    }
  }
  // return the value at the end of the result array, minus one, which should be the final number of spaces, or -1 if no possible spaces
  return result[result.length - 1] - 1;
}
