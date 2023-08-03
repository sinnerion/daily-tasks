/* --- Функция редактирования задачи  */
function dailyTasksFieldEditing() {
  const thisParent = this.parentNode,
      thisSiblingInput = thisParent.querySelector('.daily-tasks-field__input'),
      thisSiblingTask = thisParent.querySelector('.daily-tasks-field__task'),
      thisSiblingRemoveBtn = thisParent.querySelector('.daily-tasks-field__remove-btn'),
      thisSiblingSaveBtn = thisParent.querySelector('.daily-tasks-field__save-btn'),
      thisSiblingCheck = thisParent.querySelector('.daily-tasks-field-checkbox');
  /* Скрываем параграф и отображаем поле для редактирования */
  this.classList.toggle('d-none');
  thisSiblingInput.value = thisSiblingTask.textContent;
  thisSiblingInput.classList.toggle('d-none');
  thisSiblingInput.focus();
  thisSiblingTask.classList.toggle('d-none');
  thisSiblingRemoveBtn.classList.toggle('d-none');
  thisSiblingSaveBtn.classList.toggle('d-none');
  thisSiblingCheck.classList.toggle('d-none');
}

export default dailyTasksFieldEditing;