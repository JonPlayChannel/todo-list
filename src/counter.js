import cssClasses from "./css-classes";
import selectors from "./selectors";
import { getTasksFromLocalStorage } from "./tasks";

const todoFooterElement = document.querySelector(selectors.todoFooter);

const todoItemsCountElement = document.querySelector(selectors.todoItemsCount);
const todoItemsLabelElement = document.querySelector(selectors.todoItemsLabel);
const todoItemsLeftElement = document.querySelector(selectors.todoItemsLeft);
const removeCompletedTasksButtonElement = document.querySelector(selectors.removeCompletedTasksButton);

const countIncompleteTasks = () => {
  const tasksList = getTasksFromLocalStorage();
  const incompleteTasks = tasksList.filter(({isDone}) => !isDone);
  
  console.log(incompleteTasks);
  
  todoItemsCountElement.innerHTML = incompleteTasks.length;
  setClearCompletedTasksButtonVisible(tasksList);
}

const setClearCompletedTasksButtonVisible = (tasksList) => {
  const completedTasks = tasksList.filter(({isDone}) => isDone);
  
  if (completedTasks.length > 0) {
    removeCompletedTasksButtonElement.classList.remove(cssClasses.visuallyHidden);
  } else {
    removeCompletedTasksButtonElement.classList.add(cssClasses.visuallyHidden);
  }
}

export {
  countIncompleteTasks
};