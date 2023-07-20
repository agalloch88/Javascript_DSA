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