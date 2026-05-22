---
title: "Unit 5: Multiple Integrals - Engineering Mathematics (JNTUK R23)"
description: "Comprehensive notes, solved examples, and PYQs for Unit 5 Multiple Integrals, Double and Triple Integration."
---

# Unit 5: Multiple Integrals

## 1. Double Integrals

A double integral is defined over a 2D region $R$ in the xy-plane and represents the volume under the surface $z = f(x,y)$.
$$ \iint_R f(x,y) dA = \int \int f(x,y) dx dy $$

### Evaluation over a Region
1. **Vertical Strips:** If the region $R$ is bound by $x=a$ to $x=b$ and $y=g_1(x)$ to $y=g_2(x)$:
   $$ I = \int_{x=a}^{b} \int_{y=g_1(x)}^{g_2(x)} f(x,y) dy dx $$
   (Integrate w.r.t $y$ first).
   
2. **Horizontal Strips:** If bounded by $y=c$ to $y=d$ and $x=h_1(y)$ to $x=h_2(y)$:
   $$ I = \int_{y=c}^{d} \int_{x=h_1(y)}^{h_2(y)} f(x,y) dx dy $$
   (Integrate w.r.t $x$ first).

---

## 2. Change of Order of Integration

Sometimes a double integral is extremely difficult or impossible to solve in the given order (e.g., $dx dy$), but trivial to solve if the order is reversed ($dy dx$).
**Steps to change order:**
1. Identify the current limits and draw the bounded region.
2. If given in vertical strips, slice the region using horizontal strips (and vice versa).
3. Find the new limits from the diagram and perform the integration.

---

## 3. Change of Variables (Polar Coordinates)

When the region is circular or the integrand contains $x^2 + y^2$, it is often easiest back to transform Cartesian coordinates $(x,y)$ into Polar coordinates $(r, \theta)$.

**Transformations:**
- $x = r \cos \theta$
- $y = r \sin \theta$
- $dx dy = r dr d\theta$
- $x^2 + y^2 = r^2$

The integral becomes:
$$ \iint_R f(x,y) dx dy = \iint_{R'} f(r \cos\theta, r \sin\theta) \, r \, dr d\theta $$

---

## 4. Triple Integrals

A triple integral incorporates a third dimension, usually over a volume region $V$:
$$ \iiint_V f(x,y,z) dx dy dz $$

Volume of a bounded solid can be directly computed using:
$$ Volume = \iiint_V 1 \, dx dy dz $$

### Spherical Coordinates Transformation
For regions involving spheres:
- $x = \rho \sin\phi \cos\theta$
- $y = \rho \sin\phi \sin\theta$
- $z = \rho \cos\phi$
- Jacobian $|J| = \rho^2 \sin\phi \implies dx dy dz = \rho^2 \sin\phi \, d\rho d\phi d\theta$

---

## 5. Applications

1. **Area of a Region:** $Area = \iint_R 1 \, dA$
2. **Volume of a Solid:** $Volume = \iint_R f(x,y) \, dA$ (where $f(x,y)$ represents the height of the surface).
3. **Center of Mass / Centroid:** Uses integrals weighted by density functions.

---

## 6. Frequently Asked Questions (PYQs)

<details>
<summary><strong>Q: Why do we add an 'r' when changing to polar coordinates?</strong></summary>
The 'r' comes from the Jacobian determinant of the transformation matrix between Cartesian and polar coordinates. It accounts for the stretching of the area element in polar space.
</details>

<details>
<summary><strong>Q: (PYQ 2024) Change the order of integration and evaluate $ \int_0^1 \int_x^1 e^{y^2} dy dx $.</strong></summary>
The given integral cannot be done w.r.t $y$ first since $e^{y^2}$ has no elementary antiderivative. Bounded by $y=x$, $y=1$, $x=0$, $x=1$. Reversing order: new limits are $x=0$ to $x=y$ and $y=0$ to $1$. The integral becomes $\int_0^1 \int_0^y e^{y^2} dx dy = \int_0^1 y e^{y^2} dy$, which solves to $\frac{1}{2}(e - 1)$.
</details>
