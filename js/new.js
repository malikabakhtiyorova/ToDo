// declare DOM elements

var elTaskForm = document.querySelector('.js-task-form');
var elTaskList = document.querySelector('.js-tasks-list');
var elTaskInput = document.querySelector('.js-task-input');
var elFooter = document.querySelector('.footer');
var elRemainedTasks = document.querySelector('.js-remained-tasks');
var taskTemplate = document.querySelector('#task-template').content;
var elsAdditionalBtns = document.querySelector('.add-btns');

// Call data from localStorage

var tasks = JSON.parse(localStorage.getItem('taskItem')) || [];

// create task-li

var createTaskLi = function (task) {
  elLi = taskTemplate.cloneNode(true);

  elLi.querySelector('.remove-button').dataset.id = task.id;
  elLi.querySelector('.js-is-completed-checkbox').dataset.id = task.id;
  elLi.querySelector('.js-task-content').textContent = task.text;
  elLi.querySelector('.js-todo__checkbox').dataset.todoId = task.id;
  // elLi.querySelector('.todo__label').setAttribute('for', `todo${task.id}`);

  return elLi;
}

var updateLocalStorage = function () {
  localStorage.setItem('taskItem', JSON.stringify(tasks))
};

var renderTasks = function (tasks) {
  elTaskList.innerHTML = '';

  tasks.forEach(function (task) {
    elTaskList.appendChild(createTaskLi(task));
  })

  elTaskInput.value = '';
}

renderTasks(tasks);

var renderCompleted = (tasks) => {
  var elTaskItem = document.querySelectorAll('.tasks-li');

  tasks.forEach(function (task, i) {
    if (task.completed) {
      elTaskItem[i].querySelector('.js-task-content').classList.add('del');
      elTaskItem[i].querySelector('.js-is-completed-checkbox').checked = true;
    } else {
      elTaskItem[i].querySelector('.js-task-content').classList.remove('del');
      elTaskItem[i].querySelector('.js-is-completed-checkbox').checked = false;
    }
  });
}

elTaskForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  taskInput = elTaskInput.value.trim();
  if (!taskInput) {
    alert('Enter valid text');
    return;
  }

  elFooter.classList.add('d-flex');

  tasks.push({
    id: 1,
    text: taskInput,
    completed: false
  })

  tasks.forEach(function (task, index) {
    task.id = index + 1;
  })

  renderTasks(tasks);
  updateLocalStorage();
  elRemainedTasks.textContent = tasks.length;
});

elTaskList.addEventListener('click', function (evt) {
  if (evt.target.matches('.remove-button')) {
    var remId = evt.target.dataset.id;

    var taskIndex = tasks.findIndex(function (task) {
      return String(task.id) === String(remId);
    })

    tasks.splice(taskIndex, 1);

    renderTasks(tasks);
    elRemainedTasks.textContent = tasks.length
    updateLocalStorage();

  } else if (evt.target.matches('.js-is-completed-checkbox')) {
    // var doneId = evt.target.dataset.id;
    // document.querySelector('.js-is-completed-checkbox').setAttribute('checked', 'checked');

    // var taskDone = tasks.find(function (task) {

    //   return String(task.id) === String(doneId);
    // })
    // document.querySelector('.js-task-content').classList.toggle('completed-task');
    // elLi.querySelector('.js-todo__checkbox').setAttribute(checked)
    // taskDone.completed = !taskDone.completed;

    // renderTasks(tasks);
    // elRemainedTasks.textContent = tasks.length;
    // updateLocalStorage();

    tasks.find((task) => {
      if (task !== null) {
        if (task.id == evt.target.dataset.todoId) {
          console.log('hello');
          document.querySelector('.js-task-content').classList.toggle('completed-task');
          // elLi.querySelector('.js-todo').classList.toggle('completed-task');
          task.completed ? task.completed = false : task.completed = true;
          updateLocalStorage();
        }
      }
    });
  }
});


elsAdditionalBtns.addEventListener('click', (evt) => {

  if (evt.target.matches('.js-tasks__filter-all')) {
    renderTasks(tasks)
    renderCompleted(tasks)
  } else if (evt.target.matches('.js-tasks__filter-active')) {
    var activesArr = tasks.filter(task => {
      return !task.completed
    })
    renderTasks(activesArr)
  } else if (evt.target.matches('.js-tasks__filter-completed')) {


    var completedArr = tasks.filter(task => {
      return task.completed
    })
    renderTasks(completedArr)
    renderCompleted(completedArr)
  } else if (evt.target.matches('.tasks__clear-completed')) {
    tasks = [];
    renderTasks(tasks)
    elTaskList.innerHTML = '';
    elRemainedTasks.textContent = tasks.length;
    updateLocalStorage();
  }

})

renderTasks(tasks);
elRemainedTasks.textContent = tasks.length;
updateLocalStorage();


