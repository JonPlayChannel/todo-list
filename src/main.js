import selectors from "./selectors";
import {
  addTask,
  loadTasks
} from "./tasks";

const todoFormElement = document.querySelector(selectors.todoForm);

todoFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

loadTasks();