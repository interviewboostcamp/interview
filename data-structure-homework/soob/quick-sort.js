function quickSort(array, start, end) {
    const part = partition(array, start, end);
    if (start < part - 1) quickSort(array, start, part - 1);
    if (end > part) quickSort(array, part, end);
}

function partition(array, start, end) {

    const pivot = array[start];

    while (start <= end) {

        while (array[start] < pivot) start++;
        while (array[end] > pivot) end--;
        if (start <= end) {
            swap(array, start, end);
            start++;
            end--;
        }
    }
    return start;
}

function swap(array, start, end) {
    let temp = array[start];
    array[start] = array[end];
    array[end] = temp;
}

function printArray(array) {
    // console.log(array.toString())
    console.log(array)
}

const array = [4, 1, 7, 6, 3, 5];
printArray(array);
quickSort(array, 0, array.length - 1)
printArray(array)