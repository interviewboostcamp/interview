const arr = [2, 6, 8, 3, 4];
console.log("res: ", quickSort(arr));

function quickSort(a) {
  const arr = [...a];

  quick(arr, 1, arr.length - 1);

  function quick(arr, i, j) {
    let pivotIdx = i - 1;

    pivotIdx = partition(arr, i, j, pivotIdx);
    console.log(arr, pivotIdx);
    if (pivotIdx - 1 > i) quick(arr, i - 1, pivotIdx - 1);
    if (pivotIdx + 1 < j) quick(arr, pivotIdx + 2, j);
  }

  return arr;
}

function partition(arr, i, j, pivotIdx) {
  const pivot = arr[pivotIdx];

  while (i <= j) {
    while (arr[i] < pivot && i <= j) i++;
    while (arr[j] > pivot && i <= j) j--;

    if (i <= j) {
      swap(i, j);
      i++;
      j--;
    }
  }

  arr[pivotIdx] = arr[j];
  arr[j] = pivot;

  function swap(i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return j;
}
