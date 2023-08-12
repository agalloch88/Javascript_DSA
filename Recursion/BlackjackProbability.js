// In the card game game of Blackjack, the dealer (who works for the house) must draw cards until the sum of the value of the dealer's cards is greater than, or equal to, a target value minus 4.
// For example, traditional games of Blackjack use a target value of 21, so the dealer must draw cards until their total is greater than, or equal to, 17. At this point, they stop drawing cards
// (also called the dealer taking a "stand"). If the dealer draws a card which brings the dealer's total above the target value (meaning above 21 in traditional Blackjack), then the dealer loses
// the hand (also known as a "bust").

// Naturally, when a dealer is drawing cards, the dealer can either end up standing or busting, and this is entirely dependent on the luck of the dealer's card draw.

// Write a function which takes in a target value, as well as a dealer's startingHand value, and which returns the probability that the dealer will bust (meaning the dealer will go over the target before standing).
// The target value will always be a positive integer, and the startingHand value will always be a positive integer which is less than or equal to the target value.

// For simplicity, assume that the dealer has an infinite deck of cards, and that each card has a value between 1 and 10 (inclusive). The likelihood of drawing a card of any value is always the
// same, regardless of any previous draws.

// The solution should round the return probability to three decimal places, and to the nearest value. For example, a probability of 0.314159 would round to 0.314, while a probability of 0.1337 would round to 0.134.

// Sample Input:

// target = 21
// startingHand = 15

// Sample Output:

// 0.45
// drawing cards 2-6 would result in the dealer standing
// drawing cards 7-10 would result in the dealer busting
// drawing a 1 would result in a total of 16, meaning the dealer must keep drawing
// drawing with a 16 results in a 0.5 possibility of busting, as 6-10 all result in busts
// the overall probability of busting is 0.4 + (0.1 * 0.5), read as the probability of busting on the first draw plus the possibility of busting on the second draw

// Solution 1:

// recursive solution checking for bust or draw conditions and recursively calculating probability based on changing hand values

// O(t - s) time, where t is the target value and s is the startingHand value
// O(t - s) space due to storing memo currentHand values and recursive calls on call stack

// main function, which takes in the target and startingHand values
function blackjackProbability(target, startingHand) {
    // initialize variable memo, and set equal to an empty JS object
    let memo = {};
    // return a call to helper function, passing in the startingHand, target, and running memo object values
    // use toFixed to round this calculation to three decimal places, and use parseFloat to convert the string to a floating point number before returning
    return parseFloat(calculateProbability(startingHand, target, memo).toFixed(3));
}
// helper function which handles the calculations, taking in the currentHand, which on first fun is the startingHand, a target value, and the memo object
function calculateProbability(currentHand, target, memo) {
    // check for currentHand value in the memo object, and if it exists, return the value stored at currentHand in memo object
    if (currentHand in memo) {
        return memo[currentHand];
    }
    // check whether currentHand total is larger than the target
    // if so, the dealer has busted, so the probability is 100%, so return 1
    if (currentHand > target) {
        return 1;
    }
    // check whether the value of currentHand plus 4 is greater than or equal to the target
    // if so, this is a situation where the dealer should stand and not draw again, meaning the probability of busting is 0%, so return 0
    if (currentHand + 4 >= target) {
        return 0;
    }
    // initialize variable totalProbability, and set equal to 0 at the outset
    let totalProbability = 0;
    // iterate over drawnCard values, starting at 1 but not going over 10
    for (let drawnCard = 1; drawnCard <= 10; drawnCard++) {
        // update totalProbability by 0.1 multiplied by a recursive call to calculateProbability, passing in currentHand plus the current drawnCard, the target, and the memo object
        totalProbability += 0.1 * calculateProbability(currentHand + drawnCard, target, memo);
    }
    // set the value of currentHand in memo equal to the totalProbability calculated in for loop above
    memo[currentHand] = totalProbability;
    // return totalProbability to use in main function and recursive calls
    return totalProbability;
}