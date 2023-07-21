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

function optimalFreelancing(jobs) {
    let LENGTH_OF_WEEK = 7;
    let profit = 0;
    let timeline = new Array(LENGTH_OF_WEEK).fill(false);
    jobs.sort((jobA, jobB) => jobB.payment - jobA.payment);

    for (let job of jobs) {
        let maxTime = Math.min(job.deadline, LENGTH_OF_WEEK);

        for (let time = maxTime - 1; time >= 0; time--) {
            if (timeline[time] === false) {
                timeline[time] = true;
                profit += job.payment;
                break;
            }
        }
    }
    return profit;
}