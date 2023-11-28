let n = 0;
let m = 100;
let arr = []
for (let count = 0; count < 10; count++) {
    arr.push(Math.random() * Math.max(n, m) + Math.min(n, m))
}
console.log(arr)