import selectors from "./selectors";
import { appendTasks } from "./list";
import addTask from "./form";

const todoFormElement = document.querySelector(selectors.todoForm);

todoFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
  appendTasks();
});

appendTasks();