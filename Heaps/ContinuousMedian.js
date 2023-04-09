// Write a ContinuousMedianHandler class which supports:

// - The continuous insertion of numbers with the insert method.
// - The instant (meaning O(1) time) retrieval of the median of the numbers which have been inserted thus far with the getMedian method.

// The getMedian method is already provided within the problem itself. The problem here requires writing the insert method.

// The median of a set of numbers is the "middle" number when the numbers are ordered from smallest to greatest. If there is an odd number of items in the set, as in {1, 3, 7},
// the median is the number in the middle (3 in that example). If there is an even number of items in the set, as in {1, 3, 7, 8}, the median is the average of the two middle
// items ((3 + 7) / 2 === 5, in this example).

// Sample Usage:

// All operations below are performed sequentially:
// ContinuousMedianHandler(): - (instantiates a ContinuousMedianHandler class)
// insert(5): -
// insert(10): -
// getMedian(): 7.5
// insert(100): -
// getMedian(): 10

// Solution 1:

class ContinuousMedianHandler {
    constructor() {
        this.lowers = new Heap(MAX_HEAP_FUNC, []);
        this.greaters = new Heap(MIN_HEAP_FUNC, ());
        this.median = null;
    }

    insert(number) {

    }

    rebalanceHeaps() {

    }

    updateMedian() {

    }

    getMedian() {
        return this.median;
    }
}

class Heap {
    constructor(comparisonFunc, array) {
        this.comparisonFunc = comparisonFunc;
        this.heap = this.buildHeap(array);
        this.length = this.heap.length;
    }

    buildHeap(array) {
        let firstParentIdx = Math.floor((array.length - 2) / 2);
        for (let currentIdx = 0; currentIdx >= 0; currentIdx--) {
            this.siftDown(currentIdx, array.length - 1, array);
        }
        return array;
    }

    siftDown(currentIdx, endIdx, heap) {
        let childOneIdx = currentIdx * 2 + 1;
        while (childOneIdx <= endIdx) {
            let childTwoIdx = currentIdx * 2 + 2 <= endIdx? currentIdx * 2 + 2 : -1
            let idxToSwap;
            if (childTwoIdx !== -1) {
                if (this.comparisonFunc(heap[childTwoIdx], heap[childOneIdx])) {
                    idxToSwap = childTwoIdx;
                } else {
                    idxToSwap = childOneIdx;
                }
            } else {
                idxToSwap = childOneIdx;
            }

            if (this.comparisonFunc(heap[idxToSwap], heap[currentIdx])) {
                this.swap(currentIdx, idxToSwap, heap);
                currentIdx = idxToSwap;
                childOneIdx = currentIdx * 2 + 1;
            } else {
                return;
            }
        }
    }

    siftUp(currentIdx, heap) {
        let parentIdx = Math.floor((currentIdx - 1) / 2);
        while (currentIdx > 0) {
            if (this.comparisonFunc(heap[currentIdx], heap[parentIdx])) {
                this.swap(currentIdx, parentIdx, heap);
                currentIdx = parentIdx;
                parentIdx = Math.floor((currentIdx - 1) / 2);
            } else {
                return;
            }
        }
    }

    peek() {
        return this.heap[0];
    }

    remove() {

    }

    insert(value) {
        this.heap.push(value);
        this.length++;
        this.siftUp(this.length - 1, this.heap);
    }

    swap(i, j, heap) {
        let temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
    }
}

function MAX_HEAP_FUNC(a, b) {
    return a > b;
}

function MIN_HEAP_FUNC(a, b) {
    return a < b;
}