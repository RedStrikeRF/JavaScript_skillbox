let userName = "ilya";
let userSurname = "shubin";

let newName = userName.substring(0, 1).toUpperCase() + userName.substring(1).toLowerCase()
let newSurname = userSurname.substring(0, 1).toUpperCase() + userSurname.substring(1).toLowerCase()

console.log((newName == userName && userSurname == newSurname) ? "Имя осталось без изменений" : "Имя было преобразовано")