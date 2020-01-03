# 자바스크립트

**Contents**

- [Javascript Engine](#Javascript-Engine)
- [Call Stack](#Call-Stack)
- [Task Queue와 Event Loop](#Task-Queue와-Event-Loop)
- [원시 타입(Primitive Type)](<#원시-타입(Primitive-Type)>)
- [객체(Object)](<#객체(Object)>)
- [호이스팅](#호이스팅)
- [클로저](#클로저)

</br>

## Javascript Engine

js를 해석하는 `javascipt engine`과 `rendering engine`은 다른 것이다.
javascipt engine은 js코드를 해석하고 실행하는 인터프리터로 V8, 라이노 등이 있다.

V8같은 js엔진은 단일호출스택(call stack)을 사용하며 요청이 들어올 때 마다 요청을 call stack에 담아 처리할 뿐이다. 비동기 요청은 이 js엔진을 구동하는 환경, 즉 브라우저나 node.js가 담당한다.

![](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-runtime.png)

![](https://pbs.twimg.com/media/Bt5ywJrIEAAKJQt.jpg)

Node.js 환경도 브라우저 환경과 비슷하게 libuv라이브러리가 이벤트루프를 지원한다. js engine(V8)은 비동기 작업을 위해 node.js의 api를 호출하고, 이때 넘겨진 콜백은 libuv의 이벤트루프를 통해 스케줄 되고 실행된다.

## Call Stack

js는 하나의 호출스택을 사용한다. 요청이 들어오면 순서대로 call stack에 쌓이고 함수의 실행이 끝나면 pop된다. 콜스택이 한개이기 때문에 함수가 실행되면 이 함수가 끝나기 전까지는 어떠한 다른 작업도 할 수 없다. (Run to Completion)

## Task Queue와 Event Loop

js에서 모든 비동기 api는 작업이 완료되면 콜백함수를 task queue에 추가한다.
이벤트루프는 현재 실행중인 task가 없는지, task queue에 task가 있는지를 반복적으로 확인한다.
콜스택이 비워진 것을 확인하면 이벤트 루프가 task queue의 task를 실행해 콜스택에 추가한다.

### Promise와 Event Loop

Promise는 microtask를 사용한다. microtask는 일반 task볻 더 높은 우선순위를 갖는 task이다. Task Queue에 이미 대기중인 task가 있어도 microtask가 먼저 실행된다.

```js
setTimemout(() => {
  console.log("A");
});
Promise.resolve()
  .then(() => {
    console.log("B");
  })
  .then(() => {
    console.log("C");
  });
```

## 원시 타입(Primitive Type)

자바스크립트에는 6가지 종류의 원시 데이터 타입이 있다. 원시 데이터 타입은 쉽게 말하자면 자바스크립트에서 **객체가 아닌 것들**이며 **값 그 자체로 저장**된 것 이다. 마치 atom과 같다.

- boolean
- null
- undefined
- number
- string
- symbol

원시 타입은 값(value)으로 저장되고, 객체들은 참조(reference)로 저장된다. 아래 배열과 객체는 내용은 같지만 다른 곳을 참조하고 있기 때문에 false를 리턴.

```js
"dog" === "dog";                        // true
14 === 14;                              // true

{} === {};                              // false
[] === [];                              // false
(function () {}) === (function () {});  // false
```

### 객체(Object)

객체는 원시타입은 아니지만 자바스크립트의 타입값 중 하나이다.

![](https://poiemaweb.com/img/objects.png)

### 내장객체

내장 객체란 자바스크립트가 기본적으로 가지고 있는 객체들을 의미한다. 내장 객체가 중요한 이유는 프로그래밍을 하는데 기본적으로 필요한 도구들이기 때문이다.

**Native 객체**

- Object
- Function
- Array
- String
- Boolean
- Number
- Math
- Date
- RegExp

```js
var a = new String("Abc");

typeof a; // "object"     !!string이 아니다!!
```

자바스크립트는 원시값을 알아서 해당 객체 래퍼로 래핑해주기 때문에 다음과 같은 코드가 가능하다.

```js
var a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
```

[reference](https://poiemaweb.com/js-built-in-object)

## Garbage Collection

## 호이스팅

호이스팅이란 컴파일 시점에서 변수(var)와 함수 `선언문`을 실행 문맥(컨텍스트)/스코프? 에 저장하고 이후 코드가 실행되는 것을 말한다. (실행단계에서 초기화가 이루어진다.)

그래서 흔히 변수(var)와 함수 `선언문`을 스코프의 최상단으로 `끌어올려`지는 것이라 말한다. 실제로 코드가 끌어올려지는 것은 아니고 자바스크립트가 내부적으로 끌어올려서 처리하는 것이다. 실제 메모리엔 변화가 없다.

**함수선언문 vs 함수표현식**

```js
foo();
bar();

function foo() {
  console.log("foo");
} //함수 선언문

var bar = function() {
  console.log("bar");
}; //함수표현식

// Uncaught TypeError: bar is not a function
```

```js
/** --- JS Parser 내부의 호이스팅(Hoisting)의 결과 */
var foo2; // 함수표현식의 변수값 "선언"문이 호이스팅됨

function foo() {
  // 함수선언문이 호이스팅 됨
  console.log("hello");
}

foo();
foo2(); // ERROR!!

foo2 = function() {
  console.log("hello2");
};
```

호이스팅은 함수선언문과 함수표현식에서 서로 다르게 동작한다.
변수에 할당된 함수표현식은 끌어 올려지지 않기 때문에 변수의 스코프 규칙을 그대로 따른다.

### 자바스크립트의 컴파일 과정

자바스크립트 엔진은 코드를 실행하기 직전에 컴파일을 하는데, 이과정에서 엔진은 `var a = 2`라는 구문을 다음과 같이 두단계로 나눈다.

1. `var = a`: 변수 a를 해당 스코프에 선언한다. 이 단계는 코드 실행 전에 처음부터 수행된다. (컴파일 단계에서 처리)
2. `a = 2`는 변수 a를 찾아 값을 대입한다.(실행 단계에서 처리)

**더 자세한 설명**
컴파일러가 `var a`를 만나면 스코프에게 변수 a가 특정한 스코프 컬렉션 안에 있는지 묻는다. a가 있다면 지나가고 없다면 a를 스코프 컬렉션 내에 선언하라고 요청한다.

그 후 컴파일러는 `a=2`대입문을 처리하기 위해 나중에 js엔진이 실행할 수 있는 코드를 생성한다. 엔진이 실행하는 코드는 먼저 스코프에게 a변수가 현재 스코프 컬렉션 내에서 접근 할 수 있는지 확인한다. 가능하다면 현재 스코프 내의 a를 사용하고 아니면 엔진은 중첩 스코프를 살핀다.

[스코프와 호이스팅](https://meetup.toast.com/posts/86)

## 클로저

특정 함수가 참조하는 변수들이 선언된 렉시컬 스코프(lexical scope)는 계속 유지되는데, 그 함수와 스코프를 묶어서 클로저라고 한다.
클로저가 나타나는 가장 기본적인 환경은 함수 안에 함수가 선언되었을 때. 즉, 스코프 안에 스코프가 있을 때.

### 클로저는 언제 사용할까?

- private 변수
- 함수 콘텍스트 바인딩하기
- 메모제이션, 함수 래핑 ...

```js
// 클로저를 이용해 private 변수 만들기

function Toy() {
  var battery = 0;

  this.showBattery = function() {
    return battery;
  };

  this.charge = function() {
    battery += 10;
  };
}

var woody = new Toy();
woody.charge();

if (woody.showBattery() == 10)
  console.log("생성자 함수 내부에 있는 battery변수 값은 얻어올 수 있다.");

if (woody.bttery === undefined)
  console.log("하지만 private변수에 직접 접근은 불가능 하다");
```
