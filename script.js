const todoInput = document.querySelector('.todo-input')
const todoDateInput = document.querySelector('.todo-date')
const todoBtn = document.querySelector('.todo-btn')
const todoListElements = document.querySelector('.todo-list-elements')

const todoList = JSON.parse(localStorage.getItem('todoList')) || [] // get localStorage

renderTodoList()

todoBtn.addEventListener('click', handleAddButtonClick)
todoInput.addEventListener('keypress', handleKeyPress)

function renderTodoList() {
  let htmlElements = ''
  // display recently added todos and updated at the top of the list by sorting the list based on createdAt and updatedAt timestamps
  todoList.sort((a, b) => {
    if (a.updatedAt !== b.updatedAt) {
      return b.updatedAt - a.updatedAt // sort by updatedAt first
    }
    return b.createdAt - a.createdAt // if updatedAt is the same, sort by createdAt
  })
  for (let i = 0; i < todoList.length; i++) {
    htmlElements += `
        <input 
          onchange="toggleComplete(event)"
          type="checkbox" 
          class="checkbox" 
          ${todoList[i].isCompleted ? 'checked' : ''} 
          data-index="${i}"
        />
        <div class="todo-name ${todoList[i].isCompleted ? 'done' : ''}">
          ${todoList[i].name}
        </div> 
        <div class="date ${todoList[i].isCompleted ? 'done' : ''}">${todoList[i].dueDate}</div>
        <button data-index="${i}" onclick="editTodo(event)" class="edit-button">
          Edit
        </button>
        <button class="delete-button">Delete</button>
    `
  }
  todoListElements.innerHTML = htmlElements
  localStorage.setItem('todoList', JSON.stringify(todoList)) // set localStorage upon updating of todo list
  deleteTodo()
}

function toggleComplete(e) {
  todoList[e.target.dataset.index].updatedAt = Date.now()
  const index = e.target.dataset.index
  todoList[index].isCompleted = !todoList[index].isCompleted
  renderTodoList()
}

function editTodo(e) {
  todoList[e.target.dataset.index].updatedAt = Date.now()
  const index = e.target.dataset.index
  const newTodoName = prompt('Edit your todo:', todoList[index].name)
  if (newTodoName !== null && newTodoName.trim() !== '') {
    todoList[index].name = newTodoName.trim()
    renderTodoList()
  }
}

function handleAddButtonClick() {
  addTodo()
}

function handleKeyPress(e) {
  if (e.key === 'Enter') {
    addTodo()
  }
}

function addTodo() {
  if (todoInput.value !== '') {
    todoList.push({
      name: todoInput.value,
      dueDate: todoDateInput.value ? todoDateInput.value : 'No due date',
      isCompleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    renderTodoList()
    todoInput.value = ''
    todoDateInput.value = ''
  }
}

function deleteTodo() {
  document.querySelectorAll('.delete-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      const confirmed = confirm('Are you sure you want to delete this todo?')
      if (confirmed) {
        todoList.splice(index, 1)
        renderTodoList()
      }
    })
  })
}

// const todoInput = document.querySelector('.todo-input')
// const todoDateInput = document.querySelector('.todo-date')
// const todoBtn = document.querySelector('.todo-btn')
// const todoListElements = document.querySelector('.todo-list-elements')

// const todoList = JSON.parse(localStorage.getItem('todoList')) || [] // get localStorage
// console.log(todoList)

// renderTodoList()

// todoBtn.addEventListener('click', handleAddButtonClick)
// todoInput.addEventListener('keypress', handleKeyPress)

// function renderTodoList() {
//   let htmlElements = ''
//   for (let i = 0; i < todoList.length; i++) {
//     htmlElements += `
//         <input
//           onchange="toggleComplete(event)"
//           type="checkbox"
//           class="checkbox"
//           ${todoList[i].isCompleted ? 'checked' : ''}
//           data-index="${i}"
//         />
//         <div class="todo-name ${todoList[i].isCompleted ? 'done' : ''}">
//           ${todoList[i].name}
//         </div>
//         <div class="date ${todoList[i].isCompleted ? 'done' : ''}">${todoList[i].dueDate}</div>
//         <button data-index="${i}" onclick="editTodo(event)" class="edit-button">
//           Edit
//         </button>
//         <button class="delete-button">Delete</button>
//     `
//   }
//   todoListElements.innerHTML = htmlElements
//   localStorage.setItem('todoList', JSON.stringify(todoList)) // set localStorage upon updating of todo list
//   deleteTodo()
// }

// function toggleComplete(e) {
//   const index = e.target.dataset.index
//   todoList[index].isCompleted = !todoList[index].isCompleted
//   renderTodoList()
// }

// function editTodo(e) {
//   const index = e.target.dataset.index
//   const newTodoName = prompt('Edit your todo:', todoList[index].name)
//   if (newTodoName !== null && newTodoName.trim() !== '') {
//     todoList[index].name = newTodoName.trim()
//     renderTodoList()
//   }
// }

// function handleAddButtonClick() {
//   addTodo()
// }

// function handleKeyPress(e) {
//   if (e.key === 'Enter') {
//     addTodo()
//   }
// }

// function addTodo() {
//   if (todoInput.value !== '') {
//     todoList.push({
//       name: todoInput.value,
//       dueDate: todoDateInput.value ? todoDateInput.value : 'No due date',
//       isCompleted: false,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     })
//     renderTodoList()
//     todoInput.value = ''
//     todoDateInput.value = ''
//   }
// }

// function deleteTodo() {
//   document.querySelectorAll('.delete-button').forEach((deleteButton, index) => {
//     deleteButton.addEventListener('click', () => {
//       console.log(index)
//       todoList.splice(index, 1)
//       renderTodoList()
//     })
//   })
// }
