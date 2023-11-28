function filter(array, parameter, findValue) {
    let result1 = [];
    for (user of array) {
        
        if (user[parameter] !== undefined && user[parameter] == findValue) {
            result1.push(user)
        }
    }
    return result1;
}


let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
]

let result = filter(objects, 'name', 'Иван');
console.log(result)