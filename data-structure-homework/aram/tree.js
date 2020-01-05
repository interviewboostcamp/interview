function solution(numbers, target) {
  var answer = 0;
  const tree = [];
  let index = 0;

  // make tree
  numbers.forEach((number, i) => {
    if (i === 0) {
      tree.push(new Node(number, null));
      index++;
      return;
    }
    for (let level = 0; level < Math.pow(2, i - 1); level++) {
      const parentIdx = Math.floor((index + 1) / 2) - 1;
      tree.push(new Node(number, parentIdx));
      tree[parentIdx].setChild(index);
      index++;
      tree.push(new Node(-number, parentIdx));
      tree[parentIdx].setChild(index);
      index++;
    }
  });
  console.log(tree);

  const searchList1 = dfs(tree);
  const searchList2 = searchList1.map(result => {
    return result - 2 * tree[0].value;
  });
  console.log(searchList2);

  searchList1.forEach(result => {
    if (result === target) answer++;
  });
  searchList2.forEach(result => {
    if (result === target) answer++;
  });

  return answer;
}

function Node(value, parent) {
  this.value = value;
  this.parent = parent;
  this.child = [];
}
Node.prototype.setChild = function(childIdx) {
  this.child.push(childIdx);
};

function dfs(tree) {
  let index = 0;
  const searchList = [];

  search(index, 0);

  console.log(searchList);

  function search(i, acc) {
    if (!tree[i * 2 + 1]) {
      searchList.push(acc + tree[i].value);
      return;
      //   return tree[i].value;
    }

    let accumulate = acc + tree[i].value;
    search(i * 2 + 1, accumulate);
    search(i * 2 + 2, accumulate);
  }

  return searchList;
}

let ans = solution([1, 1, 1, 1, 1], 3);
console.log(ans);
