function getOlderUserArray(array) {
    let finalName;
    let maxAge = 0;
    for (user of array) {
        if (user.age > maxAge) {
            maxAge = user.age
            finalName = user.name
        }
    }
    return finalName;
}

let allUsers=[
    {name: 'Валя', age: 11},
    { name: 'Таня',age: 24},
    {name: 'Рома',age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
]

console.log(getOlderUserArray(allUsers))