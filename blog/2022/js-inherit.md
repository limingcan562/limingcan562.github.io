---
title: JS继承面试的时候怎么说？答应我，不要再死记硬背了好吗？
des: 深入理解JS继承，不要再背继承八股文啦
createTime: '2022-11-13'
---

## `JS继承`继承面试的时候怎么说？答应我不要再死记硬背了好吗？

### 前言
`JS`继承这块，`ES6`已经有`class`很香的语法糖实现了，`ES6`之前那些实现继承的方法真的又多又长，说句心里话，能不学真的不想再学，但是没办法，面试还是要搞你呀，所以这两天看回`ES6`之前的继承，发现还是蛮有意思的。写这篇文章也是对自己的一个梳理总结，也希望能帮助到大家弄懂继承这块，这样就不需要再死记硬背八股文，面试自由发挥就好。  
`JS`的继承，核心就是靠**原型链**完成。如果大家对原型链还不是很清楚，可以先读读我写的这篇关于原型链的文章——[关于原型链的问题，教你怎么套用方法直接判断，面试不再虚
](https://limingcan562.github.io/posts/about-prototype)。 

文章蛮长，大家可以分成两部分来看。原型链继承、盗用构造函数继承、组合继承为一部分，原型式继承、寄生式继承、寄生式组合继承为一部分。

为了让大家更好的理解，后面的例子，我们都用：
 - `Animal`作为父类
 - `Cat`为子类
 - `cat`为子类`Cat`实例一，`small_cat`为子类`Cat`实例二


### `JS`继承最常见的**六种**方式
- 原型链继承
- 盗用构造函数继承
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生式组合继承

### 原型链继承
> 原理：为什么叫原型链继承，我们可以这样记，因为核心就是我们会重写某个构造函数的原型（`prototype`），使其指向父类的一个实例，以此让它们的原型链不断串联起来，从而实现继承。  

将子类`Cat.prototype`指向父类`Animal`的一个实例（`Cat.prototype = new Animal()`），这样我们就完成了一个原型链继承。来看看具体例子：
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

// 实例cat.constructor是来自Cat.prototype.constructor
// 不矫正的cat.constructor话，当前的cat.constructor指向的是Animal
// 因为Cat.prototype被重写，constructor被指向了new Animal().__proto__.constructor，相当于Animal.prototype.constructor
Cat.prototype.constructor = Cat;

// 实例一个由子类 new 出来的对象
const cat = new Cat();

cat.run();

console.log(cat);

````  

打印：
<img src="../md/js-inherit/pic_0.png" />  


解析：  
> 当我们执行`Cat.prototype = new Animal();`这句时，发生了什么：  

它把`Cat.prototype`整个重写了，并将两者通过原型链联系起来，从而实现继承。因为我们将`Cat.prototype`指向了父类`Animal`的一个实例，我们暂时把这个实例叫做`中介实例X`，这个`中介实例X`自己也有一个`__proto__`，它又指向了`Animal.prototype`。所以当实例`cat`在自身找不到属性方法时，它会去`cat.__proto__`（相当于`Cat.prototype`，但是`Cat.prototype`被重写成了`中介实例X`，所以也是去`中介实例X`里面找）找。如果`中介实例X`也找不到，就会去`中介实例X.__proto__`（相当于`Animal.prototype`）找。有值的话，则返回值；没有值的话又会去`Animal.prototype.__proto__`（相当于`Object.prototype`）找。有值的话，则返回值；没有值的话又会去`Object.prototype.__proto__`找，但是`Object.prototype.__proto__`返回`null`，原型链到顶，一条条原型链搜索完毕，都没有，则返回`undefined`。所以这就是为什么实例`cat`**自身**没有`like`属性跟`run`方法，但是还是可以访问。上述的大致过程，我们可以这样看：
<img src="../md/js-inherit/pic_1.png" />  

这条链有点绕，所以这也是为什么大家对原型链继承总是那么晕头转向的原因。建议读的时候想一下这条链是什么样的，怎么来的。读到这里的同学，如果感觉自己看的不是很懂，那暂时不用继续往下看啦，说明原型链还没有弄清楚，建议还是先把原型链弄清楚，这样才好理解继承。[去搞懂](https://limingcan562.github.io/posts/about-prototype)  


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

// 实例cat.constructor是来自Cat.prototype.constructor
// 不矫正的cat.constructor话，当前的cat.constructor指向的是Animal
// 因为Cat.prototype被重写，constructor被指向了new Animal().__proto__.constructor，相当于Animal.prototype.constructor
Cat.prototype.constructor = Cat;

// 实例一个由子类 new 出来的对象
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

我们会发现，如果我们修改实例`cat`的属性，并且该属性是引用类型的话，后续实例化出来的对象，**都会被影响到**。因为`cat`跟`small_cat`**自身**没有`like`属性，它们的`like`都继承自`Cat.prototype`，指向的是的同一份地址。  

> 如果想要两个实例修改`like`互不影响，只能给他们自身增加一个`like`属性（`cat.like = ['eat', 'drink', 'sleep', 'play'];cat_small.like = ['food']`。如果自身有属性，是不会去`prototype`查找的，它们是两个实例自己独有的属性，指向不同地址），但这样就失去了继承的意义了。

总结：

- 优点：
  - 实现相对简单
  - 子类实例可以直接访问到父类实例或父类原型上的属性方法

- 缺点：
  - 父类所有的引用类型属性都会被实例出来的对象共享，所以修改一个实例对象的引用类型属性，会导致所有实例对象受到影响
  - 实例化时，不能传参数

因此为了解决原型链继承的缺点，又搞了个盗用构造函数继承的方式。

### 盗用构造函数继承
盗用构造函数继承，也叫借用构造函数继承，它可以解决原型链继承带来的缺点。
> 原理：在子类构造函数中，调用父类构造函数方法，但通过`call`或者`apply`方法改变了父类构造函数内`this`的指向，使得子类实例出来的对象，**自身**拥有来自父类构造函数的方法跟属性，且分别独立，互不影响。

来看看具体例子：

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

// 实例一个由子类 new 出来的对象
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

从打印我们可以看出：
  1. 实例化子类`Cat`时，可以传入参数
  2. 父类`Animal`里的属性方法，都被添加到实例`cat`跟实例`small_cat`的**自身**里了（因为子类`Cat`调用了`call`方法，某种程度来说继承了父类`Animal`里的属性方法）
  3. 修改实例`cat`不会影响到实例`small_cat`（因为实例出来的对象，所有的属性、方法都是添加到实例对象**自身**，而不是添加到实例对象的原型上，它们是完全独立，指向的都是不同的地址）
  4. 打印`run`方法，输出都是`undefined`，说明实例没有继承父类`Animal`原型上的方法（实例的原型链没有跟父类`Animal`原型链打通，因此原型链上搜索不到`run`方法，可以跟原型链继承对比想想）
  5. 子类的原型`Cat.prototype`与父类原型`Animal.prototype`没有打通，因为`Cat.prototype.__proto__`直接指向了`Object.prototype`，如果打通了的话，应该是`Cat.prototype.__proto__`指向`Animal.prototype`，这也是为什么实例`cat`没有继承父类`run`方法的原因，因为访问不到。

总结：
- 优点：
  - 实例化时，可以传参
  - 子类通过`call`或`apply`方法，将父类里的所有属性、方法复制到实例对象的**自身**，而不是共享原型链上同一个属性，所以修改一个实例对象的引用类型属性时，不会导致所有实例对象受到影响

- 缺点：
  - 无法继承父类原型上的属性与方法

我们通过借用构造函数继承的方法，解决了原型链继承的缺点。但是又产生了一个新的问题——子类无法继承父类原型（`Animal.prototype`）上的属性与方法，如果我们把这两种方式结合一下，会不会好点呢，于是有了组合继承这个继承方式。

### 组合继承
组合继承顾名思义就是，利用原型链继承跟借用构造函数继承相结合，而创造出来的一种新的继承方式，是不是很好记。

> 原理：利用原型链继承，实现实例对父类原型（`Animal.protoytype`）上的方法与属性继承；利用借用构造函数继承，实现实例对父类构造函数（`function Animal() {}`）里方法与性的继承，并且解决原型链继承的缺陷。

来看看具体例子：

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

// 实例cat.constructor是来自Cat.prototype.constructor
// 不矫正的cat.constructor话，当前的cat.constructor指向的是Animal
// 因为Cat.prototype被重写，constructor被指向了new Animal().__proto__.constructor，相当于Animal.prototype.constructor
Cat.prototype.constructor = Cat;

// 实例一个由子类new 出来的对象
const cat = new Cat('limingcan', 'man', 27);
console.log(cat);

````  

打印：
<img src="../md/js-inherit/pic_4.png" />  

由上图我们能得出总结：
- 优点：
  - 利用原型链继承，将实例`cat`、子类`Cat`、父类`Animal`三者的原型链串联起来，让实例对象继承父类原型`Animal.prototype`的方法与属性
  - 利用借用构造函数继承，将父类构造函数`function Animal() {}`的属性、方法添加到实例**自身**上，解决原型链继承，实例修改引用类型属性时对后续实例影响问题
  - 利用构造函数继承，实例化对象时，可传参

- 缺点：
  - 两次调用父类构造函数`function Animal() {}`（第一次在子类`Cat`构造函数内调用，第二次在`new Animal()`时候调用）
  - 实例自身拥有的属性，子类`Cat.prototype`里也会有，造成不必要的浪费（因为`Cat.prototype`被重写为`new Animal()`了，`new Animal()`是父类的一个实例，也有`name`、`sex`、`like`属性）

看来组合继承也不是最完美的继承方式。我们先把组合继承放一边，先看看什么是原型式继承。

### 原型式继承
> 原理：用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）。一般使用`Object.create()`方法实现，详细用法可以看看[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。

来看看具体例子：

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
  // 这里定义的是实例自身的方法或属性
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
  // 这里定义的是实例自身的方法或属性
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

由上图我们可以得出总结：

- 优点：
  - 实现比原型链继承更简洁（不需要写什么构造函数了，也不需要写子类`Cat`，直接父类继承`Animal`）
  - 子类实例可以访问到父类的属性方法

- 缺点：
  - 父类所有的引用类型属性都会被实例出来的对象共享，所以修改一个实例对象的引用类型属性，会导致所有实例对象受到影响
  - 实例化时，不能传参数

我们可以对比原型链继承方式，其实这两种方式差不多，所以它要跟原型链继承存在一样的缺点，但是实现起来比原型式继承更加简洁方便一些。如果我们只是想让一个对象跟另一个对象保持类似，原型式继承可能更加舒服，因为它不需要像原型链继承那样大费周章。接下来我们再看看另一种继承方式——寄生式继承。

### 寄生式继承
> 原理：它其实就是对原型式继承进行一个小封装，增强了一下实例出来的对象

来看看具体例子：

````javascript

// 定义一个父类（新建出来的对象的__proto__会指向它）
const Animal = {
  name: 'nobody',
  like: ['eat', 'drink', 'sleep'],
  run() {
    console.log('跑步');
  }
};

// 定义一个封装Object.create()方法的函数
const createObj = (parentPropety, ownProperty) => {
  // 生成一个以parentPropety 为原型的对象obj
  // ownProperty 是新建出来的实例，拥有自身的属性跟方法配置
  const obj = Object.create(parentPropety, ownProperty);

  // 增强功能
  obj.catwalk = function() {
    console.log('走猫步');
  };

  return obj;
}

// 新建以Animal为原型的实例一
const cat = createObj(Animal, {
  name: {
    value: 'limingcan'
  }
})

// 给实例cat属性like添加一个play值
cat.like.push('play');

// 新建以Animal为原型的实例二
const small_cat = createObj(Animal, {
  name: {
    value: 'mimi'
  }
})

console.log(cat);
console.log(small_cat);
console.log(cat.__proto__ === Animal);

```` 

打印：
<img src="../md/js-inherit/pic_6.png" />  

总结：

- 优点：
  - 实现比原型链继承更简洁
  - 子类实例可以访问到父类的属性方法

- 缺点：
  - 父类所有的引用类型属性都会被实例出来的对象共享，所以修改一个实例对象的引用类型属性，会导致所有实例对象受到影响
  - 实例化时，不能传参数

寄生式继承优缺点跟原型式继承一样，但最重要的是它提供了一个类似**工厂的思想**，是对原型式继承的一个封装。前面我们说到组合继承还是会有一些缺陷，通过原型式继承跟寄生式继承，我们可以利用这两个继承的思想，来解决组合继承的缺陷，它就是寄生组合式继承。

### 寄生式组合继承
> 原理：利用原型链继承，实现实例对父类原型（`Animal.prototype`）方法与属性的继承；利用借用构造函数继承，实现实例对父类构造函数（`function Animal() {}`）里方法与属性的继承，并且解决了组合继承带来的缺陷

前面我们说到，组合继承会有以下两个缺点：
  - 会两次调用父类构造函数`function Animal() {}`。（第一次在子类构造函数内使用`call`或者`apply`方法时调用；第二次在`Cat.prototype = new Animal()`时候调用了）
  - 实例自身拥有的属性，子类构造函数的`prototype`里也会有，造成不必要的浪费（因为子类构造函数的`protptype`被重写为父类的一个实例了，所以`Cat.prototype`也会拥有父类实例里的属性跟方法）

通过上面原型式继承的方式，我们可以把原型链继承里，`Cat.prototype = new Animal()`这一步，用寄生式继承的思想，用`Object.create()`方法实现并替换掉。来看看具体例子：


````javascript
// 定义一个父类
function Animal(name, sex) {
  this.name = name;
  this.sex = sex;
  this.like = ['eat', 'drink', 'sleep'];
}

// 定义一个子类
function Cat(name, sex, age) {
  // 第一次调用Animal构造函数
  Animal.call(this, name, sex);
  this.age = age;
}

// 定义一个利用原型式继承方式，跟寄生式继承思想来实现寄生组合式继承的方法
function inheritObj(parentClass, childClass) {
  // parentClass 为传入的父类
  // childClass 为传入的子类
  // finalProperty 为最后继承的原型对象

  const finalProperty = Object.create(parentClass.prototype);

  finalProperty.constructor = childClass;

  childClass.prototype = finalProperty;
}

// 为父类的原型添加一个run方法
Animal.prototype.run = function() {
  console.log('跑步');
}

// 实现寄生组合继承
inheritObj(Animal, Cat);

// 给子类的原型添加一个方法
Cat.prototype.catwalk = function() {
  console.log('走猫步');
}

// 实例一个由子类new 出来的对象
const cat = new Cat('limingcan', 'man', 27);

console.log(cat);

````  

寄生式组合继承打印：  
<img src="../md/js-inherit/pic_7.png" />  

组合继承打印：  
<img src="../md/js-inherit/pic_4.png" />  

我们可以对比一下组合继承那张图会发现：
  - 实例`cat`自身该有的属性都有
  - `Cat.prototype`也干净了，没有把父类的属性都复制一遍，只有自己添加的`catwalk`方法
  - `Animal.prototype`也十分干净，只有自己添加的`run`方法

这是基本我们最想要的结果，也是最理想的继承方式。  


解析：  
<!-- （我们把`parentClass`称作父类，把`childClass`称作子类，把`finalProperty`称作最后继承的原型对象） -->
我们想想为什么在组合继承时，我们要`Cat.prototype = new Animal()`？核心是因为我们要**打通实例`cat`、子类`Cat`、父类`Animal`三者的原型链**，从而实现继承。我们顺着这个思路，解析一下上面`inheritObj`这个方法，短短三行，但是为什么会发生那么神奇的事：
 - `const finalProperty = Object.create(parentClass.prototype)`：浅拷贝一份`parentClass.prototype`，并将其作为`finalProperty`对象的原型，即`finalProperty.__proto__ === parentClass.prototype`。此时`finalProperty.constructor`指向的是`parentClass.prototype.constructor`
 - `finalProperty.constructor = childClass`：寄生式继承思想，增强对象。矫正`finalProperty.constructor`，让其指向`childClass`
 - `childClass.prototype = finalProperty`：使得实例找不到方法属性，会去`childClass.prototype`（`finalProperty`）里找；再找不到会去`finalProperty.__proto__（parentClass.prototype）`里找。打通了子类`childClass`与父类的`parentClass`原型链，实现了父子类的继承。

`inheritObj`方法，其实质就是下面的实现，这样可能可以更加直观的看出继承：

````javascript
// 定义一个利用原型式继承方式，跟寄生式继承思想来实现寄生组合式继承的方法
function inheritObj(parentClass, childClass) {
  // parentClass 为传入的父类
  // childClass 为传入的子类
  
  childClass.prototype.__proto__ = parentClass.prototype;

  childClass.prototype.constructor = childClass;
}
````


### 最后
终于写完了！真的太累了！希望这篇文章读完对大家有所帮助，面试的时候不虚。只要理解透了各个继承方式的原理，各个继承方式的优缺点真的没有必要背，优缺点自己总结就好了呀，万变不离其宗~  
如果大家有什么异同，欢迎评论交流；如果觉得这篇文章好的话，欢迎点赞分享，这篇文章真的花了我不少功夫。