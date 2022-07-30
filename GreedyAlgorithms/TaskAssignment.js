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

function taskAssignment(k, tasks) {
    let pairedTasks = [];
    let taskDurationToIndices = getTaskDurationToIndices(tasks);

    let sortedTasks = [...tasks].sort((a, b) => a - b);

    for (let idx = 0; idx < k; idx++) {
        let task1Duration = sortedTasks[idx];
        let indicesWithTask1Duration = taskDurationToIndices[task1Duration];
        let task1Index = indicesWithTask1Duration.pop();

        let task2SortedIndex = tasks.length - 1 - idx;
        let task2Duration = sortedTasks[task2SortedIndex];
        let indicesWithTask2Duration = taskDurationToIndices[task2Duration];
        let task2Index = indicesWithTask2Duration.pop();

        pairedTasks.push([task1Index, task2Index]);
    }

    return pairedTasks;
}

function getTaskDurationToIndices(tasks) {
    let taskDurationToIndices = {};

    for (let idx = 0; idx < tasks.length; idx++) {
        let taskDuration = tasks[idx];
        if (taskDuration in taskDurationToIndices) {
            taskDurationToIndices[taskDuration].push(idx);
        } else {
            taskDurationToIndices[taskDuration] = [idx];
        }
    }

    return taskDurationToIndices;
}