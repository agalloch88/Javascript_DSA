// The problem presents recently starting in the field of freelance softweare development. There are a variety of job opportunities on offer. Each job has a deadline, meaning there is no value in completing
// work related to the specific job after the deadline. Additionally, each job has an associated payment due, representing the profit for completing the specific job. Given these details, write a function
// which returns the maximum profit which can be obtained in a 7-day period.

// Each job will take one full day to complete, and the deadline will be given as the number of days left to complete the job. For example, if a job has a deadline of 1, then it can only be completed if it
// is the first job worked; if a job has a deadline of 2, then it could be started on the first or second day.

// Note that there is no requirement to complete all the jobs presented. Only one job can be worked on at a time, meaning that, in some scenarios, it will not be possible to complete all jobs.

// Sample Input:

// jobs = [
//  {"deadline": 1, "payment": 1},
//  {"deadline": 2, "payment": 1},
//  {"deadline": 2, "payment": 2}
// ]

// Sample Output:

// 3
// jobs[0] would be started and completed first, followed by jobs[2]. jobs[1] is not completed in favor of jobs[2]'s higher payment.

// Solution 1:

// unique solution sorting jobs according to payment to maximize profit

// O(n log(n)) time due to sort of jobs by payment amount
// O(1) space since only storing a couple variables, 7n converges to n

function optimalFreelancing(jobs) {
  // initialize constant LENGTH_OF_WEEK and set to 7, since we are looking at the possibilities only within 7 days
  let LENGTH_OF_WEEK = 7;
  // initialize variable profit and set equal to 0, will use this to track the amount generated
  let profit = 0;
  // initialize variable timeline and set equal to a new array 7 indexes long, which corresponds to each day in a given week, and filled with false
  // when a suitable job has been found for a given day, will change boolean to true
  let timeline = new Array(LENGTH_OF_WEEK).fill(false);
  // sort the jobs array by payment amount, sorting the higher-paying jobs to the beginning of the array
  jobs.sort((jobA, jobB) => jobB.payment - jobA.payment);
  // iterate over every job in the jobs input
  for (let job of jobs) {
    // initialize variable maxTime, and set equal to the minimum of either the deadline of the current job, or the LENGTH_OF_WEEK constant
    // it's feasible there may be jobs with deadline of 14 or 20, for example, but for those jobs the max timeframe which should be considered is still 7
    let maxTime = Math.min(job.deadline, LENGTH_OF_WEEK);
    // check all the possibilities remaining for this particular job, starting at the absolute latest and working to day 1
    for (let time = maxTime - 1; time >= 0; time--) {
      // if the day is available for a job, then set the index in timeline to true, increment profit by this job's payment, and then break from the for loop
      if (timeline[time] === false) {
        timeline[time] = true;
        profit += job.payment;
        break;
      }
    }
  }
  // once every job is checked, return the final optimized profit total
  return profit;
}

// Solution 2:

// improved iterative solution reducing time complexity by not needinng to sort

// O(n) time due to checking all jobs in input
// O(1) space due to storing at max 7n jobs which converges to n

// main function which takes in the jobs input array of objects
function optimalFreelancing2(jobs) {
  // initialize variable earnings to track total for the week, and set to 0
  let earnings = 0;
  // initialize variable dayOfWork to track the limit of days, and set equal to 7
  let dayOfWork = 7;
  // initialize variable completedJobs and set equal to a new WeakSet, which can only hold unique objects
  let completedJobs = new WeakSet();
  // continue looping so long as there are available days of work remaining
  while (dayOfWork > 0) {
    // increment earnings by the returned value of helper function, which receives the jobs input, decremented dayOfWork variable, and the completedJobs WeakSet
    earnings += findBestJobProfitForDay(jobs, dayOfWork--, completedJobs);
  }
  // once while loop breaks, all days are filled, so return the final earnings total
  return earnings;
}

// helper function to determine the optimal job to take based on profit, which takes in jobs input, dayNumber, and completedJobs
function findBestJobProfitForDay(jobs, dayNumber, completedJobs) {
  // initialize variable bestJob and set equal to null
  let bestJob = null;
  // iterate over every job in the jobs input
  jobs.forEach((job) => {
    // destructure every job into the payment deadline components
    let { payment, deadline } = job;
    // if completedJobs does NOT have the current job in it, AND the deadline of the given job is greater than or equal to the current dayNumber, AND the payment for the given job
    // is greater than the payment for bestJob or zero, then set bestJob equal to the current job
    if (
      !completedJobs.has(job) &&
      deadline >= dayNumber &&
      payment > (bestJob?.payment ?? 0)
    ) {
      bestJob = job;
    }
  });
  // if there is a bestJob then add the bestJob to the completedJobs WeakSet
  bestJob && completedJobs.add(bestJob);
  // return the bestJob, if it exists, and it's payment, or 0 if bestJob is still null
  return bestJob?.payment ?? 0;
}
