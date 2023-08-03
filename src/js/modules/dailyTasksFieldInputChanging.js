/* --- Функция обарботки заполнения поля задачи  */
function dailyTasksFieldInputChanging() {
  const thisParent = this.parentNode,
      thisSiblingSaveBtn = thisParent.querySelector('.daily-tasks-field__save-btn');
  if (this.value) {
    thisParent.classList.add('daily-tasks-field_filled');
    thisSiblingSaveBtn.removeAttribute('disabled');
  } else {
    thisSiblingSaveBtn.setAttribute('disabled', '');
  }
}

export default dailyTasksFieldInputChanging;