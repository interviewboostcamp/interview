var Graph = (function() {
  function Vertex(key) {
    this.next = null;
    this.arc = null;
    this.key = key;
    this.inTree = null;
  }
  function Arc(data, dest, capacity) {
    this.nextArc = null;
    this.destination = dest;
    this.data = data;
    this.capacity = capacity;
    this.inTree = null;
  }
  function Graph() {
    this.count = 0;
    this.first = null;
  }
  Graph.prototype.insertVertex = function(key) {
    var vertex = new Vertex(key);
    var last = this.first;
    if (last) {
      while (last.next !== null) {
        last = last.next;
      }
      last.next = vertex;
    } else {
      this.first = vertex;
    }
    this.count++;
  };
  Graph.prototype.deleteVertex = function(key) {
    var vertex = this.first;
    var prev = null;
    while (vertex.key !== key) {
      prev = vertex;
      vertex = vertex.next;
    }
    if (!vertex) return false;
    if (!vertex.arc) return false;
    if (prev) {
      prev.next = vertex.next;
    } else {
      this.first = vertex.next;
    }
    this.count--;
  };
  Graph.prototype.insertArc = function(data, fromKey, toKey, capacity) {
    var from = this.first;
    var to = this.first;
    while (from && from.key !== fromKey) {
      from = from.next;
    }
    while (to && to.key !== toKey) {
      to = to.next;
    }
    if (!from || !to) return false;
    var arc = new Arc(data, to, capacity);
    var fromLast = from.arc;
    if (fromLast) {
      while (fromLast.nextArc != null) {
        fromLast = fromLast.nextArc;
      }
      fromLast.nextArc = arc;
    } else {
      from.arc = arc;
    }
  };
  Graph.prototype.deleteArc = function(fromKey, toKey) {
    var from = this.first;
    while (from !== null) {
      if (from.key === fromKey) break;
      from = from.next;
    }
    if (!from) return false;
    var fromArc = from.arc;
    var preArc;
    while (fromArc !== null) {
      if (toKey === fromArc.destination.key) break;
      preArc = fromArc;
      fromArc = fromArc.next;
    }
    if (!fromArc) return false;
    if (preArc) {
      preArc.nextArc = fromArc.nextArc;
    } else {
      from.arc = fromArc.nextArc;
    }
  };

  Graph.prototype.shortest = function(startKey) {
    var from = this.first;
    while (from) {
      if (from.key === startKey) {
        break;
      }
      from = from.next;
    }
    console.log("시작점은 %s입니다", from.key);
    var temp = this.first;
    var current;
    var arc;
    while (temp) {
      // 모든 버텍스 최단거리를 Infinity로 초기화
      temp.distance = Infinity;
      temp = temp.next;
    }
    temp = this.first;
    temp.distance = 0;
    while (temp) {
      // 반복문을 돌며 최단 거리를 찾음
      current = temp;
      temp = temp.next;
      arc = current.arc;
      while (arc) {
        if (arc.destination.distance > current.distance + arc.data) {
          arc.destination.distance = current.distance + arc.data;
        }
        arc = arc.nextArc;
      }
    }
    temp = this.first;
    while (temp) {
      console.log("%s까지의 최단 거리는 %d입니다", temp.key, temp.distance);
      temp = temp.next;
    }
  };

  return Graph;
})();
function insertTwoWayArc(graph, data, from, to) {
  graph.insertArc(data, from, to);
  graph.insertArc(data, to, from);
}

var graph = new Graph();
graph.insertVertex("A");
graph.insertVertex("B");
graph.insertVertex("C");
graph.insertVertex("D");
graph.insertVertex("E");
graph.insertVertex("F");
insertTwoWayArc(graph, 6, "A", "B");
insertTwoWayArc(graph, 3, "A", "C");
insertTwoWayArc(graph, 2, "B", "C");
insertTwoWayArc(graph, 5, "B", "D");
insertTwoWayArc(graph, 3, "C", "D");
insertTwoWayArc(graph, 4, "C", "E");
insertTwoWayArc(graph, 2, "D", "E");
insertTwoWayArc(graph, 3, "D", "F");
insertTwoWayArc(graph, 5, "E", "F");
graph.shortest("A");
