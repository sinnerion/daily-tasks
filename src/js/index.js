const allTasks = {},
    dailyTasksFormTasks = document.getElementById('dailyTasksFormTasks'),
    dailyTasksFormAddBtn = document.getElementById('dailyTasksFormAddBtn'),
    dailyTasksFormSaveBtn = document.getElementById('dailyTasksFormSaveBtn'),
    dailyTasksFormClearBtn = document.getElementById('dailyTasksFormClearBtn');

/* Констурктор новой задачи */
function NewHtmlElement(tag, classes, attributes = {}) {
  let newTaskField = document.createElement(tag);
  newTaskField.classList.add(...classes);
  for (let key in attributes) {
    newTaskField.setAttribute(key, attributes[key]);
  }
  return newTaskField;
}

/* Констурктор объкта для задачи */
function NewTaskComponent(task) {
  allTasks[task.getAttribute('id')] = {
    taskID: task.getAttribute('id'),
    taskClasses: task.className,
    taskValue: task.querySelector('.daily-tasks-field__task').textContent,
    taskState: !!task.querySelector('.daily-tasks-field-checkbox__input').getAttribute('checked')
  };
  // console.group(allTasks);
  return allTasks[task.getAttribute('id')];
}

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
        dailyTasksFieldRemoveBtnAttributes = {'type': 'button', 'title': 'Удалить'},
        dailyTasksFieldSaveBtnAttributes = {'type': 'button', 'title': 'Сохранить', 'disabled': ''},
        dailyTasksFieldEditBtnAttributes = {'type': 'button', 'title': 'Редактировать', 'aria-label': 'Edit'},
        dailyTasksFieldRemoveBtnIconsAttributes = {'aria-hidden': 'true'},
        dailyTasksFieldCheckAttributes = {'title': 'Готово / не готово', 'aria-label': 'Ready / not ready'};

    /* --- Создаём компоненты с необходимыми классами и другими атрибутами */
    const dailyTasksField = new NewHtmlElement('div', ['daily-tasks-field']),
        dailyTasksFieldInput = new NewHtmlElement('input', ['daily-tasks-field__input'], dailyTasksFieldInputAttributes),
        dailyTasksFieldTask = new NewHtmlElement('p', dailyTasksFieldTaskClasses),
        dailyTasksFieldRemoveBtn = new NewHtmlElement('button', dailyTasksFieldRemoveBtnClasses, dailyTasksFieldRemoveBtnAttributes),
        dailyTasksFieldSaveBtn = new NewHtmlElement('button', dailyTasksFieldSaveBtnClasses, dailyTasksFieldSaveBtnAttributes),
        dailyTasksFieldEditBtn = new NewHtmlElement('button', dailyTasksFieldEditBtnClasses, dailyTasksFieldEditBtnAttributes),
        dailyTasksFieldRemoveBtnIcon = new NewHtmlElement('i', dailyTasksFieldRemoveBtnIconClasses, dailyTasksFieldRemoveBtnIconsAttributes),
        dailyTasksFieldSaveBtnIcon = new NewHtmlElement('i', dailyTasksFieldSaveBtnIconClasses, dailyTasksFieldRemoveBtnIconsAttributes),
        dailyTasksFieldEditBtnIcon = new NewHtmlElement('i', dailyTasksFieldEditBtnIconClasses, dailyTasksFieldRemoveBtnIconsAttributes),
        dailyTasksFieldCheck = new NewHtmlElement('label', dailyTasksFieldCheckClasses, dailyTasksFieldCheckAttributes),
        dailyTasksFieldCheckInput = new NewHtmlElement('input', dailyTasksFieldCheckInputClasses, {'type': 'checkbox'}),
        dailyTasksFieldCheckLabel = new NewHtmlElement('span', ['custom-checkbox__label']);

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

/* Функция очистики текущего состояния */
function tasksStateClearing() {
  dailyTasksFormTasks.innerHTML = '';
  localStorage.removeItem('tasks');
  localStorage.removeItem('dailyTasksFormTasksHTML');
}

/* --- Функция удаления задачи  */
function dailyTasksFieldRemoving() {
  const thisParent = this.parentNode;
  /* Удаляем текущий элемент */
  dailyTasksFormTasks.removeChild(thisParent);
  tasksStateSaving();
}

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

/* --- Функция сохранения задачи по клику на Enter */
function dailyTasksFieldInputEnterSaving(event) {
  const eventClick = new Event("click"),
      thisParent = this.parentNode,
      thisSiblingSaveBtn = thisParent.querySelector('.daily-tasks-field__save-btn');
  if (event.key === "Enter") {
    thisSiblingSaveBtn.dispatchEvent(eventClick);
  }
}

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

dailyTasksFormAddBtn.addEventListener('click', newDailyTaskAdding);
dailyTasksFormClearBtn.addEventListener('click', tasksStateClearing);
dailyTasksFormSaveBtn.addEventListener('click', function () {
  dailyTasksEmptyFieldsRemoving();
  tasksStateSaving();
});


document.addEventListener('DOMContentLoaded', function () {

  /* Эксперимент
  fetch('http://localhost:63342/For%20content/1LEARNING/daily-tasks/data/tasks.json')
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.error('Что-то пошло не так', error);
      });
 Эксперимент КОНЕЦ */

  /* Добавляем сохраненное состояние списка задач */
  const localDailyTasksFormTasksHTML = localStorage.getItem('dailyTasksFormTasksHTML');
  if (localDailyTasksFormTasksHTML) {
    dailyTasksFormTasks.innerHTML = localDailyTasksFormTasksHTML;
  }

  /* Удаляем пустые задачи при загрузке страницы */
  dailyTasksEmptyFieldsRemoving();

  /* Обработчики для полей всех задач */
  document.querySelectorAll('.daily-tasks-field__input').forEach(function (item) {
    item.addEventListener('keyup', dailyTasksFieldInputChanging);
    item.addEventListener('keypress', dailyTasksFieldInputEnterSaving);
  });
  /* Обработчик для кнопок сохранения всех задач */
  document.querySelectorAll('.daily-tasks-field__save-btn').forEach(function (item) {
    item.addEventListener('click', dailyTasksFieldSaving);
  });
  /* Обработчик для кнопок редактирования всех задач */
  document.querySelectorAll('.daily-tasks-field__edit-btn').forEach(function (item) {
    item.addEventListener('click', dailyTasksFieldEditing);
  });
  /* Обработчик для кнопок удаления всех задач */
  document.querySelectorAll('.daily-tasks-field__remove-btn').forEach(function (item) {
    item.addEventListener('click', dailyTasksFieldRemoving);
  });
  /* Обработчик для кнопок удаления всех задач */
  document.querySelectorAll('.daily-tasks-field-checkbox__input').forEach(function (item) {
    item.addEventListener('change', dailyTasksFieldChecking);
  });
});