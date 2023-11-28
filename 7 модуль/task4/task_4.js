const body = document.body
function createStudentCard(student, li) {

    let h2 = document.createElement('h2')
    h2.textContent = student.name

    let span = document.createElement('span')
    span.textContent = `Возраст: ${student.age} лет`

    li.append(h2)
    li.append(span)
}

function createStudentsList(listArr) {
    let ul = document.createElement('ul')
    body.append(ul)
    for (let student of listArr) {
        let li = document.createElement('li')
        ul.append(li)
        createStudentCard(student, li)
    }
}

function OnClick() {
    createStudentsList(allStudents)
}

let btn = document.querySelector('button')
btn.addEventListener('click', OnClick)

let allStudents=[
    {name: 'Валя', age: 11},
    {name: 'Таня',age: 24},
    {name: 'Рома',age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
]