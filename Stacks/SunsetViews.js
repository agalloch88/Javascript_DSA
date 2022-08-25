// Given an array of buildings and a direction which all the buildings face, return an array of the indices of the buildings which can see the sunset.

// A building can see the sunset if it's strictly taller than all the buildings which come after the given building in the direction which it faces.

// The input array named buildings contains positive, non-zero integers representing the heights of the buildings. A building at index i thus has a height 
// denoted by buildings[i]. All of the buildings face the same direction, and this direction is either east or west, denoted by the input string named direction,
// which will always be equal to 'EAST' or 'WEST'. In relation to the input array, the direction may be interpreted as right for east, and left for west.

// Important note: the indices in the output array should be sorted in ascending order.

// Sample Input 1:
// buildings = [3, 5, 4, 4, 3, 1, 3, 2]
// direction = 'EAST'

// Sample Output 1:
// [1, 2, 6, 7]

// Sample Input 2:
// buildings = [3, 5, 4, 4, 3, 1, 3, 2]
// direction = 'WEST'

// Sample Output 2:
// [0, 1]
// Same input as Sample 1, but the direction is reversed

// Solution 1: