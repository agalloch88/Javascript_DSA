// The problem presents an integer k, which represents a number of workers, and an array of positive integers representing durations of taks which must be completed by
// the k workers. Specifically, each worker must complete two unique tasks, and can only work on one task at a time. The number of tasks will always
// be equal to 2k, such that each worker always has exactly two tasks to complete. All tasks are independent of one another, and can be performed in any order.
// Workers will complete their assigned tasks in parallel, and the time taken to complete all tasks will be equal to the time taken to complete the longest
// pair of tasks (see sample output for explanation).

// Write a function that returns the optimal assignment of tasks to each worker such that the tasks are completed as fast as possible. The function should return
// a list of pairs, where each pair stores the indices of the tasks that are assigned to each worker. The pairs should be in the format [task1, task2], where the order
// of task1 and task2 does not matter. The function can return the pairs in any order, as well. If multiple optimal assignments exist, any correct answer is acceptable.

// Note that there will always be at least one worker, so k will always be greater than 0;