class TaskLists {
  constructor() {
    this.taskListsContainer = document.getElementById("task-lists");
    this.createTaskListActive = false;

    this.display();
  }

  add(taskList) {
    Storage.saveTaskList(taskList);
    this.display();
  }

  static createTaskList() {
    const taskCreateListElement = document.createElement("div");
    taskCreateListElement.id = this.id || "new-list";
    taskCreateListElement.classList.add("sidebar-container", "create-list");

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", " text");
    inputElement.setAttribute("placeholder", "Task List Name");
    taskCreateListElement.appendChild(inputElement);

    const createButton = document.createElement("button");
    createButton.classList.add("create-btn");
    createButton.textContent = "Create";
    createButton.onclick = () => {
      const name = inputElement.value.trim();
      if (!name) return;
      const newTaskList = new TaskList(name);
      this.taskListsContainer.prepend(newTaskList.getHTMLElement());
      Storage.saveTaskList(newTaskList);
      taskCreateListElement.remove();
      this.createTaskListActive = false;
    };
    taskCreateListElement.appendChild(createButton);

    this.add(taskCreateListElement);
    this.createTaskListActive = true;
  }

  display() {
    console.log("Displaying task lists");
    const tasklists = Storage.loadAllTaskLists();
    if (tasklists.length === 0) {
      console.log("No task lists found, creating default task list");
      const defaultTaskList = new TaskList("Default");
      Storage.saveTaskList(defaultTaskList);
      tasklists.push(defaultTaskList);
    }
    tasklists.forEach((taskList) => {
      const list = Object.assign(new TaskList(), taskList);
      this.taskListsContainer.appendChild(list.getHTMLElement());
    });
  }
}

class TaskList {
  constructor(name) {
    this.id = crypto.randomUUID().slice(0, 8);
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.tasks = [];
  }

  getHTMLElement() {
    const taskListElement = document.createElement("div");
    taskListElement.id = this.id;
    taskListElement.classList.add(
      "task-list",
      "sidebar-container",
      "sidebar-selectable",
    );
    taskListElement.setAttribute("draggable", "true");

    const textElement = document.createElement("div");
    textElement.innerHTML = this.name;
    textElement.classList.add("task-list-text");
    taskListElement.appendChild(textElement);

    const buttonsWrapperElement = document.createElement("div");
    buttonsWrapperElement.classList.add("task-list-buttons");
    taskListElement.appendChild(buttonsWrapperElement);

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    buttonsWrapperElement.appendChild(editButton);

    const editIcon = document.createElement("svg");
    editIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    editIcon.setAttribute("viewBox", "0 0 640 512");
    editIcon.classList.add("icon");
    editIcon.innerHTML =
      '<!--!Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" />';
    editButton.appendChild(editIcon);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    buttonsWrapperElement.appendChild(deleteButton);

    const deleteIcon = document.createElement("svg");
    deleteIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    deleteIcon.setAttribute("viewBox", "0 0 640 512");
    deleteIcon.classList.add("icon");
    deleteIcon.innerHTML =
      '<!--!Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />';
    deleteButton.appendChild(deleteIcon);

    return taskListElement;
  }
}

let dragged = null;

const taskListsContainer = document.getElementById("task-lists");

const createTaskBtn = document.getElementById("create-task-list-btn");
createTaskBtn.addEventListener("click", (e) => {
  if (taskLists.createTaskListActive) return;
  taskLists.createTaskList();
});

taskListsContainer.addEventListener("dragstart", (e) => {
  dragged = e.target.closest(".task-list");
});

taskListsContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  const target = e.target.closest(".task-list");
  if (!target || target === dragged) return;
  const after =
    e.clientY >
    target.getBoundingClientRect().top +
      target.getBoundingClientRect().height / 2;
  taskListsContainer.insertBefore(dragged, after ? target.nextSibling : target);
});

taskListsContainer.addEventListener("dragend", () => {
  dragged = null;
});

const taskListItems = document.querySelectorAll(".task-list");

// Highlight selected task list
taskListItems.forEach((item) => {
  item.addEventListener("click", () => {
    taskListItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

const taskLists = new TaskLists();
console.log("initialized successfully");
