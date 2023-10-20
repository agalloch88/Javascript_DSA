// Imagine there are a set of cities laid out in a circle, connected by a circular road running clockwise. Each city has a gas station which provides a certain number of gallons
// of fuel, and each city is a specific distance away from the next city.

// A driver will driver a car which has a specific number of miles it can driver per gallon of fuel (mpg), and the goal is to pick a starting city such that, by filling up the car
// with that city's fuel, the driver may drive to the next city, refuel, drive to the next city, and so on until returning back to the starting city with 0 or more gallons of fuel remaining.

// The city which the driver is able to leave from and return to with 0 or more gallons of fuel is called a valid starting city, and the presented problem
// guarantees that there will always be exactly one valid starting city.

// For the actual problem, there is an array of distances, such that city i is distances[i] away from city i + 1. Since the cities are connected via a circular road, the last city
// is connected to the first city. In other words, the last distance in the distances array is equal to the distance from the last city to the first city. Also provided is an array
// of fuel available at each city, where fuel[i] is equal to the fuel available at city i. The total amount of fuel available from all cities combined is exactly enough to travel to
// all of the cities. The car's fuel tank always starts out empty. The car has a positive integer value indicating the number of miles it can go per gallon (mpg), and the distances array
// will always contain at least two cities.

// Write a function to return the index of the valid starting city.

// Sample Input:
// distances = [5, 25, 15, 10, 15]
// fuel = [1, 2, 1, 0, 3]
// mpg = 10

// Sample Output:
// 4

// Solution 1:

// brute force, iterative solution traveling the loop from each city to find correct answer

// O(n^2) time due to nested for loops
// O(1) space due to only storing a few variables

function validStartingCity(distances, fuel, mpg) {
  // determine how many cities in loop
  let numberOfCities = distances.length;
  // iterate over each input city
  for (let startCityIdx = 0; startCityIdx < numberOfCities; startCityIdx++) {
    // the car always starts empty
    let milesRemaining = 0;
    // set the current city being checked
    for (
      let currentCityIdx = startCityIdx;
      currentCityIdx < startCityIdx + numberOfCities;
      currentCityIdx++
    ) {
      // if gas tank is more than empty, continue on
      if (milesRemaining < 0) {
        continue;
      }
      // handle case of last distances input wrapping around to first distances input
      let currentCityIdxWrapAround = currentCityIdx % numberOfCities;
      // grab available fuel count from current city, and the distance to next city, then update milesRemaining to new value
      let fuelFromCurrentCity = fuel[currentCityIdxWrapAround];
      let distanceToNextCity = distances[currentCityIdxWrapAround];
      milesRemaining += fuelFromCurrentCity * mpg - distanceToNextCity;
    }
    // if at a point where found a city where can start and end trip with enough gas, found answer so return index
    if (milesRemaining >= 0) {
      return startCityIdx;
    }
  }
  // should never hit this assuming correct inputs, but for safety
  return -1;
}

// Solution 2:

// iterative solution leveraging knowledge that in circular loop, the city with most negative milesRemaining value when visited must be the starting city

// O(n) time due to single pass over cities
// O(1) space duue to only storing a few variables

function validStartingCity(distances, fuel, mpg) {
  // grab how many cities from distances
  let numberOfCities = distances.length;
  // car always starts with empty tank
  let milesRemaining = 0;
  // set value for potential starting city, beginning with first one at index 0
  let indexOfStartingCityCandidate = 0;
  // set value for how many miles remain in gas tank
  let milesRemainingAtStartingCityCandidate = 0;
  // start iterating over cities in distances, beginning at index 1 so can reference previous value without index error
  for (let cityIdx = 1; cityIdx < numberOfCities; cityIdx++) {
    // grab value for the distance traveled from previous city
    let distanceFromPreviousCity = distances[cityIdx - 1];
    // grab value for how many gallons of fuel available in previous city
    let fuelFromPreviousCity = fuel[cityIdx - 1];
    // figure out how many milesRemaining after traveling to current city
    milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity;
    // if found value less than zero, potentially found starting city
    if (milesRemaining < milesRemainingAtStartingCityCandidate) {
      milesRemainingAtStartingCityCandidate = milesRemaining;
      indexOfStartingCityCandidate = cityIdx;
    }
  }
  // after checking all cities, will return city with most negative milesRemaining value, as mathmatically that's the starting point
  return indexOfStartingCityCandidate;
}

// Solution 3:

// simplified solution in same vein as Solution 2

// O(n) time due to single pass over cities in distances
// O(1) space due to only storing variables

function validStartingCity(distances, fuel, mpg) {
  let milesRemaining = 0;
  let candidateStartingCity = 0;

  for (let i = 1; i < distances.length; i++) {
    milesRemaining += fuel[i - 1] * mpg - distances[i - 1];
    if (milesRemaining < 0) {
      candidateStartingCity = i;
      milesRemaining = 0;
    }
  }
  return candidateStartingCity;
}
