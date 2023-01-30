const inputElement = document.querySelector('#input');
const addButtonElement = document.querySelector('#addButton');
const todoListElement = document.querySelector('.todo-list');
const clearAllTodoButton = document.querySelector('.clear-all-btn');

addButtonElement.addEventListener('click', () => {
    addTodoElement();
});

inputElement.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        addTodoElement();
    }
});

clearAllTodoButton.addEventListener('click', () => {
    todoListElement.innerHTML = '';
    clearAllTodoButton.style.display = 'none';
});

function addTodoElement() {
    const randomId = Math.round(Math.random() * 1_000_000);
    const newElement = document.createElement('div');
    newElement.classList.add('todo-list-element');
    newElement.setAttribute('id', 'randomId');

    newElement.innerHTML = `
        <input type="text" class="input-todo">
        <span class="span">${inputElement.value}</span> 
        <button class="edit-btn"><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/write-circle-blue-1024.png"></button>
        <button class="remove-btn"><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/trash-circle-red-1024.png"></button>
    `;
    
    todoListElement.appendChild(newElement);
    clearAllTodoButton.style.display = 'block';
    inputElement.value = '';
    addRemoveEvent();
    addEditEvent();
}

function addEditEvent() {
    const editTodoButtons = todoListElement.querySelectorAll('.edit-btn');
    editTodoButtons.forEach((element) => {
        element.addEventListener('click', () => {
            const parentOfEditButton = element.parentElement;
            const inputEditTodoElement = parentOfEditButton.querySelector('input');
            const contentElement = parentOfEditButton.querySelector('span');
            
            if (parentOfEditButton.classList.contains('active')) {
                inputEditTodoElement.style.display = 'none';
                contentElement.style.display = 'inline-block';
                contentElement.innerText = inputEditTodoElement.value;
                parentOfEditButton.classList.remove('active');
                return;
            }

            inputEditTodoElement.style.display = 'inline-block';
            contentElement.style.display = 'none';
            inputEditTodoElement.value = contentElement.innerText;
            parentOfEditButton.classList.add('active');

            inputEditTodoElement.addEventListener('keypress', (event) => {
                if(event.key === 'Enter') {
                    inputEditTodoElement.style.display = 'none';
                    contentElement.style.display = 'inline-block';
                    contentElement.innerText = inputEditTodoElement.value;
                    parentOfEditButton.classList.remove('active');
                }
            });
        });
    });
}

function addRemoveEvent() {
    const removeTodoButtons = todoListElement.querySelectorAll('.remove-btn');
    
    removeTodoButtons.forEach((element) => {
        
        element.addEventListener('click', () => {
            element.parentElement.remove();
        });

    });
}