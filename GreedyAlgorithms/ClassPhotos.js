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

function classPhotos(redShirtHeights, blueShirtHeights) {
    redShirtHeights.sort((a, b) => b - a);
    blueShirtHeights.sort((a, b) => b - a);

    let shirtInFrontRow = redShirtHeights[0] < blueShirtHeights[0] ? 'RED' : 'BLUE';
    for (let idx = 0; idx < redShirtHeights.length; idx++) {
        let redShirtHeight = redShirtHeights[idx];
        let blueShirtHeight = blueShirtHeights[idx];

        if (shirtInFrontRow === 'RED') {
            if (redShirtHeight >= blueShirtHeight) {
                return false;
            }
        } else if (blueShirtHeight >= redShirtHeight) {
            return false;
        }
    }
    return true;
}