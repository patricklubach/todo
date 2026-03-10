class Task {
  constructor(description) {
    this.id = crypto.randomUUID().slice(0, 8);
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.editMode = false;
    this.done = false;
    this.archived = false;
  }

  save() {
    try {
      console.log(`Saving task (id: ${this.id})`);
      localStorage.setItem(this.id, JSON.stringify(this));
    } catch (error) {
      showError(error);
    }
    console.log(`Task saved sucessfully (id: ${this.id})`);
  }

  getHTMLElement() {
    const taskElement = document.createElement("div");
    taskElement.id = this.id;
    taskElement.classList.add("task");

    const descriptionElement = document.createElement("p");
    descriptionElement.id = this.id;
    descriptionElement.innerHTML = this.description;
    taskElement.appendChild(descriptionElement);

    const btnWrapperElement = document.createElement("div");
    btnWrapperElement.id = "btn-wrapper";
    taskElement.appendChild(btnWrapperElement);

    const doneButton = document.createElement("button");
    doneButton.classList.add("done-button");
    doneButton.onclick = () => toggle(this.id);
    doneButton.textContent = "Done";
    btnWrapperElement.appendChild(doneButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = () => Tasks.delete(this.id);
    deleteButton.textContent = "Delete";
    btnWrapperElement.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.onclick = () => Tasks.edit(this.id);
    editButton.textContent = "Edit";
    btnWrapperElement.appendChild(editButton);

    return taskElement;
  }
}

class Tasks {
  static load(id) {
    const data = JSON.parse(localStorage.getItem(id));
    const task = Object.assign(new Task(), data);
    return task;
  }

  static loadAll() {
    console.log("Loading all tasks")
    const tasksList = [];
    for (let i = 0; i < localStorage.length; i++) {
      let id = localStorage.key(i);
      let task = this.load(id);
      tasksList.push(task);
    }
    return tasksList;
  }

  static add() {
    const description = document.getElementById("description").innerHTML;
    this.create(description);
  }

  static delete(id) {
    console.log(`Deleting task (id: ${id})`);
    localStorage.removeItem(id);
    console.log(`Task deleted sucessfully (id: ${id})`);
    this.display();
  }

  static display(tasks = []) {
    console.log("Displaying tasks");
    const tasksElement = document.getElementById("tasks");

    let newTasksElement = document.createElement("div");
    newTasksElement.id = "tasks";

    let tasksList;
    if (0 < tasks.length) {
      tasksList = tasks;
    } else {
      tasksList = this.loadAll();
    }
    tasksList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    for (let task of tasksList) {
      let taskElement = task.getHTMLElement();
      newTasksElement.appendChild(taskElement);
    }
    
    tasksElement.replaceWith(newTasksElement);
  }

  static create(description) {
    console.log(`Creating task (description: "${description}")`);
    const task = new Task(description);
    console.log(`Created task (id: ${task.id})`);
    task.save();

    document.getElementById("description").innerHTML = "";
    this.display();
  }

  static edit(id) {
    console.log(`Editing task "${id}"`);
    const task = Tasks.load(id);
    task.editMode = true;
    task.save();
    Tasks.display();
  }
}

function showError(err) {
  const errorBox = document.getElementById("error");

  errorBox.textContent = err.message;
  errorBox.style.display = "block";

  console.error(err);
}


function toggle(id) {
  const task = document.getElementById(id);
  const description = document.getElementById(`${id}-description`);

  task.classList.toggle("done");
  if (task.description) {
    description.classList.toggle("done");
  }
}

function format(cmd) {
  document.execCommand(cmd);
}

function init() {
  console.log("Initializing app");
  localStorage.clear();
  const search = document.getElementById("search");
  search.value = "";
  console.log("Adding tasks");
  const tasks = ["foo", "bar", "baz", "foobar"] //"lol", "lul", "lel", "lal", "bingo", "bongo", "bengo", "bango"];

  for (let i = 0; i < tasks.length; i++) {
    Tasks.create(tasks[i]);
  }
  console.log("Tasks added");
  console.log("App initialized sucessfully");
}

try {
  init();
} catch (err) {
  showError(err);
}
