// The problem presents three nodes which are contained in the same Binary Search Tree: nodeOne, nodeTwo, and nodeThree. Write a function which returns a boolean representing whether
// one of nodeOne or nodeThree is an ancestor of nodeTwo, and the nother node is a descendant of nodeTwo. For example, if the function determines that nodeOne is an ancestor of nodeTwo,
// then it needs to check whether nodeThree is a descendant of nodeTwo. If the function determines nodeThree is an ancestor, then it needs to see if nodeOne is a descendant.

// A descendant of a node, N, is defined as a node contained in the tree rooted at node N. A node, N, is an ancestor of another node, M, if M is a desscendant of N.

// It is not guaranteed that nodeOne or nodeThree will be ancestors or descendants of nodeTwo, but it IS guaranteed that all three nodes will be unique and will never be
// None/null. In other words, the problem will provide valid input nodes.

// Each BST node has an integer value, a left child node, and a right child node. A node is said to be a valid BST node if, and only if, it satisfies the BST property:
// its value is strictly greater than the values of every node to its left, its value is less than or equal to the values of ever node to its right, and its children nodes
// are either valid BSt nodes themselves, or None/null.

// Sample Input:

// tree =       5
//             / \
//            2   7
//           / \ / \
//          1  4 6  8
//         /  /
//        0  3

// nodeOne = 5
// nodeTwo = 2
// nodeThree = 3

// Sample Output:

// true
// nodeOne is an ancestor of nodeTwo, and nodeThree is a descendant of nodeTwo

// Solution 1:

// recursive solution checking which node between one and three is descendant or ancestor

// O(h) time, where h is the height of the BST, due to potentially going h nodes deep on a descendant/ancestor check
// O(h) space, where h is the height of the BST, due to potentially having up to h calls on the call stack

// BST class, where every node has a value, and potentially a left/right pointer, or None/null
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function taking in the three nodes to validate
function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  // check whether nodeOne is a descendant of nodeTwo via calling helper function, and if so, execute below
  if (isDescendant(nodeTwo, nodeOne)) {
    // return a check via helper function as to whether, given nodeOne is a descendant of nodeTwo, whether nodeTwo is a descendant of nodeThree
    return isDescendant(nodeThree, nodeTwo);
  }

  // check whether nodeThree is a descendant of nodeTwo via calling helper function, and if so, execute below
  if (isDescendant(nodeTwo, nodeThree)) {
    // return a check via helper function as to whether, given nodeThree is a descendant of nodeTwo, whether nodeTwo is a descendant of nodeOne
    return isDescendant(nodeOne, nodeTwo);
  }

  // if neither if block returns anything, simply return false
  return false;
}
// helper function taking in two inputs: a given node, and a target node based on the given node
function isDescendant(node, target) {
  // base cases
  // check whether the given node is null, and if so, return false as a null node cannot be a descendant
  if (node === null) {
    return false;
  }

  // check whether the node and target are equal, and if so, return true
  if (node === target) {
    return true;
  }

  // return the result of a ternary checking whether the target.value is less than the node.value
  // due to BST properties, if the target value IS smaller than the node value, then will be looking in the left subtree
  // if not, then will be looking in the right subtree
  return target.value < node.value
    ? isDescendant(node.left, target)
    : isDescendant(node.right, target);
}

// Solution 2:

// another solution simplying the logic in helper to reduce space complexity by taking iterative approach in isDescendant()

// O(h) time, where h is the height of the BST, due to potentially searching h levels deep in BST
// O(1) space due to simplified logic in helper

// BST class, where every node has a value, and potentially a left/right pointer, or None/null
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function taking in the three nodes to validate
function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  // check via call to helper whether nodeOne is a descendant of nodeTwo, and if so, execute below
  if (isDescendant(nodeTwo, nodeOne)) {
    // return another call to helper to check whether nodeTwo is a descendant of nodeThree
    return isDescendant(nodeThree, nodeTwo);
  }

  // check via call to helper whether nodeThree is a descendant of nodeTwo, and if so, execute below
  if (isDescendant(nodeTwo, nodeThree)) {
    // return another call to helper to check whether nodeTwo is a descendant of nodeOne
    return isDescendant(nodeOne, nodeTwo);
  }

  // if neither blocks above return, then return false as cannot validate the three nodes
  return false;
}

// helper function taking in two inputs: a given node, and a target node based on the given node
function isDescendant(node, target) {
  // so long as node is not null AND the node is not equal to the target, keep looping
  while (node !== null && node !== target) {
    // set node equal to result from ternary checking whether value of target is less than value of node
    // if so, look to the left so set node equal to node.left
    // if not, look to the right so set node equal to node.right
    node = target.value < node.value ? node.left : node.right;
  }

  // once while loop exits, return a check of whether node is equal to target for use in main function
  return node === target;
}

// Solution 3:

// iterative solution searching for nodeTwo from nodeOne and nodeThree at the same time

// O(d) time, where d is the distance between nodeOne and nodeThree
// O(1) space since not using any recursive calls on the call stack

// BST class, where every node has a value, and potentially a left/right pointer, or None/null
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// main function taking in the three nodes to validate
function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  // initialize two variables, searchOne and searchTwo, and set them equal to nodeOne and nodeThree, respectively
  // these variables will keep track of where in the BST the searches are individually
  let searchOne = nodeOne;
  let searchTwo = nodeThree;

    // set up a while loop  to run indefinitely
  while (true) {
    // set up four break conditions
    // initialize variable foundThreeFromOne and set equal to a check of whether searchOne is equal to the value of nodeThree
    let foundThreeFromOne = searchOne === nodeThree;
    // initialize variable foundOneFromThree, and set equal to a check of whether searchTwo is equal to the value of nodeOne
    let foundOneFromThree = searchTwo === nodeOne;
    // initialize variable foundNodeTwo, and set equal to a check of whether searchOne is equal to the value of nodeTwo, meaning this node is found, OR whether searchTwo
    // is equal to nodeTwo, meaning again that this node is found
    let foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
    // initialize variable finishedSearching, and set equal to check of whether searchOne is null AND searchTwo is null, meaning have reached the last children nodes of subtrees
    let finishedSearching = searchOne === null && searchTwo === null;

    // check whether any of the break conditions are true, and if ANY condition is true, break out of the while loop
    if (
      foundThreeFromOne ||
      foundOneFromThree ||
      foundNodeTwo ||
      finishedSearching
    ) {
      break;
    }

    // check whether searchOne is any value except null, and if so, need to update the value of searchOne since not found the node yet
    if (searchOne !== null) {
      // set searchOne equal to a check of whether the value of searchOne is greater than the value of nodeTwo, and if so, set equal to the left value of searchOne
      // if not, set equal to the right value of searchOne
      // using the BST properties here to determine which subtree to continue down
      searchOne =
        searchOne.value > nodeTwo.value ? searchOne.left : searchOne.right;
    }

    // check whether searchTwo is any value except null, and if so, need to update the value of searchTwo since not found the node yet
    if (searchTwo !== null) {
      // set searchTwo equal to a check of whether the value of searchTwo is greater than the value of nodeTwo, and if so, set equal to the left value of searchTwo
      // if not, set equal to the right value of searchTwo
      // using the BST properties here to determine which subtree to continue down
      searchTwo =
        searchTwo.value > nodeTwo.value ? searchTwo.left : searchTwo.right;
    }
  }

  // back outside the while loop, do a couple checks
  // initialize variable foundNodeFromOther to check whether nodeOne was found from nodeThree or vice versa
  // in this instance, would need to return false, as cannot get a correct validation based on problem contraints
  let foundNodeFromOther = searchOne === nodeThree || searchTwo === nodeOne;
  // initialize variable foundNodeTwo, and set equal to a check of whether nodeTwo was found via either search
  // if so, this is good
  let foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;

  // check whether foundNodeTwo is false, or whether foundNodeFromOther is true, and if either condition hits, return false, as cannot validate the nodes
  if (!foundNodeTwo || foundNodeFromOther) {
    return false;
  }

  // return a call to the searchForTarget helper function, passing in nodeTwo, and a ternary check to determine whether to pass in nodeThree or nodeOne based on whether searchOne
  // is equal to nodeTwo or not
  return searchForTarget(nodeTwo, searchOne === nodeTwo ? nodeThree : nodeOne);
}

// helper function taking in a node and a target, which will search for the target
function searchForTarget(node, target) {
  // keep looping so long as not at a null node AND the node is not equal to the target
  while (node !== null && node !== target) {
    // set node equal to a ternary check determining which subtree to advance down based on BST properties
    node = target.value < node.value ? node.left : node.right;
  }

  // return a check of whether the node is equal to the target for use in main function
  return node === target;
}
