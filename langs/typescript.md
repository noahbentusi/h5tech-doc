# Typescript语言

> 一言以蔽之
>
> Typescript语言是在ECMAScript 6的基础增加了类型语义的语言。强类型的好处是在代码编译检查可以直接找出潜在逻辑错误，另外增加语言的逻辑结构表达能力，使用代码更为清淅。

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

        left notSure = true; //不写类型，与ant等效

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

## 函数

1. 默认参数

        let add = function(left: number, right = 1: number): number {
            return left + right;
        };

        console.log(add(2)); //3

2. 函数类型

        let add: (number, number) => number =
            function(left: number, right: number): number { };
