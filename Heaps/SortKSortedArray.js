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

class MinHeap {
    constructor(array) {
        this.heap = this.buildHeap(array);
    }
    isEmpty() {
        return this.heap.length === 0;
    }

    buildHeap(array) {
        let firstParentIdx = Math.floor((array.length - 2) / 2);
        for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
            this.siftDown(currentIdx, array.length - 1, array);
        }
        return array;
    }

    siftDown(currentIdx, endIdx, heap) {
        let childOneIdx = currentIdx * 2 + 1;
        while (childOneIdx <= endIdx) {
            let childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
            let idxToSwap;

            if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
                idxToSwap = childTwoIdx;
            } else {
                idxToSwap = childOneIdx;
            }

            if (heap[idxToSwap] < heap[currentIdx]) {
                this.swap(currentIdx, idxToSwap, heap);
                currentIdx = idxToSwap;
                childOneIdx = currentIdx * 2 + 1;
            } else {
                return;
            }
        }
    }

    swap(i, j, heap) {
        let temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
    }
}