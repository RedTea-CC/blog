分享最近几年（大概处于2019-2024年之间）新增的JavaScript的字符串、数组、对象方法，一些新增的方法更加简单、高效。

# 字符串

## `String.prototype.replaceAll()`

替换字符串中所有匹配的子串。

之前使用 `replace` 时想替换所有项，需要使用正则表达式，`replaceAll`更加方便。

```js
let str = "apple, banana, apple, orange";

// 使用 replace 和正则表达式全局标志 'g'
let newStr = str.replace(/apple/g, "pear");
let newStr1 = str.replaceAll("apple", "pear");

console.log(newStr);  // 输出: "pear, banana, pear, orange"
console.log(newStr1);  // 输出: "pear, banana, pear, orange"
```

# 数组

## `Array.prototype.flat()` 和 `flatMap()`

`flat(depth)`方法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中(数组扁平化，将嵌套数组按指定深度展平)。

参数depth，指定要提取嵌套数组的结构深度，默认值为 1。

`flatMap()`：先对数组元素执行映射，再展平一层。

等价于在调用 `map()`方法后再调用深度为 1 的 `flat()` 方法（`arr.map(...args).flat()`）。

```js
[1, [2, [3]]].flat(2); // 输出 [1, 2, 3]

[1, 2].flatMap(x => [x * 2]); // 输出 [2, 4]

// 简单实现flat
function myFlat(arr, depth = 1) {
  return depth > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? myFlat(val, depth - 1) : val),
        []
      )
    : arr.slice();
}
```

## `Array.prototype.at()`

`at(index)` 方法接收一个整数值并返回该索引对应的元素，允许正数和负数。

与直接使用 `[]` 访问的区别：

- 负数索引支持：
    
    - `at()` 方法： 支持负数索引，允许从数组的末尾开始计数。例如，`arr.at(-1)` 返回数组的最后一个元素，`arr.at(-2)` 返回倒数第二个元素。
        
    - `[]` 访问： 不直接支持负数索引。要访问倒数第一个元素，需要使用 `arr[arr.length - 1]`。
        
- 越界访问：
    
    - `at()` 方法： 如果索引超出数组的范围，`at()` 返回 `undefined`，这使得代码在处理越界索引时更具可预测性。
        
    - `[]` 访问： 如果使用负数索引或其他，参数会被解释为一个属性名 `"-1"`，可能会导致访问到数组的原型链上的属性。
        

在`at()`中:

如果 `index < 0`，则会访问 `index + array.length` 位置的元素。

如果 `index < -array.length` 或 `index >= array.length`，则直接返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

```js
const arr = [1, 2, 3];
arr.at(-1); // 输出 3（等价于arr[ -1 + arr.length ]）
```

## `Array.prototype.with()`

`with(index, value)` 方法返回一个新数组，该数组是原数组的一个副本，但指定索引处的元素被替换为新的值。

- 负数索引会从数组末尾开始计数——即当 `index < 0` 时，会使用 `index + array.length`。
    
- 如果规范化后的索引超出数组边界，会抛出 [`RangeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError)。
    

```js
const arr = [1, 2, 3, 4, 5];
const newArr = arr.with(2, 99);  // 将索引2处的元素替换为99
console.log(newArr);  // 输出: [1, 2, 99, 4, 5]
console.log(arr);     // 输出: [1, 2, 3, 4, 5] (原数组不变)
```

当需要更新数组中特定位置的元素但不想修改原数组时，可以使用 `with()` 方法。

## 反向操作版本

### Array.prototype.findLast()

`findLast()` 方法返回数组中满足提供的测试函数的最后一个元素，类似 `find()` 的反向操作。如果没有找到，则返回 `undefined`。

```js
const arr = [5, 12, 8, 130, 44];
const found = arr.findLast(element => element > 10);
console.log(found);  // 输出: 44
```

当需要在数组中查找符合条件的最后一个元素时，可以使用 `findLast()` 方法。

### Array.prototype.findLastIndex()

`findLastIndex()` 方法返回数组中满足提供的测试函数的最后一个元素的索引，类似 `findIndex()` 的反向操作。。如果没有找到，则返回 `-1`。

```js
const arr = [5, 12, 8, 130, 44];
const index = arr.findLastIndex(element => element > 10);
console.log(index);  // 输出: 4 (因为44是最后一个大于10的元素)
```

当需要在数组中查找符合条件的最后一个元素的索引时，可以使用 `findLastIndex()` 方法。

## 复制数组版本

新增的方法`toReversed()`、`toSorted()`、`toSpliced()` 。

与传统的 `reverse()`、`sort()`、`splice()` 方法不同，这些新方法不会修改原始数组，

# 对象

## `Object.fromEntries()`

将键值对列表（如`Map`或二维数组）转换为对象。

应用场景：与`Object.entries()`结合，实现对象与数组的转换。

```js
Object.fromEntries([['a', 1], ['b', 2]]); // 输出 { a: 1, b: 2 }

Object.entries({ a: 1, b: 2 }); // ['a', 1], ['b', 2]])
```

## `Object.groupBy()`

`Object.groupBy()` 方法：根据指定的条件对数组或其他可迭代对象进行分组，返回一个对象，其中每个属性对应一个分组。

应用场景：对元素进行分组。

注意，属性名为字符串，如果你需要使用某个任意值作为键来对元素进行分组，请改用 `Map.groupBy()` 方法。

```js
const inventory = [
  { name: "芦笋", type: "蔬菜", quantity: 5 },
  { name: "香蕉", type: "水果", quantity: 0 },
  { name: "山羊", type: "肉", quantity: 23 },
  { name: "樱桃", type: "水果", quantity: 5 },
  { name: "鱼", type: "肉", quantity: 22 },
];

function myCallback({ quantity }) {
  return quantity > 5 ? "more" : "less";
}

const result2 = Object.groupBy(inventory, myCallback);

console.log(result2);
/* 结果是：
  {
    less: [
      { name: "芦笋", type: "蔬菜", quantity: 5 },
      { name: "香蕉", type: "水果", quantity: 0 },
      { name: "樱桃", type: "水果", quantity: 5 }
    ],
    more: [
      { name: "山羊", type: "肉", quantity: 23 },
      { name: "鱼", type: "肉", quantity: 22 }
    ]
  }
  */
```

# 兼容性

除了`Object.groupBy()`比较新，浏览器2023年底开始支持，其他方法都在2022之前。

Nodejs兼容

|          |                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Nodejs版本 | 方法                                                                                                                              |
| 21.0.0   | Object.groupBy()                                                                                                                |
| 20.0.0   | Array.prototype.with()<br><br>Array.prototype.toSorted()<br><br>Array.prototype.toReversed()<br><br>Array.prototype.toSpliced() |
| 19.0.0   |                                                                                                                                 |
| 18.0.0   | Array.prototype.findLast()<br><br>Array.prototype.findLastIndex()                                                               |
| 16.6.0   | Array.prototype.at()                                                                                                            |
| 15及以下    | Object.fromEntries()<br><br>String.prototype.replaceAll()<br><br>Array.prototype.flat() 和 flatMap()                             |

---

# 数组方法分类
#数组分类

|                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ## 改变原数组                                                                                                                                                                                                                                                                                                 | ## 返回新数组                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| - `push()`：在数组末尾添加一个或多个元素。<br>    <br><br>- `pop()`：删除数组末尾的一个元素。<br>    <br><br>- `shift()`：删除数组开头的一个元素。<br>    <br><br>- `unshift()`：在数组开头添加一个或多个元素。<br>    <br><br>- `splice()`：从数组中添加、删除或替换元素。<br>    <br><br>- `reverse()`：反转数组的顺序。<br>    <br><br>- `sort()`：对数组元素进行排序。<br>    <br>- `copyWithin()` | - `concat()`：连接两个或多个数组，返回一个新数组。<br>    <br>- `slice()`：返回数组的浅拷贝，包含从开始到结束（不包括结束）之间的所有元素。<br>    <br>- `join()`：将数组的所有元素连接成一个字符串。<br>    <br>- `map()`：对数组的每个元素执行指定函数，返回一个新数组。<br>    <br>- `filter()`：创建一个包含所有通过测试的元素的新数组。<br>    <br><br>- `reduce()`：对数组中的每个元素执行指定的累加器函数，返回一个单一的值。<br>    <br><br>- `flat()`：将多维数组“拉平”为一维数组。<br>    <br>- `flatMap()`：先对数组的每个元素执行指定函数，然后将结果“拉平”为一维数组。<br>    <br><br>- `toReversed()`：返回一个新数组，元素顺序与原数组相反。<br>    <br>- `toSorted()`：返回一个新数组，元素按指定顺序排序。<br>    <br>- `toSpliced()`：返回一个新数组，删除或替换指定位置的元素。<br>    <br>- `with()`：返回一个新数组，指定位置的元素被替换为新值。 |
