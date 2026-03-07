function showError(err) {
  const errorBox = document.getElementById("error");

  errorBox.textContent = err.message;
  errorBox.style.display = "block";

  console.error(err);
}

let tasks = new Map();

function saveTasks() {
  try {
    console.log("Updating tasks");
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks list updated");
  } catch (error) {
    showError(error);
  }
}

function loadTasks() {
  console.log("Loading tasks");
  let saved = localStorage.getItem("tasks");
  if (saved !== null) {
    tasks = saved;
  }
}

function displayTasks() {
  console.log("Displaying tasks");
  let html = "";
  tasks.forEach(function (task, id) {
    html += createTaskElement(task.id, task.title, task.description);
  });
  document.getElementById("tasks").innerHTML = html;
}

class Task {
  constructor(title, description = "") {
    this.id = crypto.randomUUID().slice(0, 8);
    this.title = title;
    this.description = description;
  }
}

function createTaskElement(id, title, description) {
  console.log(`Create task, id: ${id}, title: ${title}, desc: ${description}`);
  const descriptionElement =
    description != "" ? `<p id="${id}-description">${description}</p>` : "";
  return `<div class="task" id="${id}">
    <h3 id="${id}-title">${title}</h3>
    ${descriptionElement}
    <button class="done-button" onclick="toggle('${id}') ">Done</button>
    <button class="delete-button" onclick="removeTask('${id}')">Delete</button>
    <button class="edit-button" onclick="editTask('${id}') ">Edit</button>
  </div>`;
}

function createTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  console.log(`Adding task: "${title}"`);
  const task = new Task(title, description);
  console.log(typeof tasks);
  tasks.set(task.id, task);

  saveTasks();
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  displayTasks();
}

function removeTask(id) {
  console.log(`Removing task "${id}"`);
  tasks.delete(id);
  saveTasks();
  displayTasks();
}

function editTask(id) {
  console.log(`Editing task "${id}"`);
  const task = tasks.get(id);

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

function saveTask(id) {
  console.log("Save tasks");

  const task = tasks.get(id);
  task.title = document.getElementById(`${id}-title`).value;
  task.description = document.getElementById(`${id}-description`).value;

  saveTasks();
  displayTasks();
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
  tasks.set(task.id, task);
  saveTasks();
}

try {
  init();
  loadTasks();
  if (tasks.size > 0) {
    displayTasks();
  }
} catch (err) {
  showError(err);
}
