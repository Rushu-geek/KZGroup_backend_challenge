// Implementation 1: Iterative Approach
function sum_to_n_a(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
// Time Complexity: O(n) The function iterates from 1 to n , so the number of operations grows linearly with n.
// Space Complexity: O(1) The function uses a constant amount of extra space. 
// Implementation 2: Formula Approach
// The sum of the first n natural numbers is given by the formula n(n+1)/2.
function sum_to_n_b(n) {
    return (n * (n + 1)) / 2;
}
// Time Complexity: O(1) The function performs a constant number of operations.
// Space Complexity: O(1) The function uses a constant amount of extra space.
// Implementation 3: Recursive Approach
function sum_to_n_c(n) {
    if (n === 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
}
// Time Complexity: O(n) The function makes n recursive calls, so the number of operations grows linearly with n.
// Space Complexity: O(n) The function uses O(n) space due to the recursive calls.
// Test the functions
var n = 100;
console.log("sum_to_n_a(".concat(n, ") ="), sum_to_n_a(n));
console.log("sum_to_n_b(".concat(n, ") ="), sum_to_n_b(n));
console.log("sum_to_n_c(".concat(n, ") ="), sum_to_n_c(n));
