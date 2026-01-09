import selectors from "./selectors";
import cssClasses from "./css-classes";
import countIncompleteTasks from "./counter";
import {
  getTasksFromLocalStorage,
  addTaskToLocalStorage,
  deleteTaskFromLocalStorage,
  updateTaskCompleteInLocalStorage,
  removeCompletedTasksFromLocalStorage
} from "./storage";

const todoListElement = document.querySelector(selectors.todoList);
const todoInputElement = document.querySelector(selectors.todoInput);
const todoFooterElement = document.querySelector(selectors.todoFooter);

// ===========================================
// Элементы задач
// ===========================================

const createNewTaskElement = (newTask) => {
  const {
    id,
    label,
    isDone
  } = newTask;
  
  // Обёртка задачи
  const newTaskElement = document.createElement("li");
  newTaskElement.className = cssClasses.todoItem;
  newTaskElement.dataset.jsTodoItem = "";

  // Чекбокс
  const taskCheckbox = document.createElement("label");
  taskCheckbox.classList.add(cssClasses.todoItemCheckbox, cssClasses.checkbox);

  // input и span для чекбокса
  const input = document.createElement("input");
  const span = document.createElement("span");

  input.className = cssClasses.checkboxController;
  input.type = "checkbox";
  input.name = `${id}-done`;
  input.id = `${id}`;
  input.checked = isDone
  input.dataset.jsTodoItemCheckbox = "";

  span.className = cssClasses.checkboxEmulator;

  taskCheckbox.append(input, span);

  // Подпись задачи
  const taskLabel = document.createElement("span");
  taskLabel.className = cssClasses.todoItemLabel;
  taskLabel.textContent = label;
  taskLabel.dataset.jsTodoItemLabel = "";

  // Кнопка удаления
  const deleteTaskButton = document.createElement("button");
  deleteTaskButton.className = cssClasses.deleteTaskButton;
  deleteTaskButton.type = "button";
  deleteTaskButton.title = "Удалить задачу";
  deleteTaskButton.ariaLabel = "Удалить задачу";
  deleteTaskButton.dataset.jsDeleteTaskButton = "";

  newTaskElement.append(taskCheckbox, taskLabel, deleteTaskButton);

  todoListElement.prepend(newTaskElement);
}

const removeVisuallyHiddenClass = () => {
  todoListElement.classList.remove(cssClasses.visuallyHidden);
  todoFooterElement.classList.remove(cssClasses.visuallyHidden);
}

const showTaskList = (filter) => {
  const tasksList = getTasksFromLocalStorage();  

  if (tasksList === null) return;
  else {
    removeVisuallyHiddenClass();
  }

  todoListElement.innerHTML = "";
  
  if (!filter) {
    tasksList.forEach(task => createNewTaskElement(task));
    return;
  }

  if (filter === "active") {
    const filteredTasks = tasksList.filter(({isDone}) => !isDone);
    filteredTasks.forEach(task => createNewTaskElement(task));
    return;
  }

  if (filter === "completed") {
    const filteredTasks = tasksList.filter(({isDone}) => isDone);
    filteredTasks.forEach(task => createNewTaskElement(task));
  }
}

// ===========================================
// Обработчики
// ===========================================

const onTodoFormSubmit = (event) => {
  event.preventDefault();

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

  todoInputElement.value = "";
  addTaskToLocalStorage(newTask);
  createNewTaskElement(newTask);
  countIncompleteTasks();

  if (todoListElement.classList.contains(cssClasses.visuallyHidden)) {
    removeVisuallyHiddenClass();
  }

  showTaskList();
}

const onTodoItemCheckboxClick = (target) => {
  const { id, checked } = target;
    
  updateTaskCompleteInLocalStorage(id, checked);
  countIncompleteTasks();
}

const onDeleteTaskButtonClick = (target) => {
  const todoItemElement = target.closest(selectors.todoItem);
  const taskId = todoItemElement.querySelector(selectors.todoItemCheckbox)?.id;
  const taskLabel = todoItemElement.querySelector(selectors.todoItemLabel)?.textContent;

  const isConfimed = confirm(`Удалить задачу "${taskLabel}"?`);

  if (isConfimed) {
    todoItemElement.remove();
    deleteTaskFromLocalStorage(taskId);
    countIncompleteTasks();
  }
}

const onRemoveCompletedTasksButtonClick = () => {
  const isConfirmed = confirm("Удалить выполненные задачи?");
    
  if (isConfirmed) {
    removeCompletedTasksFromLocalStorage();
    showTaskList();
    countIncompleteTasks();
  }
}

export {
  showTaskList,
  getTasksFromLocalStorage,
  onTodoFormSubmit,
  onTodoItemCheckboxClick,
  onTodoLabelDblclick,
  onDeleteTaskButtonClick,
  onRemoveCompletedTasksButtonClick
};