(function() {
    function createAppTitle(title) {
        /**
        Метод создает главный заголовок страницы
        Вызывается всего 1 раз в момент создания приложения
        **/
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoList() {
        /**
        Метод создает список дел страницы
        Вызывается всего 1 раз в момент создания приложения
        **/
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');
        button.disabled = true
        
        form.classList.add('input-group', 'mb-3');

        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';

        buttonWrapper.classList.add('input-group-append');

        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        
        
        buttonWrapper.append(button);

        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoItem(name, done = false) {
        let item = document.createElement('li');
        
        let id = (Math.round(Math.random() * 10000)).toString();
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        if (done) {
            item.classList.add('list-group-item-success');
        }
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group','btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
            id
        };
    }
    
    function saveLocalStorage(listName, savedList) {
        localStorage.setItem(listName, JSON.stringify(savedList))
    }

    function createTodoApp(container, title = 'Список дел', listName) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let savedList = [];

        if (localStorage.getItem(listName)) {
            for (item of JSON.parse(localStorage.getItem(listName))) {
                console.log(item)
                savedList.push(item)
                todoList.append(createTodoItem(item.name, item.done).item)
            }
        }
        
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        todoItemForm.input.addEventListener('input', function() { 
           if (todoItemForm.input.value) {
            todoItemForm.button.disabled = false
        } else {
            todoItemForm.button.disabled = true
        }
        });

        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);
            savedList.push({id: todoItem.id, name: todoItemForm.input.value, done: false})

            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
                for (index in savedList) {
                    if (todoItem.id == savedList[index].id) {
                        savedList[index].done = savedList[index].done ? false : true
                        saveLocalStorage(listName, savedList)
                        break
                    }
                }
            });

            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    for (index in savedList) {
                        if (todoItem.id == savedList[index].id) {
                            savedList.splice(index, 1)
                            break
                        }
                    }
                    todoItem.item.remove();
                    saveLocalStorage(listName, savedList)
                }
            });

            todoList.append(todoItem.item)
            saveLocalStorage(listName, savedList)
            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
        });
    }

    window.createTodoApp = createTodoApp;
})();   