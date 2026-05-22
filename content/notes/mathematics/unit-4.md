---
title: "Unit 4: Multivariable Calculus - Engineering Mathematics (JNTUK R23)"
description: "Comprehensive notes, solved examples, and PYQs for Unit 4 Partial Differentiation, Jacobians, and Maxima/Minima."
---

# Unit 4: Multivariable Calculus (Partial Differentiation)

## 1. Partial Derivatives

If $z = f(x, y)$ is a function of two independent variables $x$ and $y$, the partial derivative of $z$ with respect to $x$ (denoted as $\frac{\partial z}{\partial x}$) is obtained by differentiating $z$ with respect to $x$ while treating $y$ as a constant.

### Euler's Theorem for Homogeneous Functions
A function $f(x, y)$ is said to be homogeneous of degree $n$ if $f(tx, ty) = t^n f(x, y)$.

**Euler's Theorem:** If $u = f(x, y)$ is a homogeneous function of degree $n$, then:
$$ x \frac{\partial u}{\partial x} + y \frac{\partial u}{\partial y} = n u $$

---

## 2. Total Derivative

If $u = f(x, y)$ where $x = \phi(t)$ and $y = \psi(t)$, then $u$ is functionally a function of a single variable $t$. The total derivative is:
$$ \frac{du}{dt} = \frac{\partial u}{\partial x}\frac{dx}{dt} + \frac{\partial u}{\partial y}\frac{dy}{dt} $$

---

## 3. Jacobians

If $u(x,y)$ and $v(x,y)$ are functions of two independent variables $x$ and $y$, the Jacobian of $u$ and $v$ with respect to $x$ and $y$ is defined as the determinant:
$$ J(u,v) = \frac{\partial(u,v)}{\partial(x,y)} = \begin{vmatrix} \frac{\partial u}{\partial x} & \frac{\partial u}{\partial y} \\ \frac{\partial v}{\partial x} & \frac{\partial v}{\partial y} \end{vmatrix} $$

**Property:** If $u, v$ are functions of $r, s$ and $r, s$ are functions of $x, y$, then:
$$ \frac{\partial(u,v)}{\partial(x,y)} = \frac{\partial(u,v)}{\partial(r,s)} \times \frac{\partial(r,s)}{\partial(x,y)} $$

---

## 4. Maxima and Minima of Functions of Two Variables

To find the extreme values (maxima or minima) of $f(x, y)$:
1. Find stationary points by solving $\frac{\partial f}{\partial x} = 0$ and $\frac{\partial f}{\partial y} = 0$. Let a point be $(a,b)$.
2. Calculate second-order partial derivatives at $(a, b)$:
   - $r = \frac{\partial^2 f}{\partial x^2}$
   - $s = \frac{\partial^2 f}{\partial x \partial y}$
   - $t = \frac{\partial^2 f}{\partial y^2}$
3. Determine nature using $rt - s^2$:
   - If $rt - s^2 > 0$ and $r < 0 \implies$ Maximum at $(a,b)$.
   - If $rt - s^2 > 0$ and $r > 0 \implies$ Minimum at $(a,b)$.
   - If $rt - s^2 < 0 \implies$ Saddle Point (neither max nor min).
   - If $rt - s^2 = 0 \implies$ Test is inconclusive.

---

## 5. Method of Lagrange Multipliers

Used to find the extrema of $f(x, y, z)$ subject to a constraint condition $\phi(x, y, z) = 0$.

1. Construct the Lagrangian function:
   $$ L(x, y, z, \lambda) = f(x, y, z) + \lambda \phi(x, y, z) $$
2. Solve the system of equations to find stationary points:
   - $\frac{\partial L}{\partial x} = 0$, $\frac{\partial L}{\partial y} = 0$, $\frac{\partial L}{\partial z} = 0$, and $\phi(x, y, z) = 0$.

---

## 6. Frequently Asked Questions (PYQs)

<details>
<summary><strong>Q: What is a Jacobian matrix used for?</strong></summary>
It is primarily used in the transformation of coordinates to evaluate multiple integrals (change of variables).
</details>

<details>
<summary><strong>Q: What is a saddle point?</strong></summary>
A saddle point is a point on the surface of the graph of a function where the slopes (derivatives) are zero, but which is not a local extremum.
</details>
