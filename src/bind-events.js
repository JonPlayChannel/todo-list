import selectors from "./selectors";
import {
  showTaskList,
  onTodoFormSubmit,
  onDeleteTaskButtonClick,
  onTodoItemCheckboxClick,
  onShowAllTasksButtonClick,
  onShowActiveTasksButtonClick,
  onShowCompletedTasksButtonClick,
  onRemoveCompletedTasksButtonClick
} from "./tasks";
import countIncompleteTasks from "./counter";

const todoFormElement = document.querySelector(selectors.todoForm);

const bindEvents = () => {
  // Загрузка задач
  document.addEventListener("DOMContentLoaded", () => {
    showTaskList();
    countIncompleteTasks();
  });

  // Переключение задачи
  document.addEventListener("click", onTodoItemCheckboxClick);

  // Клик по кнопке удаления
  document.addEventListener("click", onDeleteTaskButtonClick);

  // Показать все задачи
  document.addEventListener("click", onShowAllTasksButtonClick);

  // Показать невыполненные задачи
  document.addEventListener("click", onShowActiveTasksButtonClick);

  // Показать выполненные задачи
  document.addEventListener("click", onShowCompletedTasksButtonClick);

  // Убрать выполненные задачи
  document.addEventListener("click", onRemoveCompletedTasksButtonClick);

  // Форма
  todoFormElement.addEventListener("submit", onTodoFormSubmit);
}

export default bindEvents;