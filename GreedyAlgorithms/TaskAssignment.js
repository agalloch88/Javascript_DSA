// The problem presents an integer k, which represents a number of workers, and an array of positive integers representing durations of taks which must be completed by
// the k workers. Specifically, each worker must complete two unique tasks, and can only work on one task at a time. The number of tasks will always
// be equal to 2k, such that each worker always has exactly two tasks to complete. All tasks are independent of one another, and can be performed in any order.
// Workers will complete their assigned tasks in parallel, and the time taken to complete all tasks will be equal to the time taken to complete the longest
// pair of tasks (see sample output for explanation).

// Write a function that returns the optimal assignment of tasks to each worker such that the tasks are completed as fast as possible. The function should return
// a list of pairs, where each pair stores the indices of the tasks that are assigned to each worker. The pairs should be in the format [task1, task2], where the order
// of task1 and task2 does not matter. The function can return the pairs in any order, as well. If multiple optimal assignments exist, any correct answer is acceptable.

// Note that there will always be at least one worker, so k will always be greater than 0.

// Sample Input:
// k = 3
// tasks = [1, 3, 5, 3, 1, 4]

// Sample Output:
// [
// [0, 2], tasks[0] = 1, tasks[2] = 5, 1 + 5 = 6
// [4, 5], tasks[4] = 1, tasks[5] = 4, 1 + 4 = 5
// [1, 3], tasks[1] = 3, tasks[3] = 3, 3 + 3 = 6
// ]
// the fastest time to complete all tasks is 6

// Solution 1:

// iterative solution using JS object to store index locations, sorting input to optimize pairings

// O(nlog(n)) time due to sorting input and iterating
// O(n) space due to storing task pairs, sorted input, 2n simplifies to n

function taskAssignment(k, tasks) {
  // set up empty holder array for results
  let pairedTasks = [];
  // map task indices so can keep track of those, using helper function
  let taskDurationToIndices = getTaskDurationToIndices(tasks);
  // once indices are mapped, can sort the tasks to facilitate easier pairing
  let sortedTasks = [...tasks].sort((a, b) => a - b);
  // start iterating over the workers to assign optimal task pairs
  for (let idx = 0; idx < k; idx++) {
    // grab task duration at beginning of sortedTasks
    let task1Duration = sortedTasks[idx];
    // grab what index that should be from the mapping
    let indicesWithTask1Duration = taskDurationToIndices[task1Duration];
    // remove this index listing from list so it's not used again
    let task1Index = indicesWithTask1Duration.pop();
    // grab optimal pairing of task length from the end, do the same procedure for task 2
    let task2SortedIndex = tasks.length - 1 - idx;
    let task2Duration = sortedTasks[task2SortedIndex];
    let indicesWithTask2Duration = taskDurationToIndices[task2Duration];
    let task2Index = indicesWithTask2Duration.pop();
    // push this task pairing into holder array
    pairedTasks.push([task1Index, task2Index]);
  }
  // return the array of pairings
  return pairedTasks;
}

function getTaskDurationToIndices(tasks) {
  // set up empty JS object to hold task values: [indices, here]
  let taskDurationToIndices = {};
  // iterate over tasks
  for (let idx = 0; idx < tasks.length; idx++) {
    // grab value at given index for task duration
    let taskDuration = tasks[idx];
    // if this duration already exists in holder JS object, push this newest index to that key
    if (taskDuration in taskDurationToIndices) {
      taskDurationToIndices[taskDuration].push(idx);
      // otherwise, create this new key:value with duration: [found index, here]
    } else {
      taskDurationToIndices[taskDuration] = [idx];
    }
  }
  // return this helper object
  return taskDurationToIndices;
}

// Solution 2:

// iterative solution simplifying task of building task duration/ind valueex object with map, then using two pointers to grab and push pairs to results

// O(nlog(n)) time due to sort, map is O(n) so simplifies to nlog(n)
// O(n) space due to map and new results array, 2n simplifies to n

function taskAssignment2(k, tasks) {
  let formattedTasks = tasks.map((value, index) => ({ value, index }));
  formattedTasks.sort((a, b) => a.value - b.value);

  let results = [];
  let start = 0;
  let end = formattedTasks.length - 1;

  while (start <= end) {
    results.push([formattedTasks[start].index, formattedTasks[end].index]);
    start++;
    end--;
  }

  return results;
}
