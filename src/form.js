import selectors from "./selectors";
import { setTasksToLocalStorage } from "./storage";

const todoInputElement = document.querySelector(selectors.todoInput);

const addTask = () => {
  const label = todoInputElement.value.trim();
  if (!label) {
    alert("Пустое имя задачи.");
    return;
  }

  const newTask = {
    id: crypto.randomUUID() ?? new Date(),
    label: label,
    isDone: false
  };

  setTasksToLocalStorage(newTask);
  todoInputElement.value = '';
  todoInputElement.blur();  
}

export {
  addTask
}