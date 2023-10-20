// The problem presents two non-empty strings. The first string is a pattern consisting of only x's and/or y's. The other string is a normal string of alphanumeric characters. Write a
// function which checks whether the normal string matches the pattern in the xy string.

// A string S0 is said to match a pattern if replacing all x's in the pattern with some non-empty substring S1 of S0, and replacing all y's in the pattern with some non-empty
// substring S2 of S0 yields the same string S0.

// If the input string does not match the input pattern, the function should return an empty array. Otherwise, it should return an array holding the strings S1 and S2 which represent
// x and y in the normal string, in that order. If the pattern does not contain any x's or y's, the respective letter should be represented by an empty string in the final array returned.

// In the context of the problem, assume that there will never be more than on pair of strings S1 and S2 which appropriately represent x and y in the normal string.

// Sample Input:
// pattern = "xxyxxy"
// string = "gogopowerrangergogopowerranger"

// Sample Output:
// ["go", "powerranger"]

// Solution 1:

function patternMatcher(pattern, string) {
  if (pattern.length > string.length) {
    return [];
  }

  let newPattern = getNewPattern(pattern);
  let didSwitch = newPattern[0] !== pattern[0];
  let counts = { x: 0, y: 0 };
  let firstYPos = getCountsAndFirstYPos(newPattern, counts);

  if (counts['y'] !== 0) {
    for (let lenOfX = 1; lenOfX < string.length; lenOfX++) {
      let lenOfY = (string.length - lenOfX * counts['x']) / counts['y'];

      if (lenOfY <= 0 || lenOfY % 1 !== 0) {
        continue;
      }
      let yIdx = firstYPos * lenOfX;
      let x = string.slice(0, lenOfX);
      let y = string.slice(yIdx, yIdx + lenOfY);
      let potentialMatch = newPattern.map((char) => (char === 'x' ? x : y));

      if (string === potentialMatch.join('')) {
        return !didSwitch ? [x, y] : [y, x];
      }
    }
  } else {
    let lenOfX = string.length / counts['x'];

    if (lenOfX % 1 === 0) {
      let x = string.slice(0, lenOfX);
      let potentialMatch = newPattern.map((char) => (char === 'x' ? x : ''));

      if (string === potentialMatch.join('')) {
        return !didSwitch ? [x, ''] : ['', x];
      }
    }
  }
  return [];
}

function getNewPattern(pattern) {
  let patternLetters = pattern.split('');
  if (pattern[0] === 'x') {
    return patternLetters;
  } else {
    return patternLetters.map((char) => (char === 'y' ? 'x' : 'y'));
  }
}

function getCountsAndFirstYPos(pattern, counts) {
  let firstYPos = null;

  for (let i = 0; i < pattern.length; i++) {
    let char = pattern[i];
    counts[char]++;

    if (char === 'y' && firstYPos === null) {
      firstYPos = i;
    }
  }
  return firstYPos;
}
