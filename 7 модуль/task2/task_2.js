const body = document.body
function createStudentCard(student) {
    let div = document.createElement('div')
    body.append(div)
    let h2 = document.createElement('h2')
    div.append(h2)
    h2.textContent = student.name
    let span = document.createElement('span')
    div.append(span)
    span.textContent = `Возраст: ${student.age} лет`
}

