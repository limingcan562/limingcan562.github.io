---
title: 带你搞明白到底什么是原型、原型链
des: __proto__、prototype、constructor到底是什么？带你一步步搞明白
createTime: 2022-3-14
---

## 带你搞明白到底什么是原型、原型链

### 前言
首先原型、原型链，算是前端进阶里面必不可少，十分重要的一块了。在面试，面试官很喜欢用这一块来辨别你的底层知识掌握的怎么样；用的第三方框架，库里面，很多功能模块化了，但大部分功能都继承自一个基类，所以了解原型、原型链对我们使用第三方的框架、库也有着很大的帮助。  

### 为什么大家对原型，原型链子会感到“懵”跟“绕”
其本质是因为，**大家都没理清楚`__proto__`、`prototype`、`constructor`三者的联系**。所以很多人在看这一块知识的时候，刚开头看可能还能理解，看久了就懵了，因为代码中充斥着各种`x.__proto__.__proto__`，`x.__proto__.constructor.prototype`，`x.prototype.__proto__`等等，这当然会懵掉。所以我们要理解原型、原型链是什么，一定要先搞明白，`__proto__`、`prototype`、`constructor`这三个到底是个什么东西，再弄明白它们三个是什么联系。  

下面我会用比较通俗的话来解释，带着大家更好的理解原型，原型链是什么（因为为了大家更好的理解，所以有些地方可能会稍微有点不恰当，敬请见谅）。  

为了更好的理解，我们用以下变量作为例子跟话术：
 - `People`为构造函数
 - `person`为由`People`实例出来的一个对象
 - `Object`为构造所有对象的基类构造函数
 - `Function`为构造所有函数的基类构造函数

### `__proto__`
这个属性可以通俗的理解成，**所有对象都拥有的一个私有属性（函数也是一种特殊的对象，所以构造函数也会有这个属性）**。它最后一定**指向某个对象（这个对象可能实例，也可能是构造函数）的原型（`对象.prototype`）**，所以我们会看到`person.__proto__`、`People.prototype.__proto__`、`People.__proto__`、`Object.__proto__`、`Function.__proto__`等表述。


<!-- > 但只有一个例外，那就是`Obeject.prototype.__proto__`，它的末端是`null`，所以我们看到`.__proto__`结尾时，一定要先判断前面是不是`Obeject.prototype`
因此我们可以总结`__proto__`以下特点：
- 对象都拥有的属性，构造函数也有
- 最后一定指向某个构造函数的`prototype`
- 构造函数的`__proto__`都直接指向`Function.prototype`（`People.prototype = Function.prototype`，构造函数本身就是函数，它的`__proto__`当然直接指向最原始的`Function.prototype`）
- 只有一个例外，`Obeject.prototype.__proto__`指向的是`null` -->

### `prototype`
这个属性可以通俗的理解成，**除了实例出来的对象没有，其他对象都拥有的一个属性**，它代表的是某个对象的原型对象的整体内容，返回的是这个对象的原型对象里，所有的东西（`People.prototype`代表`People.prototype`里面所有的属性与方法）。所以我们会看到`person.__proto__.prototype`、`People.prototype`、`Object.prototype`、`Function.prototype`等表述。

<!-- 解析：  
实例出来的对象（`person`）的`__proto__`，与由实例出这个对象的构造函数（`People`）的`prototype`是对等关系，即`person.__proto__ = People.prototype`，这就是继承的本质，原型链被打通了。  

因此我们可以总结`prototype`以下特点：
- 构造函数独有的属性
- 实例的`__proto__`与其构造函数的`prototype`相等（`person.__proto__ = People.prototype`） -->

### `constructor`
这个属性也可以通俗的理解成，所有对象都拥有的一个属性，它返回的是某个对象的构造函数，可以用`对象.constructor.name`来查看当前构造函数的名字是什么（`person.constructor.name`返回`People`，因为`person`由`People`构造实例而来）。
<!-- > 实例出来的对象也可以访问到`constructor`，是因为实例出来的对象`constructor`继承自构造函数的原型对象（`x.prototype`），可以用`hasOwnProperty('constructor')`验证  -->

<!-- 验证：
```javascript
function Person() {

}
var lMC = new Person();
console.log(lMC.constructor.name);  // Person
console.log(lMC.hasOwnProperty('constructor'));  // false
console.log(Person.prototype.constructor.name);  // Person
console.log(Person.prototype.hasOwnProperty('constructor'));  // true
```

因此我们可以总结`constructor`以下特点：
- 构造函数的原型对象（`x.prototype`）拥有的属性，指回构造函数本身
- 构造函数本身也有，指向`Function`； -->


ok，介绍完这三个属性，我们再来看看这三者有什么联系。


### `__proto__`、`prototype`、`constructor`这三者到底是什么联系

我们看看下面例子：
````javascript
// 定义一个People构造函数
function People () {

}

// 实例化一个person对象
const person = new People();

// console.log(People.constructor.name);
console.log(person.__proto__ === People.prototype);

console.log(People.prototype.hasOwnProperty('constructor'));

console.log(People.prototype.constructor === People);


````


解析：  
- `__proto__`跟`prototype`是什么联系：  
  如果有一个实例，它是由一个构造函数实例而来，那么这个实例的`__proto__`一定指向这个构造函数的`prototype`，即`person.__proto__ = People.prototype`
- `prototype`跟`constructor`是什么联系：  
  `constructor`就是某个对象的`prototype`自身的一个属性（用`hasOwnProperty`可验证），它指向的就是这个对象本身，即`People.prototype.constructor = People`
- `__proto__`跟`constructor`是什么联系：  
  `constructor`就是某个对象的`prototype`自身的一个属性（用`hasOwnProperty`可验证），它指向的就是这个对象本身，即`People.prototype.constructor = People`

### 什么是原型链
当我们用构造函数`Func`实例化了一个对象`A`后，访问`A`的方法或者属性时，会现在`A`自身找有没有对应的方法属性，没有的话则通过`A.__proto__`去构造函数的原型对象`Func.prototype`找，如果`Func.prototype`也没有，则在往`Func.prototype.__proto__`往`Obeject.prototype`找，如果还没有则再通过`Obeject.prototype.__proto__`找，在这过程中，如果有则返回相应的方法属性，没有的话则再通过`Obeject.prototype.__proto__`找，但此时`Obeject.prototype.__proto__`已经到顶，指向的是`null`，所以此时没有对应的方法属性，返回`undefined`。  
在查找的过程中会遍历以上的一条链，这条链就是原型链：

![原型链1](../md/about-prototype/pic_1.png)

等同于  


![原型链2](../md/about-prototype/pic_2.png)


### 方法总结
假定我们用`Func`表示构造函数；`obj`表示`Func`的实例对象

1. 如果最后以`__proto__`结尾，返回的一定是`x.prototype`（`Object.prototype.__proto__`除外），所以我们先确定是**谁的**`__proto__`
   - 如果是`Func`的`__proto__`，那么直接指向`Function.prototype`
   - 如果是`obj`的`__proto__`，那么直接指向其实例的构造函数的`prototype`(`Func.prototype`)
   - 如果是`Func.prototype`的`__proto__`，那么直接指向`Object.prototype`，（因为`Func.prototype`是对象，其构造函数是`Object`）

2. 如果是以`prototype`结尾，只用判断是**谁的**`prototype`，只有构造函数才有`prototype`属性
   - `obj.prototype`，返回`undefined`，因为`obj`是实例，不是构造函数
   - `Func.prototype`，返回`Func`这个构造函数的`prototype`所有内容

3. 如果是以`constructor`结尾，先弄清楚前面是**对象**、**构造函数**、还是**构造函数.prototype的constructor**；
   - 如果是**构造函数**的`constructor`，则直接指向`Function`
     - `Func.constructor`，直接指向`Function`，因为构造函数的构造器，当然是`Function`
   - 如果是**对象**的`constructor`：
     - `obj.constructor`，直接指向`Func`，因为`obj`是由`Func`构造而来，所以当然是`Func`（`obj.constructor`实际上是继承自`Func.prototype.constructor`，`obj`本身是没有`constructor`的）
   - 如果是构造函数.prototype的constructor**始终指回为这个构造函数**，所以：
     - **`Func.prototype.constructor`，指回`Func`本身**
     - **`Object.prototype.constructor`，指回`Obeject`构造函数**
     - **`Fuction.prototype.constructor`，指回`Fuction`构造函数**
   - **`Obeject.constructor`，指向`Function`**


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

console.log(p2.__proto__.__proto__.__proto__.__proto__.__proto__); // 报错

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
原型、原型链本来就挺绕的，所以建议大家先了解`__proto__`、`prototype`之间的链接，熟悉了，再把`constructor`加上一起理解，循环渐进。等理解以后，多画几遍原型链图加深理解。OK，最后假定我们用`Animal`表示构造函数；`dog`表示`Animal`的实例对象，祭出一张原型链图：
> **红色链表示的是我们平时实例出来的对象的原型链**

![原型链图](../md/about-prototype/pic_3.png)