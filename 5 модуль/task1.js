function getAge(birthYear = null) {
    let currentYear = 2022;
    return currentYear - birthYear;
}

console.log(getAge(1998))
console.log(getAge(1991))
console.log(getAge(2007))