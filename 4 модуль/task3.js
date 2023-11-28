let arr = [2,1,3];
let n = 7;
flag = false

for (index in arr) {
    if (arr[index] == n) {
        flag = true
        console.log(`индекс элемента ${index}`)
        break
    }
}

if (!(flag)) {
    console.log("элемент не найден")
}