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

class MinHeap {
    constructor(array) {
        this.heap = this.buildHeap(array);
    }
    // O(n) time
    // O(1) space
    buildHeap(array) {
        let firstParentIdx = Math.floor((array.length - 2) / 2);
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
    siftUp(currentIdx, heap) {
        let parentIdx = Math.floor((currentIdx - 1) / 2);
        while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
            this.swap(currentIdx, parentIdx, heap);
            currentIdx = parentIdx;
            parentIdx = Math.floor((currentIdx - 1) / 2);
        }
    }
    // O(1) time
    // O(1) space
    peek() {
        return this.heap[0];
    }
    // O(log(n)) time
    // O(1) space
    remove () {
        this.swap(0, this.heap.length - 1, this.heap);
        let valueToRemove = this.heap.pop();
        this.siftDown(0, this.heap.length - 1, this.heap);
        return valueToRemove;
    }
    // O(log(n)) time
    // O(1) space
    insert(value) {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1, this.heap);
    }

    swap(i, j, temp) {
        let temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
    }
}
