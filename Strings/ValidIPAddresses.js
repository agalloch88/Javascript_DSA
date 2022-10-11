// The problem presents a string of length 12 or smaller, which contains only digits. Write
// a function which returns all the possible IP addresses which can be created by inserting
// three .'s in the string.

// An IP address is a sequence of four positive integers separated by .'s, where each
// individual integer is within the range 0-255, inclusive.

// An IP address is not valid if any of the individual integers contain leading 0's. For example,
// "192.168.0.1" is a valid IP address, but "192.168.00.1" and "192.168.0.01" are not, because
// they contain "00" and "01", respectively. Another example of a valid IP address is
// "99.1.1.10"; conversely, "991.1.1.0" is not valid, because "991" is greater than "255".

// The function should return the IP addresses in string format, and in no particular order.
// If no valid IP addresses can be created from the string, the function should return an empty list.

// Sample Input:
// string = "1921680"

// Sample Output:
// [
//  "1.9.216.80",
//  "1.92.16.80",
//  "1.92.168.0",
//  "19.2.16.80",
//  "19.2.168.0",
//  "19.21.68.0",
//  "19.216.8.0",
//  "192.1.6.80",
//  "192.1.68.0",
//  "192.16.8.0",   
// ]

// Solution 1:

// iterative solution checking for lengths and valid IP address values

// O(1) time due to simple value checks
// O(1) space due to storing parts then full strings in array

function validIPAddresses(string) {
    let ipAddressesFound = [];

    for (let i = 0; i < Math.min(string.length, 4); i ++) {
        let currentIPAddressParts = ['', '', '', ''];

        currentIPAddressParts[0] = string.slice(0, i);

        if (!isValidPart(currentIPAddressParts[0])) {
            continue;
        }

        for (let j = i + 1; j < i + Math.min(string.length - i, 4); j ++) {
            currentIPAddressParts[1] = string.slice(i, j);

            if (!isValidPart(currentIPAddressParts[1])) {
                continue;
            }

            for (let k = j + 1; k < j + Math.min(string.length - j, 4); k++) {
                currentIPAddressParts[2] = string.slice(j, k);
                currentIPAddressParts[3] = string.slice(k);

                if (isValidPart(currentIPAddressParts[2]) && isValidPart(currentIPAddressParts[3])) {
                    ipAddressesFound.push(currentIPAddressParts.join('.'));
                }
            }
        }
    }
    return ipAddressesFound;
}

function isValidPart(string) {
    const stringAsInt = parseInt(string);
    
    if (stringAsInt > 255) {
        return false;
    }

    return string.length === stringAsInt.toString().length;
}