# Typescript语言

> 一言以蔽之
>
> Typescript语言是在ECMAScript 6的基础增加了类型语义的语言。强类型的好处是在代码编译检查可以直接找出潜在逻辑错误，另外增加语言的逻辑结构表达能力，使用代码更为清淅。

以下只有快速手抄. 详细语言文档请参看[typescript-handbook](https://www.gitbook.com/book/zhongsp/typescript-handbook/details);

## nodejs的typescript运行环境

    npm install -g typescript ts-node

调用`ts-node`即可执行typescript代码。如需要添加es6库支持, 需要在项目中再安装typescript模块，并编写tsconfig.json。参见webapck打包文档。


## 变量声明

ECMAScript 6在`var`关键字之外增加了`let`关键字，并强烈建议使用`let`声明变量。`let`拥有强区域性声明的特点。

一个变量声明的格式如下:

        let 变量名: 类型 = 赋值表达式;

## 基础类型

1. 布尔类型

        let isDone: boolean = true;

2. 数值类型

        let decLiteral: number = 6;
        let hexLiteral: number = 0xf00d;
        let binaryLiteral: number = 0b1010;
        let octalLiteral: number = 0o744;

3. 字符串类型

        let name: string = "foo";

4. 数组

        let names: string[] = [ "noah", "robin", "sean" ];

5. 元组Tuple

        let x: [string, number] = [ "noah", 999999 ];

6. 枚举

        enum Color { Red, Green, Blue };
        let c: Color = Color.Red;

7. 任意类型

        let notSure: any = 4;
        notSure = "string";
        notSure = false;

        left notSure = true; //不写类型，与any等效

8. void, null和 undefined

        let voidValue: void;
        let nullValue: null;
        let undefinedValue: undefined;

        voidValue = null; //ok
        voidValue = undefined; //ok

        nullValue = null; //ok
        nullValue = undefined; //编译错误

        undefinedValue = null; //编译错误
        undefinedValue = undefined; //ok

## 常量

    const finalValue = 123;
    finalValue = 321; //编译错误

## 解构赋值

1. 数组解构

        let items: number[] = [ 123, 321 ];

        let [left, right] = items;
        console.log(left); //123
        console.log(right); //321

        let left2: number;
        left right2: number;

        [left2, right2] = items;
        console.log(left2); //123
        console.log(right2); //321

        function foo([left, right]: [number, number])
        {
            console.log(left);
            console.log(right);        
        }

        foo(items);

2. 对象解构

        let items = {
            name: "noah",
            age: 18;
        };

        let { name, age } = items;

        console.log(name); //noah
        console.log(age); //18

## 模板字符串

    let param1: number = 123;
    let str: string = "hello world";

    console.log(`这里模板字符串, ${param1}, ${str}`);

## 函数

1. 默认参数 和 可选参数

        let add = function(left: number, right = 1: number, third?: number): number {
            if (third !== undefined)
                right += third;

            return left + right;
        };

        console.log(add(2)); //3

2. 函数类型

        let add: (number, number) => number =
            function(left: number, right: number): number { };

3. 可变长参数

        let add: (first: number, ...nums: number[]) {
            let sum = 0;

            for(let num of nums)
            {
                sum += num;
            }

            return sum;
        };

        console.log(add(1, 2, 3, 4)); //10

4. 函数重载

        let foo = function(arg: number): void {
                console.log(`this number is ${arg}`);
        };

        let foo = function(arg: string): void {
                console.log(`this string is ${arg}`);
        };

        foo(1024);//this number is 1024
        foo("hello world");//this string is hello world

5. Lambda函数

        let add = (left: number, right: number): number => {
            return left + right;
        };

        //两者等效
        let add = function(left: number, right: number): number {
            return left + right;
        };

## 简单对象

1. 对象初始化赋值

        let param1: number = 123;
        let param2: string = "hello";
        let fieldName: string = "param3";

        let obj1 = {
            param1,
            param2,
            [fieldName]: 999
        };

        //以下写法与上面等效，用于解释语法
        let obj2 = {
            param1: param1,
            param2: param2
        };

        obj2[fieldName] = 999;

2. 对象比较

        let obj1 = obj2 = { };
        let obj3 = { };

        console.log(Object.is(obj1, obj2)); //true
        console.log(Object.is(obj1, obj3)); //false

3. 对象赋值

        let obj = Object.assign({
            param1: 123
        }, {
            param2: 321
        }, {
            param3: "hello world!"
        });

        console.log(obj.param1); //123
        console.log(obj.param2); //321
        console.log(obj.param3); //hello world

## Promise对象

    var promise: Promise<string> = new Promise<string>((resolve, reject) => {
        resolve("hello world!");
    });

    promise.then(function(result) {
        console.log(result);
    }); //hello world

## 接口和类

    interface Bird {
        name: string;

        sound(): string;
        fly(): void;
    };

    class Parrot
        implements Bird
    {
        private static count: number = 0; //静态成员

        static tellCount(): void { //静态方法
            console.log(`the count of birds is ${Parrot.count}`);
        };

        protected _name: string; //_ 鸟的名字

        constructor(name: string) {//构造函数
            this.name = name;

            ++Parrot.count;
        }

        get name(): string {//成员变量获取方法
            return this._name; //_
        }

        set name(new_name: string) {
            this._name = new_name; //_
        }

        sound(): string {//实现Bird接口方法
            let voice: string = "aowwwwww~";

            console.log(voice);

            return voice;
        }

        fly(): void {
            console.log(`a bird named ${this._name} fly~~~`);
        }
    };

    class Parakeet
        extends Parrot
    {
        constructor(name: string) {//构造函数
            super(name); //调用父类构造函数
        }

        sound(): string {
            return this.say();
        };

        say(): string {
            let voice: string = `my name is ${this._name}`;

            console.log(voice);

            return voice;
        }
    };

    let alex: Parakeet = new Parakeet("Alex");

    alex.sound();
    alex.fly();
    alex.say();

    let tweety: Bird = new Parrot("Tweety");

    console.log(tweety.name);
    tweety.sound();
    tweety.fly();

    Parrot.tellCount();

## 模块

1. 模块使用export关键字导出

        //demo.ts

        //导出变量
        export let moduleName: string = "demo module";

        //导出函数
        export let foo = (): void => {
            console.log("hello world!");
        };

        export class some {

        };

2. 使用者用import关键字导入

        //main.ts

        //导入
        import { moduleName as name, foo, some } from "./main";

        console.log(name); //demo module

## 装饰器, 相当于Java的注解

1. 类装饰器

    function(constructor: Function) {
        修改constrcutor.prototype
    }

2. 成员方法装饰器

    function(target: any, key: string, descriptor: PropertyDescriptor) {
        修改descriptor.value.
    }

3. 成员属性装饰器

    function(target: any, key: string) {

    }

4. 函数参量装饰器

    function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        
    }
