// Write a function which takes in a positive integer `numberOfTags`, and returns a list/array of all the valid strings which may be generated with that number of
// matched `<div></div>` tags.

// A string is valid and contains matched `<div></div>` tags if, for every opening `<div>`, there is a closing tag, `</div>`, which comes after the opening tag,
// and which is not used as a closing tag for another opening tag. Each output string should contain exactly `numberOfTags` opening tags, and `numberOfTags` closing tags.

// For example, given `numberOfTags = 2`, the valid strings to return would be: `["<div></div><div></div>", "<div><div></div></div>"].

// Note that the output strings need not be in any particular order.

// Sample Input:

// numberOfTags = 3

// Sample Output:

// ["<div><div><div></div></div></div>",
//  "<div><div></div><div></div></div>",
//  "<div><div></div></div><div></div>",
//  "<div></div><div><div></div></div>",
//  "<div></div><div></div><div></div>",
// ]

// Solution 1:

// recursive solution checking the number of opening and closing tags needed, using a passed-in prefix, to solve

// O((2n)!/((n!((n + 1)!)))) time due to exponential possibilities based on increasing size
// O((2n)!/((n!((n + 1)!)))) space due to exponential growth of result array

function generateDivTags(numberOfTags) {
  // Initialize an empty array to store the generated valid sequences of div tags.
  let matchedDivTags = [];

  // Start the recursive process with the given number of opening and closing tags needed,
  // an empty prefix, and the result array to store the sequences.
  generateDivTagsFromPrefix(numberOfTags, numberOfTags, '', matchedDivTags);

  // Return the array containing all valid sequences of div tags.
  return matchedDivTags;
}

// helper function to generate tags based on a passed-in prefix
function generateDivTagsFromPrefix(
  openingTagsNeeded,
  closingTagsNeeded,
  prefix,
  result,
) {
  // If there are still opening tags needed, add an opening tag to the prefix and recurse.
  if (openingTagsNeeded > 0) {
    let newPrefix = prefix + '<div>';
    generateDivTagsFromPrefix(
      openingTagsNeeded - 1,
      closingTagsNeeded,
      newPrefix,
      result,
    );
  }

  // If the number of opening tags needed is less than the number of closing tags needed,
  // it means we can add a closing tag to the prefix and recurse.
  if (openingTagsNeeded < closingTagsNeeded) {
    let newPrefix = prefix + '</div>';
    generateDivTagsFromPrefix(
      openingTagsNeeded,
      closingTagsNeeded - 1,
      newPrefix,
      result,
    );
  }

  // When no more closing tags are needed, we have a complete valid sequence.
  // Add the current prefix to the result array.
  if (closingTagsNeeded === 0) {
    result.push(prefix);
  }
}
