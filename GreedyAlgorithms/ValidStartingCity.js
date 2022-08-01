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
        for (let currentCityIdx = startCityIdx; currentCityIdx < startCityIdx + numberOfCities; currentCityIdx++) {
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
    let numberOfCities = distances.length;
    let milesRemaining = 0;

    let indexOfStartingCityCandidate = 0;
    let milesRemainingAtStartingCityCandidate = 0;

    for (let cityIdx = 1; cityIdx < numberOfCities; cityIdx++) {
        let distanceFromPreviousCity = distances[cityIdx - 1];
        let fuelFromPreviousCity = fuel[cityIdx - 1];
        milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity;

        if (milesRemaining < milesRemainingAtStartingCityCandidate) {
            milesRemainingAtStartingCityCandidate = milesRemaining;
            indexOfStartingCityCandidate = cityIdx;
        }
    }
    return indexOfStartingCityCandidate;
}