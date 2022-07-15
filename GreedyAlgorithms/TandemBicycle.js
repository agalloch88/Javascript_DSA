// A tandem bicycle is a bicycle operated by two people: person A and person B. Both people pedal the bicycle, but the person who pedals faster dictates the speed of
// the bicycle. So, if person A pedals at a speed of 5, and person B perdals at a speed of 4, the tandem bicycle moves at a speed of 5 (ie, tandemSpeed = Math.max(speedA, speedB)).

// You are given two lists of positive integers, one which contains the speeds of riders wearing red shirts, and one which contains the speeds of riders wearing blue shirts.
// Each rider is represented by a single positive interger, which is the speed at which they pedal the tandem bicycle. Both lists have the same length, meaning that there
// are as many red-shirt riders are there are blue-shirt riders. The goal is to pair every rider wearing a red shirt with a rider wearing a blue shirt, and the pair will
// then operate a tandem bicycle.

// Write a function which returns the maximum possible total speed, or the minimum possible total speed, of all the tandem bicycle pairs based on the input parameter "fastest".
// If fastest = true, the function should return the maximum possible total speed. If fastest = false, it should return the minimum total speed.

// "Total speed" is defined as the sum of the speeds of all the tandem bicycles being ridden by the pairs. For example, if there are 4 riders (2 riders of each shirt color),
// who have speeds of 1, 3, 4, 5, and if they are paired on bicycles as such [1, 4], [5, 3], then the total maximum speed is 4 + 5 = 9, and the total minimum speed would
// be pairing them as [5, 4], [3, 1] where is minimum total speed is 5 + 3 = 8.

// Sample Input:
// redShirtSpeeds = [5, 5, 3, 9, 2]
// blueShirtSpeeds = [3, 6, 7, 2, 1]
// fastest = true

// Sample Output:
// 32

// Solution 1:

// O(nlog(n)) due to sorting both arrays and simplifying other n time operations to nlog(n), where n equals the number of tandem bicycles
// O(1) space due to using provided arrays, sorting in place

function tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest) {
    redShirtSpeeds.sort((a, b) => a - b);
    blueShirtSpeeds.sort((a, b) => a - b);

    if (!fastest) {
        reverseArrayInPlace(redShirtSpeeds);
    }

    let totalSpeed = 0;

    for (let idx = 0; idx < redShirtSpeeds.length; idx++) {
        let rider1 = redShirtSpeeds[idx];
        let rider2 = blueShirtSpeeds[blueShirtSpeeds.length - idx - 1];
        totalSpeed += Math.max(rider1, rider2);
    }
    return totalSpeed;

}

function reverseArrayInPlace(array) {
    let start = 0;
    let end = array.length - 1;

    while (start < end) {
        let temp = array[start];
        array[start] = array[end];
        array[end] = temp;
        start++
        end--;
    }
}

// Solution 2:

// does the same thing, but uses ternary operator to determine how to iterate through one of the sets depending on "fastest" variable

// O(nlog(n)) due to sorting both arrays and simplifying other n time operations to nlog(n), where n equals the number of tandem bicycles
// O(1) space due to using provided arrays, sorting in place

function tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest) {
    redShirtSpeeds.sort((a, b) => a - b);
    blueShirtSpeeds.sort((a, b) => a - b);

    let totalSpeed = 0;
    for (let idx = 0; idx < redShirtSpeeds.length; idx++) {
        let rider1 = redShirtSpeeds[idx];
        let rider2 = blueShirtSpeeds[fastest ? blueShirtSpeeds.length - idx - 1 : idx];
        totalSpeed += Math.max(rider1, rider2);
    }
    return totalSpeed;
}