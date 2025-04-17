# drop-shadow和box-shadow
## drop-shadow

CSS 的 `filter` 属性中的 `drop-shadow()` 函数用于为元素应用类似于 `box-shadow` 的效果，但有一些关键区别：
`box-shadow` 属性在元素的整个框后面创建一个矩形阴影，而 `drop-shadow()` 过滤器则是创建一个符合图像本身形状 (alpha 通道) 的阴影。
### 用法

`drop-shadow()` 是 `filter` 属性的一部分，用于为元素添加投影。其语法如下：

```css
filter: drop-shadow(offset-x offset-y blur-radius color);
```

- **`offset-x`**：阴影在水平方向上的偏移量，可以为正值（右移）或负值（左移）。
- **`offset-y`**：阴影在垂直方向上的偏移量，可以为正值（下移）或负值（上移）。
- **`blur-radius`**：阴影的模糊半径，值越大阴影越模糊；为 0 时，阴影完全清晰。
- **`color`**：阴影的颜色，可以是任何合法的 CSS 颜色值。

### 示例代码

#### 基本示例：

```css
div {
  width: 100px;
  height: 100px;
  background-color: red;
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5));
}
```

- 水平方向偏移：`5px`
- 垂直方向偏移：`5px`
- 模糊半径：`10px`
- 颜色：`rgba(0, 0, 0, 0.5)`（半透明黑色）

#### 与透明背景一起使用：

`drop-shadow()` 会考虑元素的不透明区域，而忽略透明部分，非常适合应用于透明图片或 SVG。

```css
img {
  filter: drop-shadow(3px 3px 5px gray);
}
```

- 如果图片是透明背景，阴影只会出现在图片的非透明部分边缘。

#### 动态效果（结合 `hover` 使用）：

```css
button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  filter: drop-shadow(2px 2px 5px black);
  transition: filter 0.3s ease;
}

button:hover {
  filter: drop-shadow(4px 4px 10px black);
}
```

- 鼠标悬停时，阴影会变得更深和更大。

### 注意事项

1. **与 `box-shadow` 的区别**：
    - `drop-shadow()` 仅作用于元素的<font color=#F36208>非透明区域</font>（如图片的内容部分），而 `box-shadow` 会直接围绕整个元素的边框。
2. **性能**：
    - `drop-shadow()` 是通过 GPU 加速的，性能通常比 `box-shadow` 更高，尤其是对复杂形状的元素（如 SVG）。
3. **兼容性**：
    - 支持现代主流浏览器（如 Chrome、Firefox、Edge 和 Safari），但可能在某些旧版浏览器中不完全支持。

### 高级应用

#### 多重阴影：

可以组合多个 `drop-shadow()`：

```css
img {
  filter: drop-shadow(2px 2px 5px red) drop-shadow(-2px -2px 5px blue);
}
```

- 为元素同时添加多个不同方向、不同颜色的阴影。

通过 `drop-shadow()`，可以轻松为透明图像和复杂形状创建真实感更强的投影效果！

##  `box-shadow`

CSS **`box-shadow`** 属性用于在元素的框架上添加阴影效果。你可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。
该属性可设置的值包括阴影的 X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色。
