// fifo
class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(data) {
    this.data.push(data);
  }
  dequeue() {
    return this.data.shift();
  }
  toString() {
    console.log(this.data);
  }
  length() {
    return this.data.length;
  }
}

class PriorityQueue extends Queue {
  constructor() {
    super();
  }
  dequeue() {
    let dequeueIdx;
    this.data.forEach((patient, i) => {
      if (i === 0) {
        dequeueIdx = i;
        return;
      }
      if (this.data[dequeueIdx].code > patient.code) dequeueIdx = i;
    });

    const result = this.data[dequeueIdx];
    this.data.splice(dequeueIdx, 1);
    return result;
  }
}

function Patient(name, code) {
  this.name = name;
  this.code = code;
}

class DoubleQueueStack {
  constructor() {
    this.q1 = new Queue();
    this.q2 = new Queue();
  }
  toString() {
    if (this.q1.length() === 0) console.log(this.q2.data);
    if (this.q2.length() === 0) console.log(this.q1.data);
  }
  push(data) {
    if (this.q1.length() > 0 && this.q2.length() == 0) this.q1.enqueue(data);
    else if (this.q2.length() > 0 && this.q1.length() == 0)
      this.q2.enqueue(data);
    else this.q1.enqueue(data);
  }
  pop() {
    if (this.q1.length() === 0) {
      if (this.q2.length() === 0) {
        console.log(`스택에 원소가 없습니다`);
        return;
      }
      while (this.q2.length() > 1) {
        this.q1.enqueue(this.q2.dequeue());
      }
      return this.q2.dequeue();
    }

    if (this.q2.length() === 0) {
      if (this.q1.length() === 0) {
        console.log(`스택에 원소가 없습니다`);
        return;
      }
      while (this.q1.length() > 1) {
        this.q2.enqueue(this.q1.dequeue());
      }
      return this.q1.dequeue();
    }
  }
}
const stack = new DoubleQueueStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.toString();
stack.pop();
stack.toString();
stack.push(4);
stack.push(5);
stack.toString();
stack.pop();
stack.pop();
stack.toString();
console.log("---------------------------------------");

const q1 = new Queue();
q1.enqueue(1);
q1.enqueue(2);
q1.enqueue(3);
q1.toString();
q1.dequeue();
q1.toString();

const q2 = new PriorityQueue();
const a = new Patient("jeong", 4);
q2.enqueue(a);
const b = new Patient("blue", 3);
q2.enqueue(b);
const c = new Patient("black", 5);
q2.enqueue(c);
const d = new Patient("red", 1);
q2.enqueue(d);
q2.toString();
q2.dequeue();
q2.dequeue();
q2.toString();
