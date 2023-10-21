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

function optimalAssemblyLine(stepDurations, numStations) {
    let left = Math.max(...stepDurations);
    let right = stepDurations.reduce((a, b) => a + b);
    let maxStationDuration = Infinity;

    while (left <= right) {
        let potentialMaxStationDuration = Math.floor((left + right) / 2);

        if (isPotentialSolution(stepDurations, numStations, potentialMaxStationDuration)) {
            maxStationDuration = potentialMaxStationDuration;
            right = potentialMaxStationDuration - 1;
        } else {
            left = potentialMaxStationDuration + 1;
        }
    }
    return maxStationDuration;
}

function isPotentialSolution(stepDurations, numStations, potentialMaxStationDuration) {
    let stationsRequired = 1;
    let currentDuration = 0;

    for (let stepDuration of stepDurations) {
        if (currentDuration + stepDuration > potentialMaxStationDuration) {
            stationsRequired++;
            currentDuration = stepDuration;
        } else {
            currentDuration += stepDuration;
        }
    }

    return stationsRequired <= numStations;
}