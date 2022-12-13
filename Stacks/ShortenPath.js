// Write a function which takes i a non-empty string representing a valid Unix-shell path, and returns a shortened version of that path.

// A path is a notation which represents the location of a file or directory in a file system.

// A path can be an absolute path, meaning it starts at the root directory in a file system, or a relative path, meaning it starts at the current directory in a file system.

// In a Unix-like operating system, a path is bounded by the following rules:
// * The root directory is represented by a / . This means that if a path starts with a /, it is an absolute path. If it does not, it is a relative path.
// * The symbol / otherwise represents the directory separator. This means the path /foo/bar is the location of the directory bar inside the directory foo, which itself is located in the root directory
// * The symbol .. represents the parent directory. This means accessing files or directories in /foo/bar/.. is equivalent to accessing files or directories in /foo.
// * The symbol . represents the current directory. This means accessing files or directories in /foo/bar/. is equivalent to accessing files or directories in /foo/bar .
// * The symbols / and . can be repeated sequentially without consequence; the symbol .. cannot, however, because repeating t sequentially means going further up in parent directories.
//   For example, /foo/bar/baz/././. and /foo/bar/baz are equivalent paths, but /foo/bar/baz/../../../ and /foo/bar/baz are certainly not equivalent. The only exception to this rule is the root directory:
//   /../../.. and / are equivalent, because the root directory has no parent directory, which means that repeatedly accessing parent directories does nothing.

// Note that the shortened version of the path must be equivalent to the original path. In other words, it must point to the same file or directory as the original path.

// Sample Input:
// path = "/foo/../test/../test/../foo//bar/./baz"

// Sample Output:
// "/foo/bar/baz"

// Solution 1:

// iterative solution using stack and logic to identify important segments of path

// O(n) time due to iterating over every segment in path, splitting, filtering, and finally joining path
// O(n) space due to storing tokens and segments in stack

// main function which takes in path
function shortenPath(path) {
    // determine whether value at index 0 in path is a slash, which determines whether dealing with
    // absolute or relative path, and store boolean value in variable startsWithSlash
    let startsWithSlash = path[0] === '/';
    // split items in path input on slashes, then filter segments using helper function which
    // determines whether given segment is important, and store in variable tokens
    let tokens = path.split('/').filter(isImportantToken);
    // set up empty array which will serve as a stack, and store in variable stack
    let stack = [];

    // check whether path starts with a slash using variable established above
    if (startsWithSlash) {
        // if true, push an empty string to bottom of stack, which will be joined with / once done
        stack.push('');
    }

    // iterate over every token in tokens variable
    for (let token of tokens) {
        // if the current token is .. which represents moving up one directory, execute below
        if (token === '..') {
            // if the stack is currently empty or if the top item on the stack is .. then push token onto stack
            if (stack.length === 0 || stack[stack.length - 1] === '..') {
                stack.push(token);
            // if top item on stack is not an empty string, which would be a / at the end, then pop token off top of stack
            } else if (stack[stack.length - 1] !== '') {
                stack.pop();
            }
        // if token is anything other than .. then push token onto stack
        } else {
            stack.push(token);
        }
    }
    // if stack has one element and that one element is an empty string, need to manually return /
    if (stack.length === 1 && stack[0] === '') {
        return '/';
    }
    // return the joined elements in stack, joined with /'s
    return stack.join('/');
}

// helper function to determine whether segment is important, which takes in a single segment of path
function isImportantToken(token) {
    // return boolean result of check whether the token has a length greater than 0 and it is not a single .
    return token.length > 0 && token !== '.';
}

// Solution 2:

// iterative solution using switch statement for various cases

// O(n) time due to single loop over inputs
// O(n) space due to storing result and splitPath

function shortenPath(path) {
    // check whether first element in path input is a / which determines absolute vs relative path, and store boolean in variable isAbsolutePath
    let isAbsolutePath = path[0] === '/';
    // split the input path into segments based on /'s, and store result in variable splitPath
    let splitPath = path.split('/');
    // define what constitutes moving up a directory, which is .., and store in variable moveUpDirectory
    let moveUpDirectory = '..';
    // define what constitutes a 'same directory' segment, and store in variable sameDirectory
    let sameDirectory = '.';
    // initialize empty array to store the final shortened path, and store in variable result
    let result = [];
    // iterate over every segment in the splitPath
    for (let idx = 0; idx < splitPath.length; idx++) {
        // grab the segment at specific idx in splitPath and store in variable command
        let command = splitPath[idx];
        // based on the command, check for matching switch statement case
        switch (command) {
            // if current command is .. meaning moveUpDirectory, execute below
            case moveUpDirectory:
                // check whether dealing with a relative path AND the current result length is zero, OR whether the last item in result is equal to ..
                if (!isAbsolutePath && (result.length === 0 || result[result.length - 1] === moveUpDirectory)) {
                    // if either set of conditions is true, push a .. into result
                    result.push(moveUpDirectory);
                // if neither set of conditions above is true, then pop the last item out of result array
                } else {
                    result.pop();
                }
                // once either the if or else above are executed, break out of switch
                break;
            // if current command is . meaning sameDirectory, do nothing as this is meaningless
            case sameDirectory:
            // if current command is '' meaning this is where a / was before the split, then break
            case '':
                break;
            // the default case is to push the current value of command into the result array, then break
            default:
                result.push(command);
                break;
        }
    }
    // return the ternary of isAbsolutePath check plus the result array joined with /'s to generate final shortened path
    return (isAbsolutePath ? '/' : '') + result.join('/');
}