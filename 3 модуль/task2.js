let userName = "ilya";
let userSurname = "shubin";

let newName = userName[0].toUpperCase() + userName.substring(1).toLowerCase()
let newSurname = userSurname[0].toUpperCase() + userSurname.substring(1).toLowerCase()

console.log((newName == userName && userSurname == newSurname)
 ? "Имя осталось без изменений" 
 : "Имя было преобразовано")