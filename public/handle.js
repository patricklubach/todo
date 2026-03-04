let tasks = [];

class Task {
  constructor(title, description = "") {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
  }
}

function displayTasks() {
  console.log("Displaying tasks");
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    html += `<div class="task" id="${task.id}">
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <button class="done-button" onclick="removeTask('${task.id}') ">Done</button>
          <button class="delete-button" onclick="removeTask('${task.id}')">Delete</button>
      </div>`;
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

loadTasks();
displayTasks();
