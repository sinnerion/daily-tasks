import tasksStateSaving from './tasksStateSaving.js';

const dailyTasksFormTasks = document.getElementById('dailyTasksFormTasks');

/* --- Функция удаления задачи  */
function dailyTasksFieldRemoving() {
  const thisParent = this.parentNode;
  /* Удаляем текущий элемент */
  dailyTasksFormTasks.removeChild(thisParent);
  tasksStateSaving();
}

export default dailyTasksFieldRemoving;