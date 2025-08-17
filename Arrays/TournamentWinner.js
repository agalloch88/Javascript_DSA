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
const HOME_TEAM_WON = 1;

function tournamentWinner(competitions, results) {
  // initialize and set variable for lead team, starting with empty string as placeholder
  let currentBestTeam = '';
  const scores = { [currentBestTeam]: 0 };
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

// Solution 2:

// iterative solution to find the winner, update the scoreboard and then update the leader

// O(n) time where n is the number of competitions
// O(k) space where k is the number of teams

function tournamentWinner2(competitions, results) {
  // set up JS object to holder the leader's score and team name, and store in variable leader
  let leader = { score: -Infinity, name: '' };
  // set up empty JS object to serve as the scoreboard, and store in variable scoreboard
  let scoreboard = {};
  // iterate over all the competitions
  for (let i = 0; i < competitions.length; i++) {
    // ternary check to see if value in results at index i is equal to 0, and if so, then 1
    // should be stored in winnerIdx variable
    let winnerIdx = results[i] === 0 ? 1 : 0;
    // grab the value at i and the winnerIdx and store in variable winner
    let winner = competitions[i][winnerIdx];
    // if the value in winner is already in the scoreboard JS object, then
    // add 3 points to the existing score total
    if (winner in scoreboard) {
      scoreboard[winner] += 3;
      // if the value in winner is NOT already in the scoreboard JS object, then add it,
      // and assign the points to 3
    } else {
      scoreboard[winner] = 3;
    }
    // if the leader's score is smaller than the current winner's total in the scoreboard,
    // then set the leader's name to that of the current winner, and set the score
    // equal to the winner's score on the scoreboard
    if (leader.score < scoreboard[winner]) {
      leader.name = winner;
      leader.score = scoreboard[winner];
    }
  }
  // after iterating over every competition, return the name of the leader
  return leader.name;
}
