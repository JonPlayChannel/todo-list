import selectors from "./selectors";
import { getTasksFromLocalStorage } from "./storage";

const todoListElement = document.querySelector(selectors.todoList);
const noTasksElement = document.querySelector(selectors.noTasksElement);

const insertNoTasksElement = () => {
  const noTasksElement = document.createElement('div');
  noTasksElement.className = "no-tasks";
  noTasksElement.textContent = "Список задач пуст";
  noTasksElement.dataset.jsNoTasksElement = ''

  todoListElement.replaceWith(noTasksElement);
}

const appendTasks = () => {
  const tasks = getTasksFromLocalStorage();

  if (tasks === null) {
    todoListElement.classList.add("visually-hidden");
    return;
  } else {
    noTasksElement.remove();
    todoListElement.classList.remove("visually-hidden");
  }
  
  // Очистка списка
  todoListElement.innerHTML = "";
  
  tasks?.forEach(task => {
    // Обёртка задачи
    const taskElement = document.createElement('li');
    taskElement.className = "todo__todo-item todo-item";

    // Чекбокс
    const taskCheckbox = document.createElement('label');
    taskCheckbox.className = "todo-item__checkbox checkbox";
    taskCheckbox.innerHTML = `
      <input
        class="checkbox__controller"
        type="checkbox"
        name="${task.id}-done" id="${task.id}"
        ${task.isDone ? "checked" : ''}
        data-js-todo-item-checkbox
      />
      <span class="checkbox__emulator"></span>
    `;

    // Подпись задачи
    const taskLabel = document.createElement('span');
    taskLabel.textContent = task.label;

    // Кнопка удаления
    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.className = "todo-item__delete-task-button";
    deleteTaskButton.type = "button";
    deleteTaskButton.title = "Удалить задачу";
    deleteTaskButton.ariaLabel = "Удалить задачу";
    deleteTaskButton.dataset.jsDeleteTaskButton = '';

    taskElement.append(taskCheckbox, taskLabel, deleteTaskButton);
    todoListElement.appendChild(taskElement);
  });
}

export {
  insertNoTasksElement,
  appendTasks
};