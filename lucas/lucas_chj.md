# JS 개발자의 흔한 질문
## 1. 브라우저의 렌더링 동작과정을 짧게 설명해보세요.
1. HTML 파싱 후 DOM 트리 구성
2. CSS 파싱 후 CSS 트리 구성
3. DOM 트리와 CSS 트리를 합쳐 렌더링 트리 구성
4. 렌더링 트리에 따라 브라우저의 렌더링 프로세스가 렌더링

## 2. Object.create의 역할은 무엇인가요?

## 3. 자바스크립트에서 모듈내의 private한 속성을 만드는 방법을 아는대로 쓰세요.
- _ prefix
- 클로저 이용 (IIFE)

## 4. JS에서 재귀호출로 인한 stack overflow를 막을 수 있는방법은?

## 5. closure 와 스코프관계를 설명해보세요.

## 6. 본인이 경험한 OOP관점에서의 객체분리를 설명하고, 느낀 장점을 말해보세요.

## 7. = 보다, === 를 써야할때는?

## 8. DFS, BFS를 통한 트리탐색방법 중 본인이 경험(사용)했던 방식은 무엇이고, 동작원리를 짧게 설명해보세요.

## 9. ES6의 Class extends 내부 동작원리에 대해서 설명해보세요.

## 10. 객체를 탐색하는 방법에 대해서 2가지를 작성해보세요.

## 11. NodeList 타입을, Array에 있는 reduce메서드를 사용하는 방법은?

## 12. arrow 함수의 this가 결정되는 방식을 설명해보세요.

## 13. immutable과 mutable은 무엇이 다른것인가요?

## 14. undefined와 null의 차이점을 설명하세요.

## 15. 아래처럼 동작하는 flatten함수를 reduce를 활용해서 만들어보세요.

## 16. 객체를 복사해서 새로운 객체를 만들고 싶습니다. 코드를 구현해보세요. (객체의 깊이는 1단계만 있다고 가정)

## 17. Array.from 이 모든 브라우저에서 동작하도록 polyfill코드를 만들어보세요.

## 18. 프로그래밍 요구사항을 받았을때, 구현하기 전까지 어떤 과정을 거치시나요?

## 19. prototype 의 동작방식에 대해서 설명해보세요.

## 20. 순환되는 캐로셀UI의 구현 원리에 대해서 설명해보세요.

## 21. Event 객체에 대해서 설명해보세요.

## 22. 웹사이트의 초기 로딩속도를 더 빠르게 하기 위해서 무엇을 해야 할까요?

## 23. 최근 가장 깊게 공부하고 있는 부분은 무엇인가요? 그 부분에 대해서 간단하게 설명해보세요.

## 24. Array.from 이 모든 브라우저에서 동작하도록 polyfill코드를 만들어보세요.

## 25. 브라우저의 렌더링 동작과정을 짧게 설명해보세요
Google Chrome을 기준으로 설명.

### 파싱
1. DOM 트리를 구축한다.  
2. 하위 리소스를 로딩한다.  
3. 계산된 스타일을 확정한다. (CSS 트리 구축)  

### 레이아웃
1. DOM 트리와 계산된 스타일에 따라 레이아웃 트리를 구축한다.
2. 속성 트리(transform, opacity 등의 속성만 가진 트리)를 구축한다.
3. 레이아웃 트리를 순회하며 레이어 트리를 구축한다.

### 페인트
1. 레이아웃 트리를 순회하며 페인트 기록(페인트 트리)을 생성한다.

### 합성
웹 페이지의 각 부분을 레이어로 분리하여 개별적으로 래스터화(이전의 정보들로 픽셀로 변환하는 과정)한다.

1. 위의 정보들을 기반으로 레이어 트리를 래스터화한다.
2. 드로 쿼드를 모아 합성 프레임을 생성한다.
3. 합성 프레임이 GPU로 전송되어 화면에 그려진다.

#### 참고
https://d2.naver.com/helloworld/5237120

## 26. arrow 함수의 this가 결정되는 방식을 설명해보세요.
- 일반 함수 : dynamic scope를 기준으로 this가 바인딩 된다.
- 화살표 함수 : lexical scope를 기준으로 this가 바인딩 된다.

#### 참고 
https://nesoy.github.io/articles/2019-04/Javascript-Arrow-function  
https://poiemaweb.com/js-this  


## 27. 비동기의 장점을 설명해보세요.
오랜 시간이 걸리는 작업에 대한 결과를 기다리기 위해 멈추지 않기 때문에(주 실행 흐름이 막히지 않음), 빠르고 쾌적한 사용자 경험을 제공할 수 있다. 
이러한 특성 때문에 웹 개발에서는 비동기 프로그래밍, 이벤트 주도 프로그래밍이 중요하다고 생각한다.

## 28. 본인이 즐겨하는 디버깅 방법을 설명해보세요.
console.log, 크롬 개발자 도구 디버거, IDE 디버거.

## 29. bind 가 필요한 상황을 간단한 코드로 보여주세요.
```javascript
function foo() {
    console.log(this.bar); }

const obj = {
    bar: 'hello, world!',
    baz() {
        setTimeout(foo.bind(this), 1000);
    } 
}
```

## 30. CommonJS 스펙에 대해 설명해보세요.
[CommonJS](http://www.commonjs.org/)는 JavaScript를 브라우저에서뿐만 아니라, 서버사이드 애플리케이션이나 데스크톱 애플리케이션에서도 사용하려고 조직한 자발적 워킹 그룹이다. 
CommonJS의 'Common'은 JavaScript를 브라우저에서만 사용하는 언어가 아닌 일반적인 범용 언어로 사용할 수 있도록 하겠다는 의지를 나타내고 있는 것이라고 이해할 수 있다.

### 모듈화
- 스코프(Scope): 모든 모듈은 자신만의 독립적인 실행 영역이 있어야 한다.
- 정의(Definition): 모듈 정의는 exports 객체를 이용한다.
- 사용(Usage): 모듈 사용은 require 함수를 이용한다.

#### 참고
https://d2.naver.com/helloworld/12864

## 31. node의 middleware의 동작방식을 설명해보세요.
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

## 32. 본인이 생각하는 좋은 객체지향프로그래밍에 대해서 설명해보세요.
단일 책임의 원칙을 준수하는 객체, 개방 폐쇄의 원칙을 준수하는 객체.  
최소한 상기한 두가지 원칙을 준수하는 프로그래밍이 좋은 객체지향 프로그래밍이라고 생각한다.

#### 참고 
http://www.nextree.co.kr/p6960/

## 33. 클로저로 동작되는 상황을 예시코드로 보여주세요.
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

## 34. React의 virtual DOM 은 뭐에요?
React는 실제로 DOM을 제어하는 방식이 아니라 중간에 가상의 DOM인 Virtual DOM을 두어 개발의 편의성(DOM을 직접 제어하지 않음)과 성능(배치 처리로 DOM 변경)을 개선했다.
Virtual DOM은 실제 DOM의 구조와 비슷한, React 객체의 트리다. 개발자는 직접 DOM을 제어하지 않고 Virtual DOM을 제어하고, React에서 적절하게 Virtual DOM을 DOM에 반영하는 작업을 한다.

#### 참고
https://d2.naver.com/helloworld/9297403

## 35. React의 렌더링 방식은 무엇인가요?
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

### ReactDOMComponent의 작업
1. 실제 DOM을 생성한다.
2. 실제 DOM에 `style` 속성과 `attr` 속성을 추가한다.
3. 배치 처리 작업에 사용자 이벤트를 등록한다.
4. 하위 ReactComponent 객체가 있으면 ReactComponent 객체를 생성하고 다시 `ReactReconciler.mountComponent()` 메서드를 실행한다.
5. 최상위 DOM(root DOM)에 생성한 DOM을 추가한다. (현재 최상위 DOM은 document 객체에 추가되지 않은 상태이다.)

### 배치 처리 작업
#### `ReactReconcileTransaction`객체
1. `componentDidMount()` 메서드를 실행한다(`componentDidXXX()` 메서드를 실행한 시점에는 DOM에 접근할 수 있다).
2. 기본 이벤트를 등록한다.
3. 추가한 이벤트를 등록한다.
4. `ref` 속성 추가 등 기타 작업을 실행한다.

#### `ReactDefaultBatchingStrategy`객체
1. `componentWillMount()` 메서드와 `componentDidMount()` 메서드에서 상태를 변경했다면, 이 시점에 상태를 갱신하는 작업이 시작된다.

#### 참고 
https://d2.naver.com/helloworld/9297403

## 36. React의 초기화면 느린 부분은 어떻게 해결해야해요?
- 최대한 리소스를 적게 로딩한다.
- SSR로 구현한다.

## 37. SSR은 무엇인가요? 어떻게 구현하죠?
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
const http = require('http');
const page = require('./dist/page'); // 번들 파일을 불러온다
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

#### 참고 
http://webframeworks.kr/tutorials/react/server-side-rendering/

