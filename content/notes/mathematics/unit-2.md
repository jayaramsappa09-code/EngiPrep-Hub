---
title: "Unit 2: Eigenvalues & Eigenvectors - Engineering Mathematics (JNTUK R23)"
description: "Comprehensive notes, solved examples, and PYQs for Unit 2 Eigenvalues, Eigenvectors, and Quadratic Forms."
---

# Unit 2: Eigenvalues, Eigenvectors & Orthogonal Transformation

## 1. Eigenvalues and Eigenvectors

For a given square matrix $A$ of order $n$, a scalar $\lambda$ is called an **eigenvalue** if there exists a non-zero column vector $X$ such that:
$$ AX = \lambda X $$

The vector $X$ is called the **eigenvector** corresponding to the eigenvalue $\lambda$.

### The Characteristic Equation
To find the eigenvalues of $A$, we solve the **characteristic equation**:
$$ |A - \lambda I| = 0 $$
Expanding this determinant yields a polynomial of degree $n$ in terms of $\lambda$, called the characteristic polynomial. Its roots are the eigenvalues.

### Properties of Eigenvalues
1. The sum of the eigenvalues of a matrix is equal to the trace of the matrix (sum of main diagonal elements).
2. The product of the eigenvalues is equal to the determinant of the matrix.
3. If $\lambda$ is an eigenvalue of $A$, then $\lambda^k$ is an eigenvalue of $A^k$.
4. If $A$ is non-singular, then $1/\lambda$ is an eigenvalue of $A^{-1}$.

---

## 2. Cayley-Hamilton Theorem

**Statement:** Every square matrix satisfies its own characteristic equation.

If the characteristic equation of $A$ is:
$$ \lambda^n + c_1\lambda^{n-1} + c_2\lambda^{n-2} + \dots + c_n = 0 $$
Then, according to the Cayley-Hamilton Theorem:
$$ A^n + c_1A^{n-1} + c_2A^{n-2} + \dots + c_n I = 0 $$

### Applications
1. **Finding Inverse:** Multiply the equation by $A^{-1}$ to easily compute the inverse of large matrices without finding cofactors.
2. **Finding High Powers:** $A^k$ can be expressed in terms of lower powers of $A$.

---

## 3. Quadratic Forms & Orthogonal Reduction

A **quadratic form** in $n$ variables is a homogeneous polynomial of degree two.
In matrix notation, it is written as:
$$ Q = X^T A X $$
Where $A$ is a symmetric matrix.

### Matrix of a Quadratic Form
If $Q = ax_1^2 + bx_2^2 + cx_3^2 + 2h x_1 x_2 + 2g x_1 x_3 + 2f x_2 x_3$, the corresponding symmetric matrix is:
$$ A = \begin{bmatrix} a & h & g \\ h & b & f \\ g & f & c \end{bmatrix} $$

### Reduction to Canonical/Normal Form
We can reduce a quadratic form to canonical form (sum of squares: $y_1^2 + y_2^2 + \dots$) using **Orthogonal Transformation**:
1. Find the eigenvalues and normalized eigenvectors of the symmetric matrix $A$.
2. Form the modal matrix $P$ (columns are eigenvectors).
3. The normalized modal matrix is $N$ (where elements are divided by magnitude of eigenvectors).
4. The orthogonal transformation is $X = NY$.
5. The canonical form takes the shape $D = N^T A N$, which is a diagonal matrix containing the eigenvalues.

**Nature of Quadratic Form:**
- **Positive Definite:** All eigenvalues are > 0.
- **Negative Definite:** All eigenvalues are < 0.
- **Positive Semi-Definite:** Eigenvalues $\ge 0$ (at least one is 0).
- **Negative Semi-Definite:** Eigenvalues $\le 0$ (at least one is 0).
- **Indefinite:** Eigenvalues have both positive and negative signs.

---

## 4. Solved Example

**Find the characteristic equation of $$ A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} $$**

**Solution:**
Characteristic equation is $|A - \lambda I| = 0$
$$ \begin{vmatrix} 1-\lambda & 2 \\ 3 & 4-\lambda \end{vmatrix} = 0 $$
$$ (1-\lambda)(4-\lambda) - 6 = 0 $$
$$ \lambda^2 - 5\lambda + 4 - 6 = 0 $$
$$ \lambda^2 - 5\lambda - 2 = 0 $$

---

## 5. Frequently Asked Questions (PYQs)

<details>
<summary><strong>Q: What is a modal matrix?</strong></summary>
A modal matrix is formed by placing the eigenvectors of a matrix as its column vectors. It is used to diagonalize the original matrix.
</details>

<details>
<summary><strong>Q: State Cayley Hamilton Theorem. (2 Marks)</strong></summary>
Every square matrix satisfies its own characteristic algebraic equation.
</details>

<details>
<summary><strong>Q: Verify Cayley Hamilton theorem for a given 2x2 matrix.</strong></summary>
Step 1: Find $|A - \lambda I| = 0$. Step 2: Replace $\lambda$ with $A$. Step 3: Compute $A^2$ and verify the equation yields the zero matrix.
</details>
