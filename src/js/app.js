/* Импорт модулей */
import newDailyTaskAdding from './modules/newDailyTaskAdding.js';
import dailyTasksFieldInputChanging from './modules/dailyTasksFieldInputChanging.js';
import dailyTasksFieldInputEnterSaving from './modules/dailyTasksFieldInputEnterSaving.js';
import dailyTasksFieldRemoving from './modules/dailyTasksFieldRemoving.js';
import dailyTasksFieldSaving from './modules/dailyTasksFieldSaving.js';
import dailyTasksFieldEditing from './modules/dailyTasksFieldEditing.js';
import dailyTasksFieldChecking from './modules/dailyTasksFieldChecking.js';
import dailyTasksEmptyFieldsRemoving from './modules/dailyTasksEmptyFieldsRemoving.js';
import tasksStateSaving from './modules/tasksStateSaving.js';
import tasksStateClearing from './modules/tasksStateClearing.js';
import handleThemeToggling from './modules/handleThemeToggling.js';

window.addEventListener('load', async () => {
  if(navigator.serviceWorker) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      console.log('Service worker register - success', reg);
    } catch (e) {
      console.log('Service worker register - fail');
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  /* Константы */
  const dailyTasksFormTasks = document.getElementById('dailyTasksFormTasks'),
      dailyTasksFormAddBtn = document.getElementById('dailyTasksFormAddBtn'),
      dailyTasksFormSaveBtn = document.getElementById('dailyTasksFormSaveBtn'),
      dailyTasksFormClearBtn = document.getElementById('dailyTasksFormClearBtn'),
      themeToggleBtn = document.querySelector('.theme-toggle');

  /* Смена темы */
  themeToggleBtn.addEventListener('click', handleThemeToggling);
  /* Создание и добавление новой задачи */
  dailyTasksFormAddBtn.addEventListener('click', newDailyTaskAdding);
  /* Удаление всех задач */
  dailyTasksFormClearBtn.addEventListener('click', tasksStateClearing);
  /* Сохранение состояния с удалением путых задач */
  dailyTasksFormSaveBtn.addEventListener('click', function () {
    dailyTasksEmptyFieldsRemoving();
    tasksStateSaving();
  });
  /* Добавление сохраненного состояния списка задач */
  const localDailyTasksFormTasksHTML = localStorage.getItem('dailyTasksFormTasksHTML');
  if (localDailyTasksFormTasksHTML) {
    dailyTasksFormTasks.innerHTML = localDailyTasksFormTasksHTML;
  }
  /* Удаление пустых задач при загрузке страницы */
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