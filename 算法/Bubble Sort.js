/**
 * @name 冒泡算法
 *  一个外层循环，记录需要几次冒泡，是1到n-1次，因为到最后只有一个数字的时候就不用比较。
 *  每一次比较，都是从0 最下面开始，一直到最后len - i (len-几次)
 *  temp 交换 > 从小到大 排序  < 从大到小排序
 * @speed 速度正序最快，逆序最慢
 * @param {arr} arr 数组
 */
function BubbleSort(arr) {
    let len = arr.length;
    for (var i = 1; i < len; i++) {
        for (let j = 0; j <= len - i; j++) {
            var temp = 0;
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

var arr = [2,5,6,1,2,4,8,10];
BubbleSort(arr);
console.log(arr);