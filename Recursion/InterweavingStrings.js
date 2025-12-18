// Write a function which takes in three strings, and returns a boolean representing whether the third string can be formed by interweaving the first two strings together.

// To interweave strings means to merge them by alternating their letters without any specific pattern. For instance, the strings "abc" and "123" can be interwoven
// as "a1b2c3", as "abc123", and as "ab1c23". These three examples are not an exhaustive list of posibilities, simply a demonstration of the variability allowed in the context
// of the problem.

// However, letters within a string must maintain their relative ordering in the interwoven string.

// Sample Input:

// one = "algoexpert"
// two = "your-dream-job"
// three = "your-algodream-expertjob"

// Sample Output:

// true

// Solution 1:

// recursive solution checking every combination of n + m to determine if possible to interweave

// O(2^(n + m)) time due to not caching and thus doing many repeat calculations
// O(n + m) space due to potentially n + m calls on the call stack at a given time

// main function, taking in the first and second strings, along with interwoven possible answer
function interweavingStrings(one, two, three) {
  // edge case check
  // if for whatever reason the length of string three is longer or shorter than the sum of strings one and two, this is obviously not an interwoven answer, so return false
  if (three.length !== one.length + two.length) {
    return false;
  }
  // return a call to helper function areInterwoven, which takes in the three strings plus 0's as initial indices
  return areInterwoven(one, two, three, 0, 0);
}

// helper function which determines whether strings can interweave, taking in all three strings plus two index values
function areInterwoven(one, two, three, i, j) {
  // can calculate needed position in three from positions of one and two, so set k equal to combined positions of i and j
  let k = i + j;

  // base case
  // if k is all the way at the end of three, must mean made it through the entire string, so return true
  if (k === three.length) {
    return true;
  }

  // recursive case
  // if pointer i is less than one's length, so still in bounds, and the value at position i in one is equal to the value at k in three, then execute below
  if (i < one.length && one[i] === three[k]) {
    // if the recursive call to areInterwoven for i + 1 is true, then return true
    if (areInterwoven(one, two, three, i + 1, j)) {
      return true;
    }
  }

  // if pointer j is less than two's length, so still in bounds, and the value at position j in two is equal to the value at k in three, then execute below
  if (j < two.length && two[j] === three[k]) {
    // return the recursive call to areInterwoven for j + 1
    return areInterwoven(one, two, three, i, j + 1);
  }

  // if neither of the three options above are true, then return false as cannot interweave the strings
  return false;
}

// Solution 2:

// recursive solution utilizing caching strategy to reduce overall checks

// O(nm) time due to checking all possibilities between one and two at least once and storing the results in cache for instant access later
// O(nm) space due to storing the cache

// main function which takes in the three string inputs
function interweavingStrings2(one, two, three) {
  // edge case check
  // if the length of string three is smaller or larger than the combined length of one and two, cannot interweave as there are values missing or added with three, so return false
  if (three.length !== one.length + two.length) {
    return false;
  }

  // initialize variable cache, and set equal to a 2D array of one by two lengths plus 1, filled with 0's and null
  let cache = new Array(one.length + 1)
    .fill(0)
    .map((_) => new Array(two.length + 1).fill(null));
  // return the value returned by areInterwoven helper, passing in the three strings, 0's for the start indexes of i and j, and the cache
  return areInterwoven2(one, two, three, 0, 0, cache);
}

// helper function to determine whether strings can be interwoven, taking in the three strings, indexes to start iterating over one and two, and the cache
function areInterwoven2(one, two, three, i, j, cache) {
  // base cases
  // if the result in the cache at position [i, j] is NOT null, meaning this has been seen before, then return the value at that position
  if (cache[i][j] !== null) {
    return cache[i][j];
  }

  // since we have positions of i and j, calculate position k for use in string three by adding i and j together, and storing in variable k
  let k = i + j;
  // if the value for k is equal to the length of string three, made it to the end of the interwoven result, so return true
  if (k === three.length) {
    return true;
  }

  // recursive cases
  // if i is less than the length of string one AND the value at i in one is equal to the value at k in three, execute below
  if (i < one.length && one[i] === three[k]) {
    // set the value at [i, j] in the cache equal to the recursive return value of areInterwoven at [i + 1, j]
    cache[i][j] = areInterwoven2(one, two, three, i + 1, j, cache);

    // if a non-null value exists at [i, j] in cache, then return true
    if (cache[i][j]) {
      return true;
    }
  }

  // if the value of j is less than length of two AND value at j in two is equal to value at k in three, execute below
  if (j < two.length && two[j] === three[k]) {
    // set the value at [i, j] in cache equal tot he recursive return value of areInterwoven at [i, j + 1]
    cache[i][j] = areInterwoven2(one, two, three, i, j + 1, cache);
    // return the value at [i, j] in the cache
    return cache[i][j];
  }

  // if made it here, no conditions above hit, so set the value at current [i, j] position in cache equal to false
  cache[i][j] = false;
  // return false for use in main function
  return false;
}
