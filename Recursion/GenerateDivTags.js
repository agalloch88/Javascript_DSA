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