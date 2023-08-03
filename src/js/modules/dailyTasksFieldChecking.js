import tasksStateSaving from './tasksStateSaving.js';

/* --- Функция завершения задачи  */
function dailyTasksFieldChecking() {
  const thisParentField = this.parentNode.parentNode;
  if (this.checked === true) {
    this.setAttribute('checked', 'checked');
    thisParentField.classList.add('daily-tasks-field_done');

    // allTasks[thisParentField.getAttribute('id')].taskState = true;
  } else {
    this.removeAttribute('checked');
    thisParentField.classList.remove('daily-tasks-field_done');

    // allTasks[thisParentField.getAttribute('id')].taskState = false;
  }
  tasksStateSaving();
}

export default dailyTasksFieldChecking;