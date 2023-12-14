let allUsers=[
    {name: 'Валя', age: 11},
    { name: 'Таня',age: 24},
    {name: 'Рома',age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
]

function userSort(a,b) {
    return a.age - b.age;
}

console.log(allUsers.sort(userSort).reverse());