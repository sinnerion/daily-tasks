const dailyTasksFormTasks = document.getElementById('dailyTasksFormTasks');

/* Функция удаления пустых задач */
function dailyTasksEmptyFieldsRemoving() {
  /* --- Удаляем пустые задачи */
  const dailyTasksFieldNotFilled = dailyTasksFormTasks.querySelectorAll('.daily-tasks-field:not(.daily-tasks-field_filled)');
  if (dailyTasksFieldNotFilled.length) {
    dailyTasksFieldNotFilled.forEach(function (item) {
      dailyTasksFormTasks.removeChild(item);
    });
  }
}

export default dailyTasksEmptyFieldsRemoving;