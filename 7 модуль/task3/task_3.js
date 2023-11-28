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