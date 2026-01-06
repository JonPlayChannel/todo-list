import { appendTasks, insertNoTasksElement } from "./list";
import getTasksFromLocalStorage from "./storage";

const tasks = getTasksFromLocalStorage();

if (tasks === null) {
  insertNoTasksElement();
} else {
  appendTasks(tasks);
}