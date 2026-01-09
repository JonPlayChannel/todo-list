const snpTodoKey = "snp-todo";

const getTasksFromLocalStorage = () => JSON.parse(localStorage.getItem(snpTodoKey));

const addTaskToLocalStorage = (newTask) => {
  const currentTasks = getTasksFromLocalStorage() ?? [];
  
  const newTasks = [...currentTasks, newTask];

  localStorage.setItem(snpTodoKey, JSON.stringify(newTasks));
}

const deleteTaskFromLocalStorage = (taskId) => {
  const currentTasks = getTasksFromLocalStorage();

  const updatedTasks = currentTasks.filter(task => task.id !== taskId);
  
  localStorage.setItem(snpTodoKey, JSON.stringify(updatedTasks));
}

const updateTaskInLocalStorage = (taskId, options = {}) => {
  const { isDone, label } = options;
  const tasks = getTasksFromLocalStorage();

  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { 
        ...task, 
        ...(isDone !== undefined && { isDone }),
        ...(label !== undefined && { label }) 
      };
    }
    
    return task;
  });

  localStorage.setItem(snpTodoKey, JSON.stringify(updatedTasks));
};

const removeCompletedTasksFromLocalStorage = () => {
  const currentTasks = getTasksFromLocalStorage();

  const updatedTasks = currentTasks.filter(task => !task.isDone);
  
  localStorage.setItem(snpTodoKey, JSON.stringify(updatedTasks));
}

export {
  getTasksFromLocalStorage,
  addTaskToLocalStorage,
  deleteTaskFromLocalStorage,
  updateTaskInLocalStorage,
  removeCompletedTasksFromLocalStorage
}