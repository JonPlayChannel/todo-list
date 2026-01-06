import showTasksList from "./list";
import selectors from "./selectors";

const todoListElement = document.querySelector(selectors.todoList);

const insertNoTasksElement = () => {
  const noTasksElement = document.createElement('div');
  noTasksElement.className = "no-tasks";
  noTasksElement.textContent = "Список задач пуст"

  return noTasksElement;
}

const getTasksFromLocalStorage = () => {
  const list = JSON.parse(localStorage.getItem("snp-todo"));
  console.log(list);
  

  if (!list) {
    todoListElement.replaceWith(insertNoTasksElement())
    return;
  }

  showTasksList(list);
}

export {
  getTasksFromLocalStorage
};