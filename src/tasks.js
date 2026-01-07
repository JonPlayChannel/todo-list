import selectors from "./selectors";
import cssClasses from "./css-classes";
import countIncompleteTasks from "./counter";

const snpTodoKey = "snp-todo";

const todoFormElement = document.querySelector(selectors.todoForm);
const todoListElement = document.querySelector(selectors.todoList);
const todoInputElement = document.querySelector(selectors.todoInput);
const todoFooterElement = document.querySelector(selectors.todoFooter);

const getTasksFromLocalStorage = () => JSON.parse(localStorage.getItem(snpTodoKey));

const addTaskToLocalStorage = (newTask) => {
  const currentTasks = getTasksFromLocalStorage() ?? [];
  
  const newTasks = [...currentTasks, newTask];

  localStorage.setItem(snpTodoKey, JSON.stringify(newTasks));
}

const deleteTaskFromLocalStorage = (taskId) => {
  const currentTasks = getTasksFromLocalStorage();

  const updatedTasks = currentTasks.filter(task => task.id !== taskId);
  
  localStorage.setItem(snpTodoKey, JSON.stringify(updatedTasks));
}

const createNewTaskElement = (newTask) => {
  const {
    id,
    label,
    isDone
  } = newTask;
  
  // Обёртка задачи
  const newTaskElement = document.createElement('li');
  newTaskElement.className = cssClasses.todoItem;
  newTaskElement.dataset.jsTodoItem = '';

  // Чекбокс
  const taskCheckbox = document.createElement('label');
  taskCheckbox.classList.add(cssClasses.todoItemCheckbox, cssClasses.checkbox);

  // input и span для чекбокса
  const input = document.createElement("input");
  const span = document.createElement("span");

  input.className = cssClasses.checkboxController;
  input.type = "checkbox";
  input.name = `${id}-done`;
  input.id = `${id}`;
  input.checked = isDone
  input.dataset.jsTodoItemCheckbox = '';

  span.className = cssClasses.checkboxEmulator;

  taskCheckbox.append(input, span);

  // Подпись задачи
  const taskLabel = document.createElement('span');
  taskLabel.textContent = label;

  // Кнопка удаления
  const deleteTaskButton = document.createElement('button');
  deleteTaskButton.className = cssClasses.deleteTaskButton;
  deleteTaskButton.type = "button";
  deleteTaskButton.title = "Удалить задачу";
  deleteTaskButton.ariaLabel = "Удалить задачу";
  deleteTaskButton.dataset.jsDeleteTaskButton = '';

  newTaskElement.append(taskCheckbox, taskLabel, deleteTaskButton);

  todoListElement.prepend(newTaskElement);
}

const showTasksList = () => {
  todoListElement.classList.remove(cssClasses.visuallyHidden);
  todoFooterElement.classList.remove(cssClasses.visuallyHidden);
}

const addTask = () => {
  const label = todoInputElement.value.trim();

  if (!label) {
    alert("Пустое имя задачи.");
    return;
  }

  const newTask = {
    id: crypto?.randomUUID() ?? new Date(),
    label: label,
    isDone: false
  };

  todoInputElement.value = '';
  addTaskToLocalStorage(newTask);
  createNewTaskElement(newTask);
  countIncompleteTasks();

  if (todoListElement.classList.contains(cssClasses.visuallyHidden)) {
    showTasksList();
  }
}

const deleteTask = (event) => {
  const { target } = event;

  const isDeleteTaskButtonElement = target.matches(selectors.deleteTaskButton);

  if (isDeleteTaskButtonElement) {
    const todoItemElement = target.closest(selectors.todoItem);
    const taskId = todoItemElement.querySelector(selectors.todoItemCheckbox)?.id;
    console.log(taskId);

    const isConfimed = confirm("Удалить задачу?");

    if (isConfimed) {
      todoItemElement.remove();
      deleteTaskFromLocalStorage(taskId);
      countIncompleteTasks();
    }
  }
}

const initTaskList = () => {
  const tasksList = getTasksFromLocalStorage();  

  if (tasksList === null) return;
  else {
    showTasksList();
  }

  tasksList.forEach(task => createNewTaskElement(task));
  countIncompleteTasks();
}

// Главная функция для добавления обработчиков событий в main.js
const bindEvents = () => {
  // Загрузка задач
  document.addEventListener("DOMContentLoaded", initTaskList);

  // Клик по кнопке удаления
  document.addEventListener("click", deleteTask);

  // Форма
  todoFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
  });
}

export default bindEvents;

export {
  getTasksFromLocalStorage
};