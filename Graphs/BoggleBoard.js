// The problem presents a two-dimensional array/lisst (also known as a matrix) of potentially-unequal height and width, which contains letters.
// This 2D array/list constitutes a "boggle board". The problem also provides an array/list of words.

// Write a function which returns an array of all the words listed in the words list/array which can be constructed using the letters in the 2D array/list/matrix.

// A word iis constructed in the boggle board by connecting adjacent (meaning horizontally, vertically, or diagonally) letters, without using any
// single letter at a given position more than once. While a word can naturally have repeated letters, those repeated letters must come from a different
// adjacent possition in the boggle board in order for the word to be "contained" in the board. Note that two or more words are allowed to overlap
// and use the ssame letters in the boggle board.

// Sample Input:

// board = [
//     ["t", "h", "i", "s", "i", "s", "a"],
//     ["s", "i", "m", "p", "l", "e", "x"],
//     ["b", "x", "x", "x", "x", "e", "b"],
//     ["x", "o", "g", "g", "l", "x", "o"],
//     ["x", "x", "x", "D", "T", "r", "a"],
//     ["R", "E", "P", "E", "A", "d", "x"],
//     ["x", "x", "x", "x", "x", "x", "x"],
//     ["N", "O", "T", "R", "E", "-", "P"],
//     ["x", "x", "D", "E", "T", "A", "E"],
// ]

// words = ["this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"]

// Sample Output:

// ["this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"]
// note that words may be ordered differently

// Solution 1:

function boggleBoard(board, words) {
  let trie = new Trie();
  for (let word of words) {
    trie.add(word);
  }

  let finalWords = {};
  let visited = board.map((row) => row.map((letter) => false));
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      explore(i, j, board, trie.root, visited, finalWords);
    }
  }
  return Object.keys(finalWords);
}

function explore(i, j, board, trieNode, visited, finalWords) {
  if (visited[i][j]) {
    return;
  }

  let letter = board[i][j];
  if (!(letter in trieNode)) {
    return;
  }
  visited[i][j] = true;
  trieNode = trieNode[letter];
  if ('*' in trieNode) {
    finalWords[trieNode['*']] = true;
  }

  let neighbors = getNeighbors(i, j, board);
  for (let neighbor of neighbors) {
    explore(neighbor[0], neighbor[1], board, trieNode, visited, finalWords);
  }
  visited[i][j] = false;
}

function getNeighbors(i, j, board) {
  let neighbors = [];

  if (i > 0 && j > 0) {
    neighbors.push([i - 1, j - 1]);
  }

  if (i > 0 && j < board[0].length - 1) {
    neighbors.push([i - 1, j + 1]);
  }

  if (i < board.length - 1 && j < board[0].length - 1) {
    neighbors.push([i + 1, j + 1]);
  }

  if (i < board.length - 1 && j > 0) {
    neighbors.push([i + 1, j - 1]);
  }

  if (i > 0) {
    neighbors.push([i - 1, j]);
  }

  if (i < board.length - 1) {
    neighbors.push([i + 1, j]);
  }

  if (j > 0) {
    neighbors.push([i, j - 1]);
  }

  if (j < board[0].length - 1) {
    neighbors.push([i, j + 1]);
  }

  return neighbors;
}

class Trie {
  constructor() {
    this.root = {};
    this.endSymbol = '*';
  }

  add(word) {
    let current = this.root;
    for (let letter of word) {
      if (!(letter in current)) {
        current[letter] = {};
      }
      current = current[letter];
      current[this.endSymbol] = word;
    }
  }
}
