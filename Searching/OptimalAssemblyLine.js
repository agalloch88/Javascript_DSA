// One of the most efficient ways to run a factory is to use an assembly line, with multiple stations performing different assembling steps simultaneously in order to save time.
// But, an assembly line is only as fast as its slowest station/step. For example, if an assembly line has 100 different steps performed by 100 different stations, where
// 99 steps taking 1 minute each to complete, and the last remaining 1 step taking 1 hour to complete, the entire 100-step assembly line is dramatically slowed down by the
// 1-hour-long step.

// Write a function which takes in a non-empty array of positive integers, called stepDurations, and a positive integer, numStations. The input array of integers, stepDurations, represents
// the times that the various steps in an assembly process take, and the input integer numStations represents the number of stations that this assembly process has access to. For this
// particular assembly process, a single station can perform multiple steps, so long as these steps are performed in order. This means a single station can perform multiple steps whose
// times appear consectuviely in the stepDurations array. The function should return the longest duration of a single station in the assembly line post-optimization,
// meaning once the slowest station/step has been minimized.

// For the purposes of the problem, assume that there will never be more stations than steps.

// Sample Input:

// stepDurations = [15, 15, 30, 30, 45]
// numStations = 3

// Sample Output:

// 60
// Station 1 does steps 0 and 1, Station 2 does steps 2 and 3, Station 3 does step 4

// Solution 1:

// solution employing binary search on the range of potential values for step durations to find optimala split for stations

// O(n * log(m)) time, when n is the length of the stepDurations input, and m is the sum of all the values in stepDurations, since using binaray search to find the split over m
// stations for the n steps
// O(1) space since not using any extra data structures and storing only a few values

// main function which takes in the stepDurations array and the numStations integer
function optimalAssemblyLine(stepDurations, numStations) {
  // initialize variable left to set the left bound of binary search, and initialize it to be the max of the value within the spread stepDurations array
  // this will essentially serve as the lowest possible value for a station duration
  let left = Math.max(...stepDurations);
  // initialize variable right to set the right bound of binary serach, and initialize it to be the reduced value of the stepDurations array, or the potential max value if all
  // steps were performed by a single station
  let right = stepDurations.reduce((a, b) => a + b);
  // initialize variable maxStationDuration, and set to infinity such that any value is lower
  let maxStationDuration = Infinity;

  // loop so long as the left bound is less than or equal to the right bound
  while (left <= right) {
    // initialize variable potentialMaxStationDuration, and set equal to the midpoint between left and right bounds, sos the floored value of left plus right divided by 2
    let potentialMaxStationDuration = Math.floor((left + right) / 2);

    // check whether the potentialMaxStationDuration is a possible answer by calling helper function isPotentialSolution, passing in initial two inputs and the midpoint
    if (
      isPotentialSolution(
        stepDurations,
        numStations,
        potentialMaxStationDuration,
      )
    ) {
      // since this is a potential solution, set maxStationDuration equal to the potentialMaxStationDuration for now
      maxStationDuration = potentialMaxStationDuration;
      // set the right bound equal to the value immediately to the left of potentialMaxStationDuration to check again, excluding the values to the right
      right = potentialMaxStationDuration - 1;
      // otherwise, set left bound equal to the value immediately to the right of potentialMaxStationDuration to check again, excluding the values to the left
    } else {
      left = potentialMaxStationDuration + 1;
    }
  }

  // once while loop breaks, return the current value for maxStationDuration as the answer
  return maxStationDuration;
}

// helper function to determine whether potentialMaxStationDuration is a potential solution to the answer
function isPotentialSolution(
  stepDurations,
  numStations,
  potentialMaxStationDuration,
) {
  // initialize variable stationsRequired, and set to 1 at the outset
  let stationsRequired = 1;
  // initialize variable currentDuration, and set to 0 at the outset
  let currentDuration = 0;

  // loop over every step in the stepDurations input array
  for (let stepDuration of stepDurations) {
    // check whether the value of the currentDuration plus the current stepDuration is greater than the potentialMaxStationDuration, and if so, execute below
    if (currentDuration + stepDuration > potentialMaxStationDuration) {
      // if entering this block, need more than 1 station to complete, so increment stationsRequired by 1 and set the currentDuration equal to the stepDuration
      stationsRequired++;
      currentDuration = stepDuration;
      // otherwise, if entering this block, can potentially solve the problem with only the current number of stations, so add the stepDuration to the currentDuration to log that time
    } else {
      currentDuration += stepDuration;
    }
  }

  // once every step is checked, return a boolean value for the check of whether stationsRequired is less than or equal to the numStations value for use in main function
  return stationsRequired <= numStations;
}
