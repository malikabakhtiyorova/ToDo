// Take todos array and todosId from local storage
var todos = JSON.parse(localStorage.getItem('todos')) || [];

var todoId = Number(localStorage.getItem('todoId'));

//Chosing elements
var elTodoForm = $_('.js-task-form');
var elTodoInput = $_('.js-task-input', elTodoForm);
var elTodoList = $_('.js-tasks-list');
var elTodoTamplate = $('#task-template').content;

//Push todo to todos array function
var pushTodo = function (todo) {
  todos.push({
    todo: todo,
    completed: false,
    id: ++todoId
  });
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

  renderTodos();
}

elTodoForm.addEventListener('submit', onFormSubmit);
