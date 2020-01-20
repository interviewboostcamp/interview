# JS개발자의 흔한 질문

JS 개발자의 흔한 질문 by Crong

## 1. **브라우저의 렌더링 동작과정을 짧게 설명해보세요.**
HTML 파싱 후 DOM 트리 구성
CSS 파싱 후 CSS 트리 구성
DOM 트리와 CSS 트리를 합쳐 렌더링 트리 구성
렌더링 트리에 따라 브라우저의 렌더링 프로세스가 렌더링

다른 답

> Google Chrome을 기준으로 설명.

### 파싱  
1. DOM 트리를 구축한다.
2.  하위 리소스를 로딩한다.
3.  계산된 스타일을 확정한다. (CSS 트리 구축)

### 레이아웃  
1.  DOM 트리와 계산된 스타일에 따라 레이아웃 트리를 구축한다.
2.  속성 트리(transform, opacity 등의 속성만 가진 트리)를 구축한다.
3.  레이아웃 트리를 순회하며 레이어 트리를 구축한다.

### 페인트  
1.  레이아웃 트리를 순회하며 페인트 기록(페인트 트리)을 생성한다.

### 합성  
웹 페이지의 각 부분을 레이어로 분리하여 개별적으로 래스터화(이전의 정보들로 픽셀로 변환하는 과정)한다.
1. 위의 정보들을 기반으로 레이어 트리를 래스터화한다.
2. 드로 쿼드를 모아 합성 프레임을 생성한다.
3. 합성 프레임이 GPU로 전송되어 화면에 그려진다.

#### 참고
https://d2.naver.com/helloworld/5237120

## 2. **Object.create의 역할은 무엇인가요?**
내장 객체 메서드로 프로토타입 기반의 객체지향 프로그래밍 시, 상속을 할 때 사용합니다. 이 함수는 객체를 새로 반환하는데, 이 객체는 함수의 인자로 들어가는 객체를 prototype으로 연결시키면서 상속의 효과를 냅니다.

## 3. **자바스크립트에서 모듈내의 private한 속성을 만드는 방법을 아는대로 쓰세요.**
JS는 공식적으로 private 멤버를 지원하지 않지만 클로저를 사용해 private 효과를 줄 수 있습니다. 
이 방법과 비슷하게 객체 리터럴 형식의 인스턴스를 만드는 경우, 즉시실행함수안에 로직을 짠 뒤, public 속성들만 객체 리터럴로 담아 반환하는 방법이 있습니다
또한, ES6에서 지원하는 타입인 Symbol을 사용할 수 있습니다. Symbol을 할당한 변수를 접근가능한 스코프에 선언을 해서 클래스 로직에서 사용할 수 있습니다. 하지만 `getOwnPropertySymbols`을 사용해 접근할 수 있어 완벽하지 않지만 적절하게 사용할 수 있는 방법이라고 생각합니다.

## 4. **JS에서 재귀호출로 인한 stack overflow를 막을 수 있는방법은?**
setTimeout(0) 을 사용하는 등 비동기 함수 안에 요청 로직을 넣어 call stack에 쌓는 것이 아닌, eventQueue를 통해 stack에 하나씩 올리는 재귀 방식으로 사용합니다.
만약 좀 더 우선순위가 큰 로직의 경우 process.nextTick 같은 방법으로 eventQueue가 아닌, MicroQueue에 쌓는 방법도 고려할 수 있습니다.

## 5. **closure 와 스코프관계를 설명해보세요.**
JS의 스코프는 코드가 컴파일 될 때를 기준으로 스코프를 지정하는 렉시컬 스코프를 따릅니다.
따라서 함수도 정의될 시점의 렉시컬 스코프를 가지고, 이는 실행컨텍스트의 스코프 체인을 통해 참조할수있습니다. 클로저란 자신이 정의될 때 상위 스코프에서 참조할수 있었던 변수 들을 기억하는 함수입니다. 

## 6. **본인이 경험한 OOP관점에서의 객체분리를 설명하고, 느낀 장점을 말해보세요.**
제가 생각하는 객체 분리는 책임을 우선적으로 분리하고, 책임을 수행하기 위한 메세지를 설계하는 것입니다. 이런 관점은 메세지로 역할을 만들고, 역할로 인해서 객체가 만들어집니다. 이렇게 될 경우, 객체를 만들어 역할을 주입하는 것과 달리, 기능 파악이 먼저되기 때문에, SOLID원칙을 보다 잘 적용할 수 있습니다. 

## 7. **== 보다, === 를 써야할때는?**
`==` 의 경우 타입과 상관없이 비교하고 `===` 의 경우 타입까지 비교합니다.
가령 string type 의 `1` 과 number type 의 `1` 을 비교할 경우, `==` 는 참 `===` 는 거짓이 나오게 됩니다.
유사하게 `null` 과 `undefined` 를 비교할때도 `==` 는 참 `===` 는 거짓이 나오게 됩니다. 
비슷한 메소드로 [Object.is](http://object.is) 메소드가 있습니다. 이는 react 의 useEffect 에서 객체의 변화를 감지하는 곳에서도 사용되는 메소드입니다. 

#### 참고
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is

## 8. **DFS, BFS를 통한 트리탐색방법 중 본인이 경험(사용)했던 방식은 무엇이고, 동작원리를 짧게 설명해보세요.**
DFS 와 BFS 는 그래프를 탐색하는 완전탐색 알고리즘으로, DFS의 경우 스택을, BFS의 경우 큐를 사용하여 전체 그래프를 탐색합니다. DFS 의 경우 부모 노드에서 하나의 자식 노드의 마지막까지 탐색한 후, 다음 자식노드를 탐색하는 방식으로 구현됩니다. BFS의 경우 같은 레벨의 모든 자식노드를 탐색한 후 그 다음 레벨을 탐색하는 방식으로 구현됩니다. BFS의 경우 비가중치 그래프에서 최단경로를 찾기 위해 주로 사용됩니다. 

## 9. **ES6의 Class extends 내부 동작원리에 대해서 설명해보세요.**
ES6 의 extents 는 prototype 을 이용한 상속과 본질적으로 동일합니다.
이를 용이하게 해주기 위해 Object.Create 라는 메소드가 존재하며, 해당 메소드를 통해 extends 를 구현할 수 있습니다.

```javascript
// Object.create 메소드를 이용한 상속 구현

var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (상속됨)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null
```

#### 참고 
https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain

## 10. **객체를 탐색하는 방법에 대해서 2가지를 작성해보세요.**

for ...in 을 사용하여 객체를 탐색하는 방법이 있고, Object.keys() 를 사용한 후 forEach 를 사용하는 방법이 있습니다.

```javascript
// for in 을 사용한 방법
var names = { name : "teihong", age : 'old' };
for (e in names) { 
    console.log(e);
    console.log(names[e]);
}

//Object.keys 를 사용한 방법
console.log(Object.keys(names)); 
Object.keys(names).forEach((e)=>{
    console.log(names[e]);
});
```

참고로, for ... in 문법은 해당 객체의 모든 non-symbol속성과 enumerable 속성을 순회합니다.
그러나 Object.keys()는 해당 객체의 고유 속성의 이름들을 반환합니다.

## 11. **NodeList 타입을, Array에 있는 reduce메서드를 사용하는 방법은?**
NodeList 와 같은 유사 배열은 Array.from 메서드를 사용하여 배열화시킬 수 있습니다. 일부 구형 브라우저의 경우 Array.from 메서드가 구현되지 않았기때문에 Array.prototype.reduce 와 같이 회피할 수 있습니다. 

## 12. **arrow 함수의 this가 결정되는 방식을 설명해보세요.**
- 일반 함수 : dynamic scope를 기준으로 this가 바인딩 된다.
- 화살표 함수 : lexical scope를 기준으로 this가 바인딩 된다.

### 좀 더 자세하게
1. 함수를 호출할 때 `new` 키워드를 사용하는 경우, 함수 내부에 있는 `this`는 완전히 새로운 객체입니다.
2. `apply`, `call`, `bind`가 함수의 호출/생성에 사용되는 경우, 함수 내의 `this`는 인수로 전달된 객체입니다.
3. `obj.method()`와 같이 함수를 메서드로 호출하는 경우, `this`는 함수가 프로퍼티인 객체입니다.
4. 함수가 자유함수로 호출되는 경우, 즉, 위의 조건 없이 호출되는 경우 `this`는 전역 객체입니다. 브라우저에서는 `window` 객체입니다. 엄격 모드(`'use strict'`) 일 경우, `this`는 전역 객체 대신 `undefined`가 됩니다.
5. 위의 규칙 중 다수가 적용되면 더 상위 규칙이 승리하고 `this`값을 설정합니다.
6. 함수가 ES2015 화살표 함수인 경우 위의 모든 규칙을 무시하고 생성된 시점에서 주변 스코프의 `this`값을 받습니다.

#### 참고
https://nesoy.github.io/articles/2019-04/Javascript-Arrow-function
https://poiemaweb.com/js-this
https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Korean/questions/javascript-questions.md

## 13. **immutable과 mutable은 무엇이 다른것인가요?**
mutable은 변경 가능한 값이고 immutable은 생성 후에 변경이 불가능한 값이다.
JavaScript의 경우 원시타입은 변경 불가능한 값이다.
- boolean
- null
- undefined
- Number
- String
- Symbol(ES6)
위의 원시타입을 제외한 모든 객체는 mutable하다.
immutable 할 경우 메모리 영역에서 변경이 불가능하기 때문에 재할당을 해준다

mutable 객체의 메모리 참조

```javascript
var obj1 = {};
var obj2 = obj1; // 같은 빈 객체를 가리킨다.

obj1.value = 100; // 같은 빈 객체를 가리키기 때문에 
                                    //obj2의 value를 확인하면 같은 값이다.

console.log(obj1); // { value: 100 }
console.log(obj2); // { value: 100 }
```

immutable 객체의 메모리 참조

```javascript
var num1 = 0;
var num2 = num1; // 같은 0을 가리킨다.

num1 = 100; // 하지만 0을 바꿀 수 없기에 100을 재할당한다.

console.log(num1); // 100
console.log(num2); // 0
```

> 메모리 영역의 값이 직접 변경된다 vs 새로 할당된다 정도의 느낌

## 14. **undefined와 null의 차이점을 설명하세요.**
- undefined는 변수가 선언은 됬지만 값이 할당되지 않은 것을 의미한다.
- null은 할당하는 값이며 아무 값을 없는 것을 표현한다.

```javascript
null === undefined // false
null == undefined // true
null === null // true
```


## 15. **아래처럼 동작하는 flatten함수를 reduce를 활용해서 만들어보세요.**
```javascript
const arr = [[1, 2], [3, 4], [5, 6]];
const flattenedArray = flatten(arr);
console.log(flattenedArray)  //[1, 2, 3, 4, 5, 6];
```

### 코드

```javascript
const flatten = (arr) => {
    return arr.reduce((acc, curr) => {
        if(curr instanceof Array) {
            const flattened = flatten(curr);
            return acc.concat(flattened)
        }
        acc.push(curr);
        return acc;
    }, [])
};
```

## 16. **객체를 복사해서 새로운 객체를 만들고 싶습니다. 코드를 구현해보세요. (객체의 깊이는 1단계만 있다고 가정)**
```javascript
// 1 deepcopy 느리다.
const newObj =  JSON.parse(JSON.stringfy(obj));

// 2 shallowcopy
const newObj = {...obj};

// 3 shallowcopy
const newObj = Object.assign({}, obj);
```


## 17. **Array.from 이 모든 브라우저에서 동작하도록 polyfill코드를 만들어보세요.**
FROM MDN
```javascript
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function () {
      
    //// 필요 함수 시작 ////
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    //// 필요 함수 끝 ////
    
    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
    
      // 1. C에 this 값을 저장한다.
      var C = this;
      // 2. arrayLike를 객체로 만든다
      var items = Object(arrayLike);
      // 3. arrayLike가 null이거나 undefined이라면 에러를 리턴한다.
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. mapfn가 undefined이라면 mapping을 false화 한다.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. a. mapFn이 함수인지 확인 한 후 아니면 에러 리턴
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        // 5. b. thisArg가 주어졌다면 T에 할당한다.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }
      // 10. Let lenValue be Get(items, "length").
      // 11. len 변수에 toLength를 통과시켜 숫자화 및 시스템 최대값을 지키도록 바꾼다.
      var len = toLength(items.length);

      // 13. C가 컨스트럭터라면 
      // 13. a. A는 C의 Construct에 len을 매개변수로 넣은 호출한 결과가 되도록 한다.
      // 14. C가 컨스트럭터가 아니라면 Array로 만든다.
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      var k = 0;
      // 16~17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        // mapFn이 주어졌다면 mapFn을 호출한 결과를 A[k]에 할당한다.
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          // mapFn이 없다면 items[k]를 할당한다.
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. A.length에 items의 길이를 할당한다.
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
```

## 18. **프로그래밍 요구사항을 받았을때, 구현하기 전까지 어떤 과정을 거치시나요?**
- 요구사항을 분석합니다.
- user stories 기반으로 product backlog를 작성합니다.
    - 각 user stories별로 상세한 task(feature)를 작성합니다.
    - 일의 크기를 결정합니다.
- 백로그를 스프린트로 가져옵니다.
- 구현합니다.

## 19. **prototype 의 동작방식에 대해서 설명해보세요.**
```javascript
var Person = function (name) {
    this.name = name;
} // 생성자 함수

Person.prototype.getNmae = function() {
    return this.name;
} // Person 프로토타입 메소드

var man1 = new Person('man1');
```

- 함수(Person)를 선언하면, 함수의 prototype 프로퍼티는 함수명.prototype 객체(Person.prototype)를 가리킴
- 함수명.prototype 객체(Person.prototype)에 메소드를 선언(getName)하면, 해당 메소드는 프로토타입 메소드가 됨
- 함수(Person)가 new 키워드와 함께 생성자 함수로써 사용되었을 때, 생성된 인스턴스는 함수명.prototype 객체의 메소드를 모두 사용할 수 있음
    - 인스턴스의 메소드를 호출했을 때, 해당 메소드가 인스턴스 내에 존재하지 않는다면, 인스턴스의 던더 프로토 (__ proto __) 프로퍼티가 가르키고 있는 객체 내에서 호출한 메소드를 찾는다. 역시 호출한 메소드가 존재하지 않는다면, 다시한면 해당 객체의 던더 프로토 프로퍼티가 가르키고 있는 객체에서 메소드를 찾는다. 이러한 프로토타입 체이닝 과정은 모든 객체의 최상위 부모인 Object.prototype 객체까지 이어진다.
    - Object.prototype 객체에도 찾는 메소드가 없다면, 그제서야 에러가 발생한다.

## 20. 순환되는 캐로셀UI의 구현 원리에 대해서 설명해보세요.
- 5개의 페이지가 있는 캐로셀이라 가정, 순서는 1 → 2 → 3 → 4 → 5의 순서로 이동하는 캐로셀이라 가정
- 각 페이지 이동시 어느정도 천천히 이동하도록 애니메이션 효과를 줌
- 첫번째 페이지 앞에 마지막 페이지를 복사본을 추가, 마지막 페이지 뒤에 첫번째 페이지 복사본을 추가
    - 더미5 → 1 → 2 → 3 → 4 → 5 → 더미1
    - 이동 시, 끊김없이 넘어가는 효과를 보여주기 위함
- 첫번째 페이지에서 왼쪽으로 이동시, 0초만에 5번 페이지로 이동시킴
- 계속해서 현재 페이지 앞, 뒤 페이지를 동적으로 추가해주는 방식도 있음

## 21. Event 객체에 대해서 설명해보세요.
event 객체는 이벤트를 발생시킨 요소와 발생한 이벤트에 대한 유용한 정보를 제공한다.
이벤트가 발생하면, event객체는 동적으로 생성되며, 이벤트를 처리하는 이벤트 핸들러 함수의 인자로 전달된다.
event객체는 이벤트 핸들러에 암묵적으로 전달되는데, 이벤트 핸들러를 선언할 때, event 객체를 전달받을 첫번째 매개변수를 명시적으로 선언하여야 한다.
event 객체의 몇 가지 프로퍼티
- Event.target : 실제로 이벤트를 발생시킨 요소를 가리킨다.
- Event.currentTarget : 이벤트에 바인딩된 DOM 요소를 가리킨다.
- Event.type : 발생한 이벤트의 종류를 나타내는 문자열을 반환한다.

## 22. 웹사이트의 초기 로딩속도를 더 빠르게 하기 위해서 무엇을 해야 할까요?
- SSR
- 경량화 또는 렌더링 최적화
- gzip
- minify, uglify
- code split
- CDN
- lazy loading

## 23. 최근 가장 깊게 공부하고 있는 부분은 무엇인가요? 그 부분에 대해서 간단하게 설명해보세요.
### 프로토타입 기반 자바스크립트로 상속 구현하기
1. superClass의 인스턴스를 subClass 생성자 함수의 prototype 프로퍼티가 가르키도록
    - 단점
        - superClass 인스턴스가 메소드 뿐만 아니라 구체적인 값을 갖고 있다면, 이 값의 변경이 subClass의 인스턴스에 영향을 미칠 수 있다. 이는 수많은 버그를 발생시킬 여지가 있는 코드가 된다.
        - 위 문제를 해결하기 위해 superClass 인스턴스 내 모든 값을 갖고 있는 프로퍼티를 삭제해주고, 헤모드를 다시 등록해주는 작업이 필요한데, 이는 코드가 길어지고 번거로운 작업이다.
        - subClass 생성자 함수의 prototype 객체의 constructor 프로퍼티는  superClass 생성자를 가르키고 있다.
        - new 키워드로 생성자 함수로써 사용한다는 보장이 없음 → 올바르게 사용하지 않을 경우 예상치 못한 버그 발생할 수 있음 (잘못된 this 바인딩 등)
        - 객체 리터럴로써 구현 못함
    - 장점
        - 클래스 기반 언어의 상속 개념을 가장 유사하게 구현함
2. 내부가 비어있는 Bridge 생성자 함수를 만들어, Bridge 생성자 함수의 인스턴스를 subClass 생성자 함수의 prototype 프로퍼티가 가르키도록 
    - 단점
        - subClass 생성자 함수의 prototype 객체의 constructor 프로퍼티는 Bridge 생성자를 가르키고 있다.
        - new 키워드로 생성자 함수로써 사용한다는 보장이 없음 → 올바르게 사용하지 않을 경우 예상치 못한 버그 발생할 수 있음 (잘못된 this 바인딩 등)
        - 객체 리터럴로써 구현 못함
    - 장점
        - 1번 방법에서 실행해주어야할 프로퍼티 제거 후, 메소드 등록 과정이 필요하지 않음
3. Object.create() 
    - 단점
        - subClass 생성자 함수의 prototype 객체의 constructor 프로퍼티는 다른 함수로 지정되어 있음 (Object.create 함수 내 새로 생성된 함수)
    - 장점
        - 위 방법들 중 가장 안전

## 24. Array.from 이 모든 브라우저에서 동작하도록 polyfill코드를 만들어보세요. 
17번과 교차됨

## 25. **브라우저의 렌더링 동작과정을 짧게 설명해보세요.**
1번과 교차됨

## 26. **arrow 함수의 this가 결정되는 방식을 설명해보세요.**
12번과 교차됨

## 27. **비동기의 장점을 설명해보세요.**
오랜 시간이 걸리는 작업에 대한 결과를 기다리기 위해 멈추지 않기 때문에(주 실행 흐름이 막히지 않음), 빠르고 쾌적한 사용자 경험을 제공할 수 있다.
이러한 특성 때문에 웹 개발에서는 비동기 프로그래밍, 이벤트 주도 프로그래밍이 중요하다고 생각한다.

## 28. **본인이 즐겨하는 디버깅 방법을 설명해보세요.**
console.log, 크롬 개발자 도구 디버거, IDE 디버거.

## 29. **bind 가 필요한 상황을 간단한 코드로 보여주세요.**
```javascript
function foo() {
    console.log(this.bar);
}

const obj = {
    bar: 'hello, world!',
    baz() {
        setTimeout(foo.bind(this), 1000);
    }
}
```

## 30. **CommonJS 스펙에 대해 설명해보세요.**
[CommonJS](http://www.commonjs.org/)는 JavaScript를 브라우저에서뿐만 아니라, 서버사이드 애플리케이션이나 데스크톱 애플리케이션에서도 사용하려고 조직한 자발적 워킹 그룹이다.
CommonJS의 'Common'은 JavaScript를 브라우저에서만 사용하는 언어가 아닌 일반적인 범용 언어로 사용할 수 있도록 하겠다는 의지를 나타내고 있는 것이라고 이해할 수 있다.

### 모듈화
- 스코프(Scope): 모든 모듈은 자신만의 독립적인 실행 영역이 있어야 한다.
- 정의(Definition): 모듈 정의는 exports 객체를 이용한다.
- 사용(Usage): 모듈 사용은 require 함수를 이용한다.

#### 참고
https://d2.naver.com/helloworld/12864

## 31. **node의 middleware의 동작방식을 설명해보세요.**
Express 기준으로 설명.
app.use() 혹은 app.METHOD()를 이용해 미들웨어를 앱 객체 인스턴스에 바인딩 할 수 있다.
미들웨어 함수는 다음과 같은 동작을 수행할 수 있다.
- 모든 코드를 실행.
- 요청 및 응답 객체에 대한 변경을 실행.
- 요청-응답 주기를 종료.
- 스택 내의 그 다음 미들웨어 함수를 호출.

express는 app에 바인딩 된 미들웨어 함수를 순서대로 실행한다. 현재 미들웨어 함수가 요청-응답 주기를 종료하지 않는다면, 명시적으로 next()를 호출해야 해당 요청이 정지된 채로 방치되지 않는다.

#### 참고
https://expressjs.com/ko/guide/using-middleware.html

## 32. **본인이 생각하는 좋은 객체지향프로그래밍에 대해서 설명해보세요.**
단일 책임의 원칙을 준수하는 객체, 개방 폐쇄의 원칙을 준수하는 객체.
최소한 상기한 두가지 원칙을 준수하는 프로그래밍이 좋은 객체지향 프로그래밍이라고 생각한다.

#### 참고
http://www.nextree.co.kr/p6960/

## 33. **클로저로 동작되는 상황을 예시코드로 보여주세요.**
```javascript
function getCounter() {
    let count = 10;

    return {
        count() {
            count -= 1;
            return count;
        },
        reset() {
            count = 10;
        }
    };
}
```

```javascript
const singletonInstance = (function getSingletonInstance() {
    class Singleton {
    // ...
    }
    
    return new Singleton();
})();
```

## 34. **React의 virtual DOM 은 뭐에요?**
React는 실제로 DOM을 제어하는 방식이 아니라 중간에 가상의 DOM인 Virtual DOM을 두어 개발의 편의성(DOM을 직접 제어하지 않음)과 성능(배치 처리로 DOM 변경)을 개선했다.
Virtual DOM은 실제 DOM의 구조와 비슷한, React 객체의 트리다. 개발자는 직접 DOM을 제어하지 않고 Virtual DOM을 제어하고, React에서 적절하게 Virtual DOM을 DOM에 반영하는 작업을 한다.

#### 참고
https://d2.naver.com/helloworld/9297403

## 35. **React의 렌더링 방식은 무엇인가요?**
`render()` 내부의 jsx는 `React.createElement()`로 변환된다. 이 때 생성되는 객체는 `ReactCompositeComponent`혹은 `ReactDOMComponent`이다.
생성한 컴포넌트를 React 컴포넌트에 마운트하기 위해 `ReactReconciler.mountComponent()`를 호출한다. 해당 함수는 `ReactCompositeComponent`와 `ReactDOMComponent`의 `mountComponent()`를 호출한다.

### `ReactCompositeComponent`의 작업
1. `constructor()` 메서드를 실행한다.
2. `componentWillMount()` 메서드를 실행한다.
3. 렌더링을 실행한다.
4. 배치 처리 작업(`ReactReconcileTransaction` 객체)에 메서드나 속성을 등록한다.
    1. `componentDidMount()` 메서드가 있으면 `componentDidMount()` 메서드를 등록한다.
    2. `ref` 속성이 있으면 `attachRefs` 속성을 등록한다.
5. 하위 ReactComponent 객체가 있으면 ReactComponent 객체를 생성하고 다시 `ReactReconciler.mountComponent()` 메서드를 실행한다.

### `ReactDOMComponent`의 작업
1. 실제 DOM을 생성한다.
2. 실제 DOM에 `style` 속성과 `attr` 속성을 추가한다.
3. 배치 처리 작업에 사용자 이벤트를 등록한다.
4. 하위 ReactComponent 객체가 있으면 ReactComponent 객체를 생성하고 다시 `ReactReconciler.mountComponent()` 메서드를 실행한다.
5. 최상위 DOM(root DOM)에 생성한 DOM을 추가한다. (현재 최상위 DOM은 document 객체에 추가되지 않은 상태이다.)

### 배치 처리 작업
#### `ReactReconcileTransaction` 객체
1. `componentDidMount()` 메서드를 실행한다(`componentDidXXX()` 메서드를 실행한 시점에는 DOM에 접근할 수 있다).
2. 기본 이벤트를 등록한다.
3. 추가한 이벤트를 등록한다.
4. `ref` 속성 추가 등 기타 작업을 실행한다.

#### `ReactDefaultBatchingStrategy`객체
1. `componentWillMount()` 메서드와 `componentDidMount()` 메서드에서 상태를 변경했다면, 이 시점에 상태를 갱신하는 작업이 시작된다.

#### 참고
https://d2.naver.com/helloworld/9297403

## 36. **React의 초기화면 느린 부분은 어떻게 해결해야해요?**
- 최대한 리소스를 적게 로딩한다.
- webpack등의 툴을 이용해 번들링한다.
- SSR로 구현한다.

## 37. **SSR은 무엇인가요? 어떻게 구현하죠?**
서버 사이드 랜더링. 서버에서 랜더링 작업을 한 후 응답한다.

### 구현방법
랜더링 될 src/page.js를 구현한다.
```javascript
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TodoApp from './components/TodoApp';

export default function() {
    return ReactDOMServer.renderToString(
    <TodoApp />
    );
}
```

webpack을 이용해 번들링한다.
server.js를 수정한다.
```javascript
// ...
var http = require('http');
var page = require('./dist/page'); // 번들 파일을 불러온다
// ...

switch (location.path) {
    case '/':
        status = 200;
        content = fs.readFileSync('./index.html');
        content = content.toString().replace('<% page %>', page());
        break;
}
// ...
```

index.html을 수정한다.
```html
<!--...-->
<div id="app"><% page %></div>
<!--...-->
```

혹은, next.js를 사용한다.

#### 참고

## 38. **대용량 트래픽은 어떻게 견딜 수 있을까요?**
### 읽기 부하가 심한 경우
- 초반에는 서버와 DB서버의 스케일업을 이용한다.
- 서버와 DB사이에 캐싱을 두어 DB까지의 트래픽을 줄인다.
- 부하가 점점 더 심해질 경우 로드밸런서를 두고 서버를 스케일 아웃 한다.
- 읽기 DB를 여러대 둔다.
- CDN을 이용하여 static 파일을 분리 서빙한다.
    - 100KB 용량의 이미지를 10만 명이 조회하면 대략 10GB의 트래픽이 발생한다.

### 입력 부하가 심한 경우
- 입력을 message queue 서버로 보내고 배치처리로 입력을 단행한다.
- 프론트를 이용하는 방법
    - lazy loading을 이용하여
    - Serve Scaled Images
