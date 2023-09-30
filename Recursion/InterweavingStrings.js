// Write a function which takes in three strings, and returns a boolean representing whether the third string can be formed by interweaving the first two strings together.

// To interweave strings means to merge them by alternating their letters without any specific pattern. For instance, the strings "abc" and "123" can be interwoven
// as "a1b2c3", as "abc123", and as "ab1c23". These three examples are not an exhaustive list of posibilities, simply a demonstration of the variability allowed in the context
// of the problem.

// However, letters within a string must maintain their relative ordering in the interwoven string.

// Sample Input:

// one = "algoexpert"
// two = "your-dream-job"
// three = "your-algodream-expertjob"

// Sample Output:

// true

// Solution 1:

function interweavingStrings(one, two, three) {
    if (three.length !== one.length + two.length) {
        return false;
    }

    return areInterwoven(one, two, three, 0, 0);
}

function areInterwoven(one, two, three, i, j) {
    let k = i + j;

    if (k === three.length) {
        return true;
    }

    if (i < one.length && one[i] === three[k]) {
        if (areInterwoven(one, two, three, i + 1, j)) {
            return true;
        }
    }

    if (j < two.length && two[j] === three[k]) {
        return areInterwoven(one, two, three, i, j + 1);
    }

    return false;
}