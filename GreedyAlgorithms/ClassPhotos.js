// It's photo day at school, and you are the photographer tasked with taking classing photos. The class to photograph has an even number of students, and all
// students are wearing either red or blue shirts. In fact, exactly half the class are wearing red shirts, and exactly half are wearing blue shirts. You are tasked
// with arranging the students in two rows before taking the photo. Each row should contain the same number of students, and should adhere to these guidelines:

// - All students wearing red shirts must be in the same row
// - All students wearing blue shirts must be in the same row
// - Each student in the back row must be strictly taller than the student directly in front of them in the front row

// You are given two input arrays: one containing the heights of all red-shirted students, and one containing the heights of all blue-shirted students.
// These arrays will always have the same length, and each height will be a positive integer. Write a function which returns whether or not a class photo
// following the given guidelines is possible and can be taken.

// Each class will have at least two students.

// Sample Input:
// redShirtHeights = [5, 8, 1, 3, 4]
// blueShirtHeights = [6, 9, 2, 4, 5]

// Sample Output:
// true (all students with blue shirts will be in the back row)

// Solution 1:

// O(nlog(n)) time due to sorting input arrays and comparing each input value
// O(1) space due to mutating input arrays, not using additional data structures

function classPhotos(redShirtHeights, blueShirtHeights) {
    // sort both arrays with larger values at beginning
    redShirtHeights.sort((a, b) => b - a);
    blueShirtHeights.sort((a, b) => b - a);
    // since all taller students must be at back, establish which shirt color must be in front row
    let shirtInFrontRow = redShirtHeights[0] < blueShirtHeights[0] ? 'RED' : 'BLUE';
    for (let idx = 0; idx < redShirtHeights.length; idx++) {
        // grab heights for each student by shirt color to establish if picture is doable based on parameters
        let redShirtHeight = redShirtHeights[idx];
        let blueShirtHeight = blueShirtHeights[idx];
        // assuming red is in front...
        if (shirtInFrontRow === 'RED') {
            // if a red shirt student is taller or equal in height to their corresponding blue shirt partner, picture is not doable in given parameters
            if (redShirtHeight >= blueShirtHeight) {
                return false;
            }
        // if red is not in front, then blue must be...
        } else if (blueShirtHeight >= redShirtHeight) {
            return false;
        }
    }
    // if we make it all the way through the students, then the picture is doable!
    return true;
}