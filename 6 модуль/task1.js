function getOlderUser(obj1, obj2) {
    if (obj1.age > obj2.age) {
        return obj1.name;
    }
    return obj2.name
}

let user1={
    name: 'Игорь',
    age: 17
}
let user2={
    name: 'Оля',
    age: 21
}
let result = getOlderUser(user1, user2)
console.log(result)