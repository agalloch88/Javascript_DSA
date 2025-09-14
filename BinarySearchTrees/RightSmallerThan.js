// Write a function which takes in an array of integers, and returns an array of the same length, where each element in the output array corresponds to the number of integers
// in the input array that are to the right of the relevant index, and that are strictly smaller than the integer at that index.

// In other words, the value at output[i] represents the number of inntegers that are to the right of i, and that are strictly smaller than input[i].

// Sample Input:

// array = [8, 5, 11, -1, 3, 4, 2]

// Sample Output:

// [5, 4, 4, 0, 1, 1, 0]
// There are 5 integers smaller than 8 which are to the right of 8
// There are 4 integers smaller than 5 which are to the right of 5
// There are 4 integers smaller than 11 which are to the right of 11
// There are 0 integers smaller than -1 which are to the right of -1
// There is only 1 integer smaller than 3 which is to the right of 3
// There is only 1 integer smaller than 4 which is to the right of 4
// There are 0 integers smaller than 2 which are to the right of 2

// Solution 1:

// iterative solution utilizing the map and reduce methods

// O(n^2) time due to mapping over inputs, then reducing values
// O(n) space due to returning array of length n for right smaller than values

function rightSmallerThan(array) {
  // Iterate over each element of the array using map, where inputValue is the current element and inputIndex is its index
  return array.map(
    (inputValue, inputIndex) =>
      // Use reduce to accumulate the count of elements to the right of the current element that are smaller
      array.reduce((numOfSmaller, valueReduce, indexReduce) => {
        // Check if the current element in reduce (valueReduce) is to the right of the map's current element
        let isLeft = inputIndex > indexReduce;
        // If valueReduce is to the left or at the same position, skip it (do not increase the count)
        if (isLeft) {
          return numOfSmaller;
        }
        // Check if the current element in reduce is smaller than the current element in map
        let isValueSmaller = valueReduce < inputValue;
        // Increase the count (numOfSmaller) if valueReduce is smaller, else keep it the same
        return numOfSmaller + isValueSmaller;
      }, 0), // Initial count is set to 0
  );
}

// Solution 2:

// simplistic but suboptimal solution looking at all remaining values for each index

// O(n^2) time due to nested for loops
// O(n) space due to returning new array of length n

function rightSmallerThan2(array) {
  // initialize variable rightSmallerCounts which will hold the answers for each index, and set equal to an empty array
  let rightSmallerCounts = [];

  // loop over the input array for every index
  for (let i = 0; i < array.length; i++) {
    // initialize variable rightSmallerCount, and set equal to 0 at the outset
    let rightSmallerCount = 0;

    // loop over every remaining index for each value of i
    for (let j = i + 1; j < array.length; j++) {
      // if the value at j in the array is smaller than the value at i in the array, increment rightSmallerCount by 1
      if (array[j] < array[i]) {
        rightSmallerCount++;
      }
    }
    // once the inner for loop above finishes, push the cumulative value of rightSmallerCount into the rightSmallerCounts array
    rightSmallerCounts.push(rightSmallerCount);
  }
  // once outer for loop finishes, return the rightSmallerCounts array, which should hold the answers for each index
  return rightSmallerCounts;
}

// Solution 3:

// iterative solution starting at the end of the array and utilizing BST structure to determine answer working back to index 0

// O(n(log(n))) time
// O(n) space

// modified BST class, adding idx to track position, plus the number of nodes smaller than current node at insert time, and the leftSubtreeSize
class SpecialBST {
  constructor(value, idx, numSmallerAtInsertTime) {
    this.value = value;
    this.idx = idx;
    this.numSmallerAtInsertTime = numSmallerAtInsertTime;
    this.leftSubtreeSize = 0;
    this.left = null;
    this.right = null;
  }

  // insert method for this class
  insert(value, idx, numSmallerAtInsertTime = 0) {
    // if the value passed into insert method is smaller than the current value, execute below
    if (value < this.value) {
      // this will indicate going left due to BST property, so increment leftSubtreeSize by 1
      this.leftSubtreeSize++;

      // if the left subtree is null, execute below and create a new SpecialBST under left
      if (this.left === null) {
        this.left = new SpecialBST(value, idx, numSmallerAtInsertTime);
        // otherwise, insert into left
      } else {
        this.left.insert(value, idx, numSmallerAtInsertTime);
      }
      // if value passed in is NOT smaller than current value, execute below
    } else {
      // increment numSmallerAtInsertTime by the leftSubtreeSize value, since this is known to contain nodes all strictly smaller than current value
      numSmallerAtInsertTime += this.leftSubtreeSize;
      // if the value passed in is greater than current value, then increment numSmallerAtInsertTime by 1 because this current value is also one to count
      if (value > this.value) {
        numSmallerAtInsertTime++;
      }

      // if the right subtree is null, then create a new SpecialBST under right
      if (this.right === null) {
        this.right = new SpecialBST(value, idx, numSmallerAtInsertTime);
        // otherwise, insert into the right subtree
      } else {
        this.right.insert(value, idx, numSmallerAtInsertTime);
      }
    }
  }
}

// main function which takes in the input array of values
function rightSmallerThan3(array) {
  // edge case
  // handle if the input array is empty, and if so, simply return an empty array
  if (array.length === 0) {
    return [];
  }

  // initialize variable lastIdx, and set equal to the last value in the input array
  // grabbing this value to work backward from
  let lastIdx = array.length - 1;
  // initialize variable bst, and set equal to a new SpecialBST, passing in the value of lastIdx in array as the value, the lastIdx itsef as idx, and 0 as numSmallerAtInsertTime
  let bst = new SpecialBST(array[lastIdx], lastIdx, 0);

  // iterate over all the values in the input array from right to left
  for (let i = array.length - 2; i >= 0; i--) {
    // insert each value into the bst
    bst.insert(array[i], i);
  }

  // initialize variable rightSmallerCounts, and set equal to a slice of the input array to use to compare bst against
  let rightSmallerCounts = array.slice();
  // call helper function getRightSmallerCounts, and pass in both the bst and the rightSmallerCounts slice
  getRightSmallerCounts(bst, rightSmallerCounts);
  // return the values for rightSmallerCounts once helper function returns
  return rightSmallerCounts;
}

// helper function to count the values smaller to the right, taking in the bst and rightSmallerCounts arrays to compare
function getRightSmallerCounts(bst, rightSmallerCounts) {
  // handle edge case where bst is null/empty, and if so, simply return
  if (bst === null) {
    return;
  }

  // set value in rightSmaller counts at the position of idx in the bst equal to the value of numSmallerAtInsertTime in bst
  rightSmallerCounts[bst.idx] = bst.numSmallerAtInsertTime;
  // recursively call helper on the left and right subtrees to get those counts
  getRightSmallerCounts(bst.left, rightSmallerCounts);
  getRightSmallerCounts(bst.right, rightSmallerCounts);
}

// Solution 4:

// simplified version of solution 3

// O(n(log(n))) time
// O(n) space due to returning rightSmallerCounts array of length n

// modified BST class with additional leftSubtreeSize attribute
class SpecialBST2 {
  constructor(value) {
    this.value = value;
    this.leftSubtreeSize = 0;
    this.left = null;
    this.right = null;
  }

  // insert method for the SpecialBST class, which takes in value, idx, rightSmallerCounts array,
  // and numSmallerAtInsertTime counter set to 0 at outset
  insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime = 0) {
    // if the value passed into insert method is smaller than the current value, execute below
    // this means inserting to the left in BST
    if (value < this.value) {
      // increment leftSubtree size by 1 since going left
      this.leftSubtreeSize++;

      // if the left subtree does not exist yet/is null, then create a new subtree in left
      // with the current value
      if (this.left === null) {
        this.left = new SpecialBST(value);
        // otherwise, insert a new BST node using the current value, idx, rightSmallerCounts array
        // and numSmallerAtInsertTime counter
      } else {
        this.left.insert(
          value,
          idx,
          rightSmallerCounts,
          numSmallerAtInsertTime,
        );
      }
      // otherwise, current value should be inserted to the right so execute below
    } else {
      // increment numSmallerAtInsertTime by the current vaslue of leftSubtreeSize
      numSmallerAtInsertTime += this.leftSubtreeSize;

      // if the value is greater than current value, increment numSmallerAtInsertTime by 1
      if (value > this.value) {
        numSmallerAtInsertTime++;
      }

      // if right subtree does not exist/is null, execute below
      if (this.right === null) {
        // set right equal to a new SpecialBST node using the current value
        this.right = new SpecialBST(value);
        // set the value at idx in rightSmallerCounts array equal to the current value of
        // numSmallerAtInsertTime
        rightSmallerCounts[idx] = numSmallerAtInsertTime;
        // otherwise, if a value exists within right, insert into right using the
        // current value, idx, rightSmallerCounts array, and numSmallerAtInsertTime counter
      } else {
        this.right.insert(
          value,
          idx,
          rightSmallerCounts,
          numSmallerAtInsertTime,
        );
      }
    }
  }
}

// main function which takes in an array of values
function rightSmallerThan4(array) {
  // handle edge case
  // if the input array is empty, then simply return an empty array
  if (array.length === 0) {
    return [];
  }

  // initialize variable rightSmallerCounts, and set equal to a slice of the full input array
  let rightSmallerCounts = array.slice();
  // initialize variable lastIdx, and set equal to the last value in the input array, thus grabbing the end
  let lastIdx = array.length - 1;
  // initialize variable bst, and set equal to a new SpecialBST object starting from lastIdx
  let bst = new SpecialBST(array[lastIdx]);
  // set the value of lastIdx in rightSmallerCounts array equal to 0, since last item cannot
  // have any values smaller than itself
  rightSmallerCounts[lastIdx] = 0;

  // iterate over the input array starting from the value to the left of lastIdx
  for (let i = array.length - 2; i >= 0; i--) {
    // insert each value and idx in the input array into the bst object
    bst.insert(array[i], i, rightSmallerCounts);
  }
  // once the for loop completes, return the rightSmallerCounts array which holds the answers
  return rightSmallerCounts;
}
