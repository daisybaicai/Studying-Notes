/**
 * @name 插入排序
 * @description 分别为有序区和无序区，j为记录有序去末尾的尾标，index,一个数与有序区末尾的相比小的话，再进入有序区找到自己的位子。
 * @speed 最好是不用排序O(n)，最坏是O(n2) 
 * @param {arr} arr 
 */

function InsertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i-1; j>=0 && arr[j+1] < arr[j]; j--) {
            swap(arr, j , j+1);
        }
    }
    return arr;
}

function swap(arr, i ,j) {
    var temp = 0;
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return null;
}

var arr = [2, 5, 6, 1, 2, 4, 8, 10];
InsertionSort(arr);
console.log(arr);