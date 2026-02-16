import cssClasses from "./css-classes";
import selectors from "./selectors";
import { getTasksFromLocalStorage } from "./tasks";

const todoFooterElement = document.querySelector(selectors.todoFooter);

const todoItemsCountElement = document.querySelector(selectors.todoItemsCount);
const todoItemsLabelElement = document.querySelector(selectors.todoItemsLabel);
const todoItemsLeftElement = document.querySelector(selectors.todoItemsLeft);
const removeCompletedTasksButtonElement = document.querySelector(selectors.removeCompletedTasksButton);

const getDeclension = (count) => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return ["задач", "осталось"];
  }

  if (mod10 === 1) {
    return ["задача", "осталась"];
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return ["задачи", "осталось"];
  }

  return ["задач", "осталось"];
};

const countIncompleteTasks = () => {
  const tasksList = getTasksFromLocalStorage();
  const incompleteTasksCount = tasksList.filter(({isDone}) => !isDone).length;

  const [ items, left ] = getDeclension(incompleteTasksCount);
  
  todoItemsCountElement.textContent = incompleteTasksCount;
  todoItemsLabelElement.textContent = items;
  todoItemsLeftElement.textContent = left;
  setClearCompletedTasksButtonVisible(tasksList);

  if (tasksList.length === 0) {
    todoFooterElement.classList.add(cssClasses.visuallyHidden);
  }
}

const setClearCompletedTasksButtonVisible = (tasksList) => {
  const completedTasks = tasksList.filter(({isDone}) => isDone);
  
  if (completedTasks.length > 0) {
    removeCompletedTasksButtonElement.classList.remove(cssClasses.visuallyHidden);
  } else {
    removeCompletedTasksButtonElement.classList.add(cssClasses.visuallyHidden);
  }
}

export default countIncompleteTasks;