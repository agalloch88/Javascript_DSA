// Imagine the secenario of a teacher who finishes grading the final exam in a class. There is
// a list of student scores on the final exam in a particular order (but not necessarily sorted)
// and there are rewards to five out to students. The rewards should be distributed fairly by
// giving the students arbitrary rewards following two rules:

// 1. All students must receive at least one reward.
// 2. Any given student must receive strictly more rewards than an adjacent student ( a student
// immediately to the left or the right in the list) with a lower score, and must receive strictly
// fewer rewards than an adjacent student with a higher score.

// Write a function which takes in a list of scores, and returns the minimum number of rewards
// which must go out to students to satisfy the two above rules.

// In the context of the problem, assume all students have different scores. In other words, the
// scores are all unique.

// Sample Input:
// scores = [8, 4, 2, 1, 3, 6, 7, 9, 5]

// Sample Output:
// 25
// the rewards go out as follows:
// [4, 3, 2, 1, 2, 3, 4, 5, 1]

// Solution 1:

// iterative solution using two loops to compare and update rewards array copy

// O(n^2) time due to nested loops
// O(n) space due to copy of input array

function minRewards(scores) {
    // map over the scores input array and fill all values with 1's to start, which is the minimum reward
    // for any student, and store in variable rewards
    let rewards = scores.map(_ => 1);
    // start iterating over the scores input starting at index 1
    for (let i = 1; i < scores.length; i++) {
        // set up other variable j to trail behind variable i
        let j = i - 1;
        // compare value of index i and j in scores input array, and if variable at i is greater, execute block below
        if (scores[i] > scores[j]) {
            // set value of value at index i in rewards copy equal to value of index j in rewards plus 1
            rewards[i] = rewards[j] + 1;
        // if value at index j is equal or greater than value at index i, execute block below
        } else {
            // start at the end of the scores array, and while value of j is greater than or equal
            // to 0 and value of index j in scores is greater than the value of index j plus 1, execute below
            while (j >= 0 && scores[j] > scores[j + 1]) {
                // set value at index j in rewards equal to the max between current value at index j in scores, and
                // index of j + 1 plus one
                rewards[j] = Math.max(rewards[j], rewards[j + 1] + 1);
                // decrement j until j reaches 0
                j--;
            }
        }
    }
    // return the reduced rewards array value which is the total number of rewards needed
    return rewards.reduce((a, b) => a + b);
}