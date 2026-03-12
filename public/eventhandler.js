/**
 * Global event listener for command/control + K shortcut.
 */
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('search');
        input?.focus();
    }
});

const search = document.getElementById("search")
search.addEventListener("input", (event) => {
    console.log(`Search for "${event.target.value}"`)
    const searchString = event.target.value;
    const tasks = Tasks.loadAll();
    const filteredTasks = tasks.filter(task => task.description.includes(searchString));
    console.log(filteredTasks);
    Tasks.display(filteredTasks);
});

/**
 * Toggles the 'hidden' class on the sidebar element.
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
}

const sidebarBtn = document.getElementById('sidebar-btn');
sidebarBtn.onclick = toggleSidebar;
