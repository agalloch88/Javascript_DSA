// Write a function which takes in two strings: a main string, and a potential substring of the main string. The function should return a version of the main string with every
// instance of the substring in it wrapped between underscores.

// If two or more instances of the substring in the main string overlap each other, or sit side by side, the underscores relevant to these substrings should only appear on the far
// left of the leftmost substring, and on the far right of the rightmost substring. If the main string does not contain the other string at all, the function should return 
// the main string intact.

// Sample Input:
// string = "testthis is a testtest to see if testestest it works"
// substring = "test"

// Sample Output:
// "_test_this is a _testtest_ to see if _testestest_ it works"

// Solution 1:

// iterative solution using a few helper functions to find locations of substring, collapse them, then underscorify where needed

// O(n + m) time where n is length of the main string and m is the length of the substring
// O(n) space due to storing locations and finalChars, 2n converges to n

// main function which takes in the string and substring
function underscorifySubstring(string, substring) {
    // call getLocations helper, passing in string and substring, and pass the return value of that helper to the collapse helper, then store the return value in variable locations
    let locations = collapse(getLocations(string, substring));
    // return the result of the underscorify helper, passing in the input string and the locations data from above
    return underscorify(string, locations);
}
// helper function which finds the location of the substring within the main string
function getLocations(string, substring) {
    // set up empty array and store in variable locations
    let locations = [];
    // set the startIdx equal to 0
    let startIdx = 0;
    // while within the bounds of the input, keep looping
    while (startIdx < string.length) {
        // use the indexOf JS string method to find the next instance of the substring, starting from the current startIdx, and store this result in nextIdx
        let nextIdx = string.indexOf(substring, startIdx);
        // if the substring is found, and indexOf does not return -1, execute the below
        if (nextIdx !== -1) {
            // push pair values of value of nextIdx and nextIdx plus the length of the substring into locations array
            locations.push([nextIdx, nextIdx + substring.length]);
            // set the startIdx to equal one value right of the current nextIdx location
            startIdx = nextIdx + 1;
        // edge case where still need to break out of the loop
        } else {
            break;
        }
    }
    // after finishing looping through all string values, return the locations of the substring found
    return locations;
}
// helper function taking in the locations from above and collapsing them
function collapse(locations) {
    // if there's no locations found, simply return empty locations array
    if (!locations.length) {
        return locations;
    }
    // grab value of locations at index 0, store in variable newLocations
    let newLocations = [locations[0]];
    // grab index 0 value in newLocations, and store in variable previous
    let previous = newLocations[0];
    // starting at the second value, loop over the locations data
    for (let i = 1; i < locations.length; i++) {
        // grab index i in locations, store in variable current
        let current = locations[i];
        // if index 0 in current, meaning nextIdx, is less than or equal to the value at index 1 in previous, execute below
        if (current[0] <= previous[1]) {
            // set previous at index 1 equal to current at index 1, which is nextIdx + the length of the substring
            previous[1] = current[1];
        // otherwise, execute block below
        } else {
            // push the value for current into the newLocations array
            newLocations.push(current);
            // set previous equal to the value of current
            previous = current;
        }
    }
    // return the collapsed newLocations
    return newLocations;
}
// helper function which inserts the underscores where needed, taking in the main input string and the locations
function underscorify(string, locations) {
    // set locationsIdx equal to 0
    let locationsIdx = 0;
    // set stringIdx equal to 0
    let stringIdx = 0;
    // set inBetweenUnderscores to false at the beginning
    let inBetweenUnderscores = false;
    // set up finalChars array to return
    let finalChars = [];
    // set i = 0, which will be one of two values, either 0 or 1
    let i = 0;
    // keep looping while the stringIdx is in bounds of the input string and the locationsIdx is in bounds of the locations array
    while (stringIdx < string.length && locationsIdx < locations.length) {
        // if at a place which matches a location where an underscore should be, execute below
        if (stringIdx === locations[locationsIdx][i]) {
            // push an underscore into the finalChars
            finalChars.push('_');
            // toggle the inBetweenUnderscores value
            inBetweenUnderscores = !inBetweenUnderscores;
            // check to see if between underscores which should wrap the substring, and if so, increment the locationsIdx
            if (!inBetweenUnderscores) {
                locationsIdx++;
            }
            // ternary check to see what the vlaue of i should be
            i = i === 1 ? 0 : 1;
        }
        // push the value at stringIdx in string into the finalChars
        finalChars.push(string[stringIdx]);
        // increment stringIdx
        stringIdx++;
    }
    // if still in bounds of the locations, push another underscore into finalChars
    if (locationsIdx < locations.length) {
        finalChars.push('_');
    // if instead still in bounds of the string, push slice of string into finalChars
    } else if (stringIdx < string.length) {
        finalChars.push(string.slice(stringIdx));
    }
    // join the finalChars together
    return finalChars.join('');
}