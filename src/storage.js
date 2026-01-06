const getTasksFromLocalStorage = () => {
  const list = JSON.parse(localStorage.getItem("snp-todo"));
  return list;
}

export default getTasksFromLocalStorage;