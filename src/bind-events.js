import selectors from "./selectors";
import cssClasses from "./css-classes";
import {
  snpFilterKey,

  showTaskList,
  checkAllTasksCompleted,
  onTodoFormSubmit,
  onToggleCompleteClick,
  onTodoItemCheckboxClick,
  onTodoItemLabelBlur,
  onDeleteTaskButtonClick,
  onRemoveCompletedTasksButtonClick,
} from "./tasks";
import countIncompleteTasks from "./counter";

const todoFormElement = document.querySelector(selectors.todoForm);

let lastTouchTime = 0;
let doubleTapTimeout;
const DOUBLE_TAP_DELAY = 400;

const setFilter = () => {
  sessionStorage.setItem(snpFilterKey, "none");
}

const exitEditingMode = (target = null) => {
  const labels = document.querySelectorAll(selectors.todoItemLabel);

  const deselect = (label) => {
    label.classList.remove(cssClasses.todoItemLabelEditable);
    label.contentEditable = false;
  }
  
  if (!target) {
    return labels.forEach(label => deselect(label));
  }

  labels.forEach(label => {
    if (label !== target) {
      deselect(label);
    }
  })
}

const handleDoubleClick = (target) => {
  exitEditingMode(target);
  const now = Date.now();
      
  if (now - lastTouchTime < DOUBLE_TAP_DELAY) {
    clearTimeout(doubleTapTimeout);
    target.contentEditable = true;
    target.classList.add(cssClasses.todoItemLabelEditable);
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
    setFilter();
    showTaskList();
    countIncompleteTasks();
    checkAllTasksCompleted();
  });

  // Клики по элементам страницы
  document.addEventListener("click", (event) => {
    const { target } = event;
    
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
    } else {
      exitEditingMode();
    }

    // Удаленние задачи
    if (target.matches(selectors.deleteTaskButton)) {
      return onDeleteTaskButtonClick(target);
    }

    // Отображение всех задач
    if (target.matches(selectors.showAllTasksButton)) {
      sessionStorage.setItem(snpFilterKey, "none");
      return showTaskList();
    }

    // Отображение активных задач
    if (target.matches(selectors.showActiveTasksButton)) {
      sessionStorage.setItem(snpFilterKey, "active");
      return showTaskList();
    }

    // Отображение выполненных задач
    if (target.matches(selectors.showCompletedTasksButton)) {
      sessionStorage.setItem(snpFilterKey, "completed");
      return showTaskList();
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

  // Нажатия клавиш
  document.addEventListener("keydown", (event) => {
    const { code } = event;
    //console.log(event);
    
    
    if (code === "Escape") {
      return exitEditingMode();
    }

    if ((code === "Enter" || code === "NumpadEnter") && !event.shiftKey) {
      onTodoItemLabelBlur(document.querySelector(selectors.todoItemLabel));
      exitEditingMode();      
    }
  })

  // Отправка формы
  todoFormElement.addEventListener("submit", onTodoFormSubmit);
}

export default bindEvents;