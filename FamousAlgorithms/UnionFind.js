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

class UnionFind {
    constructor(value) {
        this.parents = {};
        this.ranks = {};
    }

    createSet(value) {
        this.parents[value] = value;
        this.ranks[value] = 0;
    }
    
    find(value) {
        if (!(value in this.parents)) {
            return null;
        }

        let currentParent = value;
        while (currentParent !== this.parents[currentParent]) {
            currentParent = this.parents[currentParent];
        }
        return currentParent;
    }

    union(valueOne, valueTwo) {
        if (!(valueOne in this.parents) || !(valueTwo in this.parents)) {
            return;
        }

        let valueOneRoot = this.find(valueOne);
        let valueTwoRoot = this.find(valueTwo);

        if (this.ranks[valueOneRoot] < this.ranks[valueTwoRoot]) {
            this.parents[valueOneRoot] = valueTwoRoot;
        } else if (this.ranks[valueOneRoot] > this.ranks[valueTwoRoot]) {
            this.parents[valueTwoRoot] = valueOneRoot;
        } else {
            this.parents[valueTwoRoot] = valueOneRoot;
            this.ranks[valueOneRoot] += 1;
        }
    } 
}