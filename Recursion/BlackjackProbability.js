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