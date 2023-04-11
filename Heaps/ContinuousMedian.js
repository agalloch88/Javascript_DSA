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

// iterative solution using min/max heaps and continually balancing node insertions to achieve continuous median calculability

// O(log(n)) time
// O(n) space

// ConinuousMedianHandler class which builds off heap class, providing lowers heap, greaters heap, and median

class ContinuousMedianHandler {
    constructor() {
        this.lowers = new Heap(MAX_HEAP_FUNC, []);
        this.greaters = new Heap(MIN_HEAP_FUNC, []);
        this.median = null;
    }
    // main function for this class, which inserts a specific number from the array
    insert(number) {
        // if there is no item in lowers or if the number to insert is smaller than the head of the heap, then insert number into lowers heap
        if (!this.lowers.length || number < this.lowers.peek()) {
            this.lowers.insert(number);
        // if both conditions above are false, then insert number into greaters heap
        } else {
            this.greaters.insert(number);
        }
        // once inserted, check to rebalance the heaps
        this.rebalanceHeaps();
        // once heaps are rebalanced, can then calculate the updated median value
        this.updateMedian();
    }
    // function which helps to maintain balanced heaps, continually checking to ensure heaps are not off by more than 2 nodes
    rebalanceHeaps() {
        // if the length of lowers heap is 2 values longer than greaters heap, then insert a call to remove from lowers into greaters
        if (this.lowers.length - this.greaters.length === 2) {
            this.greaters.insert(this.lowers.remove());
        // if the length of greaters heap is 2 values longer than lowers heap, then insert a call to remove from greaters into lowers
        } else if (this.greaters.length - this.lowers.length === 2) {
            this.lowers.insert(this.greaters.remove());
        }
    }
    // function which updates the median value from the head nodes of the heaps, and this workss simplistically since we know heaps will either be perfectly balanced or off by at most 1 value
    updateMedian() {
        // if the lengths of the heaps are the same, then calculate median by taking the average of head nodes from lowers and greaters heaps
        if (this.lowers.length === this.greaters.length) {
            this.median = (this.lowers.peek() + this.greaters.peek()) / 2;
        // if lowers heap is longer, then set median to the head node of lowers heap
        } else if (this.lowers.length > this.greaters.length) {
            this.median = this.lowers.peek();
        // if greaters heap is longer, then set median to the head node of greaters heap
        } else {
            this.median = this.greaters.peek();
        }
    }
    // function to get median value, which simply returns the median
    getMedian() {
        return this.median;
    }
}

// heap class which has main functions, including insertion, removal, sifting up, sifting down, peeking, swapping
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

// function to build a max heap by comparing two input values
function MAX_HEAP_FUNC(a, b) {
    return a > b;
}

// function to build a min heap by comparing two input values
function MIN_HEAP_FUNC(a, b) {
    return a < b;
}