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

// Solution 2:

// iterative solution making use of local min/max peak/valley concept to figure out the greatest and smallest values, then expanding from those min values to update surroundings

// O(n) time due to iterating over all values in scores input
// O(n) space due to storing new rewards array

function minRewards(scores) {
    // create copy of scores array and map over, inserting 1 for each value as this is the minimum reward any student receives, store in variable rewards
    let rewards = scores.map(_ => 1);
    // call helper function and pass in scores array, store return value in variable localMinIdxs
    let localMinIdxs = getLocalMinIdxs(scores);
    // iterate over every value in the localMinIdxs
    for (let localMinIdx of localMinIdxs) {
        // for every localMinIdx in the input, call the helper function and pass in the current localMinIdx, the scores input, and the rewards holder array
        expandFromLocalMinIdx(localMinIdx, scores, rewards);
    }
    // return the sum of the reduced rewards array, which should be the total number of rewards the students earn
    return rewards.reduce((a, b) => a + b);
}
// helper function to find the min indexes/valleys in the input array
function getLocalMinIdxs(array) {
    // handle edge case if the input is a single value, return value at index 0
    if (array.length === 1) {
        return [0];
    }
    // set up empty array and store in variable localMinIdxs
    let localMinIdxs = [];
    // iterate over the input values
    for (let i = 0; i < array.length; i++) {
        // if at the beginning of the array and the value at i is smaller than the value to the right of i, push i into the localMinIdxs array
        if (i === 0 && array[i] < array[i + 1]) {
            localMinIdxs.push(i);
        }
        // if at the end of the array and the value of i is smaller than the value to the left of i, push i into the localMinIdxs array
        if (i === array.length - 1 && array[i] < array[i - 1]) {
            localMinIdxs.push(i);
        }
        // if at the beginning or end of the array, continue along
        if (i === 0 || i === array.length - 1) {
            continue;
        }
        // if value in array at position i is smaller than the value to the right of i and the value in array at position i is smaller than the value to the left of i, push i into localMinIdxs
        if (array[i] < array[i + 1] && array[i] < array[i - 1]) {
            localMinIdxs.push(i);
        }
    }
    // once iterated over all inputs, return the localMinIdxs array
    return localMinIdxs;
}
// helper function to expand from the min indexes/valleys
function expandFromLocalMinIdx(localMinIdx, scores, rewards) {
    // take the passed in localMinIdx - 1 and store in variable leftIdx
    let leftIdx = localMinIdx - 1;
    // while the leftIdx value is greater than 0 and value at leftIdx in scores input array is greater than value to its right, execute below
    while (leftIdx >= 0 && scores[leftIdx] > scores[leftIdx + 1]) {
        // update the value at leftIdx in rewards array to equal the max between current value at leftIdx in rewards, or the value to i's right in rewards plus 1
        rewards[leftIdx] = Math.max(rewards[leftIdx], rewards[leftIdx + 1] + 1);
        // decrement leftIdx and keep going
        leftIdx--;
    }
    // take the passed in localMinIdx + 1 and store in variable rightIdx
    let rightIdx = localMinIdx + 1;
    // while the rightIdx value is less than length of the scores input and value at rightIdx in scores input array is greater than value to the left of rightIdx in scores input array, execute below
    while (rightIdx < scores.length && scores[rightIdx] > scores[rightIdx - 1]) {
        // since moving to the right, no need to do the max check, so set rightIdx in rewards equal to value of rightIdx -1 plus 1
        rewards[rightIdx] = rewards[rightIdx - 1] + 1;
        // increment rightIdx and keep going
        rightIdx++;
    }
}

// Solution 3:

// iterative solution simplifying the checking of neighbor values by starting from beginning and end

// O(n) time due to iterating over all n values in input, 2n converges to n
// O(n) space due to storing extra rewards array

function minRewards(scores) {
    // create copy of scores array and map over, inserting 1 for each value as this is the minimum reward any student receives, store in variable rewards
    let rewards = scores.map(_ => 1);
    // iterate over the scores input array, starting at index 1 as will compare to item directly behind i, and moving from left to right
    for (let i = 1; i < scores.length; i++) {
        // check to see if the value directly behind i is smaller than value at i, and if so, execute below
        if (scores[i] > scores[i - 1]) {
            // update value of rewards at position i to equal the value at i minus 1 + 1
            rewards[i] = rewards[i - 1] + 1;
        }
    }
    // iterate over the scores input array, starting at the second to last value as will compare to iterm directly following i, and moving from right to left
    for (let i = scores.length - 2; i >= 0; i--) {
        // check to see if the value directly after i is smaller than the value at i, and if so, execute below
        if (scores[i] > scores[i + 1]) {
            // set value of position i in rewards equal to the maximum between value at i currently in rewards or the value at i plus 1 + 1
            rewards[i] = Math.max(rewards[i], rewards[i + 1] + 1);
        }
    }
    // return the reduced rewards array, which should sum up to the necessary rewards
    return rewards.reduce((a, b) => a + b);
}