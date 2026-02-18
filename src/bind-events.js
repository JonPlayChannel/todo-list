import selectors from "./selectors";
import cssClasses from "./css-classes";
import {
  setFilter,
  checkAllTasksCompleted,
  onTodoFormSubmit,
  onToggleCompleteClick,
  onTodoItemCheckboxClick,
  onTodoItemLabelBlur,
  onDeleteTaskButtonClick,
  onRemoveCompletedTasksButtonClick,
} from "./tasks";
import countIncompleteTasks from "./counter";

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
  
  target.initialText = target.textContent;
  target.contentEditable = true;
  target.classList.add(cssClasses.todoItemLabelEditable);
}

const handleGlobalKeyDown = (event) => {
  const { target, code } = event;
  const isLabel = target.matches(selectors.todoItemLabel);

  if (code === "Escape") return exitEditingMode();

  if ((code === "Enter" || code === "NumpadEnter") && isLabel && !event.shiftKey) {
    onTodoItemLabelBlur(target);
    exitEditingMode();
  }
};

const handleOutsideClick = (event) => {
  const { target } = event;

  const activeLabel = document.querySelector(`${selectors.todoItemLabel}[contenteditable="true"]`);

  if (activeLabel && !activeLabel.contains(target)) {
    exitEditingMode();
  }
};

const handleGlobalBlur = (event) => {
  const { target } = event;
  if (target.matches(selectors.todoItemLabel)) {
    onTodoItemLabelBlur(target);
  }
};

const bindEvents = () => {
  const todoFormElement = document.querySelector(selectors.todoForm);
  const toggleCompleteElement = document.querySelector(selectors.toggleComplete);
  const todoListElement = document.querySelector(selectors.todoList);

  const todoFooterElement = document.querySelector(selectors.todoFooter);
  const showAllTasksButtonElement = todoFooterElement.querySelector(selectors.showAllTasksButton);
  const showActiveTasksButtonElement = todoFooterElement.querySelector(selectors.showActiveTasksButton);
  const showCompletedTasksButtonElement = todoFooterElement.querySelector(selectors.showCompletedTasksButton);
  const removeCompletedTasksButtonElement = todoFooterElement.querySelector(selectors.removeCompletedTasksButton);

  // Отправка формы
  todoFormElement.addEventListener("submit", onTodoFormSubmit);

  // Переключение всех задач
  toggleCompleteElement.addEventListener("click", (event) => {
    const { target } = event
    
    onToggleCompleteClick(target);
  });

  // Клики по списку задач
  todoListElement.addEventListener("click", (event) => {
    const { target } = event;
    
    if (target.matches(selectors.todoItemCheckbox)) {
      return onTodoItemCheckboxClick(target);
    }

    if (target.matches(selectors.deleteTaskButton)) {
      return onDeleteTaskButtonClick(target);
    }
  });

  // Двойной клик для редактирования
  todoListElement.addEventListener("dblclick", (event) => {
    const { target } = event;
    
    if (target.matches(selectors.todoItemLabel)) {
      handleDoubleClick(target); 
    }
  });

  // Подвал списка
  showAllTasksButtonElement.addEventListener("click", () => setFilter());
  showActiveTasksButtonElement.addEventListener("click", () => setFilter("active"));
  showCompletedTasksButtonElement.addEventListener("click", () => setFilter("completed"));
  removeCompletedTasksButtonElement.addEventListener("click", onRemoveCompletedTasksButtonClick);
  
  // DOM-дерево
  document.addEventListener("DOMContentLoaded", () => {    
    setFilter();
    countIncompleteTasks();
    checkAllTasksCompleted();
  });
  document.addEventListener("keydown", handleGlobalKeyDown);
  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("blur", handleGlobalBlur, true);

  // Нажатия клавиш
  document.addEventListener("keydown", (event) => {
    const { target, code } = event;

    // Предотвращение ошибки при добавлении первой задачи
    const isLabel = target.matches(selectors.todoItemLabel);
    
    if (code === "Escape") {
      return exitEditingMode();
    }

    if ((code === "Enter" || code === "NumpadEnter") && isLabel && !event.shiftKey) {
      onTodoItemLabelBlur(target);
      exitEditingMode();      
    }
  })
}

export default bindEvents;