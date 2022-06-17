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

// Solution 1:

// O(n) time where n is the number of competitions
// O(k) space where k is the number of teams

// set variable to use for results
const HOME_TEAM_WON = 1

function tournamentWinner(competitions, results) {
    // initialize and set variable for lead team, starting with empty string as placeholder
    let currentBestTeam = '';
    const scores = {[currentBestTeam]: 0};
    // loop over competitions array
    for (let idx = 0; idx < competitions.length; idx++) {
        // grab our result value for the specific competition from results array 
        const result = results[idx];
        // grab our competing teams for specific competition from competitions array
        const [homeTeam, awayTeam] = competitions[idx];
        // determine, using our HOME_TEAM_WON variable, who won competition via ternary operator
        const winningTeam = result === HOME_TEAM_WON ? homeTeam : awayTeam;
        // update scores object to reflect who won and add points
        updateScores(winningTeam, 3, scores);
        // check to see if new point additions changes who is currently leading, and if so, update team in the lead
        if (scores[winningTeam] > scores[currentBestTeam]) {
            currentBestTeam = winningTeam;
        }
    }
    return currentBestTeam;
}
// helper function to interact with scores object
function updateScores(team, points, scores) {
    // if the team was not encountered yet, create new entry in scores object
    if (!(team in scores)) {
        scores[team] = 0;
    }
    // update the team entry in scores object with points from competition
    scores[team] += points;
}