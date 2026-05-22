---
title: "Unit 1: Matrices - Engineering Mathematics (JNTUK R23)"
description: "Comprehensive notes, solved examples, and PYQs for Unit 1 Matrices in JNTUK R23 Engineering Mathematics."
---

# Unit 1: Matrices

## 1. Introduction & Definitions

A **Matrix** is a rectangular array of numbers, symbols, or expressions arranged in rows and columns. In engineering mathematics, matrices are fundamentally used to solve systems of linear equations, transform vectors, and analyze linear systems.

### Types of Matrices
- **Square Matrix:** A matrix with the same number of rows and columns ($n \times n$).
- **Diagonal Matrix:** A square matrix where all off-diagonal elements are zero.
- **Identity Matrix ($I$):** A diagonal matrix with 1s on the main diagonal.
- **Symmetric Matrix:** A square matrix that is equal to its transpose ($A = A^T$).
- **Skew-Symmetric Matrix:** A square matrix where $A = -A^T$.
- **Orthogonal Matrix:** A square matrix whose transpose is equal to its inverse ($A A^T = I$).

---

## 2. Rank of a Matrix

The **rank** of a matrix is the maximum number of linearly independent row vectors in the matrix. It is also equal to the maximum number of linearly independent column vectors.

### Finding Rank using Echelon Form
To find the rank of a matrix by reducing it to Echelon form:
1. Make the first element of the first row non-zero (preferably 1).
2. Use elementary row operations to make all elements below this leading 1 into zeros.
3. Move to the next row and repeat the process for the diagonal element.
4. **Formula/Rule:** The rank is the number of non-zero rows in the row echelon form.

### Finding Rank using Normal Form
Any non-zero matrix of rank $r$ can be reduced by a sequence of elementary row and column operations to the **Normal Form**:
$$ \begin{bmatrix} I_r & 0 \\ 0 & 0 \end{bmatrix} $$
where $I_r$ is the identity matrix of order $r$. The rank is $r$.

---

## 3. System of Linear Equations

A system of $m$ linear equations in $n$ variables can be written in matrix form as:
$$ AX = B $$

Where:
- $A$ is the coefficient matrix.
- $X$ is the column matrix of variables.
- $B$ is the column matrix of constants.

### Augmented Matrix $[A|B]$
The matrix obtained by appending the columns of $B$ to $A$ is called the augmented matrix.

### Consistency Rules (Rouché-Capelli Theorem)
Let $r(A)$ be the rank of $A$ and $r(A|B)$ be the rank of the augmented matrix.
1. **Consistent with Unique Solution:** $r(A) = r(A|B) = n$ (where $n$ is the number of variables).
2. **Consistent with Infinite Solutions:** $r(A) = r(A|B) < n$.
3. **Inconsistent (No Solution):** $r(A) \neq r(A|B)$.

---

## 4. Gauss Elimination Method

Gauss elimination is a systematic method for solving systems of linear equations.

**Steps:**
1. Write the augmented matrix $[A|B]$.
2. Use elementary row operations to transform the augmented matrix into an upper triangular form (Row Echelon form).
3. Use back-substitution to find the values of the variables.

### Solved Example
**Solve the system using Gauss Elimination:**
$$ 2x + y + z = 10 $$
$$ 3x + 2y + 3z = 18 $$
$$ x + 4y + 9z = 16 $$

**Solution:**
Augmented Matrix:
$$ \begin{bmatrix} 2 & 1 & 1 & | & 10 \\ 3 & 2 & 3 & | & 18 \\ 1 & 4 & 9 & | & 16 \end{bmatrix} $$

Swap $R_1$ and $R_3$:
$$ \begin{bmatrix} 1 & 4 & 9 & | & 16 \\ 3 & 2 & 3 & | & 18 \\ 2 & 1 & 1 & | & 10 \end{bmatrix} $$

$R_2 \to R_2 - 3R_1$, $R_3 \to R_3 - 2R_1$:
$$ \begin{bmatrix} 1 & 4 & 9 & | & 16 \\ 0 & -10 & -24 & | & -30 \\ 0 & -7 & -17 & | & -22 \end{bmatrix} $$

$R_3 \to R_3 - 0.7R_2$:
$$ \begin{bmatrix} 1 & 4 & 9 & | & 16 \\ 0 & -10 & -24 & | & -30 \\ 0 & 0 & -0.2 & | & -1 \end{bmatrix} $$

Back substitution:
$-0.2z = -1 \implies z = 5$
$-10y - 24(5) = -30 \implies -10y = 90 \implies y = -9$
$x + 4(-9) + 9(5) = 16 \implies x - 36 + 45 = 16 \implies x = 7$

**Result:** $x=7, y=-9, z=5$.

---

## 5. Frequently Asked Questions (PYQs)

<details>
<summary><strong>Q: What is the rank of a null matrix?</strong></summary>
The rank of a null (zero) matrix is 0, because it has no linearly independent rows or columns.
</details>

<details>
<summary><strong>Q: How do you determine if a system of equations is consistent?</strong></summary>
A system is consistent if the rank of the coefficient matrix $A$ is exactly equal to the rank of the augmented matrix $[A|B]$.
</details>

<details>
<summary><strong>Q: (PYQ 2023) Reduce the given matrix to normal form and find its rank.</strong></summary>
To reduce to normal form, apply both row and column operations until you form an Identity matrix in the top left corner, and zeros everywhere else. The order of the identity matrix is the rank.
</details>
