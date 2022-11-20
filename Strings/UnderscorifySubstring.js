// Write a function which takes in two strings: a main string, and a potential substring of the main string. The function should return a version of the main string with every
// instance of the substring in it wrapped between underscores.

// If two or more instances of the substring in the main string overlap each other, or sit side by side, the underscores relevant to these substrings should only appear on the far
// left of the leftmost substring, and on the far right of the rightmost substring. If the main strinbg does not contain the other string at all, the function should return 
// the main string intact.

// Sample Input:
// string = "testthis is a testtest to see if testestest it works"
// substring = "test"

// Sample Output:
// "_test_this is a _testtest_ to see if _testestest_ it works"

// Solution 1:

function underscorifySubstring(string, substring) {
    let locations = collapse(getLocations(string, substring));
    return underscorify(string, locations);
}

function getLocations(string, substring) {
    let locations = [];
    let startIdx = 0;

    while (startIdx < string.length) {
        let nextIdx = string.indexOf(substring, startIdx);

        if (nextIdx !== -1) {
            locations.push([nextIdx, nextIdx + substring.length]);
            startIdx = nextIdx + 1;
        } else {
            break;
        }
    }

    return locations;
}

function collapse(locations) {
    if (!locations.length) {
        return locations;
    }

    let newLocations = [locations[0]];
    let previous = newLocations[0];

    for (let i = 1; i < locations.length; i++) {
        let current = locations[i];

        if (current[0] <= previous[1]) {
            previous[1] = current[1];
        } else {
            newLocations.push(current);
            previous = current;
        }
    }
    return newLocations;
}

function underscorify(string, locations) {
    let locationsIdx = 0;
    let stringIdx = 0;
    let inBetweenUnderscores = false;
    let finalChars = [];
    let i = 0;

    while (stringIdx < string.length && locationsIdx < locations.length) {
        if (stringIdx === locations[locationsIdx][i]) {
            finalChars.push('_');
            inBetweenUnderscores = !inBetweenUnderscores;

            if (!inBetweenUnderscores) {
                locationsIdx++;
            }

            i = i === 1 ? 0 : 1;
        }
        finalChars.push(string[stringIdx]);
        stringIdx++;
    }

    if (locationsIdx < locations.length) {
        finalChars.push('_');
    } else if (stringIdx < string.length) {
        finalChars.push(string.slice(stringIdx));
    }
    return finalChars.join('');
}