import { appendTasks } from "./list";

const getTasksFromLocalStorage = () => {
  const list = JSON.parse(localStorage.getItem("snp-todo"));
  return list;
}

const setTasksToLocalStorage = (newTask) => {
  const currentTasks = getTasksFromLocalStorage() ?? []
  
  const newTasks = [...currentTasks, newTask];

  localStorage.setItem("snp-todo", JSON.stringify(newTasks));
  appendTasks();
}

export {
  getTasksFromLocalStorage,
  setTasksToLocalStorage
}