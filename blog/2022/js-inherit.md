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

### 原型链继承
> 原理：为什么叫原型链继承，我们可以这样记，因为核心就是我们会通过改变某个构造函数的原型（`prototype`），使其跟其他构造函数的`prototype`不断串联起来，从而实现继承。  

假设我们有一个父类构造函数`Animal`，还有一个子类构造函数`Cat`。将构造函数`Cat.prototype`指向父类的一个实例（`Cat.prototype = new Animal()`），这样我们就完成了一个原型链继承。来看看具体例子：
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
function Cat() {
  this.name = 'limingcan';
}

// 核心：将Cat的原型指向父类Animal的一个实例
Cat.prototype = new Animal();

// cat.constructor是来自Cat.prototype.constructor
// 不矫正的话，当前的cat.constructor指向的是Animal
// 所以这里需要矫正一下Cat.prototype.constructor，因为Cat.prototype被重写，constructor被指向了new Animal().__proto__.constructor
Cat.prototype.constructor = Cat;

// 实例一个由子类 new 出来的对象
const cat = new Cat();

cat.run();

````  

解析：  
> 当我们执行`Cat.prototype = new Animal();`这句时，发生了什么：  

它把`Cat.prototype`整个重写了，并将两个构造函数通过原型链联系起来，从而实现继承。因为我们将`Cat.prototype`指向了父类构造函数`Animal`的一个实例，我们暂时把这个实例叫做`中介实例X`，这个`中介实例X`自己也有一个`__proto__`，它又指向了`Animal.prototype`。所以当实例`cat`在自身找不到属性方法时，它会去`cat.__proto__`（相当于`Cat.prototype`，但是`Cat.prototype`被重写成了`中介实例X`，所以是去`中介实例X`里面找）找。如果`中介实例X`也找不到，就会去`中介实例X.__proto__`（相当于`Animal.prototype`）找。有值的话，则返回值；没有值的话又会去`Animal.prototype.__proto__`（相当于`Object.prototype`）找。有值的话，则返回值；没有值的话又会去`Object.prototype.__proto__`找，但是`Object.prototype.__proto__`返回`null`，原型链到顶，一条条原型链搜索完毕，都没有，则返回`undefined`。所以这就是为什么实例`cat`**自身**没有`like`属性跟`run`方法，但是还是可以访问。上述的大致过程，我们可以这样看：
<img src="../md/js-inherit/pic_1.png" />  

这条链有点绕，所以这也是为什么大家对原型链继承总是那么晕头转向的原因。建议多读几遍理解一下，看看这条链是怎么形成的，所以对原型链不理解的同学，建议还是先把[原型链](https://juejin.cn/post/7077191009343537159)弄清楚，这样才好理解继承。  


如果我们这时候给实例`cat`的`like`属性`push`一个值，看看下面例子： 

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
function Cat() {
  this.name = 'limingcan';
}

// 核心：将Cat的原型指向父类Animal的一个实例
Cat.prototype = new Animal();

// cat.constructor是来自Cat.prototype.constructor
// 不矫正的话，当前的cat.constructor指向的是Animal
// 所以这里需要矫正一下Cat.prototype.constructor，因为Cat.prototype被重写，constructor被指向了new Animal().__proto__.constructor
Cat.prototype.constructor = Cat;


// 实例一个由子类new 出来的对象
const cat = new Cat();

// 给like属性push一个play值
cat.like.push('play');

// 实例第二个对象
const small_cat = new Cat();

console.log(cat.like);

console.log(small_cat.like);

console.log(cat.like === small_cat.like);

````  

打印：  
<img src="../md/js-inherit/pic_2.png" />  

我们会发现，如果我们修改实例`cat`的属性，并且该属性是引用类型的话，后续实例化出来的对象，**都会被影响到**。因为`cat`跟`small_cat`自身没有`like`属性，他们的`like`都继承自`Cat.prototype`，指向的是的同一份地址。  

> 如果想要两个实例修改`like`互不影响，只能给他们自身增加一个`like`属性（`cat.like = ['eat', 'drink', 'sleep', 'play'];cat_small.like = ['food']`。如果自身有属性，是不会去`prototype`查找的，它们是两个实例自己独有的地址），但这样就失去了继承的意义了。

总结：

- 优点：
  - 实现相对简单
  - 子类实例可以直接访问到父类实例或父类原型上的属性方法

- 缺点：
  - 父类所有的引用类型属性都会实例出来的对象共享，所以修改一个实例对象的引用类型属性，会导致所有实例对象受到影响
  - 实例化时，不能传参数

因此为了解决原型链继承的缺点，又搞了个盗用构造函数继承的方式。

### 盗用构造函数继承
盗用构造函数继承，也叫借用构造函数继承，它可以解决原型链继承带来的缺点。
> 原理：在子类构造函数中，调用父类构造函数方法，但通过`call`或者`apply`方法改变了父类构造函数内`this`的指向，使得子类实例出来的对象，**自身**拥有来自父类构造函数的方法跟属性，且分别独立，互不影响。

我们还是假设有一个父类构造函数`Animal`，还有一个子类构造函数`Cat`，来看看具体例子：

````javascript
// 定义一个父类
function Animal(name) {
  this.name = name;
  this.like = ['eat', 'drink', 'sleep'];
  this.play = function() {
    console.log('到处玩');
  }
}

// 为父类的原型添加一个run方法
Animal.prototype.run = function() {
  console.log('跑步');
}

// 定义一个子类
function Cat(name, age) {
  Animal.call(this, name);
  this.age = age;
}

// 实例一个由子类new 出来的对象
const cat = new Cat('limingcan', 27);

// 给实例cat的like属性push一个toys值
cat.like.push('toys');

// 实例第二个对象
const small_cat = new Cat('mimi', 100);

console.log(cat);

console.log(small_cat);

console.log(cat.run);

console.log(small_cat.run);

````  

打印：
<img src="../md/js-inherit/pic_3.png" />  

解析：  
从打印我们可以看出：
  1. 实例化子类`Cat`时，可以传入参数
  2. 父类构造函数`Animal`里的属性方法，都被添加到 `cat`跟`small_cat`的**自身**里了（因为子类构造函数`Cat`调用了`call`方法，某种程度来说继承了父类构造函数`Animal`里的属性方法）
  3. 修改`cat`不会影响到`small_cat`（因为实例出来的对象，所有的属性、方法都是添加到实例对象自身，而不是添加到实例对象的原型上，它们是完全独立，指向的都是不同的地址）
  4. 打印`run`方法，输出都是`undefined`，说明实例没有继承父类构造函数`Animal`原型上的方法（实例的原型链没有跟父类构造函数`Animal`原型链打通，因此原型链上搜索不到`run`方法）

总结：
- 优点：
  - 实例化时，可以传参
  - 父类里的所有属性、方法就像一个蓝本，会被后面实例出来的复制，并且添加到实例自己本身独立存在，所有修改一个实例对象的引用类型属性时，不会导致所有实例对象受到影响

- 缺点：
  - 无法继承父类原型上的属性与方法

我们通过借用构造函数继承的方法，解决了原型链继承的缺点。但是又产生了一个新的问题——子类无法继承父类原型上的属性与方法，如果我们把这两种方式结合一下，会不会好点呢，于是有了组合继承这个继承方式。

### 组合继承
> 原理：原型链继承跟借用构造函数继承相结合。

我们还是假设有一个父类构造函数`Animal`，还有一个子类构造函数`Cat`，来看看具体例子：

````javascript
// 定义一个父类
function Animal(name, sex) {
  this.name = name;
  this.sex = sex;
  this.like = ['eat', 'drink', 'sleep'];
}

// 为父类的原型添加一个run方法
Animal.prototype.run = function() {
  console.log('跑步');
}

// 定义一个子类
function Cat(name, sex, age) {
  // 第一次调用Animal构造函数
  Animal.call(this, name, sex);
  this.age = age;
}

// 核心：将Cat的原型指向父类Animal的一个实例（第二次调用Animal构造函数）
Cat.prototype = new Animal();

// cat.constructor是来自Cat.prototype.constructor
// 不矫正的话，当前的cat.constructor指向的是Animal
// 所以这里需要矫正一下Cat.prototype.constructor，因为Cat.prototype被重写，constructor被指向了new Animal().__proto__.constructor
Cat.prototype.constructor = Cat;

// 实例一个由子类new 出来的对象
const cat = new Cat('limingcan', 'man', 27);
console.log(cat);

````  

打印：
<img src="../md/js-inherit/pic_4.png" />  

由此我们能得出总结：
- 优点：
  - 利用原型链继承，将实例、子类、父类三者的原型链串联起来，让实例对象继承父类构造函数原型的方法与属性
  - 利用借用构造函数继承，将父类构造函数的属性、方法添加到实例**自身**上，解决原型链继承，实例修改引用类型属性时对后续实例影响问题
  - 利用构造函数继承，实现实例化时，可传参

- 缺点：
  - 两次调用父类构造函数`Animal`（第一次在子类`Cat`构造函数内调用，第二次在`new Animal()`时候调用）
  - 实例自身拥有的属性，子类`Cat.prototype`也会有，造成不必要的浪费（因为`Cat.prototype`被重写为`new Animal()`了，`new Animal()`是父类的一个实例，也有`name`、`sex`、`like`属性）

看来组合继承也不是最完美的继承方式。我们先把组合继承放一边，先看看什么是原型式继承。

### 原型式继承
> 原理：用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype），详细用法可以看看[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。

我们还是假设有一个父类构造函数`Animal`，还有一个子类构造函数`Cat`，来看看具体例子：

````javascript
// 定义一个父类（新建出来的对象的__proto__会指向它）
const Animal = {
  name: 'nobody',
  like: ['eat', 'drink', 'sleep'],
  run() {
    console.log('跑步');
  }
};

// 新建以Animal为原型的实例
const cat = Object.create(
  Animal,
  // 这里定义的是实例自身的方法
  {
    name: {
      value: 'limingcan'
    }
  }
);

// 给实例cat属性like添加一个play值
cat.like.push('play');

const small_cat = Object.create(
  Animal,
  // 这里定义的是实例自身的方法
  {
    name: {
      value: 'mimi'
    }
  }
);

console.log(cat);
console.log(small_cat);
console.log(cat.__proto__ === Animal);

````  

打印：
<img src="../md/js-inherit/pic_5.png" />  

总结：

- 优点：
  - 实现比原型链继承更简洁
  - 子类实例可以直接访问到父类实例或父类原型上的属性方法

- 缺点：
  - 父类所有的引用类型属性都会实例出来的对象共享，所以修改一个实例对象的引用类型属性，会导致所有实例对象受到影响
  - 实例化时，不能传参数

我们可以对比原型链继承方式，其实这两种方式差不多，所以它要跟原型链继承存在一样的缺点，但是实现起来比原型式继承更加简洁一些。如果我们只是想让一个对象跟另一个对象保持类似，原型式继承可能更加舒服，因为它不需要像原型链继承那样大费周章。接下来我们再看看另一种继承方式——寄生式继承。


