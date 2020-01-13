# lucas 문제

## 브라우저의 렌더링 동작과정을 짧게 설명해보세요.

HTML 파싱과 DOM 트리 구성 사용자가 페이지를 요청하면 네트워크를 통해 마크업을 받아 온다. 그러고 나서 마크업 문자열을 토큰 형태로 잘라서(Tokenizer) 트리를 구축하고 파싱 작업을 시작한다. 그런 다음 DOM 트리(DOM Tree)1를 생성한다.

렌더 트리 구성(DOM+스타일 규칙) DOM 트리를 생성한 다음 바로 화면을 그리지는 않는다. 스타일시트의 정보를 적용해야 하기 때문이다. DOM 트리 정보와 스타일시트의 스타일 규칙을 결합해 렌더 트리( Render Tree)를 만든다. display:none 속성처럼 DOM 트리에는 있지만 화면에 보이면 안 되는 요소를 걸러낸 결과가 렌더 트리다.

렌더 트리의 배치 최종적으로 스타일 규칙에 따라 각 요소를 화면의 어디에 배치할지 좌표를 설정한다.

렌더 트리 그리기 요소의 좌표가 설정되면 브라우저에 순차적으로 화면을 그린다. 이때 사용자는 화면을 조금씩 보게 된다.
??

## Object.create의 역할은 무엇인가요?

- 해당 프로토타입을 프로토타입으로 가지는 객체 반환

## 자바스크립트에서 모듈내의 private한 속성을 만드는 방법을 아는대로 쓰세요.

- 클로저를 활용한다. (pulbic 하게 쓸 것 (set 함수 같은 것)만 return 해준다.)
- ?

## JS에서 재귀호출로 인한 stack overflow를 막을 수 있는방법은?

- 트램폴린
- 스트림
- generator 활용

## closure 와 스코프관계를 설명해보세요.

- 자신의 outerEnviormentReference 의 스코프의 내용까지 참조가능 하기 때문에 발생하는 현상이 클로져다

## 본인이 경험한 OOP관점에서의 객체분리를 설명하고, 느낀 장점을 말해보세요.

- 챔임을 나누어
- 객체간 인터페이스를 맞춰 관계가 느슨해진다.
- 우리 프로젝트
- 오픈 closed : 확장은 가능한데 수정은 안되도록

## == 보다, === 를 써야할때는?

- undefined, null 비교. 타입까지 다 비교해야 할 경우
- 더하기는 스트링으로 됨

## DFS, BFS를 통한 트리탐색방법 중 본인이 경험(사용)했던 방식은 무엇이고, 동작원리를 짧게 설명해보세요.

- 경험 :
- dfs : 순서를 지키며 탐색해야하는 경우
- bfs : 최단 거리를 구해야 할 경우

## ES6의 Class extends 내부 동작원리에 대해서 설명해보세요.

- 생성자 프로토타입 체이닝 방식

## for of vs for in

- Symbol.iterator 를 가지고있는 애들(collenction)은 for of 사용가능
- for of의 경우 value값이 나온다.
- for in 은 enmulable 가 true 인 애들 사용 가능

## 객체를 탐색하는 방법에 대해서 2가지를 작성해보세요.

- for in
- keys()
- 어레이로 만들어서 탐색 ?

## NodeList 타입을, Array에 있는 reduce메서드를 사용하는 방법은?

- nodeList는 유사배열이기 때문에, Array 메서드를 직접사용할 수는 없지만, this binding을 통해, Array 함수를 사용 할 수 있다.
- Array.prototype.reduce().call(NodeList, function(){})
- const reduceFunc = Array.prototype.reduce().bind(NodeList)

## arrow 함수의 this가 결정되는 방식을 설명해보세요.

- arrow함수의 경우 콘텍스트가 결정되는 과정에서 thisBinding 과정이 생략된다. 즉, 자신의 바로 위의 외부 스코프의 this가 arrow 함수 내부의 this가 된다.

## immutable과 mutable은 무엇이 다른것인가요?

- javascript를 예로 들어보면, primitive type의 경우 immutable이고 reference type은 mutable 입니다. primitive type의 경우, data의 값을 수정 할 수 없습니다. primitvie type 의 변수에 다른 data를 대입 할 경우, 그 메모리가 가르키고 있는 메모리 주소값을 다른 주소값으로 변경시킵니다. 이와 달리, reference type의 경우, 해당 변수가 가르키고 있는 메모리 주소에 있는 데이터를 변경 가능 합니다.

## undefined와 null의 차이점을 설명하세요.

- undeficed는 javascript 엔진이 예상치 못한 변수를 호출 했을 때 undefined를 대입시킵니다.
- null 의 경우에는 개발자가 직접 해당 변수는 지금 비워진 상태라는것을 명시적으로 알려주기 위해 사용합니다.

## 아래처럼 동작하는 flatten함수를 reduce를 활용해서 만들어보세요.

const arr = [[1, 2], [3, 4], [5, 6]];
const flattenedArray = flatten(arr);
console.log(flattenedArray) //[1, 2, 3, 4, 5, 6];

```
function flatten(arr){
    return arr.reduce((acc, cur)=>{
        if(Array.isArray(cur)){
            cur.forEach(element => acc.push(element))
        }else{
            acc.push(cur)
        }
        return acc;
    },[])
}
```

## 코드복사

객체를 복사해서 새로운 객체를 만들고 싶습니다. 코드를 구현해보세요. (객체의 깊이는 1단계만 있다고 가정)

```
function copyObject(object){
    let result = {}
    for(let prop in object){
        if(typeof object[prop] ==='object' && typeof object[prop] !== null){
            copyObject(object[prop]);
        }else{
            result[prop] = object[prop]
        }
    }
    return result;
}

```

## Array.from 이 모든 브라우저에서 동작하도록 polyfill코드를 만들어보세요.

이렇게 안되나??

```
function polyfill(obj){
    return Array.prototype.slice.call(obj);
}
```

## 프로그래밍 요구사항을 받았을때, 구현하기 전까지 어떤 과정을 거치시나요?

- 나(soob) 같은 경우는 어떤부분이 어려울지 먼저 생각하고, 생각으로 될 것 같으면 그 때부터 어떤 객체가 필요할지, 어떤 메세지가 필요할지 생각하고 설계 해 나감.

## prototype 의 동작방식에 대해서 설명해보세요.

- javascript에서 모든 function의 경우, 내부적으로 prototype을 가지고 있습니다.
- 만약 함수를 생성자 함수로 사용 할 경우, 이 인스턴스의 **proto** 가 해당 생성자 함수의 prototype을 바라보게끔 됩니다.

## 순환되는 캐로셀UI의 구현 원리에 대해서 설명해보세요.

- 오호라..

## Event 객체에 대해서 설명해보세요.

- 웹 환경에서 사용자에 대한 응답속도는 매우 중요한 요소이다. 그런 이유로 javascript는 event객체를 이용해 비동기적인 응답을 할 수 있다.
- https://developer.mozilla.org/ko/docs/Web/API/Event
- 이벤트 버블링과 캡처 : https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture
- 최근의 브라우저는 모든 이벤트 핸들러가 이벤트 버블링 단계에 등록된다.
- 이벤트 위임은 이벤트 버블링을 이용하는 것

## 웹사이트의 초기 로딩속도를 더 빠르게 하기 위해서 무엇을 해야 할까요?

- 캐싱한다 ?
- 자바스크립트 파일 파싱? 하는거는 제일 밑으로?
- 모르겟다 좀 적어줘 아는사람
- 자원을 최소한의 크기로 내려받자
  - gzip 압축을 사용할 것
  - HTML5 App cache를 활용할 것
  - 자원을 캐시 가능하게 할 것
  - 조건 요청을 보낼 것
- react라면 코드 스플리팅을 적용

## 최근 가장 깊게 공부하고 있는 부분은 무엇인가요? 그 부분에 대해서 간단하게 설명해보세요.

- 동양철학

## 비동기의 장점을 설명해보세요.

- 멈추지 않는다.
- 사용자와의 반응성.
- cpu 를 사용해야 할 부분에 집중한다.?

## 본인이 즐겨하는 디버깅 방법을 설명해보세요.

- 임태현 : 콘솔로그

## bind 가 필요한 상황을 간단한 코드로 보여주세요.

## CommonJS 스펙에 대해 설명해보세요.

- ????

## express의 middleware의 동작방식을 설명해보세요. (원래 node의 라고 돼있었는데 내가 express로 바꿈)

- 미들웨어는 req, res 오브젝트와 next라는 함수를 계속 가지고 다닌다.
- 만약 res 오브젝트가 가지고있는 응답함수를 호출하지 않으면 next() 함수를 실행시켜 다음 미들웨어 함수로 가게끔 해 주어야 한다.
- 그래서 미들웨어의 가장 마지막 부분에 대부분 error 핸들링 부분이 있다.

## 본인이 생각하는 좋은 객체지향프로그래밍에 대해서 설명해보세요.

- 객체들이 각자의 고유한 책임을 가지고 혹은 주체적으로 활동하며, 하나의 목표를 위해 객체들 끼리 메세지를 주고 받는다.
- 객체는 하나의 책임만 가진다.(여러가지 역할을 하지 않는다. 이는 함수도 마찬가지)
- 위의 조건을 잘 만족하면 관계가 느슨해지는 등의 객체지향이 추구하는 바는 이룰 수 있을거라 생각한다.

## 클로저로 동작되는 상황을 예시코드로 보여주세요.

```
function closourFunc(){
    let a = 0;
    const inner = function(){
        a++;
        console.log(a);
    }
    return inner;
}
const closur = closourFunc();
closur(); // 1
closur(); // 2
```

## React의 virtual DOM 은 뭐에요?

- 오호라

## React의 렌더링 방식은 무엇인가요?

- 오호라

## React의 초기화면 느린 부분은 어떻게 해결해야해요?

- 오호라

## SSR은 무엇인가요? 어떻게 구현하죠?

- express pug 데쓰
