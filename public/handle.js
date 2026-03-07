class Task {
  constructor(title, description = "") {
    this.id = crypto.randomUUID().slice(0, 8);
    this.title = title;
    this.description = description;
  }
}

function showError(err) {
  const errorBox = document.getElementById("error");

  errorBox.textContent = err.message;
  errorBox.style.display = "block";

  console.error(err);
}

function saveTask(task) {
  try {
    console.log(`Saving task (id: ${task.id})`);
    localStorage.setItem(task.id, JSON.stringify(task));
  } catch (error) {
    showError(error);
  }
  console.log(`Task saved sucessfully (id: ${task.id})`);
}

function loadTask(id) {
  console.log("Retrieving task");
  return JSON.parse(localStorage.getItem(id));
}

function createTaskElement(id, title, description = undefined) {
  console.log(`Create task, id: ${id}, title: ${title}, desc: ${description}`);
  const taskElement = document.createElement("div");
  taskElement.id = id;
  taskElement.classList.add("task");

  const titleElement = document.createElement("h3");
  titleElement.id = `${id}-title`;
  titleElement.textContent = title;
  taskElement.appendChild(titleElement);

  if (description) {
    const descriptionElement = document.createElement("p");
    descriptionElement.id = `${id}-description`;
    descriptionElement.textContent = description;
    taskElement.appendChild(descriptionElement);
  }

  const btnWrapperElement = document.createElement("div");
  btnWrapperElement.id = "btn-wrapper";
  taskElement.appendChild(btnWrapperElement)

  const doneButton = document.createElement("button");
  doneButton.classList.add("done-button");
  doneButton.addEventListener('click', (id) => toggle(id))
  doneButton.textContent = "Done";
  btnWrapperElement.appendChild(doneButton);

  const removeButton = document.createElement("button");
  removeButton.classList.add("delete-button");
  doneButton.addEventListener('click', (id) => removeButton(id))
  removeButton.textContent = "Remove";
  btnWrapperElement.appendChild(removeButton);

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  doneButton.addEventListener('click', (id) => editButton(id))
  editButton.textContent = "Edit";
  btnWrapperElement.appendChild(editButton);

  return taskElement;
}

function displayTasks() {
  console.log("Displaying tasks");
  const tasks = document.getElementById("tasks");
  for (let i = 0; i < localStorage.length; i++) {
    let id = localStorage.key(i);
    let task = loadTask(id);
    let taskElement = createTaskElement(task.id, task.title, task.description);
    tasks.appendChild(taskElement);
  }
}

function createTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  console.log(`Adding task (title: "${title}")`);
  const task = new Task(title, description);
  console.log(
    `Creating task (id: ${task.id}, title: ${task.title}, desc: ${task.description})`,
  );
  saveTask(task);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  displayTasks();
}

function removeTask(id) {
  console.log(`Removing task "${id}"`);
  localStorage.removeItem(id);
  displayTasks();
}

function editTask(id) {
  console.log(`Editing task "${id}"`);
  const task = loadTask(id);

  let taskElement = document.getElementById(id);

  taskElement.innerHTML = `
    <input
        id="${id}-title"
        type="text"
        required
        value="${task.title}"
    />
    <input
        id="${id}-description"
        type="text"
        required
        value="${task.description}"
    />
    <button class="save-button" onclick="saveTask('${id}') ">Save</button>`;
}

const titleInput = document.getElementById("title");
titleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    createTask();
  }
});

function toggle(id) {
  const task = document.getElementById(id);
  const title = task.querySelector("h3");
  const description = task.querySelector("p");

  title.classList.toggle("done");
  if (task.description) {
    description.classList.toggle("done");
  }
}

function init() {
  localStorage.clear();
  const task = new Task("foobar", "my cool desc");
  saveTask(task);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    console.log(key, value);
  }
}

try {
  init();
  if (localStorage.length > 0) {
    displayTasks();
  }
} catch (err) {
  showError(err);
}
