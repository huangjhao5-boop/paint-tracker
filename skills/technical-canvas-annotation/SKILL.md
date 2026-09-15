---
name: technical-canvas-annotation
description: >
  Universal engineering blueprint annotation, collision-free leader line routing,
  and perceptual color matching (CIELAB Delta-E) engine for HTML5 Canvas and
  interactive web applications. Use when building technical manuals, CAD viewers,
  product labeling, medical imaging, or model paint tracking tools.
---

# Technical Canvas Annotation & Perceptual Color Matching Engine

A universal algorithm suite for technical diagramming, CAD assembly manuals, and product labeling on 2D Canvases (HTML5 Canvas, SVG, Fabric.js, Konva).

---

## 🛠️ Feature Modules (核心功能模組)

### Module 1: Topological Collision-Free Leader Line Routing (拓撲無交叉引線排版)

When multiple annotation pins exist on an image, placing labels randomly causes messy overlapping lines. This engine guarantees **zero leader line crossing** and clean technical manual aesthetics.

#### 1. Bilateral Partitioning (雙翼分區)
Split annotations based on the canvas horizontal center $X_{\text{mid}} = \frac{W}{2}$:
- Left Wing: $x_i < X_{\text{mid}}$
- Right Wing: $x_i \ge X_{\text{mid}}$
*(Rebalance if one side is heavily skewed).*

#### 2. Topological Y-Sorting (拓撲 Y 軸排序)
Sort items strictly by their anchor coordinate $y$:
$$\text{Sort by } y_i \text{ ascending}$$
**Mathematical Guarantee**: Connecting anchor points $(x_i, y_i)$ to outer margin slots $(X_{\text{slot}}, Y_{\text{slot}})$ in strict $y$-order mathematically prevents two lines from intersecting in planar geometry.

#### 3. Slot Allocation with Spacing (安全槽位分配)
For each annotation $i$, compute its dynamic box height $H_i$. Distribute slots along the perimeter margins with a uniform gap $g \ge 8\text{px}$:
$$Y_{\text{slot}, i} = \max(Y_{\text{min}}, \text{Current } Y)$$
$$\text{Current } Y \leftarrow Y_{\text{slot}, i} + H_i + g$$

#### 4. CAD Orthogonal / Elbow Routing (正交折角導引線)
Instead of a single direct oblique line, draw a 3-point orthogonal line:
1. Start at Pin: $(x_{\text{pin}}, y_{\text{pin}})$
2. Elbow Point: $(x_{\text{elbow}}, y_{\text{slot}} + H/2)$
3. Terminal Anchor: $(x_{\text{slot}}, y_{\text{slot}} + H/2)$

---

### Module 2: CIELAB Delta-E Perceptual Color Matching Engine (色差感知比對)

Human eyes perceive color differences non-linearly (e.g., highly sensitive to greens and slight shade differences). Pure RGB Euclidean distance produces erroneous matches. This engine converts to CIELAB space and computes CIE76 $\Delta E^*$.

#### 1. Color Sampling (3x3 Area Anti-Aliasing)
Sample a 3x3 pixel matrix centered at $(x, y)$ to suppress sensor noise, specular highlights, and compression artifacts:
$$R_{\text{avg}} = \frac{1}{N} \sum_{dx=-1}^{1} \sum_{dy=-1}^{1} R(x+dx, y+dy)$$

#### 2. sRGB to CIE XYZ
Apply gamma correction and linear transformation:
$$V_{\text{lin}} = \begin{cases} \frac{V}{12.92} & \text{if } V \le 0.04045 \\ \left(\frac{V + 0.055}{1.055}\right)^{2.4} & \text{if } V > 0.04045 \end{cases}$$
$$\begin{bmatrix} X \\ Y \\ Z \end{bmatrix} = \begin{bmatrix} 0.4124564 & 0.3575761 & 0.1804375 \\ 0.2126729 & 0.7151522 & 0.0721750 \\ 0.0193339 & 0.1191920 & 0.9503041 \end{bmatrix} \begin{bmatrix} R_{\text{lin}} \\ G_{\text{lin}} \\ B_{\text{lin}} \end{bmatrix} \times 100$$

#### 3. CIE XYZ to CIELAB ($L^*, a^*, b^*$)
Using reference white point D65 ($X_n = 95.047, Y_n = 100.0, Z_n = 108.883$):
$$f(t) = \begin{cases} t^{1/3} & \text{if } t > 0.008856 \\ 7.787 \cdot t + \frac{16}{116} & \text{otherwise} \end{cases}$$
$$L^* = 116 \cdot f\left(\frac{Y}{Y_n}\right) - 16$$
$$a^* = 500 \cdot \left[ f\left(\frac{X}{X_n}\right) - f\left(\frac{Y}{Y_n}\right) \right]$$
$$b^* = 200 \cdot \left[ f\left(\frac{Y}{Y_n}\right) - f\left(\frac{Z}{Z_n}\right) \right]$$

#### 4. Delta-E ($\Delta E^*$) & Similarity Score
$$\Delta E^* = \sqrt{(L_1^* - L_2^*)^2 + (a_1^* - a_2^*)^2 + (b_1^* - b_2^*)^2}$$
$$\text{Similarity Score (\%)} = \max\left(10, \min\left(99, \text{round}(100 - \Delta E^* \times 1.35)\right)\right)$$

Matches with $\Delta E^* < 2.0$ indicate virtually indistinguishable colors to the human eye.
