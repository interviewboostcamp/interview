function mergeSort(array, start, end) {

    if (array.length < 2) {
        return array;
    }
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid, array.length);

    const leftMerged = mergeSort(left)
    const rightMerged = mergeSort(right)
    return merge(leftMerged, rightMerged);
}

function merge(left, right) {
    const result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    while (left.length) result.push(left.shift())
    while (right.length) result.push(right.shift())

    return result;
}

function printArray(array) {
    // console.log(array.toString())
    console.log(array)
}

const array = [4, 1, 7, 6, 3, 5];
printArray(array);
const mergedArray = mergeSort(array);
printArray(mergedArray);