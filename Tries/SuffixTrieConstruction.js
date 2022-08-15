// Write a SuffixTrie class for a Suffix-Trie-like data structure. The class should have
// a root property set to be the root node of the trie and should support:

// - Creating the trie from a string
//      - This will be done by calling the populateSuffixTrieFrom method
//      upon class instantiation, which should populate the root of the class
//  - Searching for strings in the trie

// Note that every string added to the trie should end with the special
// endSymbol character *

// Sample Input (for suffix trie creation):
// string = "babc"

// Sample Output:
// {
//      "c": {"*": true},
//      "b": {
//          "c": {"*": true},
//          "a": {"b": {"c": { "*": true}}},
//      },
//      "a": {"b": {"c": {"*": true}}},   
// }

// Sample Input (searching the above suffix trie):
// string: "abc"

// Sample Output: true

// Solution 1: