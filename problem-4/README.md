# Sum to N Application

This project provides three implementations of a function to calculate the summation from `1` to `n` in TypeScript. The implementations demonstrate iterative, mathematical, and recursive approaches.

---

## Prerequisites

Before running this application, ensure you have the following installed on your system:

1. **Node.js** (v14 or later)
2. **TypeScript**: Install globally using:

   ```bash
   npm install -g typescript
   ```
---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Rushu-geek/KZGroup_backend_challenge.git
cd problem-4
```

### 2. Run the Application

1. Compile ts file to js:
   ```bash
   tsc index.ts
   ```
2. Run the compiled js file:
   ```bash
   node index.js
   ```

### 3. Example Output

1. When you run the application for n = 100, you should see output similar to this:
   ```bash
    sum_to_n_a(100) = 5050
    sum_to_n_b(100) = 5050
    sum_to_n_c(100) = 5050
   ```

## 4. Code Explanation

This file (`index.ts`) includes three different implementations of a function that calculates the summation of numbers from `1` to `n`.

### 1. **Iterative Approach** (Implementation 1)

The first implementation uses a simple loop to iterate through all numbers from `1` to `n` and adds them to a `sum` variable.

```typescript
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
```

### 2. **Formula Approach** (Implementation 2)

The second implementation uses the well-known mathematical formula for the sum of the first `n` natural numbers, which is `n(n + 1) / 2`. This formula allows for constant-time calculation.

```typescript
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}
```

### 3. **Recursive Approach** (Implementation 3)

The third implementation uses recursion to break down the problem into smaller sub-problems. It sums `n` with the result of calling the function recursively for `n - 1`, continuing until `n` reaches `0`.

```typescript
function sum_to_n_c(n: number): number {
    if (n === 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
}
```