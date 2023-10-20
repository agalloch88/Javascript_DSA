// A company wishes to hire N interns to join one on N different teams. Each intern provides
// a ranking of their preferences for which teams they wish to join, and each team provides
// ranking of their preferences for which interns they prefer.

// Given these preferences, assign 1 intern to each team. The assignments should be "stable",
// meaning the there is no unmatched pair of an intern and a team such that both intern and
// that team would prefer they be matched with each other.

// In the case there are multiple valid stable matchings, the solution which is most optimal
// for the interns should be chosen (ie, every intern should match with the best possible
// team for them).

// The function should take in two 2-dimensional arrays, one for interns and one for teams.
// Each inner array represents a single itern or team's preferences, ranked from most to least
// preferable. These lists will always be of length N, with integers as elements. Each of these
// integers corresponds to the index of the team or intern being ranked. The function should
// return a 2-dimensional list of matchings in no particular order. Each matching should be
// in the format [internIndex, teamIndex].

// Sample Input:
// interns = [
//  [0, 1, 2],
//  [1, 0 2],
//  [1, 2, 0]
// ]

// teams = [
// [2, 1, 0],
// [1, 2, 0],
// [0, 2, 1]
// ]

// Sample Output:
// [
//  [0, 0],
//  [1, 1],
//  [2, 2]
// ]

// Solution 1:

// iterative solution using a stack to keep track of unassigned interns, and weighting intern selections
// to provide optimal team assignment

// O(n ^ 2) time due to nested for operations, and other n ^ 2 operations, converges to n ^ 2
// O(n ^ 2) space due to chosen interns JS object, map of n interns, array of n interns and other data strutures

function stableInternships(interns, teams) {
  // set up empty JS object and store in variable chosenInterns
  let chosenInterns = {};
  // map over the interns input and grab the intern numbers, meaning ultimately how many interns there are to place
  let freeInterns = interns.map((_, i) => i);
  // create a new array the same length as interns input and fill with 0's
  let currentInternChoices = new Array(interns.length).fill(0);
  // set up empty array which will hold a map of the team preferences
  let teamMaps = [];
  // iterate over every team in the teams input
  for (let team of teams) {
    // set up empty JS object and store in variable rank
    let rank = {};
    // call forEach on the current team and use parameters of internNum and the index (i)
    team.forEach((internNum, i) => {
      // set the internNum in rank equal to i
      rank[internNum] = i;
    });
    // push the ranking into the teamMaps array
    teamMaps.push(rank);
  }
  // while there are still items in the freeInterns stack, meaning interns to assign, keep looping
  while (freeInterns.length > 0) {
    // pop the top item off the freeInterns stack and store value in variable internNum
    let internNum = freeInterns.pop();
    // grab the value at internNum in the interns input, and store in variable intern
    let intern = interns[internNum];
    // grab value at internNum in currentInternChoices of intern, and store in variable teamPreference
    let teamPreference = intern[currentInternChoices[internNum]];
    // incremnent the value at internNum in currentInternChoices by 1
    currentInternChoices[internNum] += 1;
    // if the value of teamPreference is NOT in chosenInterns, execute below
    if (!(teamPreference in chosenInterns)) {
      // set the internNum equal to the value at teamPreference in chosenInterns, then continue
      chosenInterns[teamPreference] = internNum;
      continue;
    }
    // grab the value at teamPreference in chosenInterns, and store in variable previousIntern
    let previousIntern = chosenInterns[teamPreference];
    // grab the value at previousIntern teamPreference in teamMaps, and store in variable previousInternRank
    let previousInternRank = teamMaps[teamPreference][previousIntern];
    // grab the value at internNum teamPreference in teamMaps, and store in variable currentInternRank
    let currentInternRank = teamMaps[teamPreference][internNum];
    // if the currentInternRank is smaller than the previousInternRank, this means the
    // current intern is more desirable to the given team, so execute below
    if (currentInternRank < previousInternRank) {
      // push previousInterns into the freeInterns array
      freeInterns.push(previousIntern);
      // set the internNum equal to the value at teamPreference in chosenInterns
      chosenInterns[teamPreference] = internNum;
      // if the previousInternRank is instead greater than the currentInternRank, this
      // means the previous intern is more desirable to the team, so execute below
    } else {
      // push the internNum, which is the current intern, back into freeInterns array
      freeInterns.push(internNum);
    }
  }
  // need to now convert the chosenInterns JS object into a two-dimensional array
  // grab the entries value of the chosenInterns JS object, and map over them using parameters
  // teamNum and internNum, setting the internNum as the first value in pair and the parsed
  // integer of teamNum as the second value in the pair
  let matches = Object.entries(chosenInterns).map(([teamNum, internNum]) => [
    internNum,
    parseInt(teamNum),
  ]);
  // return the matches, which could be one of many possible, correct combinations
  return matches;
}
