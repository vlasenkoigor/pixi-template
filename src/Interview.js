// https://codeshare.io/vwpDxD
// https://codesandbox.io/


// what types are in JS
// what is the difference undefined and null
// how to check variable type
/*
Undefined
Null
Boolean
String
Symbol
Number
Object
 */

// Difference
// between “==” and “===”?

// let vs var

// hoisting
var a = 10;
function f(){
    if (a === 10){
        a = 5;
    } else {
        a = 0;
    }
    console.log(a);
    var a = 1;
}
f();


// object, array Destructuring assignment
const [a, b, ...rest] = [1, 2, 3, 4, 5];

console.log(a,b, rest);
({a, b, ...rest} = {a:1, b:2, c:3, d:4});


// Array map, reduce

// closures
let sum = (function (){
    let acc = 0;
    return (a = 0)=>{
        acc += a;
        return acc;
    }
})()

sum(1); // 1
sum(); //1
sum(2); //3
sum(1); //4


for (let i = 0; i< 5; i++){
    setTimeout(()=>{
        console.log(i)
    }, i);
}

// this context. bind, apply, call
// arrow function

// async functions
// Promise, async, await. all vs allSettled

    console.log(1);

    new Promise((resolve)=>{

        console.log(2);
        setTimeout(()=>{
            resolve(3)
            console.log(4);
        });

        console.log(5);

    }).then((a)=>{
        console.log(a);
    })


    console.log(6);

//1,2, 5, 6, 4, 3
// classes, OOP
// парадигмы ООП
// наследование
// инкапсуляция
// полиморфизм

// What is optional chaining?
const o = {
    one : 1,
    second : {},
}

o?.one?.prop?.anotherProp;

// Nullish Coalescing
const values = {
    nullValue : null,
    undefinedValue : undefined,
    zero : 0,
    falseValue : false
}

const v = values.undefinedValue ?? 'default';
const v1 = values.zero || 'default';
// const v = values.undefinedValue ?? 'default';
console.log(v);

// PIXI

// What is a bitmap text
// performance, optimization
// request animation frame
// tween animation, sprite animation
// easing
// anchor vs pivot