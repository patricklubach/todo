let tasks = [];

class Task {
  constructor(title, description = undefined) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
  }
}

function createTaskElement(id, title, description = "") {
  const descriptionElement = description != "" ? `<p>${description}</p>` : "";
  return `<div class="task" id="${id}">
    ${descriptionElement}
    <h3>${title}</h3>
    <button class="done-button" onclick="toggle('${id}') ">Done</button>
    <button class="delete-button" onclick="removeTask('${id}')">Delete</button>
    </div>`;
}

function displayTasks() {
  console.log("Displaying tasks");
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    html += createTaskElement(task.id, task.title, title.description);
  }
  document.getElementById("tasks").innerHTML = html;
}

function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  console.log(`Adding task "${title}"`);
  const task = new Task(title, description);
  tasks.push(task);

  saveTasks();
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  displayTasks();
}

function removeTask(id) {
  console.log(`Removing task "${id}"`);
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    if (task.id === id) {
      tasks.splice(i, 1);
    }
  }
  saveTasks();
  displayTasks();
}

function saveTasks() {
  console.log("Updating tasks");
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Tasks list updated");
}

// Function to Load tasks
function loadTasks() {
  console.log("Loading tasks");
  let saved = localStorage.getItem("tasks");
  if (saved !== null) {
    tasks = JSON.parse(saved);
  }
}

const titleInput = document.getElementById("title");
titleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
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

loadTasks();
displayTasks();
