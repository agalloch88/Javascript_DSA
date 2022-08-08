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