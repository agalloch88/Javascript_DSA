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

function shortenPath(path) {
    let startsWithSlash = path[0] === '/';
    let tokens = path.split('/').filter(isImportantToken);
    let stack = [];

    if (startsWithSlash) {
        stack.push('');
    }

    for (let token of tokens) {
        if (token === '..') {
            if (stack.length === 0 || stack[stack.length - 1] === '..') {
                stack.push(token);
            } else if (stack[stack.length - 1] !== '') {
                stack.pop();
            }
        } else {
            stack.push(token);
        }
    }
    if (stack.length === 1 && stack[0] === '') {
        return '/';
    }
    return stack.join('/');
}

function isImportantToken(token) {
    return token.length > 0 && token !== '.';
}