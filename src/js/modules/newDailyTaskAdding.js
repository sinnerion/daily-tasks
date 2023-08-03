import newTaskCreation from './newTaskCreation.js';
import dailyTasksFieldInputChanging from './dailyTasksFieldInputChanging.js';
import dailyTasksFieldInputEnterSaving from './dailyTasksFieldInputEnterSaving.js';
import dailyTasksFieldRemoving from './dailyTasksFieldRemoving.js';
import dailyTasksFieldSaving from './dailyTasksFieldSaving.js';
import dailyTasksFieldEditing from './dailyTasksFieldEditing.js';
import dailyTasksFieldChecking from './dailyTasksFieldChecking.js';
/* Константы */
const dailyTasksFormTasks = document.getElementById('dailyTasksFormTasks');

/* Функция сооздания и добавления новой задачи */
function newDailyTaskAdding() {
  /* --- Проверяем количество добавленных задач */
  const dailyTasksFormTasksFields = dailyTasksFormTasks.querySelectorAll('.daily-tasks-field_filled');
  if (dailyTasksFormTasksFields.length < 99) {
    /* --- Создаём наборы классов */
    const dailyTasksFieldRemoveBtnClasses = ['daily-tasks__btn', 'daily-tasks-field__btn', 'daily-tasks-field__remove-btn'],
        dailyTasksFieldSaveBtnClasses = ['daily-tasks__btn', 'daily-tasks-field__btn', 'daily-tasks-field__save-btn'],
        dailyTasksFieldEditBtnClasses = ['daily-tasks__btn', 'daily-tasks-field__btn', 'daily-tasks-field__edit-btn', 'd-none'],
        dailyTasksFieldTaskClasses = ['daily-tasks-field__task', 'd-none'],
        dailyTasksFieldRemoveBtnIconClasses = ['fa', 'fa-times'],
        dailyTasksFieldSaveBtnIconClasses = ['fa', 'fa-check'],
        dailyTasksFieldEditBtnIconClasses = ['fa', 'fa-pencil-square-o'],
        dailyTasksFieldCheckClasses = ['custom-checkbox', 'daily-tasks-field-checkbox', 'd-none'],
        dailyTasksFieldCheckInputClasses = ['custom-checkbox__input', 'daily-tasks-field-checkbox__input'];

    /* --- Создаём наборы атрибутов */
    const dailyTasksFieldInputAttributes = {'type': 'text', 'aria-label': 'Task'},
        dailyTasksFieldRemoveBtnAttributes = {'type': 'button', 'title': 'Remove'},
        dailyTasksFieldSaveBtnAttributes = {'type': 'button', 'title': 'Save', 'disabled': ''},
        dailyTasksFieldEditBtnAttributes = {'type': 'button', 'title': 'Edit', 'aria-label': 'Edit'},
        dailyTasksFieldRemoveBtnIconsAttributes = {'aria-hidden': 'true'},
        dailyTasksFieldCheckAttributes = {'title': 'Ready / not ready', 'aria-label': 'Ready / not ready'};

    /* --- Создаём компоненты с необходимыми классами и другими атрибутами */
    const dailyTasksField = new newTaskCreation('div', ['daily-tasks-field']),
        dailyTasksFieldInput = new newTaskCreation('input', ['daily-tasks-field__input'], dailyTasksFieldInputAttributes),
        dailyTasksFieldTask = new newTaskCreation('p', dailyTasksFieldTaskClasses),
        dailyTasksFieldRemoveBtn = new newTaskCreation('button', dailyTasksFieldRemoveBtnClasses, dailyTasksFieldRemoveBtnAttributes),
        dailyTasksFieldSaveBtn = new newTaskCreation('button', dailyTasksFieldSaveBtnClasses, dailyTasksFieldSaveBtnAttributes),
        dailyTasksFieldEditBtn = new newTaskCreation('button', dailyTasksFieldEditBtnClasses, dailyTasksFieldEditBtnAttributes),
        dailyTasksFieldRemoveBtnIcon = new newTaskCreation('i', dailyTasksFieldRemoveBtnIconClasses, dailyTasksFieldRemoveBtnIconsAttributes),
        dailyTasksFieldSaveBtnIcon = new newTaskCreation('i', dailyTasksFieldSaveBtnIconClasses, dailyTasksFieldRemoveBtnIconsAttributes),
        dailyTasksFieldEditBtnIcon = new newTaskCreation('i', dailyTasksFieldEditBtnIconClasses, dailyTasksFieldRemoveBtnIconsAttributes),
        dailyTasksFieldCheck = new newTaskCreation('label', dailyTasksFieldCheckClasses, dailyTasksFieldCheckAttributes),
        dailyTasksFieldCheckInput = new newTaskCreation('input', dailyTasksFieldCheckInputClasses, {'type': 'checkbox'}),
        dailyTasksFieldCheckLabel = new newTaskCreation('span', ['custom-checkbox__label']);

    /* --- Добавляем новые компоненты в DOM */
    dailyTasksFieldRemoveBtn.append(dailyTasksFieldRemoveBtnIcon);
    dailyTasksFieldSaveBtn.append(dailyTasksFieldSaveBtnIcon);
    dailyTasksFieldEditBtn.append(dailyTasksFieldEditBtnIcon);
    dailyTasksFieldCheck.append(dailyTasksFieldCheckInput, dailyTasksFieldCheckLabel);
    dailyTasksField.append(dailyTasksFieldInput, dailyTasksFieldTask, dailyTasksFieldRemoveBtn, dailyTasksFieldSaveBtn, dailyTasksFieldEditBtn, dailyTasksFieldCheck);
    dailyTasksFormTasks.append(dailyTasksField);

    /* --- Фокусируемся на поле новго элемента */
    dailyTasksFieldInput.focus();

    /* --- Обработчики для поля */
    dailyTasksFieldInput.addEventListener('keyup', dailyTasksFieldInputChanging);
    dailyTasksFieldInput.addEventListener('keypress', dailyTasksFieldInputEnterSaving);
    /* --- Обработчики для копки удаления задачи */
    dailyTasksFieldRemoveBtn.addEventListener('click', dailyTasksFieldRemoving);
    /* --- Обработчики для кнопки сохранения задачи */
    dailyTasksFieldSaveBtn.addEventListener('click', dailyTasksFieldSaving);
    /* --- Обработчики для кнопки редактирования задачи */
    dailyTasksFieldEditBtn.addEventListener('click', dailyTasksFieldEditing);
    /* --- Обработчик для чекбокса */
    dailyTasksFieldCheckInput.addEventListener('change', dailyTasksFieldChecking);
  } else {
    alert('А не многовато задач?');
  }
}

export default newDailyTaskAdding;