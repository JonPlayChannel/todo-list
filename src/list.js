import selectors from "./selectors";
import cssClasses from "./css-classes";
import { getTasksFromLocalStorage } from "./storage";

const todoListElement = document.querySelector(selectors.todoList);
const noTasksElement = document.querySelector(selectors.noTasksElement);

const insertNoTasksElement = () => {
  const noTasksElement = document.createElement('div');
  noTasksElement.className = cssClasses.noTasks;
  noTasksElement.textContent = "Список задач пуст";
  noTasksElement.dataset.jsNoTasksElement = '';

  todoListElement.replaceWith(noTasksElement);
}

const appendTasks = () => {
  const tasksList = getTasksFromLocalStorage();

  if (tasksList === null) {
    todoListElement.classList.add(cssClasses.visuallyHidden);
    return;
  } else {
    noTasksElement.remove();
    todoListElement.classList.remove(cssClasses.visuallyHidden);
  }
  
  // Очистка списка
  todoListElement.innerHTML = "";
  
  // Отражение списка
  const reversedTasksList = [...tasksList].reverse();

  reversedTasksList?.forEach(task => {
    // Обёртка задачи
    const taskElement = document.createElement('li');
    taskElement.className = cssClasses.todoItem;

    // Чекбокс
    const taskCheckbox = document.createElement('label');
    taskCheckbox.classList.add(cssClasses.todoItemCheckbox, cssClasses.checkbox);

    // input и span для чекбокса
    const input = document.createElement("input");
    const span = document.createElement("span");

    input.className = cssClasses.checkboxController;
    input.type = "checkbox";
    input.name = `${task.id}-done`;
    input.id = `${task.id}`;
    input.dataset.jsTodoItemCheckbox = '';

    span.className = cssClasses.checkboxEmulator;

    taskCheckbox.append(input, span);

    // Подпись задачи
    const taskLabel = document.createElement('span');
    taskLabel.textContent = task.label;

    // Кнопка удаления
    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.className = cssClasses.deleteTaskButton;
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