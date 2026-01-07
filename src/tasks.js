import selectors from "./selectors";
import cssClasses from "./css-classes";
import countIncompleteTasks from "./counter";

let filter = null;
const snpTodoKey = "snp-todo";

const todoFormElement = document.querySelector(selectors.todoForm);
const todoListElement = document.querySelector(selectors.todoList);
const todoInputElement = document.querySelector(selectors.todoInput);
const todoFooterElement = document.querySelector(selectors.todoFooter);

// Работа с localStorage
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

const updateTaskCompleteInLocalStorage = (taskId, isDone) => {
  const tasks = getTasksFromLocalStorage();

  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, isDone };
    }

    return task;
  });

  localStorage.setItem(snpTodoKey, JSON.stringify(updatedTasks));
}

const removeCompletedTasksFromLocalStorage = () => {
  const currentTasks = getTasksFromLocalStorage();

  const updatedTasks = currentTasks.filter(task => !task.isDone);
  
  localStorage.setItem(snpTodoKey, JSON.stringify(updatedTasks));
}

// ===========================================
// Элементы задач

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

// Обработчики
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

  showTaskList(null);
}

const deleteTask = (event) => {
  const { target } = event;

  const isDeleteTaskButtonElement = target.matches(selectors.deleteTaskButton);

  if (isDeleteTaskButtonElement) {
    const todoItemElement = target.closest(selectors.todoItem);
    const taskId = todoItemElement.querySelector(selectors.todoItemCheckbox)?.id;

    const isConfimed = confirm("Удалить задачу?");

    if (isConfimed) {
      todoItemElement.remove();
      deleteTaskFromLocalStorage(taskId);
      countIncompleteTasks();
    }
  }
}

const toggleTaskComplete = (event) => {
  const { target } = event;

  const isTodoItemCheckboxElement = target.matches(selectors.todoItemCheckbox);

  if (isTodoItemCheckboxElement) {
    const { id, checked } = target;
    
    updateTaskCompleteInLocalStorage(id, checked);
    countIncompleteTasks();
  }
}

const showTaskList = (filter) => {
  const tasksList = getTasksFromLocalStorage();  

  if (tasksList === null) return;
  else {
    showTasksList();
  }

  todoListElement.innerHTML = "";
  
  if (!filter) {
    tasksList.forEach(task => createNewTaskElement(task));
  }

  if (filter === "active") {
    const filteredTasks = tasksList.filter(({isDone}) => !isDone);
    filteredTasks.forEach(task => createNewTaskElement(task));
  }

  if (filter === "completed") {
    const filteredTasks = tasksList.filter(({isDone}) => isDone);
    filteredTasks.forEach(task => createNewTaskElement(task));
  }
}

const onShowAllTasksButtonClick = (event) => {
  const { target } = event;

  const isShowAllTasksButtonElement = target.matches(selectors.showAllTasksButton);

  if (isShowAllTasksButtonElement) {
    showTaskList(null);
  }
}

const onShowActiveTasksButtonClick = (event) => {
  const { target } = event;

  const isShowActiveTasksButtonElement = target.matches(selectors.showActiveTasksButton);

  if (isShowActiveTasksButtonElement) {
    showTaskList("active");
  }
}

const onShowCompletedTasksButtonClick = (event) => {
  const { target } = event;

  const isShowCompletedTasksButtonElement = target.matches(selectors.showCompletedTasksButton);

  if (isShowCompletedTasksButtonElement) {
    showTaskList("completed");
  }
}

const onRemoveCompletedTasksButtonClick = (event) => {
  const { target } = event;

  const isRemoveCompletedTasksButtonElement = target.matches(selectors.removeCompletedTasksButton);

  if (isRemoveCompletedTasksButtonElement) {
    const isConfirmed = confirm("Удалить выполненные задачи?");
    
    if (isConfirmed) {
      removeCompletedTasksFromLocalStorage();
      showTaskList(null);
    }
  }
}

// Главная функция для добавления обработчиков событий в main.js
const bindEvents = () => {
  // Загрузка задач
  document.addEventListener("DOMContentLoaded", () => {
    showTaskList(null);
    countIncompleteTasks();
  });

  // Переключение задачи
  document.addEventListener("click", toggleTaskComplete);

  // Клик по кнопке удаления
  document.addEventListener("click", deleteTask);

  // Показать все задачи
  document.addEventListener("click", onShowAllTasksButtonClick);

  // Показать невыполненные задачи
  document.addEventListener("click", onShowActiveTasksButtonClick);

  // Показать выполненные задачи
  document.addEventListener("click", onShowCompletedTasksButtonClick);

  // Убрать выполненные задачи
  document.addEventListener("click", onRemoveCompletedTasksButtonClick);

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