const dailyTasksFormTasks = document.getElementById('dailyTasksFormTasks');

/* Функция очистики текущего состояния */
function tasksStateClearing() {
  dailyTasksFormTasks.innerHTML = '';
  localStorage.removeItem('tasks');
  localStorage.removeItem('dailyTasksFormTasksHTML');
}

export default tasksStateClearing;