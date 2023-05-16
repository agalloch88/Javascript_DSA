// Write a UnionFind class which implements the union-find (also called a disjoint set) data structure. 

// The union-find data structure is similar to a traditional Set data structure, in that it contains a collection of unique values. However, these values are spread
// out amongst a variety of distinct disjoint sets, meaning that no set can have duplicate values, and no two sets can contain the same value.

// This class should support the following three methods:

// * createSet(value): Adds a given value in a new set containing only that value.
// * union(valueOne, valueTwo): Takes in two values and determines which sets they are in. If they are in different sets, the sets are combined into a single set. If either value is not in a set, 
//   or the values are in the same set, the function should have no effect.
// * find(value): Returns the "representative" value of the set for which a value belongs to. This can be any value in the set, but it should always be the same value, regardless of which
//   value in the set find is passed. If the value is not in a set, the function should return None/null. Note that after a set is part of a union, its representative can potentially change.

// For the purposes of the problem, assume createSet will neever be called with the same value twice.

// Sample Usage:

// createSet(5): null
// createSet(10): null
// find(5): 5
// find(10): 10
// union(5, 10): null
// find(5): 5
// find(10): 5
// createSet(20): null
// find(20): 20
// union(20, 10): null
// find(5): 5
// find(10): 5
// find(20): 5

// Solution 1:

// solution utilizing a parents JS object to keep track of and update the parent node of a value

// main UnionFind class, with the required createSet, find, and union methods
class UnionFind {
    constructor() {
        // initialize the parents object to empty
        this.parents = {};
    }

    // O(1) time due to object lookup speed
    // O(1) space due to not creating any new data structures
    // createSet method, which takes in a specific value
    createSet(value) {
        // the value in parents object is equal to the value passed in
        this.parents[value] = value;
    }

    // O(n) time due to potentially going through n values
    // O(1) space due to not creating any new data structures
    // find method, which takes in a specific value
    find(value) {
        // if there is not the passed-in value in the parents JS object, then return null
        if (!(value in this.parents)) {
            return null;
        }
        // initialize variable currentParent and set equal to the passed-in value
        let currentParent = value;
        // keep looping so long as the currentParent is not equal to the value in parents JS object at currentParent
        while (currentParent !== this.parents[currentParent]) {
            // set currentParennt equal to the value at currentParent in parents JS object
            currentParent = this.parents[currentParent];
        }
        // return the new value for currentParent
        return currentParent;
    }

    // O(n) time due to perhaps traversing up to n values
    // O(1) space due to not creating any new data structures
    // union method, which takes in two values
    union(valueOne, valueTwo) {
        // if either valueOne or valueTwo are NOT in the parents JS object, then return
        if (!(valueOne in this.parents) || !(valueTwo in this.parents)) {
            return;
        }
        // initialize variable valueOneRoot and set equal to the returned value of find method, passing in valueOne
        let valueOneRoot = this.find(valueOne);
        // initialize variable valueTwoRoot and set equal to the returned value of find method, passing in valueTwo
        let valueTwoRoot = this.find(valueTwo);
        // set the value of valueTwoRoot in parents JS object equal to the value stored in valueOneRoot
        this.parents[valueTwoRoot] = valueOneRoot;
    }
}

// Solution 2:

// solution utilizing two objects to keep track of node parents and relative ranks, or heights, of nodes in a given tree

// main UnionFind class, with required createSet, find, and union methods, along with two objects in constructor
class UnionFind {
    constructor(value) {
        this.parents = {};
        this.ranks = {};
    }

    // O(1) time due to object lookup speed
    // O(1) space due to not creating any new data structures
    // createSet method, which takes in a specific value
    createSet(value) {
        // the value in the parents object is equal to the value passed in
        this.parents[value] = value;
        // the value in ranks object is equal to 0 at outset, as it does not rank higher than any other node
        this.ranks[value] = 0;
    }
    
    // O(log(n)) time due to potentially going through half of n values due to parents and ranks structures
    // O(1) space due to not creating any new data structures
    // find method, which takes in a specific value
    find(value) {
        // if the passed-in value is NOT in parents object, then return null
        if (!(value in this.parents)) {
            return null;
        }
        // initialize variable currentParent and set equal to the passed-in value
        let currentParent = value;
        // keep looping so long as value stored in currentParent is NOT equal to the value of currentParent in parents JS object
        while (currentParent !== this.parents[currentParent]) {
            // set value of currentParent equal to the value of currentParent in parents JS object
            currentParent = this.parents[currentParent];
        }
        // once while loop breaks, return the value stored in currentParent
        return currentParent;
    }

    // O(log(n)) time due to perhaps traversing up to half of n values due to parents and ranks structures
    // O(1) space due to not creating any new data structures
    // union method, which takes in two values
    union(valueOne, valueTwo) {
        // if either valueOne or valueTwo are NOT in the parents JS object, then return
        if (!(valueOne in this.parents) || !(valueTwo in this.parents)) {
            return;
        }
        // initialize variable valueOneRoot and set equal to the returned value of find method, passing in valueOne
        let valueOneRoot = this.find(valueOne);
        // initialize variable valueTwoRoot and set equal to the returned value of find method, passing in valueTwo
        let valueTwoRoot = this.find(valueTwo);

        // if the valueOneRoot in ranks object is smaller than the valueTwoRoot in ranks object, set valueOneRoot in parents object equal to valueTwoRoot
        if (this.ranks[valueOneRoot] < this.ranks[valueTwoRoot]) {
            this.parents[valueOneRoot] = valueTwoRoot;
        // otherwise, if the valueOneRoot in ranks object is larger than valueTwoRoot in ranks object, execute below
        } else if (this.ranks[valueOneRoot] > this.ranks[valueTwoRoot]) {
            // set valueTwoRoot in parents object equal to valueOneRoot
            this.parents[valueTwoRoot] = valueOneRoot;
        // otherwise, if equal or not found in ranks object, then execute the below
        } else {
            // set valueTwoRoot in parents object equal to valueOneRoot
            this.parents[valueTwoRoot] = valueOneRoot;
            // increment valueOneRoot in ranks object by 1, indicating this node is not of greater height than other nodes
            this.ranks[valueOneRoot] += 1;
        }
    } 
}

// Solution 3:

// solution utilizing two objects to keep track of node parents and relative ranks, or heights, of nodes in a given tree, slightly optimized via the find method

// main UnionFind class, with required createSet, find, and union methods, along with two objects in constructor
class UnionFind {
    constructor(value) {
        this.parents = {};
        this.ranks = {};
    }

    // O(1) time due to object lookup speed
    // O(1) space due to not creating any new data structures
    // createSet method, which takes in a specific value
    createSet(value) {
        // the value in the parents object is equal to the value passed in
        this.parents[value] = value;
        // the value in ranks object is equal to 0 at outset, as it does not rank higher than any other node
        this.ranks[value] = 0;
    }

    // O(α(n)) time, which is approximately O(1), due to optimization of lookup to parents object
    // O(α(n)) space, which is approximately O(1), due to optimization of lookup to parents object
    // find method, which takes in a specific value
    find(value) {
        // if the value is NOT in the parents object, then return null
        if (!(value in this.parents)) {
            return null;
        }
        // if the value passed in is NOT equal to the value in the parents object, execute below
        if (value !== this.parents[value]) {
            // set the value in parents object equal to a call to find method, passing in the value within parents
            this.parents[value] = this.find(this.parents[value]);
        }
        // return the value in parents object
        return this.parents[value];
    }

    // O(α(n)) time, which is approximately O(1), due to optimization of lookup to parents object
    // O(α(n)) space, which is approximately O(1), due to not using any additional data structures
    // union method, which takes in two values
    union(valueOne, valueTwo) {
        // if either valueOne or valueTwo are NOT in the parents JS object, then return
        if (!(valueOne in this.parents) || !(valueTwo in this.parents)) {
            return;
        }

        // initialize variable valueOneRoot and set equal to the returned value of find method, passing in valueOne
        let valueOneRoot = this.find(valueOne);
        // initialize variable valueTwoRoot and set equal to the returned value of find method, passing in valueTwo
        let valueTwoRoot = this.find(valueTwo);

        // if the valueOneRoot in ranks is LESS than the valueTwoRoot in ranks object, then set valueOneRoot in parents object equal to valueTwoRoot
        if (this.ranks[valueOneRoot] < this.ranks[valueTwoRoot]) {
            this.parents[valueOneRoot] = valueTwoRoot;
        // if the valueOneRoot in ranks is GREATER than the valueTwoRoot in ranks object, then set valueTwoRoot in parents object equal to valueOneRoot
        } else if (this.ranks[valueOneRoot] > this.ranks[valueTwoRoot]) {
            this.parents[valueTwoRoot] = valueOneRoot;
        // otherwise, if equal or not found in ranks object, then execute the below
        } else {
            // set valueTwoRoot in parents object equal to valueOneRoot
            this.parents[valueTwoRoot] = valueOneRoot;
            // increment the rank of valueOneRoot by 1 in ranks object
            this.ranks[valueOneRoot] += 1;
        }
    }
}