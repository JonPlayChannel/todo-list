import selectors from "./selectors";
import {
  showTaskList,
  checkAllTasksCompleted,
  onTodoFormSubmit,
  onToggleCompleteClick,
  onTodoItemCheckboxClick,
  onTodoItemLabelDblclick,
  onTodoItemLabelBlur,
  onDeleteTaskButtonClick,
  onRemoveCompletedTasksButtonClick,
  exitEditingMode
} from "./tasks";
import countIncompleteTasks from "./counter";
import cssClasses from "./css-classes";

const todoFormElement = document.querySelector(selectors.todoForm);

let lastTouchTime = 0;
let doubleTapTimeout;
const DOUBLE_TAP_DELAY = 400;

const handleDoubleClick = (target) => {
  const now = Date.now();
      
  if (now - lastTouchTime < DOUBLE_TAP_DELAY) {
    clearTimeout(doubleTapTimeout);
    onTodoItemLabelDblclick(target);
    lastTouchTime = 0;
    return;
  }
  
  lastTouchTime = now;
  doubleTapTimeout = setTimeout(() => {
    lastTouchTime = 0;
  }, DOUBLE_TAP_DELAY);
}

const bindEvents = () => {
  // Загрузка задач
  document.addEventListener("DOMContentLoaded", () => {    
    showTaskList();
    countIncompleteTasks();
    checkAllTasksCompleted();
  });

  // Клики по элементам страницы
  document.addEventListener("click", (event) => {
    const { target } = event;

    // Сброс класса для надписи задачи
    if (!target.matches(selectors.todoItemLabel)) {
      exitEditingMode();
    }
    
    // Переключение состояния всех задач
    if (target.matches(selectors.toggleComplete)) {
      return onToggleCompleteClick(target);
    }

    // Переключение состояния задачи
    if (target.matches(selectors.todoItemCheckbox)) {
      return onTodoItemCheckboxClick(target);
    }

    // Двойнок клик по задаче
    if (target.matches(selectors.todoItemLabel)) {
      return handleDoubleClick(target);
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

  document.addEventListener("blur", (event) => {
    const { target } = event;

    if (target.matches(selectors.todoItemLabel)) {
      return onTodoItemLabelBlur(target);
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      exitEditingMode();
    }
  })

  // Отправка формы
  todoFormElement.addEventListener("submit", onTodoFormSubmit);
}

export default bindEvents;