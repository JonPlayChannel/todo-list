import selectors from "./selectors";
import {
  showTaskList,
  onTodoFormSubmit,
  onDeleteTaskButtonClick,
  onTodoItemCheckboxClick,
  onShowTasksButtonClick,
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
  document.addEventListener("click", (event) => {
    const { target } = event;

    // Переключение состояния задачи
    if (target.matches(selectors.todoItemCheckbox)) {
      return onTodoItemCheckboxClick(target);
    }

    // Удаленние задачи
    if (target.matches(selectors.deleteTaskButton)) {
      return onDeleteTaskButtonClick(target);
    }

    // Отображение всех задач
    if (target.matches(selectors.showAllTasksButton)) {
      return onShowTasksButtonClick();
    }

    // Отображение активных задач
    if (target.matches(selectors.showActiveTasksButton)) {
      return onShowTasksButtonClick("active");
    }

    // Отображение выполненных задач
    if (target.matches(selectors.showCompletedTasksButton)) {
      return onShowTasksButtonClick("completed");
    }

    // Удаление выполненных задач
    if (target.matches(selectors.removeCompletedTasksButton)) {
      return onRemoveCompletedTasksButtonClick();
    }
  });

  // Отправка формы
  todoFormElement.addEventListener("submit", onTodoFormSubmit);
}

export default bindEvents;