// Given an array of asteroids, where asteroids are represented by positive or negative integer values, write a function which returns the results of the asteroid "collisions".

// Positive-value integers are asteroids moving to the right, and negative-value integers are asteroids moving to the left. Right and left-moving asteroids will "collide" with one another,
// and the difference in their values will be the "remaining" asteroid, which continues to move along in the direction indicated by it's positive or negative value. If two asteroids
// of the same value meet, they will cancel one another out.
// Put another way, for each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Asteroids all move at the same speed.

// Find out the state of the asteroids after all collisions, and return an array with that state.

// Sample Input:
// asteroids = [5, 10, -3, 9, 4, -2]

// Sample Output:
// [5, 7, 9, 2]
// -3 collides and is detroyed by 10, making 7, -2 collides and is destroyed by 4, making 2

// Solution 1:

// iterative solution which uses stack to keep track of asteroids and check conditions about them
// solves version of problem where larger asteroids cancel out/replace smaller ones, but not where computation occurs between collisions

// O(n) time due to single pass over n asteroids
// O(n) space due to storing at max n asteroids in stack

function asteroidCollision(asteroids) {
  // set up stack to keep track of asteroids
  let stack = [];
  // start iterating over the asteroids array
  for (let i = 0; i < asteroids.length; i++) {
    // grab current asteroid value
    let current = asteroids[i];
    // if positive, moving to right, push number to stack
    if (current > 0) {
      stack.push(current);
    } else {
      // if negative, while there are items in stack, and last item greated than 0, and last item in stack is less than absolute value of current, pop it out
      while (
        stack.length &&
        stack[stack.length - 1] > 0 &&
        stack[stack.length - 1] < Math.abs(current)
      ) {
        stack.pop();
      }
      // if items in stack and last item is equal to absolute value of current, pop it out, these asteroids cancel each other
      if (stack.length && stack[stack.length - 1] === Math.abs(current)) {
        stack.pop();
        // if no items in stack or last item is negative, push current item to stack
      } else if (!stack.length || stack[stack.length - 1] < 0) {
        stack.push(current);
      }
    }
  }
  // return stack as list of asteroid state
  return stack;
}
