// Imagine an algo tournament taking place in which teams of programmers compete to solve problems
// as quickly as possible. Teams compete in a round-robin compeititon, where each teams faces every other
// team at least once. Only two teams compete at a time, and for each competition, one team
// is deemed the loser, and the other the winner. There are no ties. A team receives three points if it wins,
// and 0 points if it loses. The winner of the tournament is the team with the highest total number of points.

// Given an array of pairs representing the teams which competed against each other, and another array containing the results of each round,
// write a function that returns the winner of the tournament. The input arrays are named "competitions" and "results", respectively.
// The competitions array has elements in the form of [homeTeam, awayTeam], where each team is a string of at most 30 chars. The
// results array contains information about the winner of each corresponding competition in the competitions array.
// Specifically, results[i] denotes the winner of competitions[i], where a 1 in the results array means that the home team in the corresponding
// competition won, and a 0 means the away team won.

// It is guaranteed that exactly one team will win the tournament, and that each team will compete against all other teams exactly once.
// It is also guaranteed that the tournament will always have at least two teams.

// Sample input:
// competitions = [
//    ["HTML", "C#"],
//    ["C#", "Python"],
//    ["Python", "HTML"],
// ]
// results = [0, 0, 1]

// Sample output:
// "Python"