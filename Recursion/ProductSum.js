// Write a function which takes in a "special" array and returns its product sum.

// A "special" array is a non-empty array which contains either integers, or other "special" arrays. The product sum of a "special"
// array is the sum of its elements, where "special" arrays inside the main array are summed themselves, then multiplied by their level of depth, ie
// how many array wrappers there are around the values.

// The depth of a "special" array is how far nested it is. For instance, the depth of [] is 1, the depth of the inner array in [[]] is 2, and the 
// depth of the inner array in [[[]]] is 3.

// Therefore, the product sum of [x, y] is x + y, the product sume of [x, [y, z]] is x + (2 * (y + z)), and the product sum of
// [x, [y, [z]]] is x + (2 * (y + 3z)).

// Solution 1:

// O(n) time where n is the total number of elements in the array, including sub-elements
// O(d) space where d is the greatest depth of "special" arrays in the input array

function productSum(array, multiplier = 1) {
    let sum = 0;

    for (const element of array) {
        if (Array.isArray(element)) {
            sum += productSum(element, multiplier + 1);
        } else {
            sum += element;
        }
    }

    return sum * multiplier;
}