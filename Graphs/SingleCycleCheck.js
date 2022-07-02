// You're given an array of integers where each integer represents a jump of its value in the array. For instance, the integer 2 represents a 
// jump of two indices forward in the array; the integer -3 represents a jump of three indices backward; and so on.

// If a jump spills past the array's bounds, it wraps over to the other side. For instance, a jump of -1 at index 0 brings us to the last index
// of the array. Similarly, a jump of 1 at the last index in the array brings us to index 0.

// Write a function which returns a boolean representing whether the jumps in the array form a single cycle. A single cycle occurs if, and only if, starting at any index
// in the array and following the jumps, every element in the array is visited exactly once before landing back on the starting index.

// Sample Input:
// array = [2, 3, 1, -4, -4, 2]

// Sample Output:
// true

// Solution 1:

// O(n) time due to passing over at most n elements
// O(1) space due to only storing a few variables

function hasSingleCycle(array) {
    // keep track of how many elements visited. if more than array.length, should be done.
    let numElementsVisited = 0;
    let currentIdx = 0;
    // this is condition for breaking out of loop
    while (numElementsVisited < array.length) {
        // if hit index 0 after the first visit, not a single cycle, so return false
        if (numElementsVisited > 0 && currentIdx === 0) {
            return false;
        }
        // increment variable for each jump
        numElementsVisited++;
        // reset currentIdx using helper function
        currentIdx = getNextIdx(currentIdx, array);
    }
    return currentIdx === 0;
}

function getNextIdx(currentIdx, array) {
    // calculate jump based on value of integer currently at
    const jump = array[currentIdx];
    // account for the wrap-around by using modulo of array.length
    const nextIdx = (currentIdx + jump) % array.length;
    // account for potentially negative numbers by adding nextIdx to array.length value
    return nextIdx >= 0 ? nextIdx : nextIdx + array.length;
}

// Solution 2:

// O(n) time due to single pass over all array items
// O(1) space due to only storing a few variables

function hasSingleCycle(array) {
    let position = 0;

    while (array[position] !== null) {
        const index = position;
        position = nextPosition(index, array);
        array[index] = null;
    }

    return position === 0 && !array.some(n => n !== null);
}

function nextPosition(position, array) {
    const nextIdx = (position + array[position]) % array.length;
    return nextIdx >= 0 ? nextIdx : nextIdx + array.length;
}