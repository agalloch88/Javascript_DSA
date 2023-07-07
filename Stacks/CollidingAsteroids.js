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

function collidingAsteroids(asteroids) {
    let resultsStack = [];

    for (let asteroid of asteroids) {
        if (asteroid > 0) {
            resultsStack.push(asteroid);
            continue;
        }

        while (true) {
            let lastStackIdx = resultsStack.length - 1;

            if (resultsStack.length === 0 || resultsStack[lastStackIdx] < 0) {
                resultsStack.push(asteroid);
                break;
            }

            let asteroidSize = Math.abs(asteroid);

            if (resultsStack[lastStackIdx] > asteroidSize) {
                break;
            }

            if (resultsStack[lastStackIdx] === asteroidSize) {
                resultsStack.pop();
                break;
            }

            resultsStack.pop();
        }
    }
    return resultsStack;
}