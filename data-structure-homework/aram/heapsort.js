const arr = [2, 6, 8, 3, 1, 9, 5, 4];

function makeHeap(arr) {
  let len = arr.length;

  for (let i = len - 1; i >= 0; i--) {
    if (2 * i + 1 < len) heap(i);
  }

  function heap(idx) {
    let left = idx * 2 + 1;
    const right = idx * 2 + 2;
    let maxChild = arr[left] > arr[right] ? left : right;
    if (!arr[right]) maxChild = left;
    if (arr[maxChild] > arr[idx]) {
      let temp = arr[idx];
      arr[idx] = arr[maxChild];
      arr[maxChild] = temp;
    }
  }
  return arr;
}

const heap = makeHeap(arr);
console.log(heap);

heapSort(heap);
function heapSort(arr) {
  let heap = arr;
  const sortedArr = [];
  while (heap.length > 0) {
    sortedArr.push(heap.shift());

    const min = heap.pop();
    heap.unshift(min);

    if (heap.length === 1) {
      sortedArr.push(heap.shift());
      break;
    }

    heap = makeHeap(heap);
  }
  console.log(sortedArr);
}
