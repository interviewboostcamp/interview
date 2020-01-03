# Javascript Engine

js를 해석하는 `javascipt engine`과 `rendering engine`은 다른 것이다.
javascipt engine은 js코드를 해석하고 실행하는 인터프리터로 V8, 라이노 등이 있다.

V8같은 js엔진은 단일호출스택(call stack)을 사용하며 요청이 들어올 때 마다 요청을 call stack에 담아 처리할 뿐이다. 비동기 요청은 이 js엔진을 구동하는 환경, 즉 브라우저나 node.js가 담당한다.

![](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-runtime.png)

![](https://pbs.twimg.com/media/Bt5ywJrIEAAKJQt.jpg)

Node.js 환경도 브라우저 환경과 비슷하게 libuv라이브러리가 이벤트루프를 지원한다. js engine(V8)은 비동기 작업을 위해 node.js의 api를 호출하고, 이때 넘겨진 콜백은 libuv의 이벤트루프를 통해 스케줄 되고 실행된다.

# Call Stack

js는 하나의 호출스택을 사용한다. 요청이 들어오면 순서대로 call stack에 쌓이고 함수의 실행이 끝나면 pop된다. 콜스택이 한개이기 때문에 함수가 실행되면 이 함수가 끝나기 전까지는 어떠한 다른 작업도 할 수 없다. (Run to Completion)

# Task Queue/Call Stack

js에서 모든 비동기 api는 작업이 완료되면 콜백함수를 task queue에 추가한다.
이벤트루프는 현재 실행중인 task가 없는지, task queue에 task가 있는지를 반복적으로 확인한다.
콜스택이 비워진 것을 확인하면 이벤트 루프가 task queue의 task를 실행해 콜스택에 추가한다.

## Promise와 Event Loop

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

# 클로저

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
