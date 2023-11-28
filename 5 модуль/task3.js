function arrSort(array = []) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i; j++) {
          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Меняем значения переменных
          }
        }
    }
    return array;
}

let result = arrSort([0,1]);
console.log(result);

result = arrSort([2,5,1,3,4]);
console.log(result);

result = arrSort([12,33,3,44,100]);
console.log(result);