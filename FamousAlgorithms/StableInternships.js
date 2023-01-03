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

function stableInternships(interns, teams) {
    let chosenInterns = {};
    let freeInterns = interns.map((_, i) => i);
    let currentInternChoices = new Array(interns.length).fill(0);

    let teamMaps = [];
    for (let team of teams) {
        let rank = {};
        team.forEach((internNum, i) => {
            rank[internNum] = i;
        });
        teamMaps.push(rank);
    }

    while (freeInterns.length > 0) {
        let internNum = freeInterns.pop();

        let intern = interns[internNum];
        let teamPreference = intern[currentInternChoices[internNum]];
        currentInternChoices[internNum] += 1;

        if (!(teamPreference in chosenInterns)) {
            chosenInterns[teamPreference] = internNum;
            continue;
        }

        let previousIntern = chosenInterns[teamPreference];
        let previousInternRank = teamMaps[teamPreference][previousIntern];
        let currentInternRank = teamMaps[teamPreference][internNum];

        if (currentInternRank < previousInternRank) {
            freeInterns.push(previousIntern);
            chosenInterns[teamPreference] = internNum;
        } else {
            freeInterns.push(internNum);
        }
    }

    let matches = Object.entries(chosenInterns).map(([teamNum, internNum]) => [
        internNum,
        parseInt(teamNum),
    ]);
    return matches;
}