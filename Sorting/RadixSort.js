// Write a function which takes in an array of non-negative integers, and which returns a sorted version of the array. Use the Radix Sort algorithm to sort the array.

// Sample Input:

// arrary = [8762, 654, 3008, 345, 87, 65, 234, 12, 2]

// Sample Output:

// [2, 12, 65, 87, 234, 345, 654, 3008, 8762]

// Solution 1:

// solution processing numbers starting with least significant to most significant digit via counting sort

// O(d * (n + b)) time where n is length of input array, d is max number of digits, and b is the base of numbering system
// O(n + b) space

// Function to perform radix sort on an array
function radixSort(array) {
  // If the array is empty, return it as is
  if (array.length === 0) {
    return array;
  }

  // Find the maximum number in the array to determine the number of digits
  let maxNumber = Math.max(...array);

  // Initialize the digit position starting from the least significant digit (LSD)
  let digit = 0;
  while (maxNumber / 10 ** digit > 0) {
    // Process until all digit positions are handled
    countingSort(array, digit); // Sort the array based on the current digit
    digit++; // Move to the next more significant digit
  }

  return array; // Return the sorted array
}

// Helper function to perform counting sort based on a specific digit
function countingSort(array, digit) {
  // Create a temporary array to hold the sorted elements
  let sortedArray = new Array(array.length).fill(0);

  // Create a count array to store the frequency of each digit (0-9)
  let countArray = new Array(10).fill(0);

  // Calculate the column value (e.g., 1 for units, 10 for tens, etc.)
  let digitColumn = 10 ** digit;

  // Count the occurrences of each digit at the current column
  for (let num of array) {
    let countIndex = Math.floor(num / digitColumn) % 10; // Extract the digit at the current column
    countArray[countIndex]++;
  }

  // Transform countArray to store the cumulative count of digits
  for (let idx = 1; idx < 10; idx++) {
    countArray[idx] += countArray[idx - 1];
  }

  // Build the sorted array by iterating over the original array in reverse order
  for (let idx = array.length - 1; idx > -1; idx--) {
    let countIndex = Math.floor(array[idx] / digitColumn) % 10; // Extract the digit at the current column
    countArray[countIndex]--; // Decrease the count for this digit
    let sortedIndex = countArray[countIndex]; // Get the sorted position
    sortedArray[sortedIndex] = array[idx]; // Place the number in its sorted position
  }

  // Copy the sorted elements back into the original array
  for (let idx = 0; idx < array.length; idx++) {
    array[idx] = sortedArray[idx];
  }
}
