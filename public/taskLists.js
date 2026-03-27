let dragged = null;

const taskLists = document.getElementById("taskLists");

taskLists.addEventListener("dragstart", (e) => {
  dragged = e.target.closest(".task-list");
});

taskLists.addEventListener("dragover", (e) => {
  e.preventDefault();
  const target = e.target.closest(".task-list");
  if (!target || target === dragged) return;
  const after =
    e.clientY >
    target.getBoundingClientRect().top +
      target.getBoundingClientRect().height / 2;
  taskLists.insertBefore(dragged, after ? target.nextSibling : target);
});

taskLists.addEventListener("dragend", () => {
  dragged = null;
});
