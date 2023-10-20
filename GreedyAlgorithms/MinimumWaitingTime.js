// You're given a non-empty array of positive integers representing the amounts of time specific queries take to execute. Only one query may execute at a time,
// but the queries may execute in any order.

// A query's waiting time is defined as the amount of time the query must wait before execution starts. In other words, if a query executes second, it's waiting
// time is the duration of the first query. If a query executes third, then its waiting time is the sum of the durations of the first two queries.

// Write a function which returns the minimum amount of total waiting time for all the queries. For example, if given the queries of durations [1, 4, 5],
// then the total waiting time if the queries execute in the order of [5, 1, 4] would be 0 + 5 + (5 + 1) = 11. The first query of duration 5 would execute immediately,
// so its waiting time would be 0, the second query has a duration of 1 and would wait 5 seconds (the duration of the first query) to execute, and the last
// query would wait the duration of query 1 + query 2 before execution.

// For this problem, mutation of the input array is allowed.

// Sample Input:
// queries = [3, 2, 1, 2, 6]

// Sample Output:
// 17

// Solution 1:

// iterative solution sorting inputs, then finding optimal order

// O(nlog(n)) time due to sorting input array and iterating through input
// O(1) space due to mutating input array, no extra data structure used

function minimumWaitingTime(queries) {
  // sort the queries in ascending order
  queries.sort((a, b) => a - b);
  // initialize variable totalWaitingTime, and set equal to 0 at outset
  let totalWaitingTime = 0;

  // iterate over all queries in input array
  for (let idx = 0; idx < queries.length; idx++) {
    // initialize variable duration, and set equal to the value in queries input at current idx
    let duration = queries[idx];
    // initialize variable queriesLeft, and set equal to calculation of remaining queries minus current idx plus 1
    let queriesLeft = queries.length - (idx + 1);
    // increment the totalWaitingTime by the current value of duration multiplied by the value of queriesLeft
    totalWaitingTime += duration * queriesLeft;
  }
  // once all inputs checked, return the cumulative value of totalingWaitingTime
  return totalWaitingTime;
}
