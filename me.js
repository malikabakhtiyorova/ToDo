var elTaskForm = document.querySelector('.js-task-form');
var elTaskInput = document.querySelector('.js-task-input');
var elFooter = document.querySelector('.footer');
var elRemainedTasks = document.querySelector('.js-remained-tasks');

var tasksArr = JSON.parse(localStorage.getItem("TasksStorage")) || []

var tasksObject = [];
var isCompleted = false;
var taskTemplate = document.querySelector('#task-template').content;
var elTasksList = document.querySelector('.js-tasks-list')

var updateTasksStorage = () => {
  localStorage.setItem("TasksStorage", JSON.stringify(tasks));
};


elTaskForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  var tasks = [];

  elTasksList.innerHTML = '';
  taskInputValue = elTaskInput.value.trim();
  var tasksFragment = document.createDocumentFragment();

  // check input
  if (!taskInputValue) {
    alert('enter valid text');
    return;
  }


  tasksObject.push(taskInputValue);

  tasksObject.forEach(function (task) {
    tasks.push(
      {
        id: tasksObject.indexOf(task) + 1,
        done: isCompleted,
        text: task
      }


    );
    var elTask = taskTemplate.cloneNode(true);
    var elLi = elTask.querySelector('.task-list-item')

    elLi.querySelector('.js-task-content').textContent = task;

    tasksFragment.appendChild(elTask);

    elRemainedTasks.textContent = tasks.length;


  });
  elTasksList.appendChild(tasksFragment);

  console.log(tasks);
  elFooter.classList.add('d-flex');
});



