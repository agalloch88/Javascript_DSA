// Implement a MinHeap class which supports:

// - Building a Min Heap from an input array of integers
// - Inserting integers in the heap
// - Removing the heap's minimum/root value
// - Peeking at the heap's minimum/root value
// - Sifting integers up and down the heap, which is to be used when inserting and removing values

// Note that the heap should be represented in the form of an array.

// Sample Usage:
// array = [48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41]

// All operations below performed sequentially
// MinHeap(array): - (instantiates a MinHeap, calling the buildHeap method and populating the heap)
// buildHeap(array) : - ([-5, 2, 6, 7, 8, 8, 24, 391, 24, 56, 12, 24, 48, 41])
// insert(76): - ([-5, 2, 6, 7, 8, 8, 24, 391, 24, 56, 12, 24, 48, 41, 76])
// peek(): -5
// remove(): -5 ([2, 6, 7, 8, 8, 24, 391, 24, 56, 12, 24, 48, 41, 76])
// peek(): 2
// remove(): 2 ([6, 7, 8, 8, 24, 391, 24, 56, 12, 24, 48, 41, 76])
// peek(): 6
// insert(87): - ([6, 7, 8, 8, 24, 391, 24, 56, 12, 24, 48, 41, 76, 87])

// Solution 1:

// main class with the buildHeap, siftDown, insert, peek, and remove methods
class MinHeap {
    constructor(array) {
        // set the heap equal to a call to buildHeap method, passing in the input array
        this.heap = this.buildHeap(array);
    }
    // O(n) time
    // O(1) space
    // buildHeap method which constructs the MinHeap from the input array
    buildHeap(array) {
        // initialize variable firstParentIdx, and set it equal to the floored value of the array's length minus two, then divided by 2, which is essentially the middle of the MinHeap
        let firstParentIdx = Math.floor((array.length - 2) / 2);
        // iterate over the items in the MinHeap, 
        for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
            this.siftDown(currentIdx, array.length - 1, array);
        }
        return array;
    }
    // O(log(n)) time
    // O(1) space
    siftDown(currentIdx, endIdx, heap) {
        let childOneIdx = currentIdx * 2 + 1;
        while (childOneIdx <= endIdx) {
            let childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : - 1;
            let idxToSwap;
            if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
                idxToSwap = childTwoIdx;
            } else {
                idxToSwap = childOneIdx;
            }
            if (heap[idxToSwap] < heap[currentIdx]) {
                this.swap (currentIdx, idxToSwap, heap);
                currentIdx = idxToSwap;
                childOneIdx = currentIdx * 2 + 1;
            } else {
                return;
            }
        }
    }
    // O(log(n)) time
    // O(1) space
    // siftUp method which moves a value up the heap into proper position, and takes in the index to sift upward and the heap itself
    siftUp(currentIdx, heap) {
        // initialize variable parentIdx to equal the floored value of the currentIdx passed in minus 1, then divided by 2
        let parentIdx = Math.floor((currentIdx - 1) / 2);
        // keep sifting up so long as the currentIdx is greater than 0 AND the value of currentIdx in the MinHeap is less than the value of parentIdx in the MinHeap
        while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
            // swap the values at the index of currentIdx and parentIdx
            this.swap(currentIdx, parentIdx, heap);
            // set currentIdx equal to parentIdx
            currentIdx = parentIdx;
            // set parentIdx equal to the floored value of currentIdx minus 1, then divided by 2
            parentIdx = Math.floor((currentIdx - 1) / 2);
        }
    }
    // O(1) time
    // O(1) space
    // peek method which allows a view at root/min value in the MinHeap at any given time
    peek() {
        // returns the first index in the MinHeap/array
        return this.heap[0];
    }
    // O(log(n)) time
    // O(1) space
    // remove method which excises a min/root value from the MinHeap
    remove () {
        // call swap method, passing in index 0 and last item in the array/MinHeap
        this.swap(0, this.heap.length - 1, this.heap);
        // initialize variable valueToRemove and set equal to the popped item/last value in the heap/array
        let valueToRemove = this.heap.pop();
        // call the siftDown method, passsing in index 0, the last item in MinHeap/array, and sift this value down
        this.siftDown(0, this.heap.length - 1, this.heap);
        // return the valueToRemove, which is now gone
        return valueToRemove;
    }
    // O(log(n)) time
    // O(1) space
    // insert method, which allows the addition of new values into the MinHeap
    insert(value) {
        // push the value to insert onto the end of the MinHeap/array
        this.heap.push(value);
        // call the siftUp method, passing in the index of the value to siftUp (which is currently the last index in the array), which is this new inserted value, and the heap itself
        this.siftUp(this.heap.length - 1, this.heap);
    }
    // swap method, which is necessary since there's no built-in function for this in JS, which takes in the indexes to swap and a temp variable
    swap(i, j, temp) {
        // set temp variable equal to the value at index j in the MinHeap
        let temp = heap[j];
        // set value at index j in MinHeap equal to the value at index i in MinHeap
        heap[j] = heap[i];
        // set value at index i in MinHeap equal to the index store in temp variable
        heap[i] = temp;
    }
}
