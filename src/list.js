import selectors from "./selectors";

const todoListElement = document.querySelector(selectors.todoList);

const showTasksList = (tasks) => {
  tasks.array.forEach(task => {
    // Обёртка задачи
    const taskElement = document.createElement('li');
    taskElement.className = "todo-item";

    // Чекбокс
    const taskCheckbox = document.createElement('label');
    taskCheckbox.className = "todo-item__checkbox checkbox";
    taskCheckbox.innerHTML = `
      <input
        class="checkbox__controller"
        type="checkbox"
        name="${task.id}-done" id="${task.id}"
        checked=${task.isDone}
        data-js-todo-item-checkbox
      />
      <span class="checkbox__emulator"></span>
    `;

    // Подпись задачи
    const taskLabel = document.createElement('span');
    taskLabel.textContent = task.label;

    // Кнопка удаления
    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.className = "todo-item__delete-task-button";
    deleteTaskButton.type = "button";
    deleteTaskButton.title = "Удалить задачу";
    deleteTaskButton.ariaLabel = "Удалить задачу";
    deleteTaskButton.dataset.jsDeleteTaskButton = '';

    taskElement.append(taskCheckbox, taskLabel, deleteTaskButton);
    todoListElement.appendChild(taskElement);
  });
}

export default showTasksList;