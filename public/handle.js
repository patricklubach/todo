let tasks = [];

function displayTasks() {
  console.log("Displaying tasks");
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += `<div class="task">
          <h3>${tasks[i]}</h3>
          <p>This is the description for ${tasks[i]}</p>
          <button class="done-button" onclick="removeTask()">Done</button>
          <button class="delete-button" onclick="removeTask()">Delete</button>
      </div>`;
  }
  document.getElementById("tasks").innerHTML = html;
}

function addTask() {
  const title = document.getElementById("title").value;
  console.log(`Adding task "${title}"`);
  tasks.push(title);

  saveTasks();
  document.getElementById("title").value = "";
  displayTasks();
}

function removeTask(i) {
  console.log(`Removing task "${tasks[i]}"`);
  tasks.splice(i, 1);
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
