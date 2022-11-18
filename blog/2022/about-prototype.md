---
title: 实例化对象的prototype是什么？带你搞明白到底什么是原型、原型链
des: __proto__、prototype、constructor到底是什么？带你一步步搞明白
createTime: 2022-3-14
---

## 实例化对象的`prototype`是什么？带你搞明白到底什么是原型、原型链

### 前言
首先原型、原型链，算是前端进阶里面必不可少，十分重要的一块了。在面试，面试官很喜欢用这一块来辨别你的底层知识掌握的怎么样；用的第三方框架，库里面，很多功能模块化了，但大部分功能都继承自一个基类。既然涉及到继承，那必不可少得先了解原型链，所以了解原型、原型链对我们使用第三方的框架、库也有着很大的帮助。  

### 为什么大家对原型，原型链子会感到“懵”跟“绕”
其本质是因为，**大家都没理清楚`__proto__`、`prototype`、`constructor`三者的联系**。所以很多人在看这一块知识的时候，刚开头看可能还能理解，看久了就懵了，因为代码中充斥着各种`x.__proto__.__proto__`，`x.__proto__.constructor.prototype`，`x.prototype.__proto__`等等，这当然会懵掉。所以我们要理解原型、原型链是什么，一定要先搞明白，`__proto__`、`prototype`、`constructor`这三个到底是个什么东西，再弄明白它们三个是什么联系。  

下面我会用比较通俗的话来解释，带着大家更好的理解原型，原型链是什么（因为为了大家更好的理解，所以有些地方可能会稍微有点不恰当，敬请见谅）。  

为了更好的理解，我们用以下变量作为例子跟话术：
 - `People`为构造函数
 - `person`为由`People`实例出来的一个对象
 - `Object`为构造所有对象的顶级基类构造函数
 - `Function`为构造所有函数的顶级基类构造函数

### `__proto__`
这个属性可以通俗的理解成，**所有对象都拥有的一个私有属性（函数也是一种特殊的对象，所以构造函数也会有这个属性）**。所以我们会看到`person.__proto__`、`People.prototype.__proto__`、`People.__proto__`、`Object.__proto__`、`Function.__proto__`等描述。



### `prototype`
这个属性可以通俗的理解成，**专属于函数自身的一个属性（可用`hasOwnProperty`验证）**，所以实例出来的对象不会有，只有**函数、构造函数**会有。我们通常都会把`构造函数.prototype`看做一个整体，它代表的是，这个函数的`prototype`里，所有的属性方法等（`People.prototype`代表`People.prototype`这个**整体**里，所有的属性与方法）。所以我们会看到`person.__proto__.prototype`、`People.prototype`、`Object.prototype`、`Function.prototype`等描述，但一定不会看到`实例.prototype`（`person.prototype`）。

> 例外：  
> - 箭头函数没有`prototype`，箭头函数也不能拿来做构造函数
> - 使用`bind`方法创造出来的副本函数也没有`prototype`

这两个是例外，大家记得就好，但不影响我们的理解。

### `constructor`
这个属性也可以通俗的理解成，**所有对象都拥有的一个属性**。可以用`对象.constructor.name`来查看当前构造函数的名字是什么（`person.constructor.name`返回`People`，因为`person`由`People`构造实例而来）。所以我们也会看到`person.constructor`、`People.prototype.constructor`、`People.constructor`等描述。

ok，介绍完这三个属性，我们再来看看这三者有什么联系。


### `__proto__`、`prototype`、`constructor`这三者到底是什么联系

我们看看下面例子：
````javascript
// 定义一个People构造函数
function People () {

}

// 实例化一个person对象
const person = new People();

// 打印true --> 说明实例的__proto__与实例的构造函数的prototype相等
console.log(person.__proto__ === People.prototype); 

// 打印true --> 说明constructor是构造函数的prototype里“自身”的一个属性
console.log(People.prototype.hasOwnProperty('constructor'));

// 打印true --> 说明非顶级构造函数的prototype.constructor指回这个构造函数本身
console.log(People.prototype.constructor === People);

// 打印true --> 说明实例的__proto__.constructor 就是 构造函数的prototype.constructor（由第一个打印可知person.__proto__ = People.prototype）
console.log(person.__proto__.constructor === People.prototype.constructor);

// 打印People --> 说明实例的constructor指的就是实例的构造函数
console.log(person.constructor.name);

// 打印fale --> 说明实例自身是没有的constructor属性的
console.log(person.hasOwnProperty('constructor'));

// 打印true, true --> 说明实例自身是没有的constructor属性的
// 它是继承自实例的__proto__.constructor，即实例的构造函数的prototype.constructor
console.log(person.constructor === person.__proto__.constructor, person.constructor === People.prototype.constructor);

````


解析：  
- `__proto__`跟`prototype`是什么联系：  
  如果有一个实例，它是由一个构造函数实例而来，那么这个实例的`__proto__`一定指向这个构造函数的`prototype`，即`person.__proto__ = People.prototype`
- `prototype`跟`constructor`是什么联系：  
  `constructor`就是某个构造函数的`prototype`**自身**的一个属性（用`hasOwnProperty`可验证），它指向的就是这个构造函数本身，即`People.prototype.constructor = People`
- `__proto__`跟`constructor`是什么联系：  
  `__proto__`跟`constructor`的联系跟`prototype`与`constructor`的联系一样。因为以`.__proto__`结尾的，它最后一定**指向某个构造函数的原型对象（`People.prototype`）**，然后又由于`constructor`是某个构造函数的`prototype`**自身**的一个属性，因此我们可以这么看：`person.__proto__.constructor = People.prototype.constructor`


ok，看到这里，大家可以先暂停一下，整理一下思路。理一理什么是`__proto__`、`prototype`、`constructor`；然后再理一理`__proto__`、`prototype`、`constructor`这三者之间的联系。然后接下来进入最让我们蒙圈的东西——原型链。


### 什么是原型链
当我们用构造函数`People`实例化了一个对象`person`后，访问`person`的方法或者属性时，会先在实例`person`**自身**找有没有对应的方法属性。有值的话，则返回值，没有的话则去`person.__proto__`（`People.prototype`）里找；有值的话，则返回值，没有的话，又会去`People.prototype.__proto__`（`Object.prototype`）里找。有值的话，则返回值；没有的话，又会去`Object.prototype._proto__`里找，但是`Object.prototype.__proto__`返回`null`，原型链到顶，一条条原型链搜索完毕，都没有，则返回`undefined`。   

**在查找的过程中会遍历以上的一条链，这条链就是原型链**。上述的过程可以这么看（这个过程也是实现继承的核心）：

![原型链查找过程](../md/about-prototype/pic_1.png)

经过上述的知识点，相信大家对原型链应该有个基本的认识里吧，现在我们来总结一下，看看有没有什么方法规律。

### 方法总结
在看到一堆类似`.__proto__.__proto__.__proto__`、`.__proto__.__proto__.prototype`、`.__proto__.prototype.consturtor`什么的，先不要慌：
  1. 我们直接看最后一个属性，看看是以什么结尾，心里有个大概知道最后的返回值是什么
  2. 然后再一步步反推前面调用的都是什么对象，
  3. 再推出它最后具体返回值的是什么。

> **重点额外说明**：
  - 如果最后以`.__proto__`结尾，它最后返回的一定是某个构造函数的`prototype`（`Object.prototype.__proto__`除外，它到顶了，是原型链的顶端，返回`null`）
    <!-- - 它最后一定**指向某个构造函数的原型对象（`构造函数.prototype`）**， -->

 - 如果是以`.prototype`结尾，那么它前面一定是个构造函数，因为只有函数才会有`prototype`属性（因为一般以`.prototype`结尾返回的都是这个构造函数的`prototype`所有的方法与属性，所以题目很少会以`.prototype`结尾）

 - 如果是以`.constructor`结尾，先弄清楚前面是什么；
    - 如果前面是实例，它返回的是创造实例的那个构造函数；
    - 如果前面直接是顶级类构造函数或者是普通构造函数（`Function.constructor`或者`People.constructor`），它将会指向这个构造函数的顶级构造函数`Function`（所有构造函数都是函数，都由顶级构造函数`Function`而来，所以`constructor`当然指向它；
    - 如果前面直接是普通构造函数（`People.constructor`），它将会返回`Function`，因为构造函数也是函数，当然由函数顶级基类构造函数`Function`构造而来
    - 如果前面是非顶级构造函数的`prototype`（`People.prototype`），因为实例的`constructor`是继承自`普通构造函数.prototype.constructor`的，所以`普通构造函数.prototype.constructor`必须指回它自己，（`普通构造函数.prototype.constructor = 普通构造函数`）。针对这点，我们看看它是怎么继承来的。

    `constructor`整个继承的流程是：在实例`person`本身查找，找不到去`person.__proto__`（`People.prototype`）找，发现有`People.prototype.constructor`，又因为`People.prototype.constructor = People`返回它，所以`person.constructor = People`。
    流程如图所示：  
    ![原型链图](../md/about-prototype/pic_2.png)


ok，经过上面的方法总结，还有重点额外说明，我们还是用上面那个例子试试：
```javascript
// 定义一个People构造函数
function People() {

}

// 实例化一个person对象
const person = new People();

// 第一题
console.log(People.__proto__);

// 第二题
console.log(People.constructor);

// 第三题
console.log(person.prototype);

// 第四题
console.log(person.__proto__.__proto__);

// 第五题
console.log(People.__proto__.prototype);

// 第六题
console.log(person.__proto__.__proto__.constructor);

// 第七题
console.log(Object.__proto__);
```

- 我们以第一道题为例，解析一下：
  1. 先看是以什么结尾。以`.__proto__`
  2. ok，心里有个大概了，它肯定返回某个构造函数的`prototype`
  3. 再反推一下前面是调用的都是什么对象。前面是`People`，`People`是什么？是构造函数，函数都有一个顶级基类构造函数，那就是`Function`，所以`People.__proto__`返回的就是`Function.prototype`。

- 我们以第二道题为例，解析一下：
  1. 先看是以什么结尾。以`.constructor`
  2. 调用对象又是普通构造函数，ok，心里有个大概了，它肯定返回某个构造函数的本身
  3. 再反推一下前面是调用的都是什么对象。大家是不是以为返回值是`People`本身，其实不是喔，前面是`People`，`People`是什么？是构造函数，那就是构造函数的`constructor`，那它当然返回顶级基类构造函数`Function`。（`People`自身没有`constructor`，它继承自`Function.prototype.constructor`）

- 我们再以第六道题为例，解析一下：
  1. 先看是以什么结尾。以`.constructor`
  2. ok，心里有个大概了，它肯定返回某个构造函数的本身
  3. 再反推一下前面是调用的都是什么对象。先看`person.__proto__`，返回的是`People.prototype`，那这题就变成了`People.prototype.__proto__.constructor`。再继续看，`People.prototype.__proto__`返回的是什么，`Object.prototype`，那这题实际就是`Object.prototype.constructor`。根据第二点，那它返回的就是`Object`本身，`Object`是一个所有对象顶级基类构造函数。


> 大家一定要注意，`Object.__proto__`跟`Function.__proto__`。`Object`跟`Function`都是顶级构造函数，所以`Object.__proto__`、`Function.__proto__`返回的都是`Function.prototype`



### 牛刀小试
根据上面对`__proto__`、`prototype`、`constructor`的特点总结，还有方法总结，我们可以拿下面这道题来试试，如果大家都可以正确无误的答出来，那大家对原型应该就了解的差不多了
```javascript
function Person(name) {
    this.name = name
}
var p2 = new Person('king');

console.log(p2.__proto__); // Person.prototype

console.log(p2.__proto__.__proto__); // Object.prototype

console.log(p2.__proto__.__proto__.__proto__); // null

console.log(p2.__proto__.__proto__.__proto__.__proto__); // 报错

console.log(p2.constructor); // Person

console.log(p2.prototype); // undefined

console.log(Person.constructor); // Function

console.log(Person.prototype); // 输出Person.prototype这个对象里所有的方法和属性

console.log(Person.prototype.constructor); // Person

console.log(Person.prototype.__proto__); // Obejct.prototype

console.log(Person.__proto__); // Fuction.prototype

console.log(Function.prototype.__proto__); // Obeject.prototype

console.log(Function.__proto__); // Function.prototype

console.log(Object.__proto__); // Function.prototype

console.log(Object.prototype.__proto__); // null
``` 


### 最后
看到这里，文章的标题，大家知道答案了吗？  

原型、原型链本来就挺绕的，所以大家先了解`__proto__`、`prototype`、`constructor`是什么，再明白它们之间的是什么联系，循环渐进。等理解以后，多画几遍原型链图加深理解。OK，最后祭出一张原型链图：
> **红色链表示的就是实例`person`原型链**

![原型链图](../md/about-prototype/pic_3.png)


写着写着，发现又写了一大堆，希望能够帮助到大家。如果觉得觉得写得好的，有帮助到的，欢迎大家点赞，也欢迎大家评论交流。  

既然明白了什么是原型链，那还不赶紧趁热打铁，进阶看看什么是[JS继承](https://limingcan562.github.io/posts/js-inherit)吧！

