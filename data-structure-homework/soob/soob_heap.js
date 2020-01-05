/**
 * minHeap 구현
 * Priority와 data를 가진 노드
 */
function myHeap() {
    this.heap = [];
    this.count = 0;
}

function Node(priority, data) {
    this.priority = priority;
    this.data = data;
}

myHeap.prototype.addNode = function (node) {

    this.count++;
    if (this.count === 1) {
        this.heap[this.count] = node;
        return
    }

    let index = this.count;
    this.heap[index] = node;

    while (true) {
        if (index === 1) {
            this.heap[index] = node;
            break;
        }
        if (this.heap[Math.floor(index / 2)].priority > node.priority) {
            this.heap[index] = this.heap[Math.floor(index / 2)];
        }
        if (this.heap[Math.floor(index / 2)].priority <= node.priority) {
            this.heap[index] = node;
            break;
        }

        index = Math.floor(index / 2);
    }
}
myHeap.prototype.inOrderTraversal = function () {
    const visits = [];
    for (let i = 1; i <= this.count; i++) {
        visits[i] = false;
    }

    function travel(index) {
        if (!visits[index * 2] && visits[index * 2] !== undefined) {
            travel.bind(this)(index * 2);
        }
        visits[index] = true;
        console.log(`index : ${index}, priority : ${this.heap[index].priority}, data : ${this.heap[index].data}`)
        if (!visits[index * 2 + 1] && visits[index * 2 + 1] !== undefined) {
            travel.bind(this)(index * 2 + 1);
        }
    }
    travel.bind(this)(1)
}

const heap = new myHeap();


const node1 = new Node(1, 'A');
const node2 = new Node(2, 'B');
const node3 = new Node(3, 'C');
const node4 = new Node(4, 'D');
const node5 = new Node(5, 'E');

heap.addNode(node1);
heap.addNode(node2);
heap.addNode(node3);
heap.addNode(node4);
heap.addNode(node5);

heap.inOrderTraversal();

