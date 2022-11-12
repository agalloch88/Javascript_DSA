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

function minRewards(scores) {
    let rewards = scores.map(_ => 1);

    for (let i = 1; i < scores.length; i++) {
        let j = i - 1;

        if (scores[i] > scores[j]) {
            rewards[i] = rewards[j] + 1;
        } else {
            while (j >= 0 && scores[j] > scores[j + 1]) {
                rewards[j] = Math.max(rewards[j], rewards[j + 1] + 1);
                j--;
            }
        }
    }
    return rewards.reduce((a, b) => a + b);
}