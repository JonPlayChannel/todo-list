import selectors from "./selectors";
import { getTasksFromLocalStorage } from "./tasks";

const todoFooterElement = document.querySelector(selectors.todoFooter);

const todoItemsCountElement = document.querySelector(selectors.todoItemsCount);
const todoItemsLabelElement = document.querySelector(selectors.todoItemsLabel);
const todoItemsLeftElement = document.querySelector(selectors.todoItemsLeft);

const countIncompleteTasks = () => {
  const tasksList = getTasksFromLocalStorage()
  const incompleteTasks = tasksList.filter(({isDone}) => !isDone);
  
  todoItemsCountElement.innerHTML = incompleteTasks.length;
}

export default countIncompleteTasks;