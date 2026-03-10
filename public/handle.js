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

  getHTMLElement() {
    const taskElement = document.createElement("div");
    taskElement.id = this.id;
    taskElement.classList.add("task");

    const descriptionElement = this.editMode ? document.createElement("input") : document.createElement("p");
    descriptionElement.id = this.id;
    descriptionElement.innerHTML = this.description;
    if (this.done) {
      descriptionElement.classList.add("done")
    }
    taskElement.appendChild(descriptionElement);

    const btnWrapperElement = document.createElement("div");
    btnWrapperElement.id = "btn-wrapper";
    taskElement.appendChild(btnWrapperElement);

    if (this.editMode) {
      const saveButton = document.createElement("button");
      saveButton.classList.add("done-button");
      saveButton.onclick = () => Tasks.save(this.id);
      saveButton.textContent = "Save";
      btnWrapperElement.appendChild(saveButton);
    } else {
      const doneButton = document.createElement("button");
      doneButton.classList.add("done-button");
      doneButton.onclick = () => Tasks.toggleDone(this.id);
      if (this.done) {
        doneButton.textContent = "Undone";
      } else {
        doneButton.textContent = "Done";
      }
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
    }

    return taskElement;
  }

  save() {
    console.log(`Saving task (id: ${this.id})`);
    localStorage.setItem(this.id, JSON.stringify(this));
    console.log(`Task saved sucessfully (id: ${this.id})`);
  }

  static toggle(id) {
    const task = Tasks.load(id)

    const taskElement = document.getElementById(id);
    const description = taskElement.querySelector("p");
    description.classList.toggle("done");
  }
}

class Tasks {
  static add() {
    const description = document.getElementById("description").innerHTML;
    this.create(description);
  }

  static create(description) {
    console.log(`Creating task (description: "${description}")`);
    const task = new Task(description);
    console.log(`Created task (id: ${task.id})`);
    task.save();
    
    document.getElementById("description").innerHTML = "";
    this.display();
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
  
  static edit(id) {
    console.log(`Editing task "${id}"`);
    const task = Tasks.load(id);
    task.editMode = true;
    task.save();
    Tasks.display();
  }
  
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

  static save(id) {
    const task = this.load(id);
    task.editMode = false;
    task.save();
    this.display();
  }

  static toggleDone(id) {
    const task = this.load(id);
    task.done ? false : true;
    task.save();
    this.display();
  }
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

init();
