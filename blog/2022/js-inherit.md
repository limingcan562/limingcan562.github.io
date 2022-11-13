---
title: 深入谈谈JS继承的几种方式
des: 深入JS继承，让自己升一个level
createTime: '2022-11-13'
---

## 深入谈谈JS继承的几种方式

### 前言
这两天一直在为自己查漏补缺，发现`JS`继承这块方式蛮多，写这篇文章也是对自己的一个梳理总结。我觉得最重要的不是继承怎么写，最重要的是`JS`实现继承这个**思想**是什么。但在我们要弄懂`JS`继承之前，一定要弄明白**原型链**是个什么东西，因为`JS`继承的思想，核心就是靠**原型链**完成。如果大家对原型链还不是很清楚，可以先读读我写的这篇关于原型链的文章——[最通俗易懂的原型、原型链理解](https://juejin.cn/post/7077191009343537159)。

### `JS`继承最常见的**六种**方式
- 原型链继承
- 盗用构造函数继承
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生式组合继承

#### 原型链继承
为什么叫原型链继承，我们可以这样记，因为我们会通过改变某个构造函数的原型（`prototype`），来实现继承。  
OK，假设我们有一个父类构造函数`Animal`，还有一个子类构造函数`Dog`。将构造函数`Dog.prototype`指向父类的一个实例（`Dog.prototype = new Animal()`），这样我们就完成了一个原型链继承。来看看具体例子：
````javascript
// 定义一个父类
function Animal() {
  this.like = ['eat', 'drink', 'sleep'];
}

// 为父类的原型添加一个run方法
Animal.prototype.run = function() {
  console.log('跑步');
}

// 定义一个子类
function Dog() {
  this.name = 'limingcan';
}

// 将Dog的原型指向Animal的一个实例
Dog.prototype = new Animal();

// 实例一个由子类new 出来的对象
const dog = new Dog();
dog.run();
````  

让我们看看`Animal.prototype`、`Dog.prototype`、`dog`都有什么：  
<img src="../md/js-inherit/pic_1.png" />

解析：  
> 当我们执行`Dog.prototype = new Animal();`这句时，发生了什么：  

它相当于把`Dog.prototype`整个重写了，并将两个构造函数通过原型链联系起来，从而实现继承。因为我们将`Dog.prototype`指向了构造函数`Animal`的一个实例，我们暂时把这个实例叫做`中介实例X`，这个`中介实例X`自己也有一个`__proto__`，它又指向了`Animal.prototype`。所以当实例`dog`在自身找不到属性方法时，它会去`dog.__proto__`（相当于`Dog.prototype`，但是`Dog.prototype`被重写成了`中介实例X`，所以是去`中介实例X`里面找）找。如果`中介实例X`也找不到，就会去`中介实例X.__proto__`（相当于`Animal.prototype`）找。有值的话，则返回值；没有值的话又会去`Animal.prototype.__proto__`（相当于`Object.prototype`）找。有值的话，则返回值；没有值的话又会去`Object.prototype.__proto__`找，但是`Object.prototype.__proto__`返回`null`，原型链到顶，一条条原型链搜索完毕，都没有，则返回`undefined`。所以这就是为什么实例`dog`**自身**没有`like`属性跟`run`方法，但是还是可以访问。上述的大致过程，我们可以这样看：
<img src="../md/js-inherit/pic_2.png" />  

OK，我们接下来继续看。如果我们这时候给实例`dog`的`like`属性`push`一个值，看下面例子：

````javascript
// 定义一个父类
function Animal() {
  this.like = ['eat', 'drink', 'sleep'];
}

// 为父类的原型添加一个run方法
Animal.prototype.run = function() {
  console.log('跑步');
}

// 定义一个子类
function Dog() {
  this.name = 'limingcan';
}

// 将Dog的原型指向Animal的一个实例
Dog.prototype = new Animal();

// 实例一个由子类new 出来的对象
const dog = new Dog();
dog.like.push('play');

const small_dog = new Dog();

````  







