let arr = [];
for (let count = 1; count <= 10; count++) {
    arr.push(count)
}

console.log(arr)

for (count = 0; count < arr.length; count++) {
    tempIndex = Math.round(Math.random() * (arr.length - 1));
    temp = arr[tempIndex]
    arr[tempIndex] = arr[count]
    arr[count] = temp
}
console.log(arr)