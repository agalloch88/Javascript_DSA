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