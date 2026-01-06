import selectors from "./selectors";
import {
  addTask,
  initTaskList
} from "./tasks";

const todoFormElement = document.querySelector(selectors.todoForm);

todoFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

initTaskList();