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

class SuffixTrie {
  constructor(string) {
    this.root = {};
    this.endSymbol = '*';
    this.populateSuffixTreeFrom(string);
  }
  // O(n^2) time
  // O(n^2) space
  populateSuffixTreeFrom(string) {
    for (let i = 0; i < string.length; i++) {
      this.insertSubstringStartingAt(i, string);
    }
  }

  insertSuffixTreeStartingAt(i, string) {
    let node = this.root;

    for (let j = i; j < string.length; j++) {
      let letter = string[j];

      if (!(letter in node)) {
        node[letter] = {};
      }

      node = node[letter];
    }

    node[this.endSymbol] = true;
  }
  // O(m) time
  // O(1) space
  contains(string) {
    let node = this.node;

    for (let letter of string) {
      if (!(letter in node)) {
        return false;
      }

      node = node[letter];
    }

    return this.endSymbol in node;
  }
}
