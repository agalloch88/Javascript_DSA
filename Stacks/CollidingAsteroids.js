// The problem presents an array of integers, asteroids, where each integer represents the size of an asteroid. The sign of the integer represents the direction the asteroid is moving
// (meaning positive equals moving right, and negative equals moving left). All asteroids move at the same speed, meaning that two asteroids moving in the same direction can never
// collide.

// For example, the integer 4 represents an asteroid of size 4 moving to the right. Similarly, -7 represents an asteroid of size 7 moving to the left.

// If two asteroids collide, the smaller asteroid (based on absolute value) explodes, and is destroyed completely. If two colliding asteroids are the same size, they both explode.

// Write a function which takes in this array of asteroids, and returns an array of integers representing the asteroids after all collisions occur.

// Sample Input:

// asteroids = [-3, 5, -8, 6, 7, -4, -7]

// Sample Output:

// [-3, -8, 6]
// the -3 moves left, never colliding with an asteroid
// the 5 moves right, colliding with the -8 moving left and being destroyed by it
// the 6 moves right, never colliding with an asteroid
// the 7 moves right, first colliding with the -4 moving left and destroying the -4
// the 7 moves right, colliding with the -7 moving left, which destroys both asteroids

// Solution 1:

// iterative solution utilizing stack to store asteroids and pop/push as necessary

// O(n) time due to looping over n asteroids in input
// O(n) space due to storing at most n asteroids in new stack

function collidingAsteroids(asteroids) {
    // initialize variable resultsStack and set equal to an empty stack/array
    let resultsStack = [];
    // loop over every asteroid in the asteroids input
    for (let asteroid of asteroids) {
        // if the asteroid value is greater than 0, this is a right-moving asteroid, so execute below
        if (asteroid > 0) {
            // push this asteroid onto the resultsStack to handle against potential collisions and continue
            resultsStack.push(asteroid);
            continue;
        }
        // keep looping while true, meaning there's a held asteroid in the outer for loop for which no action is yet taken
        while (true) {
            // initialize variable lastStackIdx to grab the top item/index in resultsStack
            let lastStackIdx = resultsStack.length - 1;
            // if the stack is empty, OR the top item in the resultsStack is less than zero (which means this is a negative-value asteroid moving left), then push the currently-held asteroid onto the resultsStack and break the while loop
            if (resultsStack.length === 0 || resultsStack[lastStackIdx] < 0) {
                resultsStack.push(asteroid);
                break;
            }
            // initialize variable asteroidSize and set equal to the absolute value of the currently-held asteroid
            // this will help determine whether, in a collision, a given asteroid is "destroyed" versus another
            let asteroidSize = Math.abs(asteroid);
            // if the top asteroid in the resultsStack is GREATER than the currently held asteroid, then break the while loop and do nothing with the currently-held asteroid; it is not pushed onto the resultsStack, so therefore is "lost" or "destroyed" by the collision comparison of values
            if (resultsStack[lastStackIdx] > asteroidSize) {
                break;
            }
            // if the values of the top asteroid in the resultsStack and the currently-held asteroid are the SAME, this is an equal-value collision, which means both asteroids are destroyed, so pop the top asteroid off the resultsStack and break the while loop without handling the currently-held asteroid
            if (resultsStack[lastStackIdx] === asteroidSize) {
                resultsStack.pop();
                break;
            }
            // if none of the above conditions hit and break the while loop, the currently-held asteroid should destroy the top item in the resultsStack, so pop that asteroid off the stack
            resultsStack.pop();
        }
    }
    // once every asteroid in input is checked, should have the final results, so return the resultsStack
    return resultsStack;
}