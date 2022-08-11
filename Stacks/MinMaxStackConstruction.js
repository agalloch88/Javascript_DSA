// Write a MinMaxStack class for a Min Max Stack. The class should support:

// - Pushing and popping values on and off the stack
// - Peeking at the value on the top of the stack
// - Getting both the minimum and the maximum values in the stack at any given point in time

// All class methods, when considered independently, should run in constant time and with constant space

// Sample Usage:

// MinMaxStack(): - (instantiate the stack)
// push(5): -
// getMin(): 5
// getMax(): 5
// peek(): 5
// push(7): -
// getMin(): 5
// getMax(): 7
// peek(): 7
// push(2): -
// getMin(): 2
// getMax(): 7
// peek(): 2
// pop(): 2
// pop(): 7
// getMin(): 5
// getMax(): 5
// peek(): 5

// Solution 1:

// construct stack using array, and utilize additional minMaxStack to track those values

// O(1) time for all operations within the class as they are constant-time lookups/comparisons
// O(1) space for all operations within the class as the operations themselves do not utilize any
// additional space

class MinMaxStack {
    constructor() {
        this.minMaxStack = [];
        this.stack = [];
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }

    pop() {
        this.minMaxStack.pop();
        return this.stack.pop();
    }

    push(number) {
        let newMinMax = {min: number, max: number};

        if (this.minMaxStack.length) {
            let lastMinMax = this.minMaxStack[this.minMaxStack.length - 1];
            newMinMax.min = Math.min(lastMinMax.min, number);
            newMinMax.max = Math.max(lastMinMax.max, number);
        }

        this.minMaxStack.push(number);
        this.stackk.push(number);
    }

    getMin() {
        return this.minMaxStack[this.minMaxStack.length - 1].min;
    }

    getMax() {
        return this.minMaxStack[this.minMaxStack.length - 1].max;
    }
}