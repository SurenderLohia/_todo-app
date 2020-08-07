// IIFE to create local scope and to avoid global namespacing collision
(function () {
  let todoCollection = {};
  let todoIds = [];

  /* 
  Data Structure:

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

  */

  // Localstorage
  function persistData(key, value) {
    const valueStirng = JSON.stringify(value);
    window.localStorage.setItem(key, valueStirng);
  }

  function getPersistedData(key) {
    const value = window.localStorage.getItem(key);
    return JSON.parse(value);
  }

  function init() {
    const _todoCollection = getPersistedData('todoCollection');
    const _todoIds = getPersistedData('todoIds');

    if(_todoCollection) {
      todoCollection = _todoCollection;
    }

    if(_todoIds) {
      todoIds = _todoIds;
    }

    if(todoIds.length) {
      renderTodoList(todoListEl, todoCollection);
    }
  }

  // Dom Elements
  const todoListEl = document.getElementById("js-todo-list");
  const addTodoBtn = document.getElementById('js-add-todo-btn');
  const addTodoInput = document.getElementById('js-add-todo-input');

  function createListItemEl(todoItem) {
    return `<li class="flex align-center todo-list-item">
    <input class="mt0 mb0 mr1" type="checkbox" value="${todoItem.id}" id="${todoItem.id}" ${todoItem.isCompleted ? 'checked': ''} />
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

    persistData('todoCollection', todoCollection);
    persistData('todoIds', todoIds);

    renderTodoList(todoListEl, todoCollection);
  }

  function toggleTodoItem(id) {
    todoCollection[id].isCompleted = !todoCollection[id].isCompleted;
    persistData('todoCollection', todoCollection);
  }

  function onAddTodo() {
    const task = addTodoInput.value;
    addTodo(task);
  }

  // Using EventDelegation: for keep code simple and performant
  function onToggleTodoItem(e) {
    const target = e.target;
    
    if(target.tagName === 'INPUT') {
      e.stopPropagation();
      const id = target.id;
      toggleTodoItem(id);
    }
  }
  
  init();
  
  // AttachEvents
  addTodoBtn.addEventListener('click', onAddTodo, false);
  todoListEl.addEventListener('click', onToggleTodoItem, false);
  
})();
