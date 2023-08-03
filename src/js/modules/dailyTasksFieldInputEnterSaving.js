/* --- Функция сохранения задачи по клику на Enter */
function dailyTasksFieldInputEnterSaving(event) {
  const eventClick = new Event("click"),
      thisParent = this.parentNode,
      thisSiblingSaveBtn = thisParent.querySelector('.daily-tasks-field__save-btn');
  if (event.key === "Enter") {
    thisSiblingSaveBtn.dispatchEvent(eventClick);
  }
}

export default dailyTasksFieldInputEnterSaving;