---
title: "Unit 3: Calculus & Mean Value Theorems - Engineering Mathematics (JNTUK R23)"
description: "Comprehensive notes, solved examples, and PYQs for Unit 3 Differential Calculus and Mean Value Theorems."
---

# Unit 3: Calculus & Mean Value Theorems

## 1. Rolle’s Theorem

**Statement:**
If a function $f(x)$ satisfies the following three conditions:
1. It is continuous in the closed interval $[a, b]$.
2. It is differentiable in the open interval $(a, b)$.
3. $f(a) = f(b)$.
   
Then, there exists at least one real number $c \in (a, b)$ such that $f'(c) = 0$.

**Geometrical Interpretation:**
If a smooth curve starts and ends at the same height, there must be at least one point in between where the tangent is completely horizontal (slope is zero).

---

## 2. Lagrange’s Mean Value Theorem (MVT)

**Statement:**
If a function $f(x)$ is:
1. Continuous in $[a, b]$.
2. Differentiable in $(a, b)$.

Then, there exists at least one value $c \in (a, b)$ such that:
$$ f'(c) = \frac{f(b) - f(a)}{b - a} $$

**Geometrical Interpretation:**
There is at least one point on the curve where the tangent is parallel to the secant line joining the endpoints points $(a, f(a))$ and $(b, f(b))$.

---

## 3. Cauchy’s Mean Value Theorem

**Statement:**
If two functions $f(x)$ and $g(x)$ are:
1. Continuous in $[a, b]$.
2. Differentiable in $(a, b)$.
3. $g'(x) \neq 0$ for any $x \in (a, b)$.

Then, there exists at least one value $c \in (a, b)$ such that:
$$ \frac{f'(c)}{g'(c)} = \frac{f(b) - f(a)}{g(b) - g(a)} $$

---

## 4. Taylor’s and Maclaurin’s Series Expansion

### Taylor’s Series
If $f(x)$ and its derivatives are continuous in an interval containing $a$, then the expansion of $f(x)$ around $a$ is:
$$ f(x) = f(a) + (x-a)f'(a) + \frac{(x-a)^2}{2!}f''(a) + \frac{(x-a)^3}{3!}f'''(a) + \dots $$

### Maclaurin’s Series
Maclaurin’s series is a special case of Taylor’s series expanded at $x = 0$.
$$ f(x) = f(0) + xf'(0) + \frac{x^2}{2!}f''(0) + \frac{x^3}{3!}f'''(0) + \dots $$

**Important Expansions:**
- $e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots$
- $\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots$
- $\cos(x) = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots$
- $\log(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \dots$

---

## 5. Solved Example

**Verify Rolle's Theorem for $f(x) = x^2 - 4x + 3$ in $[1, 3]$.**

**Solution:**
1. $f(x)$ is a polynomial, thus continuous on $[1, 3]$ and differentiable on $(1, 3)$.
2. Calculate endpoints:
   $f(1) = 1^2 - 4(1) + 3 = 0$
   $f(3) = 3^2 - 4(3) + 3 = 0$
   Since $f(1) = f(3)$, Rolle's theorem conditions hold.
3. Find $f'(c) = 0$:
   $f'(x) = 2x - 4$
   $f'(c) = 2c - 4 = 0 \implies c = 2$
4. Since $2 \in (1, 3)$, Rolle's Theorem is verified.

---

## 5. Frequently Asked Questions (PYQs)

<details>
<summary><strong>Q: What is the failure condition for Rolle's Theorem?</strong></summary>
If the function is not continuous on the interval, not differentiable at any point inside the interval (e.g., has sharp corners like $|x|$), or if $f(a) \neq f(b)$.
</details>

<details>
<summary><strong>Q: How do you use Maclaurin's series?</strong></summary>
Find the successive derivatives of the function, evaluate them at $x=0$, and plug them into the infinite polynomial sum formula.
</details>
