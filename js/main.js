// IIFE to create local scope and to avoid global namespacing collision
(function () {
  const todoCollection = {
    "1": {
      id: 1,
      task: "HTML",
      isCompleted: false,
    },
    "2": {
      id: 1,
      task: "CSS",
      isCompleted: false,
    },
  };

  const todoIds = [1, 2];

  function createListItemEl(todoItem) {
    return `<li class="flex align-center todo-list-item">
    <input class="mt0 mb0 mr1" type="checkbox" value="${todoItem.id}" id="${todoItem.id}" />
    <label for="${todoItem.id}">${todoItem.task}</label>
    </li>`;
  }

  function renderTodoList(container, todoCollection) {
    let todoListHTML = "";
    todoIds.forEach((id) => {
      todoListHTML += createListItemEl(todoCollection[id]);
    });

    container.innerHTML = todoListHTML;
  }

  // Dom Elements
  const todoListEl = document.getElementById("js-todo-list");

  renderTodoList(todoListEl, todoCollection);
})();
