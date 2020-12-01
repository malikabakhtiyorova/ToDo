// Take todos array and todosId from local storage
var todos = JSON.parse(localStorage.getItem('todos')) || [];

var todoId = Number(localStorage.getItem('todoId'));

//Chosing elements
var elTodoForm = $_('.js-task-form');
var elTodoInput = $_('.js-task-input', elTodoForm);
var elTodoList = $_('.js-tasks-list');
var elTodoTamplate = $_('#task-template').content;

//Push todo to todos array function
var pushTodo = function (todo) {
  todos.push({
    task: todo,
    completed: false,
    id: ++todoId
  });
}

// Create todo Element
var createTodoElement = function (todo) {
  var newTodoElement = elTodoTamplate.cloneNode(true);

  $_('.js-task-content', newTodoElement).textContent = todo.task;

  return newTodoElement;
}

//RenderTodos function
var renderTodos = function () {
  elTodoList.innerHTML = '';
  elTodosFragment = document.createDocumentFragment();

  todos.forEach(function (todo) {
    elTodosFragment.appendChild(createTodoElement(todo));
  });

  elTodoList.appendChild(elTodosFragment);
}

//Clear to do input value function
var clearTodoInputValue = function () {
  elTodoInput.value = '';
}

// Listen to submit event of form function
var onFormSubmit = function (evt) {
  evt.preventDefault();

  // Take value of todo input
  var todoInputValue = elTodoInput.value.trim();

  // Check todo input value isn't empty
  if (!todoInputValue) {
    alert('Iltimos, vazifani kiriting!!');
    return;
  }

  //Push todo to todos array
  pushTodo(todoInputValue);

  //Render todos
  renderTodos();

  //Clear todo Input value after rendering todos
  clearTodoInputValue();
}

elTodoForm.addEventListener('submit', onFormSubmit);
