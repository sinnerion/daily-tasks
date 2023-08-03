/* Констурктор новой задачи */
function newTaskCreation(tag, classes, attributes = {}) {
  let newTaskField = document.createElement(tag);
  newTaskField.classList.add(...classes);
  for (let key in attributes) {
    newTaskField.setAttribute(key, attributes[key]);
  }
  return newTaskField;
}

export default newTaskCreation;