/* Функция сохранения текущего состояния */
function tasksStateSaving() {
  /* --- Устанавливаем порядковые id заполненным задачам */
  const dailyTasksFieldFilled = document.querySelectorAll('.daily-tasks-field_filled');
  for (let i = 0; i < dailyTasksFieldFilled.length; i++) {
    dailyTasksFieldFilled[i].setAttribute('id', `dailyTasksField-${i + 1}`);
  }

  /* --- Сохраняем разметку заполненных задач */
  const dailyTasksFormTasksHTML = dailyTasksFormTasks.innerHTML;
  localStorage.setItem('dailyTasksFormTasksHTML', dailyTasksFormTasksHTML);
}

export default tasksStateSaving;