import selectors from "./selectors";
import {
  showTaskList,
  onTodoFormSubmit,
  onTodoItemCheckboxClick,
  onTodoItemLabelDblclick,
  onTodoItemLabelBlur,
  onDeleteTaskButtonClick,
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

  // Клики по элементам страницы
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
      return showTaskList();
    }

    // Отображение активных задач
    if (target.matches(selectors.showActiveTasksButton)) {
      return showTaskList("active");
    }

    // Отображение выполненных задач
    if (target.matches(selectors.showCompletedTasksButton)) {
      return showTaskList("completed");
    }

    // Удаление выполненных задач
    if (target.matches(selectors.removeCompletedTasksButton)) {
      return onRemoveCompletedTasksButtonClick();
    }
  });

  // Двойной клик для редактирования задачи
  document.addEventListener("dblclick", (event) => {
    const { target } = event;

    if (target.matches(selectors.todoItemLabel)) {      
      return onTodoItemLabelDblclick(target);
    }
  });

  document.addEventListener("blur", (event) => {
    const { target } = event;

    if (target.matches(selectors.todoItemLabel)) {
      return onTodoItemLabelBlur(target);
    }
  }, true);

  // Отправка формы
  todoFormElement.addEventListener("submit", onTodoFormSubmit);
}

export default bindEvents;