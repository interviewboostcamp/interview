# 디자인패턴

**Contents**
[싱글톤](#싱글톤)
[옵저버](#옵저버)

## 싱글톤

인스턴스가 하나 뿐인 객체를 만들 수 있게 해 주는 패턴.
스레드 풀, 캐시, 설정, 로거 같은 객체의 경우 사용.
인스턴스가 두 개 이상 있으면, 일관성에 문제가 생긴다던지 자원을 쓸모없이 잡아먹는다던지 하는 문제가 발생.

### 왜 와이 전역 객체 같은걸 쓰면 되는데 굳이 생성자 함수로 만드나.

만약, 해당 객체가 자원을 많이 잡아먹는다고 가정하자.
그렇게 되면, 쓰지 않는데도 불구하고, 자원을 계속 낭비하게 된다.
또한, 객체를 조절가능하게 되므로 사용한다.

### 구현

```
function makeInstance() {
    return {
        a: 1
    }
}

let instance;

function singleton() {
    this.instance = init();
}
const init = function () {
    if (!instance) {
        instance = makeInstance();
    }
    return instance;
}

singleton.prototype.getInstance = function () {

    return this.instance;
}

const test = new singleton();
const test2 = new singleton();
console.log(test.getInstance() === test2.getInstance());

```

## 옵저버

한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들한테 연락이 가고 자동으로 내용이 갱신되는 방식.
one to many 의존성을 정의

### 장점

subject와 observer 두 객체가 느슨하게 결합되어있다. 즉, 둘이 상호작용은 하지만 서로에 대해 알 필요가 없는 상태

- subject가 observer에 대해 아는 것은 observer가 특정 인터페이스를 구현 한다는 것 뿐.
- observer는 쉽게 새로 추가할 수 있다.
- 새로운 형식의 옵저버를 추가한다고 하더라도, subject는 바꿀 필요가 없다.
- 서로의 인터페이스를 구현한다는 조건만 만족한다면, 어떻게 바꿔도 서로 영향을 미치지 않는다.

### 자바스크립트 혹은 브라우저

이벤트 핸들러 같은 것 들이 옵저버 패턴이라고 볼 수 있다.

### 구현

싱글톤 패턴과 혼합해 구현.
subject 객체를 싱글톤으로 관리한다.

```
let instance;

function singletonSubject() {
    return init();
}

function makeInstance() {
    return new subject();
}

const init = function () {
    if (!instance) {
        instance = makeInstance();
    }
    return instance;
}

function subject() {
    this.observers = [];
}

subject.prototype.publish = function () {
    this.observers.forEach(observer => observer.getMessage())
}

subject.prototype.register = function (observer) {
    this.observers.push(observer)
}

function observer(name) {
    this.name = name;
}

observer.prototype.subscribe = function () {
    const subject = new singletonSubject()
    subject.register(this)
}

observer.prototype.getMessage = function () {
    console.log(`${this.name} get Message`)
}

const subjectInstance = new singletonSubject();
const observer1 = new observer('observer1');
const observer2 = new observer('observer2');
const observer3 = new observer('observer3');

observer1.subscribe();
observer2.subscribe();
observer3.subscribe();

subjectInstance.publish();

```
