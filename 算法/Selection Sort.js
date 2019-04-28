/**
 * @name 选择排序
 * @des 每一轮找到最小的数字放在最前面
 * @speed 无论数字如何都一样 都是O(n2) 只是每一次把最小的挑出来
 * @param {arr} arr 
 */
function SelectionSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i+1; j < len; j++) {
            if(arr[j]< arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

var arr = [2, 5, 6, 1, 2, 4, 8, 10];
SelectionSort(arr);
console.log(arr);