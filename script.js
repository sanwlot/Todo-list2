const todoInput = document.querySelector(".todo-input");
const todoDateInput = document.querySelector(".todo-date");
const todoBtn = document.querySelector(".todo-btn");
const todoListElements = document.querySelector(".todo-list-elements");

const todoList = JSON.parse(localStorage.getItem("todoList")) || []; // get localStorage

renderTodoList();

todoBtn.addEventListener("click", handleAddButtonClick);
todoInput.addEventListener("keypress", handleKeyPress);

function renderTodoList() {
  let htmlElements = "";
  for (let i = 0; i < todoList.length; i++) {
    htmlElements += `
        <div class="todo-name">${todoList[i].name}</div> 
        <div class="date">${todoList[i].dueDate}</div>
        <button class="delete-button">Delete</button>
    `;
  }
  todoListElements.innerHTML = htmlElements;
  localStorage.setItem("todoList", JSON.stringify(todoList)); // set localStorage upon updating of todo list
  deleteTodo();
}

function handleAddButtonClick() {
  addTodo();
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    addTodo();
  }
}

function addTodo() {
  if (todoInput.value !== "") {
    todoList.push({
      name: todoInput.value,
      dueDate: todoDateInput.value,
    });
    renderTodoList();
    todoInput.value = "";
  }
}

function deleteTodo() {
  document.querySelectorAll(".delete-button").forEach((deleteButton, index) => {
    deleteButton.addEventListener("click", () => {
      console.log(index)
      todoList.splice(index, 1);
      renderTodoList();
    });
  });
}
