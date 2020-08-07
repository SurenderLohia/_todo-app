// IIFE to create local scope and to avoid global namespacing collision
(function () {
  const todoCollection = {
    "1": {
      id: 1,
      task: "HTML",
      isCompleted: false,
    },
    "2": {
      id: 2,
      task: "CSS",
      isCompleted: false,
    },
  };

  const todoIds = [1, 2];

  // Dom Elements
  const todoListEl = document.getElementById("js-todo-list");
  const addTodoBtn = document.getElementById('js-add-todo-btn');
  const addTodoInput = document.getElementById('js-add-todo-input');

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

  function addTodo(task) {
    const todoId = todoIds.length + 1;
    const todoItem = {
      id: todoId,
      task,
      isCompleted: false,
    };

    todoCollection[todoId] = todoItem;
    todoIds.push(todoItem.id);

    addTodoInput.value = '';

    renderTodoList(todoListEl, todoCollection);
  }

  function onAddTodo() {
    const task = addTodoInput.value;
    addTodo(task);
  }

  renderTodoList(todoListEl, todoCollection);

  // AttachEvents
  addTodoBtn.addEventListener('click', onAddTodo, false);
})();
