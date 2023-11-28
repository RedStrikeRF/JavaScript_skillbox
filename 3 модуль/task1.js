let str = "123456789";

if (str.length >= 4 && (str.indexOf('-') + str.indexOf('_')) > 0) {
    console.log("Пароль надёжный")
} else {
    console.log("Пароль недостаточно надёжный")
}