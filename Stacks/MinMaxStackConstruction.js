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

// set up class
class MinMaxStack {
    // create data structures to hold stack and specific min/max values for ease of reference
    constructor() {
        this.minMaxStack = [];
        this.stack = [];
    }
    // looks at top value on the stack
    peek() {
        return this.stack[this.stack.length - 1];
    }
    // removes top value from stack, and also the min/max
    pop() {
        this.minMaxStack.pop();
        return this.stack.pop();
    }
    // adds new value on top of stack
    push(number) {
        // set up potential new min/max values
        let newMinMax = {min: number, max: number};
        // if there are already items in the stack, must compare min/max with new addition
        if (this.minMaxStack.length) {
            // existing min/max grabbed here
            let lastMinMax = this.minMaxStack[this.minMaxStack.length - 1];
            // take the minimum value between existing and new min
            newMinMax.min = Math.min(lastMinMax.min, number);
            // take the maximum value between existing and new max
            newMinMax.max = Math.max(lastMinMax.max, number);
        }
        // update min/max in minMaxStack
        this.minMaxStack.push(newMinMax);
        // add new number to top of stack
        this.stack.push(number);
    }
    // retrieve the min value in stack
    getMin() {
        return this.minMaxStack[this.minMaxStack.length - 1].min;
    }
    // retrieve the max value in stack
    getMax() {
        return this.minMaxStack[this.minMaxStack.length - 1].max;
    }
}