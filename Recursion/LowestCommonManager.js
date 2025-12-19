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

// recursive solution using DFS and going as deep as possible into org chart, then returning when any reports found

// O(n) time, where n is total number of people in org chart, due to recursively checking every node in org
// O(d) space, where d is the depth of the org chart, due to at most d calls on the call stack at any given time

// class for the OrgChart, where every node has a name and an array of direct reports underneath itself
class OrgChart {
  constructor(name) {
    this.name = name;
    this.directReports = [];
  }
}
// main function which takes in the topManager of the org, and the two reports to look for
function lowestCommonManager(topManager, reportOne, reportTwo) {
  // this function simply returns the result of a helper, specificially looking for the property of the lowestCommonManager
  return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager;
}
// helper function which takes in a specific manager, and the two reports to look for
function getOrgInfo(manager, reportOne, reportTwo) {
  // keep track of the number of reports found in each manager subtree, each time one is found then add one to this variable
  let numImportantReports = 0;
  // for every direct report this manager has in the diretReports array, do stuff
  for (let directReport of manager.directReports) {
    // base case
    // set results of recursive call equal to variable orgInfo
    let orgInfo = getOrgInfo(directReport, reportOne, reportTwo);

    if (!!orgInfo.lowestCommonManager) {
      return orgInfo;
    }
    // once a manager is found, increment numImportantReports by the current number of numImportantReports, then move on to the next directReport
    numImportantReports += orgInfo.numImportantReports;
  }
  // if the current manager in question is either of the two reports to look for, then incremet numImportantReports by one
  if (manager === reportOne || manager === reportTwo) {
    numImportantReports++;
  }
  // check if numImportantReports is equal to 2, in which case are done, if not, set lowestCommonManager equal to null, as it's not found yet
  let lowestCommonManager = numImportantReports === 2 ? manager : null;
  // return this function with both the lowestCommonManager and the current numImportantReports found
  return { lowestCommonManager, numImportantReports };
}

// Solution 2:

// solution utilizing a closure, which will stop searching as soon as the two reports are found

// O(n) time in worst case, where n is total number of people in org chart, due to potentially checking every node in org
// O(d) space, where d is the depth of the org chart, due to at most d calls on the call stack at any given time

// class for the OrgChart, where every node has a name and an array of direct reports underneath itself
class OrgChart2 {
  constructor(name) {
    this.name = name;
    this.directReports = [];
  }
}

function lowestCommonManager2(topManager, reportOne, reportTwo) {
  // set variable to equal null for now, will update once the LCM is found
  let lowestCommonManager = null;
  // set up closure here, which takes in the manager in question and the two reports
  let managerHelper = (manager, reportOne, reportTwo) => {
    // if the lowestCommonManager is found, return and exit the closure
    if (lowestCommonManager) {
      return 0;
    }
    // set the number of reports found to 0 and store in variable count
    let count = 0;
    // if the manager in question matches either of the reports, increment count by 1
    if (manager === reportOne || manager === reportTwo) {
      count++;
    }
    // for every report of the manager's directReports array, do stuff
    for (let report of manager.directReports) {
      // recursively increment count depending on the return result of the closure
      count += managerHelper(report, reportOne, reportTwo);
      // when count is 2 or greater, check for the LCM
      if (count >= 2) {
        // when count is at 2 or more, a LCM is found, so if it doesn't already have association, set LCM to equal the current manager
        if (!lowestCommonManager) {
          lowestCommonManager = manager;
        }
        // return the count now
        return count;
      }
    }
    // if made it through the for loop above, return the count
    return count;
  };
  // call the function here and execute the closure
  managerHelper(topManager, reportOne, reportTwo);
  // once the closure finishes, should now have the LCM, so return it
  return lowestCommonManager;
}
