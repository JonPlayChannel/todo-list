import cssClasses from "./css-classes";
import selectors from "./selectors";
import { getTasksFromLocalStorage } from "./tasks";

const todoFooterElement = document.querySelector(selectors.todoFooter);

const todoItemsCountElement = document.querySelector(selectors.todoItemsCount);
const todoItemsLabelElement = document.querySelector(selectors.todoItemsLabel);
const todoItemsLeftElement = document.querySelector(selectors.todoItemsLeft);
const removeCompletedTasksButtonElement = document.querySelector(selectors.removeCompletedTasksButton);

const chooseWordsCase = (incompleteTasks) => {
  let items = null;
  let left = null;

  switch (true) {
    case incompleteTasks % 10 === 1 && incompleteTasks !== 11:
      items = "задача";
      left = "осталась";
      break;
    
    case incompleteTasks % 100 === 11
        || incompleteTasks % 100 === 12
        || incompleteTasks % 100 === 13:
      items = "задач";
      left = "осталось";
      break;
      
    case (incompleteTasks % 10 === 2)
        || (incompleteTasks % 10 === 3)
        || (incompleteTasks % 10 === 4):
      items = "задачи";
      left = "осталось";
      break;
      
    default:
      items = "задач";
      left = "осталось";
  }

  return [items, left];
}

const countIncompleteTasks = () => {
  const tasksList = getTasksFromLocalStorage();
  const incompleteTasksCount = tasksList.filter(({isDone}) => !isDone).length;

  const [ items, left ] = chooseWordsCase(incompleteTasksCount);
  
  todoItemsCountElement.innerHTML = incompleteTasksCount;
  todoItemsLabelElement.innerHTML = items;
  todoItemsLeftElement.innerHTML = left;
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