// Write a function whcih takes in a Binary Tree, transforms it into a Right Sibling Tree, and returns the root of the Right Sibling Tree.

// A Right Sibling Tree is obtained by making every node in a Binary Tree have its right property point to its right sibling instead of its right child. A nodes
// right sibling is the node immediately to its right on the same level, or None/null if there is no node immediately to its right.

// Note that once the transformation is complete, some nodes may no longer have a node pointing to them. For example, in the sample output below, the node with the value
// 10 no longer has any inbound pointers and is effectively unreable.

// The transformation should be done in place, meaning that the original data structure should be mutated, and no new data structure should be created.

// Each BinaryTree node has a integer value, a left child node, and a right child node. Children nodes can either be BinaryTree nodes themselves, or None/null.

// Sample Input:

// tree =       1
//             / \
//            2   3
//          /  \  / \
//         4   5 6   7
//        / \  \ /   /\
//       8  9 1011  12 13
//              /
//             14

// Sample Output:

//      1
//  /
//  2--------3
// /         /
// 4---5--6--7
// /     /   /
// 8-9 10-11 12-13
//        /
//       14

// 1 remains the root node, and the node with value 10 no longer has a node pointing to it

// Solution 1:

// recursive solution using boolean to indicate whether node is a left child,
// and working from bottom left up to root then bottom right

// O(n) time due to checkin n nodes in input tree
// O(d) space, where d is the depth of the Binary Tree, as there will be max d calls on call stack

// main function which takes in the root of a Binary Tree
function rightSiblingTree(root) {
  // call helper function, passing in root
  // pass in null for the parent (since root cannot have a parent) and isLeftChild (since root is
  // not a child node)
  mutate(root, null, null);
  // as problem requires, return root node  to solve problem
  return root;
}

// helper function which reassigns pointers, taking in a node, a parent node, and boolean to
// determine if node is a left child node
function mutate(node, parent, isLeftChild) {
  // edge case checjk
  // check whether node is null, and if so, simply return
  if (node === null) {
    return;
  }

  // destructure a node into initialized left and right parts
  let { left, right } = node;
  // recursively call mutate, passing in left first, the node itself as the parent argument,
  // and true since dealing with a left child node
  mutate(left, node, true);

  // edge case check
  // check whether parent argument is null, which would happen with root node
  // this may also occur with nodes once their previous parent pointer is removed
  if (parent === null) {
    // in this case, set the right pointer to null, as there should be no right sibling
    // to point toward
    node.right = null;
    // otherwise, if this is a left child node, then set the right pointer of the node
    // to equal the parent's right child node, which is the node's right sibling
  } else if (isLeftChild) {
    node.right = parent.right;
    // otherwise, if neither condition above hits, execute below
  } else {
    // check whether the parent's right child is null, and if so, set node's right pointer
    // equal to null since there is no right sibling to point toward
    if (parent.right === null) {
      node.right = null;
      // otherwise, if there is a parental right child, set the node's right pointer
      // equal to the parent's right child left pointer
    } else {
      node.right = parent.right.left;
    }
  }

  // finally, recursively call mutate on the right, passing in node as parent and false
  // since this is not a left child node
  mutate(right, node, false);
}
