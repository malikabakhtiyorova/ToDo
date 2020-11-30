// Variables
var tasks = [];
var tasksObject = [];
var isCompleted = false;

var elTaskForm = document.querySelector('.js-task-form');
var elTaskInput = document.querySelector('.js-task-input');
var elTasksList = document.querySelector('.js-tasks-list');
var elTaskTemplate = document.querySelector('#task-template').content;

elTaskForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  elTasksList.innerHTML = '';

  var tasksFragment = document.createDocumentFragment();
  var taskInputValue = elTaskInput.value.trim();

  if (taskInputValue === '') {
    alert('Enter task!!');
    return;
  }

  tasks.push(taskInputValue);

  tasks.forEach(function (task) {
    var taskElement = elTaskTemplate.cloneNode(true);
    taskElement.querySelector('.js-task-content').textContent = task;

    tasksFragment.appendChild(taskElement);
  });

  elTasksList.appendChild(tasksFragment);
});

// Event Delegation
elTasksList.addEventListener('click', (evt) => {
  if (evt.target.matches('.js-is-completed-checkbox')) {
    isCompleted = !isCompleted;

    var taskItem = evt.target.closest('.js-task-list-item');
    taskItem.querySelector('.js-task-content').classList.toggle('completed-task');
  }
});

// Create tasks object
tasksObject = tasks.forEach(function (task) {
  return {
    // id: i + 1,
    completed: isCompleted,
    task: task
  }
});

localStorage.setItem('tasks', JSON.stringify(tasksObject));