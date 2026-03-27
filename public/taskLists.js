let dragged = null;

const taskListsContainerContainer =
  document.getElementById("taskListsContainer");

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
taskListsContainer.forEach((item) => {
  item.addEventListener("click", () => {
    taskListsContainer.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});
