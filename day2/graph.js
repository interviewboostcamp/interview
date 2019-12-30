/**
 * 그래프 자료구조와 bfs 구현하기
 * 그래프: 노드와 간선을 하나로 모아놓은 자료 구조
 * 인접 행렬과 인접 리스트로 그래프를 표현할 수 있다.
 */

const Graph = {
  init: function() {
    this.adjacencyList = {};
  },
  addNode: function(nodeName) {
    if (this.hasNode(nodeName)) {
      console.log(`Node "${nodeName}" is already exist.`);
      return;
    }
    this.adjacencyList[nodeName] = [];
  },
  addEdge: function(from, to) {
    if (this.hasNode(from) && this.hasNode(to)) {
      this.adjacencyList[from].push(to);
      //   this.adjacencyList[to].push(from);
    } else console.log(`존재하지 않는 노드를 입력했습니다. `);
  },
  bfs: function(startNode) {
    this.visitedList = [];
    this.queue = [];
    this.path = [];
    this.queue.push(startNode);

    let search = node => {
      this.visitedList.push(node);

      this.adjacencyList[node].forEach(adjacentNode => {
        if (this.visitedList.indexOf(adjacentNode) !== -1) return;
        this.queue.push(adjacentNode);
        this.visitedList.push(adjacentNode);
      });
    };

    do {
      let currentNode = this.queue.shift();
      this.path.push(currentNode);
      search(currentNode);
    } while (this.queue.length > 0);

    console.log("탐색 순서:", this.path);
  },
  showList: function() {
    console.log(this.adjacencyList);
  },
  hasNode: function(name) {
    if (this.adjacencyList.hasOwnProperty(name)) return true;
    return false;
  }
};

const myGraph1 = Object.create(Graph);
myGraph1.init();
myGraph1.addNode("a");
myGraph1.addNode("b");
myGraph1.addNode("c");
myGraph1.addNode("d");
myGraph1.addNode("e");
myGraph1.addNode("f");

myGraph1.addEdge("a", "b");
myGraph1.addEdge("a", "c");
myGraph1.addEdge("a", "d");
myGraph1.addEdge("c", "e");
myGraph1.addEdge("c", "f");
myGraph1.addEdge("d", "f");

myGraph1.showList();

myGraph1.bfs("a");

const myGraph2 = Object.create(Graph);
myGraph2.init();
myGraph2.addNode(0);
myGraph2.addNode(1);
myGraph2.addNode(2);
myGraph2.addNode(3);
myGraph2.addNode(4);
myGraph2.addNode(5);

myGraph2.addEdge(0, 1);
myGraph2.addEdge(0, 2);
myGraph2.addEdge(1, 2);
myGraph2.addEdge(1, 3);
myGraph2.addEdge(2, 3);
myGraph2.addEdge(3, 4);
myGraph2.addEdge(4, 1);
myGraph2.addEdge(4, 0);
myGraph2.addEdge(4, 5);

myGraph2.bfs(0);

const myGraph3 = Object.create(Graph);
myGraph3.init();
myGraph3.addNode("a");
myGraph3.addNode("b");
myGraph3.addNode("c");
myGraph3.addNode("d");
myGraph3.addNode("e");

myGraph3.addEdge("a", "b");
myGraph3.addEdge("a", "d");
myGraph3.addEdge("b", "c");
myGraph3.addEdge("c", "e");

myGraph3.bfs("a");
