import newDailyTaskAdding from './newDailyTaskAdding.js';
import tasksStateSaving from './tasksStateSaving.js';

/* --- Функция сохранения задачи  */
function dailyTasksFieldSaving() {
  const thisParent = this.parentNode,
      thisSiblingCheck = thisParent.querySelector('.daily-tasks-field-checkbox'),
      thisSiblingInput = thisParent.querySelector('.daily-tasks-field__input'),
      thisSiblingTask = thisParent.querySelector('.daily-tasks-field__task'),
      thisSiblingRemoveBtn = thisParent.querySelector('.daily-tasks-field__remove-btn'),
      thisSiblingEditBtn = thisParent.querySelector('.daily-tasks-field__edit-btn');
  /* Если поле не пустое:
     сохраняем его значение, скрываем поле и кнопки удаления и сохранения,
     отображаем параграф со значением, чекбокс и кнопку редактирования */
  if (thisSiblingInput.value) {
    thisSiblingTask.textContent = thisSiblingInput.value;
    thisSiblingInput.classList.toggle('d-none');
    thisSiblingTask.classList.toggle('d-none');
    this.classList.toggle('d-none');
    thisSiblingRemoveBtn.classList.toggle('d-none');
    thisSiblingCheck.classList.toggle('d-none');
    thisSiblingEditBtn.classList.toggle('d-none');
    tasksStateSaving();
    newDailyTaskAdding();

    // console.log(NewTaskComponent(thisParent));
  }
}

export default dailyTasksFieldSaving;