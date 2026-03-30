/**
 * Global event listener for search bar. Focuses the search input when the user presses the command/control + K shortcut.
 */
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    const input = document.getElementById("search");
    input?.focus();
  }
});

const search = document.getElementById("search");
search.addEventListener("input", (event) => {
  console.log(`Search for "${event.target.value}"`);
  const searchString = event.target.value;
  const tasks = Tasks.loadAll();
  const filteredTasks = tasks.filter((task) =>
    task.description.includes(searchString),
  );
  console.log(filteredTasks);
  Tasks.display(filteredTasks);
});
