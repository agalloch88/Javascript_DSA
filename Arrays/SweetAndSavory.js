// Imagine hosting an event at a food festival, and wanting to showcase the best possible pairing of two dishes from the festival which compliment the other's flavor profile.

// Each dish has a flavor profile represented by an integer. A negative integer means a dish is sweet, while a positive integer means a dish is savory. The absolute value of a given integer represents
// the intensity of that flavor profile. For example, a flavor profile of -3 is slightly sweet, one of -10 is extremely sweet, one of 2 is mildly savory, and one of 8 is significantly rich and savory.

// The problem presents an array of these dishes, and a target combined flavor profile. Write a function which returns the best possible pairing of two dishes (meaning, a pairing with a total flavor profile
// closest to the target). Note that the answer pairing must include one sweet and one savory dish. A further restriction is to not have the pairing be too savory, so the pairing should never be more savory than
// the target flavor profile.

// All dishes will have a positive (savory) or negative (sweet) flavor profile, and there are no dishes with a 0 value. For simplicity, assume that there will be at most one best solution. If a valid pairing/solution
// does not exist, the function should return [0, 0]. The returned array should be sorted, meaning the sweet dish should always come first.

// Sample Input #1:

// dishes = [-3, -5, 1, 7]
// target = 8

// Sample Output #1:

// [-3, 7]
// the combined flavor profile is 4, without going over the savory limit of 8

// Sample Input #2:

// dishes = [3, 5, 7, 2, 6, 8, 1]
// target = 10

// Sample Output #2:

// [0, 0]
// there are no sweet dishes, so there can be no valid pairing

// Sample Input #3:

// dishes = [2, 5, -4, -7, 12, 100, -25]
// target = -20

// Sample Output #3:

// [-25, 5]
// the pairing gets an exact combined profile of -20, the target

// Solution 1:

// iterative solution breaking sweet and savory into their own sorted arrays, then using two pointers to adjust values to get as close as possible to target
// while minding constraints on savoriness of pairing

// O(n log(n)) time due to sorting arrays, as that is best possible time complexity when using sort
// O(n) space due to storing n dishes across two new arrays

function sweetAndSavory(dishes, target) {
  // filter the dishes input into variables sweetDishes and savoryDishes, filtering for negative (sweet) and positive (savory) numbers, and sort them respectively in their new arrays
  let sweetDishes = dishes.filter((dish) => dish < 0).sort((a, b) => b - a);
  let savoryDishes = dishes.filter((dish) => dish > 0).sort((a, b) => a - b);
  // initialize variable bestPair and set to [0, 0] in case no new bestPair is found, so can return this
  let bestPair = [0, 0];
  // initialize variable bestDifference and set equal to Infinity, such that any value will be lower at first check and this may be updated easily
  let bestDifference = Infinity;
  // initialize variables sweetIndex and savoryIndex and set both equal to zero to start iterating at beginning of each array
  let sweetIndex = 0;
  let savoryIndex = 0;
  // keep looping so long as both index pointers are in bounds of their respective arrays
  // in the case of no dishes of either type, will skip directly to returning bestPair initialized above
  while (sweetIndex < sweetDishes.length && savoryIndex < savoryDishes.length) {
    // initialize variable currentSum and set equal to the sum of value at sweetIndex in sweetDishes plus value at savoryIndex in savoryDishes
    let currentSum = sweetDishes[sweetIndex] + savoryDishes[savoryIndex];
    // if the currentSum is less than or equal to the target, need to find the gap so can determine which pointer should be adjusted to get closer to target
    if (currentSum <= target) {
      // initialize variable currentDifference and set equal to the difference between target value minus currentSum
      let currentDifference = target - currentSum;
      // if the value stored in currentDifference is smaller than the current value in bestDifference, found a better pairing, so execute below
      if (currentDifference < bestDifference) {
        // set bestDifference equal to currentDifference
        bestDifference = currentDifference;
        // update bestPair to be current sweetIndex value in sweetDishes and current savoryIndex value in savoryDishes
        bestPair = [sweetDishes[sweetIndex], savoryDishes[savoryIndex]];
      }
      // if currentSum is less than or equal to the target, need to add a larger positive value to close the gap, so increment savoryIndex by 1
      savoryIndex++;
      // if entering else block, must mean currentSum was larger than the target value, so need a larger negative value, so increment sweetIndex by 1
    } else {
      sweetIndex++;
    }
  }
  // once while loop breaks, should have the best pairing stored in bestPair, so return bestPair
  return bestPair;
}
