const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
function createTaskElement(task) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = () => markTaskAsDone(li);
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = task.todo;
    taskInput.disabled = false;
    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'delete.svg';
    deleteIcon.alt = 'Delete';
    deleteIcon.className = 'delete-icon';
    deleteIcon.onclick = () => deleteTask(li, task.id);
    li.appendChild(checkbox);
    li.appendChild(taskInput);
    li.appendChild(deleteIcon);
    return li;
  }
  function Todos(userId) {
    fetch(`https://dummyjson.com/todos/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (Array.isArray(data.todos)) {
          data.todos.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
          });
        } else {
          console.error('Invalid data format.');
        }
      })
      .catch(error => console.error(error));
  }
function addTask(newTask) {
  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      todo: newTask,
      completed: true,
      userId: 10
    })
  })
    .then(response => response.json())
    .then(data => {
      const taskElement = createTaskElement(data);
      taskList.appendChild(taskElement);
      newTaskInput.value = '';
      successText('New to-do added');
    })
    .catch(error => console.error(error));
}
function updateTodo(taskId, completed) {
  fetch(`https://dummyjson.com/todos/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      completed: completed
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));
}
function deleteTodo(li, taskId) {
  fetch(`https://dummyjson.com/todos/${taskId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      li.remove();
      successText('To-do deleted successfully');
    })
    .catch(error => console.error(error));
}
function markDone(li, taskId) {
  const checkbox = li.querySelector('input[type="checkbox"]');
  const completed = checkbox.checked;
  updateTask(taskId, completed);
  li.classList.toggle('completed');
  const taskInput = li.querySelector('input[type="text"]');
  if (completed) {
    taskInput.classList.add('completed');
  } else {
    taskInput.classList.remove('completed');
  }
  successText('To-do completed!');
}
function successText(message) {
  const successMessage = document.createElement('p');
  successMessage.classList.add('success-message');
  successMessage.textContent = message;
  document.body.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}
Todos(10)