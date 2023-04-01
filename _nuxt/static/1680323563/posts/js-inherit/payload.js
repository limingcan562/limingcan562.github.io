__NUXT_JSONP__("/posts/js-inherit", {data:[{posts:{attributes:{title:"JS继承面试的时候怎么说？答应我，不要再死记硬背了好吗？",des:"深入理解JS继承，不要再背继承八股文啦",createTime:"2022-11-13"},html:"\u003Ch2\u003E\u003Ccode\u003EJS继承\u003C\u002Fcode\u003E继承面试的时候怎么说？答应我不要再死记硬背了好吗？\u003C\u002Fh2\u003E\n\u003Ch3\u003E前言\u003C\u002Fh3\u003E\n\u003Cp\u003E\u003Ccode\u003EJS\u003C\u002Fcode\u003E继承这块，\u003Ccode\u003EES6\u003C\u002Fcode\u003E已经有\u003Ccode\u003Eclass\u003C\u002Fcode\u003E很香的语法糖实现了，\u003Ccode\u003EES6\u003C\u002Fcode\u003E之前那些实现继承的方法真的又多又长，说句心里话，能不学真的不想再学，但是没办法，面试还是要搞你呀，所以这两天看回\u003Ccode\u003EES6\u003C\u002Fcode\u003E之前的继承，发现还是蛮有意思的。写这篇文章也是对自己的一个梳理总结，也希望能帮助到大家弄懂继承这块，这样就不需要再死记硬背八股文，面试自由发挥就好。\u003Cbr\u003E\n\u003Ccode\u003EJS\u003C\u002Fcode\u003E的继承，核心就是靠\u003Cstrong\u003E原型链\u003C\u002Fstrong\u003E完成。如果大家对原型链还不是很清楚，可以先读读我写的这篇关于原型链的文章——\u003Ca href=\"https:\u002F\u002Flimingcan562.github.io\u002Fposts\u002Fabout-prototype\"\u003E关于原型链的问题，教你怎么套用方法直接判断，面试不再虚\n\u003C\u002Fa\u003E。\u003C\u002Fp\u003E\n\u003Cp\u003E文章蛮长，大家可以分成两部分来看。原型链继承、盗用构造函数继承、组合继承为一部分，原型式继承、寄生式继承、寄生式组合继承为一部分。\u003C\u002Fp\u003E\n\u003Cp\u003E为了让大家更好的理解，后面的例子，我们都用：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E作为父类\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003ECat\u003C\u002Fcode\u003E为子类\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Ecat\u003C\u002Fcode\u003E为子类\u003Ccode\u003ECat\u003C\u002Fcode\u003E实例一，\u003Ccode\u003Esmall_cat\u003C\u002Fcode\u003E为子类\u003Ccode\u003ECat\u003C\u002Fcode\u003E实例二\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E\u003Ccode\u003EJS\u003C\u002Fcode\u003E继承最常见的\u003Cstrong\u003E六种\u003C\u002Fstrong\u003E方式\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E原型链继承\u003C\u002Fli\u003E\n\u003Cli\u003E盗用构造函数继承\u003C\u002Fli\u003E\n\u003Cli\u003E组合继承\u003C\u002Fli\u003E\n\u003Cli\u003E原型式继承\u003C\u002Fli\u003E\n\u003Cli\u003E寄生式继承\u003C\u002Fli\u003E\n\u003Cli\u003E寄生式组合继承\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E原型链继承\u003C\u002Fh3\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E原理：为什么叫原型链继承，我们可以这样记，因为核心就是我们会重写某个构造函数的原型（\u003Ccode\u003Eprototype\u003C\u002Fcode\u003E），使其指向父类的一个实例，以此让它们的原型链不断串联起来，从而实现继承。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E将子类\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E指向父类\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E的一个实例（\u003Ccode\u003ECat.prototype = new Animal()\u003C\u002Fcode\u003E），这样我们就完成了一个原型链继承。来看看具体例子：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F 定义一个父类\nfunction Animal() {\n  this.like = ['eat', 'drink', 'sleep'];\n}\n\n\u002F\u002F 为父类的原型添加一个run方法\nAnimal.prototype.run = function() {\n  console.log('跑步');\n}\n\n\u002F\u002F 定义一个子类\nfunction Cat() {\n  this.name = 'limingcan';\n}\n\n\u002F\u002F 核心：将Cat的原型指向父类Animal的一个实例\nCat.prototype = new Animal();\n\n\u002F\u002F 实例cat.constructor是来自Cat.prototype.constructor\n\u002F\u002F 不矫正的cat.constructor话，当前的cat.constructor指向的是Animal\n\u002F\u002F 因为Cat.prototype被重写，constructor被指向了new Animal().__proto__.constructor，相当于Animal.prototype.constructor\nCat.prototype.constructor = Cat;\n\n\u002F\u002F 实例一个由子类 new 出来的对象\nconst cat = new Cat();\n\ncat.run();\n\nconsole.log(cat);\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E打印：\n\u003Cimg src=\"..\u002Fmd\u002Fjs-inherit\u002Fpic_0.png\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E解析：\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E当我们执行\u003Ccode\u003ECat.prototype = new Animal();\u003C\u002Fcode\u003E这句时，发生了什么：\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E它把\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E整个重写了，并将两者通过原型链联系起来，从而实现继承。因为我们将\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E指向了父类\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E的一个实例，我们暂时把这个实例叫做\u003Ccode\u003E中介实例X\u003C\u002Fcode\u003E，这个\u003Ccode\u003E中介实例X\u003C\u002Fcode\u003E自己也有一个\u003Ccode\u003E__proto__\u003C\u002Fcode\u003E，它又指向了\u003Ccode\u003EAnimal.prototype\u003C\u002Fcode\u003E。所以当实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E在自身找不到属性方法时，它会去\u003Ccode\u003Ecat.__proto__\u003C\u002Fcode\u003E（相当于\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E，但是\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E被重写成了\u003Ccode\u003E中介实例X\u003C\u002Fcode\u003E，所以也是去\u003Ccode\u003E中介实例X\u003C\u002Fcode\u003E里面找）找。如果\u003Ccode\u003E中介实例X\u003C\u002Fcode\u003E也找不到，就会去\u003Ccode\u003E中介实例X.__proto__\u003C\u002Fcode\u003E（相当于\u003Ccode\u003EAnimal.prototype\u003C\u002Fcode\u003E）找。有值的话，则返回值；没有值的话又会去\u003Ccode\u003EAnimal.prototype.__proto__\u003C\u002Fcode\u003E（相当于\u003Ccode\u003EObject.prototype\u003C\u002Fcode\u003E）找。有值的话，则返回值；没有值的话又会去\u003Ccode\u003EObject.prototype.__proto__\u003C\u002Fcode\u003E找，但是\u003Ccode\u003EObject.prototype.__proto__\u003C\u002Fcode\u003E返回\u003Ccode\u003Enull\u003C\u002Fcode\u003E，原型链到顶，一条条原型链搜索完毕，都没有，则返回\u003Ccode\u003Eundefined\u003C\u002Fcode\u003E。所以这就是为什么实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E\u003Cstrong\u003E自身\u003C\u002Fstrong\u003E没有\u003Ccode\u003Elike\u003C\u002Fcode\u003E属性跟\u003Ccode\u003Erun\u003C\u002Fcode\u003E方法，但是还是可以访问。上述的大致过程，我们可以这样看：\n\u003Cimg src=\"..\u002Fmd\u002Fjs-inherit\u002Fpic_1.png\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E这条链有点绕，所以这也是为什么大家对原型链继承总是那么晕头转向的原因。建议读的时候想一下这条链是什么样的，怎么来的。读到这里的同学，如果感觉自己看的不是很懂，那暂时不用继续往下看啦，说明原型链还没有弄清楚，建议还是先把原型链弄清楚，这样才好理解继承。\u003Ca href=\"https:\u002F\u002Flimingcan562.github.io\u002Fposts\u002Fabout-prototype\"\u003E去搞懂\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E如果我们这时候给实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E的\u003Ccode\u003Elike\u003C\u002Fcode\u003E属性\u003Ccode\u003Epush\u003C\u002Fcode\u003E一个值，看看下面例子：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F 定义一个父类\nfunction Animal() {\n  this.like = ['eat', 'drink', 'sleep'];\n}\n\n\u002F\u002F 为父类的原型添加一个run方法\nAnimal.prototype.run = function() {\n  console.log('跑步');\n}\n\n\u002F\u002F 定义一个子类\nfunction Cat() {\n  this.name = 'limingcan';\n}\n\n\u002F\u002F 核心：将Cat的原型指向父类Animal的一个实例\nCat.prototype = new Animal();\n\n\u002F\u002F 实例cat.constructor是来自Cat.prototype.constructor\n\u002F\u002F 不矫正的cat.constructor话，当前的cat.constructor指向的是Animal\n\u002F\u002F 因为Cat.prototype被重写，constructor被指向了new Animal().__proto__.constructor，相当于Animal.prototype.constructor\nCat.prototype.constructor = Cat;\n\n\u002F\u002F 实例一个由子类 new 出来的对象\nconst cat = new Cat();\n\n\u002F\u002F 给like属性push一个play值\ncat.like.push('play');\n\n\u002F\u002F 实例第二个对象\nconst small_cat = new Cat();\n\nconsole.log(cat.like);\n\nconsole.log(small_cat.like);\n\nconsole.log(cat.like === small_cat.like);\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E打印：\u003Cbr\u003E\n\u003Cimg src=\"..\u002Fmd\u002Fjs-inherit\u002Fpic_2.png\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E我们会发现，如果我们修改实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E的属性，并且该属性是引用类型的话，后续实例化出来的对象，\u003Cstrong\u003E都会被影响到\u003C\u002Fstrong\u003E。因为\u003Ccode\u003Ecat\u003C\u002Fcode\u003E跟\u003Ccode\u003Esmall_cat\u003C\u002Fcode\u003E\u003Cstrong\u003E自身\u003C\u002Fstrong\u003E没有\u003Ccode\u003Elike\u003C\u002Fcode\u003E属性，它们的\u003Ccode\u003Elike\u003C\u002Fcode\u003E都继承自\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E，指向的是的同一份地址。\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E如果想要两个实例修改\u003Ccode\u003Elike\u003C\u002Fcode\u003E互不影响，只能给他们自身增加一个\u003Ccode\u003Elike\u003C\u002Fcode\u003E属性（\u003Ccode\u003Ecat.like = ['eat', 'drink', 'sleep', 'play'];cat_small.like = ['food']\u003C\u002Fcode\u003E。如果自身有属性，是不会去\u003Ccode\u003Eprototype\u003C\u002Fcode\u003E查找的，它们是两个实例自己独有的属性，指向不同地址），但这样就失去了继承的意义了。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E总结：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003E优点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E实现相对简单\u003C\u002Fli\u003E\n\u003Cli\u003E子类实例可以直接访问到父类实例或父类原型上的属性方法\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\n\u003Cp\u003E缺点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E父类所有的引用类型属性都会被实例出来的对象共享，所以修改一个实例对象的引用类型属性，会导致所有实例对象受到影响\u003C\u002Fli\u003E\n\u003Cli\u003E实例化时，不能传参数\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E因此为了解决原型链继承的缺点，又搞了个盗用构造函数继承的方式。\u003C\u002Fp\u003E\n\u003Ch3\u003E盗用构造函数继承\u003C\u002Fh3\u003E\n\u003Cp\u003E盗用构造函数继承，也叫借用构造函数继承，它可以解决原型链继承带来的缺点。\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E原理：在子类构造函数中，调用父类构造函数方法，但通过\u003Ccode\u003Ecall\u003C\u002Fcode\u003E或者\u003Ccode\u003Eapply\u003C\u002Fcode\u003E方法改变了父类构造函数内\u003Ccode\u003Ethis\u003C\u002Fcode\u003E的指向，使得子类实例出来的对象，\u003Cstrong\u003E自身\u003C\u002Fstrong\u003E拥有来自父类构造函数的方法跟属性，且分别独立，互不影响。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E来看看具体例子：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F 定义一个父类\nfunction Animal(name) {\n  this.name = name;\n  this.like = ['eat', 'drink', 'sleep'];\n  this.play = function() {\n    console.log('到处玩');\n  }\n}\n\n\u002F\u002F 为父类的原型添加一个run方法\nAnimal.prototype.run = function() {\n  console.log('跑步');\n}\n\n\u002F\u002F 定义一个子类\nfunction Cat(name, age) {\n  Animal.call(this, name);\n  this.age = age;\n}\n\n\u002F\u002F 实例一个由子类 new 出来的对象\nconst cat = new Cat('limingcan', 27);\n\n\u002F\u002F 给实例cat的like属性push一个toys值\ncat.like.push('toys');\n\n\u002F\u002F 实例第二个对象\nconst small_cat = new Cat('mimi', 100);\n\nconsole.log(cat);\n\nconsole.log(small_cat);\n\nconsole.log(cat.run);\n\nconsole.log(small_cat.run);\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E打印：\n\u003Cimg src=\"..\u002Fmd\u002Fjs-inherit\u002Fpic_3.png\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E从打印我们可以看出：\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli\u003E实例化子类\u003Ccode\u003ECat\u003C\u002Fcode\u003E时，可以传入参数\u003C\u002Fli\u003E\n\u003Cli\u003E父类\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E里的属性方法，都被添加到实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E跟实例\u003Ccode\u003Esmall_cat\u003C\u002Fcode\u003E的\u003Cstrong\u003E自身\u003C\u002Fstrong\u003E里了（因为子类\u003Ccode\u003ECat\u003C\u002Fcode\u003E调用了\u003Ccode\u003Ecall\u003C\u002Fcode\u003E方法，某种程度来说继承了父类\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E里的属性方法）\u003C\u002Fli\u003E\n\u003Cli\u003E修改实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E不会影响到实例\u003Ccode\u003Esmall_cat\u003C\u002Fcode\u003E（因为实例出来的对象，所有的属性、方法都是添加到实例对象\u003Cstrong\u003E自身\u003C\u002Fstrong\u003E，而不是添加到实例对象的原型上，它们是完全独立，指向的都是不同的地址）\u003C\u002Fli\u003E\n\u003Cli\u003E打印\u003Ccode\u003Erun\u003C\u002Fcode\u003E方法，输出都是\u003Ccode\u003Eundefined\u003C\u002Fcode\u003E，说明实例没有继承父类\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E原型上的方法（实例的原型链没有跟父类\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E原型链打通，因此原型链上搜索不到\u003Ccode\u003Erun\u003C\u002Fcode\u003E方法，可以跟原型链继承对比想想）\u003C\u002Fli\u003E\n\u003Cli\u003E子类的原型\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E与父类原型\u003Ccode\u003EAnimal.prototype\u003C\u002Fcode\u003E没有打通，因为\u003Ccode\u003ECat.prototype.__proto__\u003C\u002Fcode\u003E直接指向了\u003Ccode\u003EObject.prototype\u003C\u002Fcode\u003E，如果打通了的话，应该是\u003Ccode\u003ECat.prototype.__proto__\u003C\u002Fcode\u003E指向\u003Ccode\u003EAnimal.prototype\u003C\u002Fcode\u003E，这也是为什么实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E没有继承父类\u003Ccode\u003Erun\u003C\u002Fcode\u003E方法的原因，因为访问不到。\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cp\u003E总结：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003E优点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E实例化时，可以传参\u003C\u002Fli\u003E\n\u003Cli\u003E子类通过\u003Ccode\u003Ecall\u003C\u002Fcode\u003E或\u003Ccode\u003Eapply\u003C\u002Fcode\u003E方法，将父类里的所有属性、方法复制到实例对象的\u003Cstrong\u003E自身\u003C\u002Fstrong\u003E，而不是共享原型链上同一个属性，所以修改一个实例对象的引用类型属性时，不会导致所有实例对象受到影响\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\n\u003Cp\u003E缺点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E无法继承父类原型上的属性与方法\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E我们通过借用构造函数继承的方法，解决了原型链继承的缺点。但是又产生了一个新的问题——子类无法继承父类原型（\u003Ccode\u003EAnimal.prototype\u003C\u002Fcode\u003E）上的属性与方法，如果我们把这两种方式结合一下，会不会好点呢，于是有了组合继承这个继承方式。\u003C\u002Fp\u003E\n\u003Ch3\u003E组合继承\u003C\u002Fh3\u003E\n\u003Cp\u003E组合继承顾名思义就是，利用原型链继承跟借用构造函数继承相结合，而创造出来的一种新的继承方式，是不是很好记。\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E原理：利用原型链继承，实现实例对父类原型（\u003Ccode\u003EAnimal.protoytype\u003C\u002Fcode\u003E）上的方法与属性继承；利用借用构造函数继承，实现实例对父类构造函数（\u003Ccode\u003Efunction Animal() {}\u003C\u002Fcode\u003E）里方法与性的继承，并且解决原型链继承的缺陷。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E来看看具体例子：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F 定义一个父类\nfunction Animal(name, sex) {\n  this.name = name;\n  this.sex = sex;\n  this.like = ['eat', 'drink', 'sleep'];\n}\n\n\u002F\u002F 为父类的原型添加一个run方法\nAnimal.prototype.run = function() {\n  console.log('跑步');\n}\n\n\u002F\u002F 定义一个子类\nfunction Cat(name, sex, age) {\n  \u002F\u002F 第一次调用Animal构造函数\n  Animal.call(this, name, sex);\n  this.age = age;\n}\n\n\u002F\u002F 核心：将Cat的原型指向父类Animal的一个实例（第二次调用Animal构造函数）\nCat.prototype = new Animal();\n\n\u002F\u002F 实例cat.constructor是来自Cat.prototype.constructor\n\u002F\u002F 不矫正的cat.constructor话，当前的cat.constructor指向的是Animal\n\u002F\u002F 因为Cat.prototype被重写，constructor被指向了new Animal().__proto__.constructor，相当于Animal.prototype.constructor\nCat.prototype.constructor = Cat;\n\n\u002F\u002F 实例一个由子类new 出来的对象\nconst cat = new Cat('limingcan', 'man', 27);\nconsole.log(cat);\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E打印：\n\u003Cimg src=\"..\u002Fmd\u002Fjs-inherit\u002Fpic_4.png\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E由上图我们能得出总结：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003E优点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E利用原型链继承，将实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E、子类\u003Ccode\u003ECat\u003C\u002Fcode\u003E、父类\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E三者的原型链串联起来，让实例对象继承父类原型\u003Ccode\u003EAnimal.prototype\u003C\u002Fcode\u003E的方法与属性\u003C\u002Fli\u003E\n\u003Cli\u003E利用借用构造函数继承，将父类构造函数\u003Ccode\u003Efunction Animal() {}\u003C\u002Fcode\u003E的属性、方法添加到实例\u003Cstrong\u003E自身\u003C\u002Fstrong\u003E上，解决原型链继承，实例修改引用类型属性时对后续实例影响问题\u003C\u002Fli\u003E\n\u003Cli\u003E利用构造函数继承，实例化对象时，可传参\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\n\u003Cp\u003E缺点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E两次调用父类构造函数\u003Ccode\u003Efunction Animal() {}\u003C\u002Fcode\u003E（第一次在子类\u003Ccode\u003ECat\u003C\u002Fcode\u003E构造函数内调用，第二次在\u003Ccode\u003Enew Animal()\u003C\u002Fcode\u003E时候调用）\u003C\u002Fli\u003E\n\u003Cli\u003E实例自身拥有的属性，子类\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E里也会有，造成不必要的浪费（因为\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E被重写为\u003Ccode\u003Enew Animal()\u003C\u002Fcode\u003E了，\u003Ccode\u003Enew Animal()\u003C\u002Fcode\u003E是父类的一个实例，也有\u003Ccode\u003Ename\u003C\u002Fcode\u003E、\u003Ccode\u003Esex\u003C\u002Fcode\u003E、\u003Ccode\u003Elike\u003C\u002Fcode\u003E属性）\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E看来组合继承也不是最完美的继承方式。我们先把组合继承放一边，先看看什么是原型式继承。\u003C\u002Fp\u003E\n\u003Ch3\u003E原型式继承\u003C\u002Fh3\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E原理：用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）。一般使用\u003Ccode\u003EObject.create()\u003C\u002Fcode\u003E方法实现，详细用法可以看看\u003Ca href=\"https:\u002F\u002Fdeveloper.mozilla.org\u002Fzh-CN\u002Fdocs\u002FWeb\u002FJavaScript\u002FReference\u002FGlobal_Objects\u002FObject\u002Fcreate\"\u003E这里\u003C\u002Fa\u003E。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E来看看具体例子：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F 定义一个父类（新建出来的对象的__proto__会指向它）\nconst Animal = {\n  name: 'nobody',\n  like: ['eat', 'drink', 'sleep'],\n  run() {\n    console.log('跑步');\n  }\n};\n\n\u002F\u002F 新建以Animal为原型的实例\nconst cat = Object.create(\n  Animal,\n  \u002F\u002F 这里定义的是实例自身的方法或属性\n  {\n    name: {\n      value: 'limingcan'\n    }\n  }\n);\n\n\u002F\u002F 给实例cat属性like添加一个play值\ncat.like.push('play');\n\nconst small_cat = Object.create(\n  Animal,\n  \u002F\u002F 这里定义的是实例自身的方法或属性\n  {\n    name: {\n      value: 'mimi'\n    }\n  }\n);\n\nconsole.log(cat);\nconsole.log(small_cat);\nconsole.log(cat.__proto__ === Animal);\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E打印：\n\u003Cimg src=\"..\u002Fmd\u002Fjs-inherit\u002Fpic_5.png\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E由上图我们可以得出总结：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003E优点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E实现比原型链继承更简洁（不需要写什么构造函数了，也不需要写子类\u003Ccode\u003ECat\u003C\u002Fcode\u003E，直接父类继承\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E）\u003C\u002Fli\u003E\n\u003Cli\u003E子类实例可以访问到父类的属性方法\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\n\u003Cp\u003E缺点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E父类所有的引用类型属性都会被实例出来的对象共享，所以修改一个实例对象的引用类型属性，会导致所有实例对象受到影响\u003C\u002Fli\u003E\n\u003Cli\u003E实例化时，不能传参数\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E我们可以对比原型链继承方式，其实这两种方式差不多，所以它要跟原型链继承存在一样的缺点，但是实现起来比原型式继承更加简洁方便一些。如果我们只是想让一个对象跟另一个对象保持类似，原型式继承可能更加舒服，因为它不需要像原型链继承那样大费周章。接下来我们再看看另一种继承方式——寄生式继承。\u003C\u002Fp\u003E\n\u003Ch3\u003E寄生式继承\u003C\u002Fh3\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E原理：它其实就是对原型式继承进行一个小封装，增强了一下实例出来的对象\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E来看看具体例子：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\n\u002F\u002F 定义一个父类（新建出来的对象的__proto__会指向它）\nconst Animal = {\n  name: 'nobody',\n  like: ['eat', 'drink', 'sleep'],\n  run() {\n    console.log('跑步');\n  }\n};\n\n\u002F\u002F 定义一个封装Object.create()方法的函数\nconst createObj = (parentPropety, ownProperty) =&gt; {\n  \u002F\u002F 生成一个以parentPropety 为原型的对象obj\n  \u002F\u002F ownProperty 是新建出来的实例，拥有自身的属性跟方法配置\n  const obj = Object.create(parentPropety, ownProperty);\n\n  \u002F\u002F 增强功能\n  obj.catwalk = function() {\n    console.log('走猫步');\n  };\n\n  return obj;\n}\n\n\u002F\u002F 新建以Animal为原型的实例一\nconst cat = createObj(Animal, {\n  name: {\n    value: 'limingcan'\n  }\n})\n\n\u002F\u002F 给实例cat属性like添加一个play值\ncat.like.push('play');\n\n\u002F\u002F 新建以Animal为原型的实例二\nconst small_cat = createObj(Animal, {\n  name: {\n    value: 'mimi'\n  }\n})\n\nconsole.log(cat);\nconsole.log(small_cat);\nconsole.log(cat.__proto__ === Animal);\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E打印：\n\u003Cimg src=\"..\u002Fmd\u002Fjs-inherit\u002Fpic_6.png\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E总结：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003E优点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E实现比原型链继承更简洁\u003C\u002Fli\u003E\n\u003Cli\u003E子类实例可以访问到父类的属性方法\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\n\u003Cp\u003E缺点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E父类所有的引用类型属性都会被实例出来的对象共享，所以修改一个实例对象的引用类型属性，会导致所有实例对象受到影响\u003C\u002Fli\u003E\n\u003Cli\u003E实例化时，不能传参数\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E寄生式继承优缺点跟原型式继承一样，但最重要的是它提供了一个类似\u003Cstrong\u003E工厂的思想\u003C\u002Fstrong\u003E，是对原型式继承的一个封装。前面我们说到组合继承还是会有一些缺陷，通过原型式继承跟寄生式继承，我们可以利用这两个继承的思想，来解决组合继承的缺陷，它就是寄生组合式继承。\u003C\u002Fp\u003E\n\u003Ch3\u003E寄生式组合继承\u003C\u002Fh3\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E原理：利用原型链继承，实现实例对父类原型（\u003Ccode\u003EAnimal.prototype\u003C\u002Fcode\u003E）方法与属性的继承；利用借用构造函数继承，实现实例对父类构造函数（\u003Ccode\u003Efunction Animal() {}\u003C\u002Fcode\u003E）里方法与属性的继承，并且解决了组合继承带来的缺陷\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E前面我们说到，组合继承会有以下两个缺点：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E会两次调用父类构造函数\u003Ccode\u003Efunction Animal() {}\u003C\u002Fcode\u003E。（第一次在子类构造函数内使用\u003Ccode\u003Ecall\u003C\u002Fcode\u003E或者\u003Ccode\u003Eapply\u003C\u002Fcode\u003E方法时调用；第二次在\u003Ccode\u003ECat.prototype = new Animal()\u003C\u002Fcode\u003E时候调用了）\u003C\u002Fli\u003E\n\u003Cli\u003E实例自身拥有的属性，子类构造函数的\u003Ccode\u003Eprototype\u003C\u002Fcode\u003E里也会有，造成不必要的浪费（因为子类构造函数的\u003Ccode\u003Eprotptype\u003C\u002Fcode\u003E被重写为父类的一个实例了，所以\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E也会拥有父类实例里的属性跟方法）\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E通过上面原型式继承的方式，我们可以把原型链继承里，\u003Ccode\u003ECat.prototype = new Animal()\u003C\u002Fcode\u003E这一步，用寄生式继承的思想，用\u003Ccode\u003EObject.create()\u003C\u002Fcode\u003E方法实现并替换掉。来看看具体例子：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F 定义一个父类\nfunction Animal(name, sex) {\n  this.name = name;\n  this.sex = sex;\n  this.like = ['eat', 'drink', 'sleep'];\n}\n\n\u002F\u002F 定义一个子类\nfunction Cat(name, sex, age) {\n  \u002F\u002F 第一次调用Animal构造函数\n  Animal.call(this, name, sex);\n  this.age = age;\n}\n\n\u002F\u002F 定义一个利用原型式继承方式，跟寄生式继承思想来实现寄生组合式继承的方法\nfunction inheritObj(parentClass, childClass) {\n  \u002F\u002F parentClass 为传入的父类\n  \u002F\u002F childClass 为传入的子类\n  \u002F\u002F finalProperty 为最后继承的原型对象\n\n  const finalProperty = Object.create(parentClass.prototype);\n\n  finalProperty.constructor = childClass;\n\n  childClass.prototype = finalProperty;\n}\n\n\u002F\u002F 为父类的原型添加一个run方法\nAnimal.prototype.run = function() {\n  console.log('跑步');\n}\n\n\u002F\u002F 实现寄生组合继承\ninheritObj(Animal, Cat);\n\n\u002F\u002F 给子类的原型添加一个方法\nCat.prototype.catwalk = function() {\n  console.log('走猫步');\n}\n\n\u002F\u002F 实例一个由子类new 出来的对象\nconst cat = new Cat('limingcan', 'man', 27);\n\nconsole.log(cat);\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E寄生式组合继承打印：\u003Cbr\u003E\n\u003Cimg src=\"..\u002Fmd\u002Fjs-inherit\u002Fpic_7.png\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E组合继承打印：\u003Cbr\u003E\n\u003Cimg src=\"..\u002Fmd\u002Fjs-inherit\u002Fpic_4.png\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E我们可以对比一下组合继承那张图会发现：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E自身该有的属性都有\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003ECat.prototype\u003C\u002Fcode\u003E也干净了，没有把父类的属性都复制一遍，只有自己添加的\u003Ccode\u003Ecatwalk\u003C\u002Fcode\u003E方法\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003EAnimal.prototype\u003C\u002Fcode\u003E也十分干净，只有自己添加的\u003Ccode\u003Erun\u003C\u002Fcode\u003E方法\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E这是基本我们最想要的结果，也是最理想的继承方式。\u003C\u002Fp\u003E\n\u003Cp\u003E解析：\u003C\u002Fp\u003E\n\u003C!-- （我们把`parentClass`称作父类，把`childClass`称作子类，把`finalProperty`称作最后继承的原型对象） --\u003E\n\u003Cp\u003E我们想想为什么在组合继承时，我们要\u003Ccode\u003ECat.prototype = new Animal()\u003C\u002Fcode\u003E？核心是因为我们要\u003Cstrong\u003E打通实例\u003Ccode\u003Ecat\u003C\u002Fcode\u003E、子类\u003Ccode\u003ECat\u003C\u002Fcode\u003E、父类\u003Ccode\u003EAnimal\u003C\u002Fcode\u003E三者的原型链\u003C\u002Fstrong\u003E，从而实现继承。我们顺着这个思路，解析一下上面\u003Ccode\u003EinheritObj\u003C\u002Fcode\u003E这个方法，短短三行，但是为什么会发生那么神奇的事：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003Econst finalProperty = Object.create(parentClass.prototype)\u003C\u002Fcode\u003E：浅拷贝一份\u003Ccode\u003EparentClass.prototype\u003C\u002Fcode\u003E，并将其作为\u003Ccode\u003EfinalProperty\u003C\u002Fcode\u003E对象的原型，即\u003Ccode\u003EfinalProperty.__proto__ === parentClass.prototype\u003C\u002Fcode\u003E。此时\u003Ccode\u003EfinalProperty.constructor\u003C\u002Fcode\u003E指向的是\u003Ccode\u003EparentClass.prototype.constructor\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003EfinalProperty.constructor = childClass\u003C\u002Fcode\u003E：寄生式继承思想，增强对象。矫正\u003Ccode\u003EfinalProperty.constructor\u003C\u002Fcode\u003E，让其指向\u003Ccode\u003EchildClass\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003EchildClass.prototype = finalProperty\u003C\u002Fcode\u003E：使得实例找不到方法属性，会去\u003Ccode\u003EchildClass.prototype\u003C\u002Fcode\u003E（\u003Ccode\u003EfinalProperty\u003C\u002Fcode\u003E）里找；再找不到会去\u003Ccode\u003EfinalProperty.__proto__（parentClass.prototype）\u003C\u002Fcode\u003E里找。打通了子类\u003Ccode\u003EchildClass\u003C\u002Fcode\u003E与父类的\u003Ccode\u003EparentClass\u003C\u002Fcode\u003E原型链，实现了父子类的继承。\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E\u003Ccode\u003EinheritObj\u003C\u002Fcode\u003E方法，其实质就是下面的实现，这样可能可以更加直观的看出继承：\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-javascript\"\u003E\u002F\u002F 定义一个利用原型式继承方式，跟寄生式继承思想来实现寄生组合式继承的方法\nfunction inheritObj(parentClass, childClass) {\n  \u002F\u002F parentClass 为传入的父类\n  \u002F\u002F childClass 为传入的子类\n  \n  childClass.prototype.__proto__ = parentClass.prototype;\n\n  childClass.prototype.constructor = childClass;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E最后\u003C\u002Fh3\u003E\n\u003Cp\u003E终于写完了！真的太累了！希望这篇文章读完对大家有所帮助，面试的时候不虚。只要理解透了各个继承方式的原理，各个继承方式的优缺点真的没有必要背，优缺点自己总结就好了呀，万变不离其宗~\u003Cbr\u003E\n如果大家有什么异同，欢迎评论交流；如果觉得这篇文章好的话，欢迎点赞分享，这篇文章真的花了我不少功夫。\u003C\u002Fp\u003E\n"}}],fetch:{},mutations:[]});