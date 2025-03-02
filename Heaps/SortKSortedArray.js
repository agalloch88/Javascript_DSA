// Write a function ewhich takes in a non-negative integer, `k`, and a k-sorted array
// of integers, and which returns the sorted version of the array. The function may either
// sort the array in place, or create an entirely new array.

// A k-sorted array is a partially sorted array in which all elements are, at most, `k` positions
// away from their sorted position. For example, the array `[3, 1, 2, 2,]` is k-sorted with
// `k = 3`, because each element in the array is, at most, 3 positions away from its sorted
// position.

// Note that the expectation is to come up with an algorithm which can sort the k-sorted array faster
// than in O(n log(n)) time.

// Sample Input:

// array = [3, 2, 1, 5, 4, 7, 6, 5]

// Sample Output:

// [1, 2, 3, 4, 5, 5, 6, 7]

// Solution 1:

// iterative solution building a min heap and then extracting elements from it

// O(n log(k)) time due to building a min heap and extracting elements from it
// O(n) space due to storing n elements in the min heap

// MinHeap class to help easily extract the smallest element.
// It supports buildHeap, siftDown, siftUp, peek, remove, and insert operations.
class MinHeap {
  constructor(array) {
    // Build an initial heap out of the passed-in array.
    this.heap = this.buildHeap(array);
  }

  // Returns true if the heap is empty.
  isEmpty() {
    return this.heap.length === 0;
  }

  // Builds a heap by calling siftDown on each parent node starting from the last parent
  // down to the root. This ensures every parent node is in a valid position for a min-heap.
  buildHeap(array) {
    let firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  // Moves an element down the heap until it's in a valid min-heap position.
  // We compare a node with its children, and if a child is smaller, we swap with that child
  // and continue until the position is valid or we reach the heap's bottom.
  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      // Check if there is a second child and if it's smaller than the first child.
      let childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;

      // Decide which child is smaller.
      if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }

      // Swap if the chosen child is smaller than the current node.
      if (heap[idxToSwap] < heap[currentIdx]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        // If the parent is smaller than both children, the min-heap property is satisfied.
        return;
      }
    }
  }

  // Moves an element up the heap if it's smaller than its parent. This helps maintain
  // the min-heap property when a new element is inserted at the bottom.
  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    // Continue swapping with the parent while the current node is smaller.
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // Returns the smallest element in the heap (the root).
  peek() {
    return this.heap[0];
  }

  // Removes and returns the smallest element (root) from the heap.
  // Then it re-heapifies by sifting down the new root.
  remove() {
    this.swap(0, this.heap.length - 1, this.heap); // Swap smallest root with last element.
    let valueToRemove = this.heap.pop(); // Remove it.
    this.siftDown(0, this.heap.length - 1, this.heap); // Re-heapify from the root down.
    return valueToRemove;
  }

  // Inserts a new value into the heap, placing it at the end and then sifting it up to restore order.
  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  // Swaps two elements in the heap.
  swap(i, j, heap) {
    let temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
}

// Function to sort an array that is "k-sorted."
// A k-sorted array means every element is at most k positions away from its final sorted position.
function sortKSortedArray(array, k) {
  // We create a min-heap with up to the first k+1 elements of the array.
  // This range of elements is large enough to ensure we always have the smallest element
  // among the next k+1 elements in the unsorted portion.
  let minHeapWithKElements = new MinHeap(
    array.slice(0, Math.min(k + 1, array.length)),
  );

  // This index tracks where we'll place the next smallest element in the sorted portion of the array.
  let nextIndexToInsertElement = 0;

  // Iterate through the rest of the array, from index k+1 onward.
  for (let idx = k + 1; idx < array.length; idx++) {
    // Remove the smallest element from the heap and place it into the sorted portion of the array.
    let minElement = minHeapWithKElements.remove();
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;

    // Insert the current array element into the heap to maintain heap size of k+1.
    let currentElement = array[idx];
    minHeapWithKElements.insert(currentElement);
  }

  // Finally, remove any remaining elements in the heap and place them in the array.
  while (!minHeapWithKElements.isEmpty()) {
    let minElement = minHeapWithKElements.remove();
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;
  }

  // By the end, the array is fully sorted.
  return array;
}

// Solution 2:

// simple solution using loops

// O(n^2) time due to nested for loops
// O(1) space due to no additional data structures

// construct swap function since no built-in JS way to do swap
function swap(arr, to, from) {
  let temp = arr[from];
  arr[from] = arr[to];
  arr[to] = temp;
}

// main function
function sortKSortedArray(array, k) {
  // iterate through array
  for (let i = 0; i < array.length; i++) {
    // find smallest element in the next k elements
    let smallest = i;
    // iterate through next k elements
    for (let j = i + 1; j <= i + k; j++) {
      // if current element is smaller than smallest
      if (array[j] < array[smallest]) {
        // set smallest to current element
        smallest = j;
      }
    }
    // swap smallest element with current element
    for (let j = smallest; j > i; j--) {
      // swap
      swap(array, j - 1, j);
    }
  }
  // return sorted array
  return array;
}
