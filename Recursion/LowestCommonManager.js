// The problem presents three inputs, all of which are instances of an OrgChart class which have a directReports property pointing to their direct reports. The first input
// is the top manager in an organizational chart, which would be the only instance in the organization which is not any other person's direct report. The other two inputs
// are reports in the organizational chart. The two reports are guaranteed to be distinct in the context of the problem.

// Write a functiuon which returns the lowest common manager to the two reports.

// Sample Input:
// From the org chart below:
// topManager = Node A
// reportOne = Node E
// reportTwo = Node I

//          A
//         / \
//        B   C
//       / \ / \
//      D  E F  G
//     / \
//    H   I

// Sample Output:
// Node B

// Solution 1:

class OrgChart {
    constructor(name) {
        this.name = name;
        this.directReports = [];
    }
}

function lowestCommonManager(topManager, reportOne, reportTwo) {
    return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager;
}

function getOrgInfo(manager, reportOne, reportTwo) {
    let numImportantReports = 0;

    for (let directReport of manager.directReports) {
        let orgInfo = getOrgInfo(directReport, reportOne, reportTwo);

        if (!!orgInfo.lowestCommonManager) {
            return orgInfo;
        }

        numImportantReports += orgInfo.numImportantReports;
    }

    if (manager === reportOne || manager === reportTwo) {
        numImportantReports++;
    }

    let lowestCommonManager = numImportantReports === 2 ? manager : null;
    return {lowestCommonManager, numImportantReports};
}